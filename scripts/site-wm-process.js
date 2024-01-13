#!/usr/bin/env node
'use strict';

const processWebmentions = require('./lib/action/process-webmentions');
const {program} = require('commander');

// Program options
program
	.name('site wm:process')
	.description('process raw webmentions')
	.action(async () => {
		try {
			await processWebmentions();
		} catch (error) {
			console.error(error.stack);
			process.exitCode = 1;
		}
	})
	.parseAsync(process.argv);
