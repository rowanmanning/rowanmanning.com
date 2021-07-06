#!/usr/bin/env node
'use strict';

const clip = require('text-clipper').default;
const createDOMPurify = require('dompurify');
const fs = require('fs/promises');
const {JSDOM} = require('jsdom');

// The ideal character limit and number of lines for webmentions
const maxContentCharacterLength = 280;
const maxContentLines = 6;

// Set up DOMPurify
const {window} = new JSDOM('');
const {document} = window;
const DOMPurify = createDOMPurify(window);

(async () => {

	// Load all webmention files
	const dataPath = `${__dirname}/../data/webmentions`;
	const files = await fs.readdir(dataPath);

	for (const file of files) {
		const filePath = `${dataPath}/${file}`;
		const webmentions = await loadJSON(filePath);
		webmentions.processed = Object.entries(webmentions.raw)
			.map(processWebmention)
			.filter(webmention => webmention)
			.sort((wm1, wm2) => new Date(wm1.date) - new Date(wm2.date));
		saveJSON(filePath, webmentions);
	}

})();

function processWebmention([md5, webmention]) {
	const type = getMentionType(webmention);
	const author = getMentionAuthor(webmention);
	const twitterRegExp = /^https?:\/\/(www\.)?twitter\.com\/[^/]+\/status\//;
	if (type && author) {

		// Only parse content for response type webmentions
		const {content, isTruncated} = (type === 'response' ? getMentionContent(webmention) : {});

		return {
			md5,
			type,
			sourceUrl: webmention['wm-source'],
			targetUrl: webmention['wm-target'],
			date: webmention.published || webmention['wm-received'],
			url: webmention.url,
			isFromTwitter: twitterRegExp.test(webmention.url),
			author,
			content: content || null,
			isTruncated: isTruncated || false
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
	const result = {
		content: null,
		isTruncated: false
	};

	const summary = (
		webmention.summary ?
			webmention.summary.value :
			null
	);
	const content = (
		webmention.content ?
			webmention.content.html || webmention.content.text || null :
			summary
	);

	if (content) {
		const cleanDOM = getCleanDOM(content);

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
			const imageAlt = (image.getAttribute('alt') ? ` "${image.getAttribute('alt')}"` : '');
			link.textContent = `[image${imageAlt}]`;
			image.parentElement.replaceChild(link, image);
		}

		// Add nofollow to links and remove if empty
		for (const link of cleanDOM.querySelectorAll('a')) {
			if (!link.textContent.trim()) {
				link.parentElement.removeChild(link);
			}
			link.setAttribute('nofollow', 'nofollow');
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

		result.content = cleanHTML;
		result.isTruncated = (cleanHTML !== fullHTML);
	}

	// If there are photos, append to the content
	if (webmention.photo && webmention.photo.length) {
		result.content = `
			${result.content ? result.content : ''}
			<a href="${webmention.url.replace(/"/g, '&quot;')}" nofollow>[image]</a>
		`;
	}

	// If there are videos, append to the content
	if (webmention.video && webmention.video.length) {
		result.content = `
			${result.content ? result.content : ''}
			<a href="${webmention.url.replace(/"/g, '&quot;')}" nofollow>[video]</a>
		`;
	}

	return result;
}

function getCleanDOM(html) {
	const wrapper = document.createElement('div');
	wrapper.innerHTML = html;

	// Sanitize the created DOM
	const cleanDOM = DOMPurify.sanitize(wrapper, {

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

	return cleanDOM;
}

async function loadJSON(filePath) {
	return JSON.parse(await fs.readFile(filePath, 'utf-8'));
}

function saveJSON(filePath, data) {
	return fs.writeFile(filePath, JSON.stringify(data, null, '\t'));
}
