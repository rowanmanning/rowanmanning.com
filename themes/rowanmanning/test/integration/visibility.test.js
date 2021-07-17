'use strict';

describe('website with draft and private content', () => {
	let document;

	before(async () => {
		await hugoBuild('visibility');
	});

	describe('single page', () => {

		before(async () => {
			document = (await loadBuiltHTML('page001/index.html')).document;
		});

		describe('head', () => {

			it('does not have a robots meta element', () => {
				const subject = document.querySelector('meta[name=robots]')?.getAttribute('content');
				assert.isUndefined(subject);
			});

		});

	});

	describe('single page with draft parameter', () => {

		before(async () => {
			document = (await loadBuiltHTML('page002/index.html')).document;
		});

		describe('head', () => {

			it('has a robots meta element set to "noindex"', () => {
				const subject = document.querySelector('meta[name=robots]')?.getAttribute('content');
				assert.strictEqual(subject, 'noindex');
			});

		});

	});

	describe('single page with private parameter', () => {

		before(async () => {
			document = (await loadBuiltHTML('page003/index.html')).document;
		});

		describe('head', () => {

			it('has a robots meta element set to "noindex"', () => {
				const subject = document.querySelector('meta[name=robots]')?.getAttribute('content');
				assert.strictEqual(subject, 'noindex');
			});

		});

	});

	describe('sitemap', () => {

		before(async () => {
			document = (await loadBuiltHTML('sitemap.xml')).document;
		});

		it('does not include draft and private content', () => {
			const subject = document.querySelectorAll('url');
			assert.lengthOf(subject, 4);
			const urls = [...subject].map(url => url.querySelector('loc')?.textContent);
			assert.deepEqual(urls, [
				'https://visibility.mock.local/categories/',
				'https://visibility.mock.local/',
				'https://visibility.mock.local/page001/',
				'https://visibility.mock.local/tags/'
			]);
		});

	});

});
