#!/usr/bin/env node
'use strict';

const listAllFiles = require('@rowanmanning/list-all-files');
const { readFile } = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const CONTENT_DIRECTORY = path.resolve(__dirname, '../../../content');
const MAX_SIZE = 1800;

module.exports = async function clampImages() {
	// Load the image paths
	const imagePaths = await listAllImages(CONTENT_DIRECTORY);

	for (const imagePath of imagePaths) {
		const image = sharp(await readFile(imagePath));
		const { width, height } = await image.metadata();

		let resizeOptions = null;
		if (width > height && width > MAX_SIZE) {
			resizeOptions = {
				width: 1800
			};
		} else if (width < height && height > MAX_SIZE) {
			resizeOptions = {
				height: 1800
			};
		} else if (width > MAX_SIZE) {
			resizeOptions = {
				width: 1800,
				height: 1800
			};
		}

		if (resizeOptions) {
			await image.resize(resizeOptions).toFile(imagePath);
		}
	}
};

async function listAllImages(directoryPath) {
	return (await listAllFiles(directoryPath)).filter(isImagePath);
}

function isImagePath(filePath) {
	const lowerCaseFilePath = filePath.toLowerCase();
	return lowerCaseFilePath.toLowerCase().endsWith('.jpg') || lowerCaseFilePath.endsWith('.jpeg');
}
