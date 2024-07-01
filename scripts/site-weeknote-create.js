#!/usr/bin/env node
'use strict';

const { program } = require('commander');
const createWeeknote = require('./lib/action/create-weeknote');

// Program options
program
	.name('site weeknote:create')
	.description('create a new weeknote')
	.action(async () => {
		try {
			await createWeeknote();
		} catch (error) {
			console.error(error.stack);
			process.exitCode = 1;
		}
	})
	.parseAsync(process.argv);
