#!/usr/bin/env node
'use strict';

const util = require('node:util');

const exec = util.promisify(require('node:child_process').exec);
const fs = require('node:fs/promises');
const mkdir = require('../util/mkdir');
const path = require('node:path');

const weeknotesDirectory = path.resolve(__dirname, '../../../content/weeknotes');

module.exports = async function createWeeknote() {
	// Create the weeknotes directory
	await mkdir(weeknotesDirectory);

	// Read existing weeknotes to work out the next number in sequence
	const existingWeeknotes = (await fs.readdir(weeknotesDirectory))
		.filter((weeknote) => !weeknote.includes('.'))
		.map((weeknote) => Number(weeknote))
		.filter((number) => !Number.isNaN(number));
	const lastWeeknote = existingWeeknotes.length ? Math.max(...existingWeeknotes) : 0;
	const nextWeeknote = lastWeeknote + 1;

	// Prepare environment variables
	const env = Object.assign({}, process.env);

	// Create the new note file
	await exec(`hugo new weeknotes/${nextWeeknote}`, { env });

	// Log success
	console.log('');
	console.log(`Created weeknote ${nextWeeknote} and saved it:`);
	console.log(path.join(weeknotesDirectory, `${nextWeeknote}`, 'index.md'));
};
