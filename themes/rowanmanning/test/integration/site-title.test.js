'use strict';

describe('website with site title', () => {
	let document;

	before(async () => {
		await hugoBuild('site-title');
	});

	describe('home page', () => {

		before(async () => {
			document = (await loadBuiltHTML('index.html')).document;
		});

		describe('head', () => {

			it('has a title element', () => {
				const subject = document.querySelector('title')?.textContent.trim();
				assert.strictEqual(subject, 'Mock Site Title');
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Site Title');
			});

		});

	});

	describe('section page', () => {

		before(async () => {
			document = (await loadBuiltHTML('section001s/index.html')).document;
		});

		describe('head', () => {

			it('has a title element', () => {
				const subject = document.querySelector('title')?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Section | Mock Site Title');
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Section');
			});

		});

	});

	describe('single page', () => {

		before(async () => {
			document = (await loadBuiltHTML('page001/index.html')).document;
		});

		describe('head', () => {

			it('has a title element', () => {
				const subject = document.querySelector('title')?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Single Page | Mock Site Title');
			});

			it('has opengraph meta elements containing the site name', () => {
				const og = parseOpenGraphMeta(document);
				assert.strictEqual(og.site_name, 'Mock Site Title');
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Single Page');
			});

		});

	});

	describe('single page in section', () => {

		before(async () => {
			document = (await loadBuiltHTML('section001s/item001/index.html')).document;
		});

		describe('head', () => {

			it('has a title element', () => {
				const subject = document.querySelector('title')?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Single Page In Section | Mock Site Title');
			});

			it('has opengraph meta elements containing the site name', () => {
				const og = parseOpenGraphMeta(document);
				assert.strictEqual(og.site_name, 'Mock Site Title');
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Single Page In Section');
			});

		});

	});

	describe('taxonomy page', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/index.html')).document;
		});

		describe('head', () => {

			it('has a title element', () => {
				const subject = document.querySelector('title')?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Taxonomy | Mock Site Title');
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Taxonomy');
			});

		});

	});

	describe('term page', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/tag001/index.html')).document;
		});

		describe('head', () => {

			it('has a title element', () => {
				const subject = document.querySelector('title')?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Term | Mock Site Title');
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Term');
			});

		});

	});

	describe('404 page', () => {

		before(async () => {
			document = (await loadBuiltHTML('404.html')).document;
		});

		describe('head', () => {

			it('has a title element', () => {
				const subject = document.querySelector('title')?.textContent.trim();
				assert.strictEqual(subject, '404 | Mock Site Title');
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Error 404: Page Not Found');
			});

		});

	});

	describe('page furniture', () => {

		before(async () => {
			document = (await loadBuiltHTML('index.html')).document;
		});

		describe('header', () => {
			let header;

			before(() => {
				header = findTestElements(document.body, 'header')[0];
			});

			it('contains the home page title', () => {
				const subject = findTestElements(header, 'header-site-name')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Site Title');
			});

		});

	});

});
