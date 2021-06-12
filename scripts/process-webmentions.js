#!/usr/bin/env node
'use strict';

const fs = require('fs/promises');

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
	const content = getMentionContent(webmention);
	if (type && author) {
		return {
			type,
			sourceUrl: webmention['wm-source'],
			targetUrl: webmention['wm-target'],
			date: webmention.published || webmention['wm-received'],
			url: webmention.url,
			isFromTwitter: /^https?:\/\/(www\.)?twitter\.com\/[^\/]+\/status\//.test(webmention.url),
			author,
			content
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
	if (webmention.content) {
		const html = webmention.content.html || webmention.content.text;
		if (html) {
			// TODO sanitize this content
			return html;
		}
	}
}

async function loadJSON(filePath) {
	return JSON.parse(await fs.readFile(filePath, 'utf-8'));
}

function saveJSON(filePath, data) {
	return fs.writeFile(filePath, JSON.stringify(data, null, '\t'));
}
