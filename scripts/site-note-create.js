#!/usr/bin/env node
'use strict';

const {program} = require('commander');
const createNote = require('./lib/action/create-note');

// Program options
program
	.name('site note:create')
	.argument('[url]', 'the URL that the note references')
	.option(
		'-t, --type <type>',
		'the type of note to create',
		'note'
	)
	.description('create a new note')
	.action(async (url, {type}) => {
		try {
			await createNote(type, url);
		} catch (error) {
			console.error(error.stack);
			process.exitCode = 1;
		}
	})
	.parseAsync(process.argv);
