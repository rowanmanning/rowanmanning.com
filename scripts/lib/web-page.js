'use strict';

const { JSDOM } = require('jsdom');
const manifest = require('../../package.json');
const { mf2 } = require('microformats-parser');
const extractMicroformatProperty = require('./util/extract-microformat-property');

module.exports = class WebPage {
	constructor(url, body) {
		this.url = url;
		this.html = body;
	}

	get window() {
		if (!this._window) {
			this._window = new JSDOM(this.html).window;
		}
		return this._window;
	}

	get document() {
		if (!this._document) {
			this._document = this.window.document;
		}
		return this._document;
	}

	get microformats() {
		if (!this._microformats) {
			this._microformats = mf2(this.document.documentElement.outerHTML, {
				baseUrl: this.url
			});
		}
		return this._microformats;
	}

	get firstMicroformatRoot() {
		return this.microformats?.items[0] || null;
	}

	get openGraph() {
		if (!this._openGraph) {
			const openGraphSelectors = 'meta[property^="og:"], meta[property^="article:"]';
			const properties = [...this.document.querySelectorAll(openGraphSelectors)].reduce(
				(og, meta) => {
					const key = meta
						?.getAttribute('property')
						?.replace(/^(og|article):/gi, '')
						?.toLowerCase();
					og[key] = meta?.getAttribute('content');
					return og;
				},
				{}
			);
			this._openGraph = properties;
		}
		return this._openGraph;
	}

	get title() {
		if (!this._title) {
			const name = extractMicroformatProperty(this.firstMicroformatRoot, 'name');
			this._title =
				name ||
				this.openGraph.title ||
				this.document.head?.querySelector('title')?.textContent;
		}
		return this._title;
	}

	get description() {
		if (!this._description) {
			const summary = extractMicroformatProperty(this.firstMicroformatRoot, 'summary');
			this._description =
				summary ||
				this.openGraph.description ||
				this.document.head
					?.querySelector('meta[name=description]')
					?.getAttribute('content');
		}
		return this._description;
	}

	get published() {
		if (!this._published) {
			const published =
				extractMicroformatProperty(this.firstMicroformatRoot, 'published') ||
				this.openGraph.published_time;
			this._published = published ? new Date(published) : published;
		}
		return this._published;
	}

	get author() {
		if (!this._author) {
			let author = extractMicroformatProperty(this.firstMicroformatRoot, 'author');
			if (!author && this.openGraph.site_name) {
				author = {
					name: this.openGraph.site_name,
					url: null
				};
			}
			this._author = author || null;
		}
		return this._author;
	}

	toJSON() {
		return {
			url: this.url,
			title: this.title || null,
			description: this.description || null,
			published: this.published || null,
			author: this.author || null
		};
	}

	static async get(url) {
		const response = await fetch(url, {
			headers: {
				'User-Agent': `${manifest.author.name} (${manifest.author.url})`
			}
		});
		const body = await response.text();
		return new this(response.url, body);
	}
};
