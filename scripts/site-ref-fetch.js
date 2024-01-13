#!/usr/bin/env node
'use strict';

const fetchRef = require('./lib/action/fetch-ref');
const {program} = require('commander');

// Program options
program
	.name('site ref:fetch')
	.argument('<url>', 'the URL to fetch and store')
	.description('fetch a URL and save information about it as JSON')
	.action(async url => {
		try {
			await fetchRef(url);
		} catch (error) {
			console.error(error.stack);
			process.exitCode = 1;
		}
	})
	.parseAsync(process.argv);
