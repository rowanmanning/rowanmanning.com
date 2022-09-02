#!/usr/bin/env node
'use strict';

const manifest = require('../package.json');
const {program} = require('commander');

program
	.version(manifest.version)
	.command('image:clamp', 'clamp images to the site maximum dimensions', {
		executableFile: 'site-image-clamp'
	})
	.command('weeknote:create', 'create a new weeknote', {
		executableFile: 'site-weeknote-create'
	})
	.command('note:create', 'create a new note', {
		executableFile: 'site-note-create'
	})
	.command('ref:fetch', 'fetch a URL and save information about it as JSON', {
		executableFile: 'site-ref-fetch'
	})
	.command('wm:fetch', 'fetch raw webmentions', {
		executableFile: 'site-wm-fetch'
	})
	.command('wm:process', 'process raw webmentions', {
		executableFile: 'site-wm-process'
	})
	.parse(process.argv);
