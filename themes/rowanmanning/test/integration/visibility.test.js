'use strict';

describe('website with draft and private content', () => {
	let document;

	before(async () => {
		await hugoBuild({
			name: 'visibility'
		});
	});

	describe('single page', () => {
		before(async () => {
			document = (await loadBuiltHTML('page001/index.html')).document;
		});

		describe('head', () => {
			it('does not have a robots meta element', () => {
				const subject = document
					.querySelector('meta[name=robots]')
					?.getAttribute('content');
				assert.equal(subject, undefined);
			});
		});
	});

	describe('single page with draft parameter', () => {
		before(async () => {
			document = (await loadBuiltHTML('page002/index.html')).document;
		});

		describe('head', () => {
			it('has a robots meta element set to "noindex"', () => {
				const subject = document
					.querySelector('meta[name=robots]')
					?.getAttribute('content');
				assert.equal(subject, 'noindex');
			});
		});
	});

	describe('single page with private parameter', () => {
		before(async () => {
			document = (await loadBuiltHTML('page003/index.html')).document;
		});

		describe('head', () => {
			it('has a robots meta element set to "noindex"', () => {
				const subject = document
					.querySelector('meta[name=robots]')
					?.getAttribute('content');
				assert.equal(subject, 'noindex');
			});
		});
	});

	describe('sitemap', () => {
		before(async () => {
			document = (await loadBuiltHTML('sitemap.xml', { xml: true })).document;
		});

		it('does not include draft and private content', () => {
			const subject = document.querySelectorAll('url');
			assert.equal(subject.length, 4);
			const urls = [...subject].map((url) => url.querySelector('loc')?.textContent);
			assert.deepEqual(urls, [
				'https://visibility.mock.local/categories/',
				'https://visibility.mock.local/',
				'https://visibility.mock.local/page001/',
				'https://visibility.mock.local/tags/'
			]);
		});
	});

	describe('home page RSS', () => {
		before(async () => {
			document = (await loadBuiltHTML('index.xml', { xml: true })).document;
		});

		it('does not include pages with the private parameter', () => {
			const items = document.querySelectorAll('channel > item');
			assert.equal(items.length, 2);
			const itemData = [...items].map((item) => {
				return {
					title: item.querySelector('title')?.textContent,
					link: item.querySelector('link')?.textContent
				};
			});
			assert.deepEqual(itemData, [
				{
					title: 'Mock Title Single Page',
					link: 'https://visibility.mock.local/page001/'
				},
				{
					title: 'Mock Title Single Page',
					link: 'https://visibility.mock.local/page002/'
				}
			]);
		});
	});
});
