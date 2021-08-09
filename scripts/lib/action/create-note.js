#!/usr/bin/env node
'use strict';

const util = require('util');

const exec = util.promisify(require('child_process').exec);
const fetchRef = require('./fetch-ref');
const fs = require('fs/promises');
const mkdir = require('../util/mkdir');
const path = require('path');

const validNoteTypes = ['bookmark', 'like', 'note', 'reply', 'repost'];
const noteTypesRequiringUrl = ['bookmark', 'like', 'reply', 'repost'];

const notesDirectory = path.resolve(__dirname, '../../../content/notes');

module.exports = async function createNote(type, url) {

	// Check for valid type
	if (!validNoteTypes.includes(type)) {
		throw new Error(`note type must be one of ${validNoteTypes.join(', ')}`);
	}

	// Check for types which require a URL
	if (noteTypesRequiringUrl.includes(type) && !url) {
		throw new Error(`URL is required for note type of ${type}`);
	}

	// Fetch a reference
	if (url) {
		const webPage = await fetchRef(url);
		url = webPage.url;
	}

	// Create the notes directory
	await mkdir(notesDirectory);

	// Read existing notes to work out the next number in sequence
	const existingNotes = (await fs.readdir(notesDirectory))
		.filter(note => !note.includes('.'))
		.map(note => Number(note));
	const lastNote = (existingNotes.length ? Math.max(...existingNotes) : 0);
	const nextNote = lastNote + 1;

	// Prepare environment variables
	const env = Object.assign({}, process.env, {NOTE_REF_URL: url});

	// Create the new note file
	await exec(`hugo new notes/${nextNote} --kind _notes_/${type}`, {env});

	// Log success
	console.log('');
	console.log(`Created note ${nextNote} and saved it:`);
	console.log(path.join(notesDirectory, `${nextNote}`, 'index.md'));
};
