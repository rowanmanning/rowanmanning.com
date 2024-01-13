'use strict';

describe('website with feed limit', () => {
	let document;

	before(async () => {
		await hugoBuild({
			name: 'simple',
			config: 'rss-limit'
		});
	});

	describe('home page RSS', () => {

		before(async () => {
			document = (await loadBuiltHTML('index.xml', {xml: true})).document;
		});

		it('limits items based on the configured value', () => {
			const items = document.querySelectorAll('channel > item');
			assert.equal(items.length, 1);
			const itemData = [...items].map(item => {
				return {
					title: item.querySelector('title')?.textContent,
					link: item.querySelector('link')?.textContent
				};
			});
			assert.deepEqual(itemData, [
				{
					title: 'Untitled Section001',
					link: 'https://feeds-limit.mock.local/section001s/item002/'
				}
			]);
		});

	});

	describe('section page RSS', () => {

		before(async () => {
			document = (await loadBuiltHTML('section001s/index.xml', {xml: true})).document;
		});

		it('limits items based on the configured value', () => {
			const items = document.querySelectorAll('channel > item');
			assert.equal(items.length, 1);
			const itemData = [...items].map(item => {
				return {
					title: item.querySelector('title')?.textContent,
					link: item.querySelector('link')?.textContent
				};
			});
			assert.deepEqual(itemData, [
				{
					title: 'Untitled Section001',
					link: 'https://feeds-limit.mock.local/section001s/item002/'
				}
			]);
		});

	});

	describe('taxonomy page RSS', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/index.xml', {xml: true})).document;
		});

		it('limits items based on the configured value', () => {
			const items = document.querySelectorAll('channel > item');
			assert.equal(items.length, 1);
			const itemData = [...items].map(item => {
				return {
					title: item.querySelector('title')?.textContent,
					link: item.querySelector('link')?.textContent
				};
			});
			assert.deepEqual(itemData, [
				{
					title: 'Mock Title Term',
					link: 'https://feeds-limit.mock.local/tags/tag001/'
				}
			]);
		});

	});

	describe('term page RSS', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/tag001/index.xml', {xml: true})).document;
		});

		it('limits items based on the configured value', () => {
			const items = document.querySelectorAll('channel > item');
			assert.equal(items.length, 1);
			const itemData = [...items].map(item => {
				return {
					title: item.querySelector('title')?.textContent,
					link: item.querySelector('link')?.textContent
				};
			});
			assert.deepEqual(itemData, [
				{
					title: 'Mock Title Single Page In Section',
					link: 'https://feeds-limit.mock.local/section001s/item001/'
				}
			]);
		});

	});

});

describe('website with main sections configured', () => {
	let document;

	before(async () => {
		await hugoBuild({
			name: 'simple',
			config: 'rss-main-sections'
		});
	});

	describe('home page RSS', () => {

		before(async () => {
			document = (await loadBuiltHTML('index.xml', {xml: true})).document;
		});

		it('has an item element representing each page in the configured main sections', () => {
			const items = document.querySelectorAll('channel > item');
			assert.equal(items.length, 2);
			const itemData = [...items].map(item => {
				return {
					title: item.querySelector('title')?.textContent,
					link: item.querySelector('link')?.textContent
				};
			});
			assert.deepEqual(itemData, [
				{
					title: 'Untitled Section001',
					link: 'https://feeds-main-sections.mock.local/section001s/item002/'
				},
				{
					title: 'Mock Title Single Page In Section',
					link: 'https://feeds-main-sections.mock.local/section001s/item001/'
				}
			]);
		});

	});

});

describe('website with feed sections configured', () => {
	let document;

	before(async () => {
		await hugoBuild({
			name: 'simple',
			config: 'rss-feed-sections'
		});
	});

	describe('home page RSS', () => {

		before(async () => {
			document = (await loadBuiltHTML('index.xml', {xml: true})).document;
		});

		it('has an item element representing each page in the configured feed sections', () => {
			const items = document.querySelectorAll('channel > item');
			assert.equal(items.length, 2);
			const itemData = [...items].map(item => {
				return {
					title: item.querySelector('title')?.textContent,
					link: item.querySelector('link')?.textContent
				};
			});
			assert.deepEqual(itemData, [
				{
					title: 'Untitled Section001',
					link: 'https://feeds-feed-sections.mock.local/section001s/item002/'
				},
				{
					title: 'Mock Title Single Page In Section',
					link: 'https://feeds-feed-sections.mock.local/section001s/item001/'
				}
			]);
		});

	});

});
