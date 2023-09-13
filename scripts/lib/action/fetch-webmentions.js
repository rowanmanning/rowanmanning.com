#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs/promises');
const site = require('../../../data/webmentions/config/site.json');
const mkdir = require('../util/mkdir');

module.exports = async function fetchWebmentions(apiKey) {
	const webmentionUrl = new URL('https://webmention.io/api/mentions.jf2');

	// Webmention query parameters and headers
	webmentionUrl.searchParams.append('domain', site.domain);
	webmentionUrl.searchParams.append('per-page', 1000);
	webmentionUrl.searchParams.append('token', apiKey);
	const headers = {
		'Content-Type': 'application/json'
	};

	// Get posts since the last refresh
	if (site.lastSync) {
		webmentionUrl.searchParams.append('since', site.lastSync);
	}

	// Fetch webmentions based on query params defined above
	const response = await fetch(webmentionUrl, {headers});
	const body = await response.json();

	// Get webmentions
	const webmentions = body.children.reverse();
	console.log(`Found ${webmentions.length} new webmentions`);

	// Cache for existing webmention files
	const fileCache = {};

	// Loop over and save webmentions on a per-page basis
	for (const webmention of webmentions) {

		// Calculate a slug and file path for the mention
		let slug = webmention['wm-target']
			.replace(`https://${site.domain}`, '')
			.replace(/^\//, '')
			.replace(/[#?].*$/, '')
			.replace(/\/\.*$/, '')
			.replace(/\//g, '--');

		// Don't try and save webmentions for `_site` as this
		// will break the script
		if (slug === '_site') {
			continue;
		}

		// Create the raw directory
		const rawDataPath = `${__dirname}/../../../data/webmentions/raw`;
		await mkdir(rawDataPath);

		if (slug === '') {
			slug = 'index';
		}
		const filePath = `${rawDataPath}/${slug}.json`;

		// Load the file for this target if it doesn't already exist
		if (!fileCache[filePath]) {
			try {
				await fs.access(filePath);
				fileCache[filePath] = JSON.parse(await fs.readFile(filePath, 'utf-8'));
			} catch (error) {
				fileCache[filePath] = {};
			}
		}

		const uniqueIdData = `source:${webmention['wm-source']}\ttarget:${webmention['wm-target']}`;
		const uniqueId = crypto.createHash('md5').update(uniqueIdData).digest('hex');

		fileCache[filePath][uniqueId] = webmention;

	}

	// Save all the webmention files
	for (const [filePath, data] of Object.entries(fileCache)) {
		console.log(`Saving ${filePath}`);
		await fs.writeFile(filePath, JSON.stringify(data, null, '\t'));
	}

	// Resave the site data to include the new last sync date
	if (webmentions.length) {
		site.lastSync = webmentions[webmentions.length - 1]['wm-received'];
		console.log(`Saving last sync date as ${site.lastSync}`);
		await fs.writeFile(
			`${__dirname}/../../../data/webmentions/config/site.json`,
			JSON.stringify(site, null, '\t')
		);
	}

};
