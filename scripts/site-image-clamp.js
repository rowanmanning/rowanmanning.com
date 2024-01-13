#!/usr/bin/env node
'use strict';

const {program} = require('commander');
const clampImages = require('./lib/action/clamp-images');

// Program options
program
	.name('site image:clamp')
	.description('clamp images to the site maximum dimensions')
	.action(async () => {
		try {
			await clampImages();
		} catch (error) {
			console.error(error.stack);
			process.exitCode = 1;
		}
	})
	.parseAsync(process.argv);
