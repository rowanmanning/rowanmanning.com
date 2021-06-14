#!/usr/bin/env node
'use strict';

const clip = require('text-clipper').default;
const createDOMPurify = require('dompurify');
const fs = require('fs/promises');
const {JSDOM} = require('jsdom');

// The ideal character limit and number of lines for webmentions
const maxContentCharacterLength = 280;
const maxContentLines = 6;

(async () => {

	// Load all webmention files
	const dataPath = `${__dirname}/../data/webmentions`;
	const files = (await fs.readdir(dataPath)).filter(file => file !== '_site.json');

	for (const file of files) {
		const filePath = `${dataPath}/${file}`;
		const webmentions = await loadJSON(filePath);
		webmentions.processed = Object.values(webmentions.raw)
			.map(processWebmention)
			.filter(webmention => webmention)
			.sort((a, b) => new Date(a.date) - new Date(b.date));
		saveJSON(filePath, webmentions);
	}

})();

function processWebmention(webmention) {
	const type = getMentionType(webmention);
	const author = getMentionAuthor(webmention);
	const {content, isTruncated} = getMentionContent(webmention);
	if (type && author) {
		return {
			type,
			sourceUrl: webmention['wm-source'],
			targetUrl: webmention['wm-target'],
			date: webmention.published || webmention['wm-received'],
			url: webmention.url,
			isFromTwitter: /^https?:\/\/(www\.)?twitter\.com\/[^\/]+\/status\//.test(webmention.url),
			author,
			content,
			isTruncated
		};
	}
}

function getMentionType(webmention) {
	switch (webmention['wm-property']) {
		case 'like-of':
			return 'like';
		case 'repost-of':
			return 'repost';
		case 'mention-of':
		case 'in-reply-to':
			return 'response';
		default:
			return false;
	}
}

function getMentionAuthor(webmention) {
	if (webmention.author && webmention.author.name) {
		return {
			name: webmention.author.name,
			url: webmention.author.url || null,
			photo: webmention.author.photo || null
		};
	}
}

function getMentionContent(webmention) {
	const summary = webmention.summary ? webmention.summary.value : null;
	const content = webmention.content ? webmention.content.html || webmention.content.text || null : summary;

	if (content) {
		const {cleanDOM, document} = getCleanDOM(content);

		if (!cleanDOM || !cleanDOM.textContent) {
			return null;
		}

		// Turn images into links
		for (const image of cleanDOM.querySelectorAll('img')) {
			if (!image.getAttribute('src')) {
				image.parentElement.removeChild(image);
				continue;
			}
			const link = document.createElement('a');
			link.setAttribute('href', image.getAttribute('src'));
			link.textContent = `[image${image.getAttribute('alt') ? ` "${image.getAttribute('alt')}"` : ''}]`;
			image.parentElement.replaceChild(link, image);
		}

		// Add nofollow to links and remove if empty
		for (const link of cleanDOM.querySelectorAll('a')) {
			if (!link.textContent.trim()) {
				link.parentElement.removeChild(link);
			}
			link.setAttribute('nofollow', "nofollow");
		}

		// Turn headings into paragraphs
		for (const heading of cleanDOM.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
			const paragraph = document.createElement('p');
			paragraph.innerHTML = heading.innerHTML;
			heading.parentElement.replaceChild(paragraph, heading);
		}

		// Find the actual target link
		const targetLink = [...cleanDOM.querySelectorAll('a')].find(link => {
			// Ignore protocol, as http redirects to https
			const protocol = /^https?:\/\//;
			const href = link.getAttribute('href').replace(protocol, 'https://');
			const target = webmention['wm-target'].replace(protocol, 'https://');
			return href === target;
		});

		// The rest of this file is text manipulation, so we ditch the main DOM element
		const fullHTML = cleanDOM.innerHTML;
		let cleanHTML = cleanDOM.innerHTML;

		// If the content is too long, we try a few things
		if (cleanDOM.textContent.length > maxContentCharacterLength) {

			// If we have a target link in the content, then we only want the link and its siblings
			if (targetLink) {
				const targetLinkParent = targetLink.parentElement;
				let parentHTML = targetLinkParent.innerHTML;

				// Work out if we need ellipses
				const split = cleanDOM.textContent.split(targetLinkParent.textContent);		
				if (split.pop() !== '') {
					parentHTML = `${parentHTML}…`;
				}
				if (split.shift() !== '') {
					parentHTML = `…${parentHTML}`;
				}

				cleanHTML = parentHTML;
			}

			// Clip the HTML
			cleanHTML = clip(cleanHTML, maxContentCharacterLength, {
				html: true,
				maxLines: maxContentLines
			});

			// Get rid of spaces before a final ellipsis
			cleanHTML = cleanHTML.replace(/\s+…$/g, '…');
		}

		return {
			content: cleanHTML,
			isTruncated: (cleanHTML !== fullHTML)
		};
	}
	
	return {
		content: null,
		isTruncated: false
	};
}

function getCleanDOM(html) {

	// Set up DOMPurify
	const {window, document} = htmlStringToDOM(html);
	const DOMPurify = createDOMPurify(window);

	// Sanitize the created DOM
	const cleanDOM = DOMPurify.sanitize(document.body, {

		// Sanitize the DOM in-place so that we can make changes afterwards
		IN_PLACE: true,

		// Allow only basic inline tags
		ALLOWED_TAGS: [
			'a',
			'b',
			'blockquote',
			'code',
			'dd',
			'dl',
			'dt',
			'em',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'i',
			'img',
			'li',
			'ol',
			'p',
			'pre',
			'q',
			'small',
			'strong',
			'sub',
			'sup',
			'ul'
		],

		// Allow only a few required attributes
		ALLOWED_ATTR: [
			'alt',
			'href',
			'src'
		]

	});

	return {
		cleanDOM,
		document
	};
}

function htmlStringToDOM(content) {
	const {window} = new JSDOM(content);
	return {
		document: window.document,
		window
	};
}

async function loadJSON(filePath) {
	return JSON.parse(await fs.readFile(filePath, 'utf-8'));
}

function saveJSON(filePath, data) {
	return fs.writeFile(filePath, JSON.stringify(data, null, '\t'));
}
