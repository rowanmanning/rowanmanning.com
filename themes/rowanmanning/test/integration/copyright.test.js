'use strict';

describe('website with custom copyright', () => {
	let document;

	before(async () => {
		await hugoBuild({
			name: 'simple',
			config: 'site-copyright'
		});
	});

	describe('home page RSS', () => {
		before(async () => {
			document = (await loadBuiltHTML('index.xml', { xml: true })).document;
		});

		it('has a channel with copyright information included', () => {
			assert.equal(
				document.querySelector('channel > copyright')?.textContent,
				'Mock Site Copyright'
			);
		});
	});

	describe('section page RSS', () => {
		before(async () => {
			document = (await loadBuiltHTML('section001s/index.xml', { xml: true })).document;
		});

		it('has a channel with copyright information included', () => {
			assert.equal(
				document.querySelector('channel > copyright')?.textContent,
				'Mock Site Copyright'
			);
		});
	});

	describe('taxonomy page RSS', () => {
		before(async () => {
			document = (await loadBuiltHTML('tags/index.xml', { xml: true })).document;
		});

		it('has a channel with copyright information included', () => {
			assert.equal(
				document.querySelector('channel > copyright')?.textContent,
				'Mock Site Copyright'
			);
		});
	});

	describe('term page RSS', () => {
		before(async () => {
			document = (await loadBuiltHTML('tags/tag001/index.xml', { xml: true })).document;
		});

		it('has a channel with copyright information included', () => {
			assert.equal(
				document.querySelector('channel > copyright')?.textContent,
				'Mock Site Copyright'
			);
		});
	});

	describe('page furniture', () => {
		before(async () => {
			document = (await loadBuiltHTML('index.html')).document;
		});

		describe('footer', () => {
			let footer;

			before(() => {
				footer = findTestElements(document.body, 'footer')[0];
			});

			it('contains a copyright notice', () => {
				const subject = findTestElements(footer, 'footer-copyright')[0]?.textContent.trim();
				assert.equal(subject, 'Mock Site Copyright');
			});
		});
	});
});
