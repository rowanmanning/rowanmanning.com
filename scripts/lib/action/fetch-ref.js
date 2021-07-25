#!/usr/bin/env node
'use strict';

const md5 = require('../util/md5');
const mkdir = require('../util/mkdir');
const path = require('path');
const saveJSON = require('../util/save-json');
const WebPage = require('../web-page');

const refsDirectory = path.resolve(__dirname, '../../../data/refs');

module.exports = async function fetchRef(refUrl) {

	// Fetch the web page
	const webPage = await WebPage.get(refUrl);
	const canonicalUrl = webPage.url;
	const hash = md5(canonicalUrl);

	// Create the refs directory
	await mkdir(refsDirectory);

	// Save the ref as a JSON file
	const filePath = path.join(refsDirectory, `${hash}.json`);
	await saveJSON(filePath, webPage);

	// Log success
	console.log(`Fetched URL ${canonicalUrl} and saved as JSON:`);
	console.log(filePath);

	// Return the web page instance
	return webPage;
};
