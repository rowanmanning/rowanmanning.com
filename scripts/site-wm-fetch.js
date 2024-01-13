#!/usr/bin/env node
'use strict';

const {program} = require('commander');
const fetchWebmentions = require('./lib/action/fetch-webmentions');

// Program options
program
	.name('site wm:fetch')
	.requiredOption(
		'-a, --api-key <apiKey>',
		'the Webmention.io API key'
	)
	.description('fetch raw webmentions')
	.action(async ({apiKey}) => {
		try {
			await fetchWebmentions(apiKey);
		} catch (error) {
			console.error(error.stack);
			process.exitCode = 1;
		}
	})
	.parseAsync(process.argv);
