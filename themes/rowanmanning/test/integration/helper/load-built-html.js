'use strict';

const fs = require('fs/promises');
const {JSDOM} = require('jsdom');

module.exports = async function loadBuiltHTML(filePath, {xml = false} = {}) {
	const baseDirectory = `${__dirname}/../build`;
	const htmlFile = `${baseDirectory}/${filePath}`;

	if (!isFile(htmlFile)) {
		throw new Error(`${htmlFile} is not a file`);
	}

	const content = await fs.readFile(htmlFile, 'utf-8');
	const dom = new JSDOM(content, {
		contentType: (xml ? 'application/xhtml+xml' : 'text/html')
	}).window;
	return dom;
};

async function isFile(path) {
	try {
		await fs.stat(path);
		return fs.stat.isFile();
	} catch (error) {
		return false;
	}
}
