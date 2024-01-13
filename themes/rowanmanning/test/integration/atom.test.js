'use strict';

describe('website with atom feeds instead of RSS', () => {
	let document;

	before(async () => {
		await hugoBuild({
			name: 'simple',
			config: 'atom'
		});
	});

	describe('home page', () => {

		before(async () => {
			document = (await loadBuiltHTML('index.html')).document;
		});

		describe('head', () => {

			it('does not have an alternate link element pointing to the site RSS feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
				assert.equal(subject, null);
			});

			it('has an alternate link element pointing to the site Atom feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/atom+xml"]');
				assert.equal(subject?.getAttribute('href'), '/feed.xml');
				assert.equal(subject?.getAttribute('title'), 'Atom feed for Mock Title Home');
			});

		});

	});

	describe('section page', () => {

		before(async () => {
			document = (await loadBuiltHTML('section001s/index.html')).document;
		});

		describe('head', () => {

			it('does not have an alternate link element pointing to the site RSS feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
				assert.equal(subject, null);
			});

			it('has an alternate link element pointing to the site Atom feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/atom+xml"]');
				assert.equal(subject?.getAttribute('href'), '/section001s/feed.xml');
				assert.equal(subject?.getAttribute('title'), 'Atom feed for Mock Title Section');
			});

		});

		describe('body', () => {

			it('contains a link to the section Atom feed', () => {
				assert.notEqual(document.querySelector('a[href="/section001s/feed.xml"]'), null);
			});

		});

	});

	describe('single page', () => {

		before(async () => {
			document = (await loadBuiltHTML('page001/index.html')).document;
		});

		describe('head', () => {

			it('does not have an alternate link element pointing to the site Atom feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/atom+xml"]');
				assert.equal(subject, null);
			});

		});

	});

	describe('single page in section', () => {

		before(async () => {
			document = (await loadBuiltHTML('section001s/item001/index.html')).document;
		});

		describe('body', () => {

			it('contains a link to the section Atom feed', () => {
				assert.notEqual(document.querySelector('a[href="/section001s/feed.xml"]'), null);
			});

		});

	});

	describe('taxonomy page', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/index.html')).document;
		});

		describe('head', () => {

			it('does not have an alternate link element pointing to the site RSS feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
				assert.equal(subject, null);
			});

			it('has an alternate link element pointing to the site Atom feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/atom+xml"]');
				assert.equal(subject?.getAttribute('href'), '/tags/feed.xml');
				assert.equal(subject?.getAttribute('title'), 'Atom feed for Mock Title Taxonomy');
			});

		});

	});

	describe('term page', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/tag001/index.html')).document;
		});

		describe('head', () => {

			it('does not have an alternate link element pointing to the site RSS feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
				assert.equal(subject, null);
			});

			it('has an alternate link element pointing to the site Atom feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/atom+xml"]');
				assert.equal(subject?.getAttribute('href'), '/tags/tag001/feed.xml');
				assert.equal(subject?.getAttribute('title'), 'Atom feed for Mock Title Term');
			});

		});

	});

	describe('home page Atom', () => {

		before(async () => {
			document = (await loadBuiltHTML('feed.xml', {xml: true})).document;
		});

		it('has a feed element', () => {
			const feed = document.querySelectorAll('feed');
			assert.equal(feed.length, 1);
			assert.equal(feed[0].getAttribute('xmlns'), 'http://www.w3.org/2005/Atom');
			assert.equal(feed[0].getAttribute('xml:lang'), 'en');
		});

		it('has a feed with information', () => {
			const title = document.querySelector('feed > title');
			const altLink = document.querySelector('feed > link[rel=alternate]');
			const selfLink = document.querySelector('feed > link[rel=self]');
			const author = document.querySelector('feed > author');

			assert.equal(title?.textContent, 'Mock Title Home');
			assert.equal(title?.getAttribute('type'), 'html');

			assert.equal(altLink?.getAttribute('href'), 'https://atom-simple.mock.local/');
			assert.equal(altLink?.getAttribute('rel'), 'alternate');
			assert.equal(altLink?.getAttribute('type'), 'text/html');

			assert.equal(selfLink?.getAttribute('href'), 'https://atom-simple.mock.local/feed.xml');
			assert.equal(selfLink?.getAttribute('rel'), 'self');
			assert.equal(selfLink?.getAttribute('type'), 'application/atom+xml');

			assert.equal(author?.querySelector('name')?.textContent, 'Unknown');
			assert.equal(author?.querySelector('uri')?.textContent, undefined);
			assert.equal(author?.querySelector('email')?.textContent, undefined);

			assert.equal(document.querySelector('feed > id')?.textContent, 'https://atom-simple.mock.local/');
			assert.equal(document.querySelector('feed > rights')?.textContent, `Copyright © ${new Date().getFullYear()}`);
			assert.equal(document.querySelector('feed > updated')?.textContent, '2021-01-02T08:00:00+00:00');
		});

		it('has an entry element representing each regular page in the site', () => {
			const entries = document.querySelectorAll('feed > entry');
			assert.equal(entries.length, 6);
			const entryData = [...entries].map(item => {
				return {
					id: item.querySelector('id')?.textContent,
					title: item.querySelector('title')?.textContent,
					titleType: item.querySelector('title')?.getAttribute('type'),
					authorName: item.querySelector('author > name')?.textContent,
					authorEmail: item.querySelector('author > email')?.textContent,
					authorUri: item.querySelector('author > uri')?.textContent,
					link: item.querySelector('link')?.getAttribute('href'),
					linkRel: item.querySelector('link')?.getAttribute('rel'),
					linkType: item.querySelector('link')?.getAttribute('type'),
					published: item.querySelector('published')?.textContent,
					updated: item.querySelector('updated')?.textContent,
					content: item.querySelector('content')?.textContent,
					contentType: item.querySelector('content')?.getAttribute('type'),
					categories: [...item.querySelectorAll('category')].map(category => {
						return {
							scheme: category.getAttribute('scheme'),
							term: category.getAttribute('term'),
							label: category.getAttribute('label')
						};
					})
				};
			});
			assert.deepEqual(entryData, [
				{
					id: 'https://atom-simple.mock.local/section001s/item002/',
					title: 'Untitled Section001',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/section001s/item002/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '2021-01-02T08:00:00+00:00',
					updated: '2021-01-02T08:00:00+00:00',
					content: '<p>Mock Content Single Page In Section</p>\n',
					contentType: 'html',
					categories: []
				},
				{
					id: 'https://atom-simple.mock.local/section001s/item001/',
					title: 'Mock Title Single Page In Section',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/section001s/item001/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '2021-01-02T08:00:00+00:00',
					updated: '2021-01-02T08:00:00+00:00',
					content: '<p>Mock Content Single Page In Section</p>\n',
					contentType: 'html',
					categories: [
						{
							scheme: 'https://atom-simple.mock.local/categories/cat001/',
							term: 'cat001',
							label: 'cat001'
						},
						{
							scheme: 'https://atom-simple.mock.local/tags/tag001/',
							term: 'tag001',
							label: 'tag001'
						},
						{
							scheme: 'https://atom-simple.mock.local/tags/tag002/',
							term: 'tag002',
							label: 'tag002'
						}
					]
				},
				{
					id: 'https://atom-simple.mock.local/section002s/item002/',
					title: 'Untitled Section002',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/section002s/item002/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '2021-01-01T08:00:00+00:00',
					updated: '2021-01-01T08:00:00+00:00',
					content: '<p>Mock Content Single Page In Section</p>\n',
					contentType: 'html',
					categories: []
				},
				{
					id: 'https://atom-simple.mock.local/section002s/item001/',
					title: 'Mock Title Single Page In Section',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/section002s/item001/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '2021-01-01T08:00:00+00:00',
					updated: '2021-01-01T08:00:00+00:00',
					content: '<p>Mock Content Single Page In Section</p>\n',
					contentType: 'html',
					categories: [
						{
							scheme: 'https://atom-simple.mock.local/categories/cat001/',
							term: 'cat001',
							label: 'cat001'
						},
						{
							scheme: 'https://atom-simple.mock.local/tags/tag001/',
							term: 'tag001',
							label: 'tag001'
						},
						{
							scheme: 'https://atom-simple.mock.local/tags/tag002/',
							term: 'tag002',
							label: 'tag002'
						}
					]
				},
				{
					id: 'https://atom-simple.mock.local/page002/',
					title: 'Untitled Page',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/page002/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '0001-01-01T00:00:00+00:00',
					updated: '0001-01-01T00:00:00+00:00',
					content: '<p>Mock Content Single Page</p>\n',
					contentType: 'html',
					categories: []
				},
				{
					id: 'https://atom-simple.mock.local/page001/',
					title: 'Mock Title Single Page',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/page001/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '0001-01-01T00:00:00+00:00',
					updated: '0001-01-01T00:00:00+00:00',
					content: '<p>Mock Content Single Page</p>\n',
					contentType: 'html',
					categories: []
				}
			]);
		});

	});

	describe('section page Atom', () => {

		before(async () => {
			document = (await loadBuiltHTML('section001s/feed.xml', {xml: true})).document;
		});

		it('has a feed element', () => {
			const feed = document.querySelectorAll('feed');
			assert.equal(feed.length, 1);
			assert.equal(feed[0].getAttribute('xmlns'), 'http://www.w3.org/2005/Atom');
			assert.equal(feed[0].getAttribute('xml:lang'), 'en');
		});

		it('has a feed with information', () => {
			const title = document.querySelector('feed > title');
			const altLink = document.querySelector('feed > link[rel=alternate]');
			const selfLink = document.querySelector('feed > link[rel=self]');
			const author = document.querySelector('feed > author');

			assert.equal(title?.textContent, 'Mock Title Section');
			assert.equal(title?.getAttribute('type'), 'html');

			assert.equal(altLink?.getAttribute('href'), 'https://atom-simple.mock.local/section001s/');
			assert.equal(altLink?.getAttribute('rel'), 'alternate');
			assert.equal(altLink?.getAttribute('type'), 'text/html');

			assert.equal(selfLink?.getAttribute('href'), 'https://atom-simple.mock.local/section001s/feed.xml');
			assert.equal(selfLink?.getAttribute('rel'), 'self');
			assert.equal(selfLink?.getAttribute('type'), 'application/atom+xml');

			assert.equal(author?.querySelector('name')?.textContent, 'Unknown');
			assert.equal(author?.querySelector('uri')?.textContent, undefined);
			assert.equal(author?.querySelector('email')?.textContent, undefined);

			assert.equal(document.querySelector('feed > id')?.textContent, 'https://atom-simple.mock.local/section001s/');
			assert.equal(document.querySelector('feed > rights')?.textContent, `Copyright © ${new Date().getFullYear()}`);
			assert.equal(document.querySelector('feed > updated')?.textContent, '2021-01-02T08:00:00+00:00');
		});

		it('has an entry element representing each page in the section', () => {
			const entries = document.querySelectorAll('feed > entry');
			assert.equal(entries.length, 2);
			const entryData = [...entries].map(item => {
				return {
					id: item.querySelector('id')?.textContent,
					title: item.querySelector('title')?.textContent,
					titleType: item.querySelector('title')?.getAttribute('type'),
					authorName: item.querySelector('author > name')?.textContent,
					authorEmail: item.querySelector('author > email')?.textContent,
					authorUri: item.querySelector('author > uri')?.textContent,
					link: item.querySelector('link')?.getAttribute('href'),
					linkRel: item.querySelector('link')?.getAttribute('rel'),
					linkType: item.querySelector('link')?.getAttribute('type'),
					published: item.querySelector('published')?.textContent,
					updated: item.querySelector('updated')?.textContent,
					content: item.querySelector('content')?.textContent,
					contentType: item.querySelector('content')?.getAttribute('type'),
					categories: [...item.querySelectorAll('category')].map(category => {
						return {
							scheme: category.getAttribute('scheme'),
							term: category.getAttribute('term'),
							label: category.getAttribute('label')
						};
					})
				};
			});
			assert.deepEqual(entryData, [
				{
					id: 'https://atom-simple.mock.local/section001s/item002/',
					title: 'Untitled Section001',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/section001s/item002/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '2021-01-02T08:00:00+00:00',
					updated: '2021-01-02T08:00:00+00:00',
					content: '<p>Mock Content Single Page In Section</p>\n',
					contentType: 'html',
					categories: []
				},
				{
					id: 'https://atom-simple.mock.local/section001s/item001/',
					title: 'Mock Title Single Page In Section',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/section001s/item001/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '2021-01-02T08:00:00+00:00',
					updated: '2021-01-02T08:00:00+00:00',
					content: '<p>Mock Content Single Page In Section</p>\n',
					contentType: 'html',
					categories: [
						{
							scheme: 'https://atom-simple.mock.local/categories/cat001/',
							term: 'cat001',
							label: 'cat001'
						},
						{
							scheme: 'https://atom-simple.mock.local/tags/tag001/',
							term: 'tag001',
							label: 'tag001'
						},
						{
							scheme: 'https://atom-simple.mock.local/tags/tag002/',
							term: 'tag002',
							label: 'tag002'
						}
					]
				}
			]);
		});

		describe('when the section has no index page', () => {

			before(async () => {
				document = (await loadBuiltHTML('section002s/feed.xml', {xml: true})).document;
			});

			it('has defaulted feed information', () => {
				assert.equal(document.querySelector('feed > title')?.textContent, 'All Section002s');
			});

		});

	});

	describe('taxonomy page Atom', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/feed.xml', {xml: true})).document;
		});

		it('has a feed element', () => {
			const feed = document.querySelectorAll('feed');
			assert.equal(feed.length, 1);
			assert.equal(feed[0].getAttribute('xmlns'), 'http://www.w3.org/2005/Atom');
			assert.equal(feed[0].getAttribute('xml:lang'), 'en');
		});

		it('has a feed with information', () => {
			const title = document.querySelector('feed > title');
			const altLink = document.querySelector('feed > link[rel=alternate]');
			const selfLink = document.querySelector('feed > link[rel=self]');
			const author = document.querySelector('feed > author');

			assert.equal(title?.textContent, 'Mock Title Taxonomy');
			assert.equal(title?.getAttribute('type'), 'html');

			assert.equal(altLink?.getAttribute('href'), 'https://atom-simple.mock.local/tags/');
			assert.equal(altLink?.getAttribute('rel'), 'alternate');
			assert.equal(altLink?.getAttribute('type'), 'text/html');

			assert.equal(selfLink?.getAttribute('href'), 'https://atom-simple.mock.local/tags/feed.xml');
			assert.equal(selfLink?.getAttribute('rel'), 'self');
			assert.equal(selfLink?.getAttribute('type'), 'application/atom+xml');

			assert.equal(author?.querySelector('name')?.textContent, 'Unknown');
			assert.equal(author?.querySelector('uri')?.textContent, undefined);
			assert.equal(author?.querySelector('email')?.textContent, undefined);

			assert.equal(document.querySelector('feed > id')?.textContent, 'https://atom-simple.mock.local/tags/');
			assert.equal(document.querySelector('feed > rights')?.textContent, `Copyright © ${new Date().getFullYear()}`);
			assert.equal(document.querySelector('feed > updated')?.textContent, '2021-01-02T08:00:00+00:00');
		});

		it('has an entry element representing each term in the taxonomy', () => {
			const entries = document.querySelectorAll('feed > entry');
			assert.equal(entries.length, 2);
			const entryData = [...entries].map(item => {
				return {
					id: item.querySelector('id')?.textContent,
					title: item.querySelector('title')?.textContent,
					titleType: item.querySelector('title')?.getAttribute('type'),
					authorName: item.querySelector('author > name')?.textContent,
					authorEmail: item.querySelector('author > email')?.textContent,
					authorUri: item.querySelector('author > uri')?.textContent,
					link: item.querySelector('link')?.getAttribute('href'),
					linkRel: item.querySelector('link')?.getAttribute('rel'),
					linkType: item.querySelector('link')?.getAttribute('type'),
					published: item.querySelector('published')?.textContent,
					updated: item.querySelector('updated')?.textContent,
					content: item.querySelector('content')?.textContent,
					contentType: item.querySelector('content')?.getAttribute('type'),
					categories: [...item.querySelectorAll('category')].map(category => {
						return {
							scheme: category.getAttribute('scheme'),
							term: category.getAttribute('term'),
							label: category.getAttribute('label')
						};
					})
				};
			});
			assert.deepEqual(entryData, [
				{
					id: 'https://atom-simple.mock.local/tags/tag001/',
					title: 'Mock Title Term',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/tags/tag001/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '2021-01-02T08:00:00+00:00',
					updated: '2021-01-02T08:00:00+00:00',
					content: '<p>Mock Content Term</p>\n',
					contentType: 'html',
					categories: []
				},
				{
					id: 'https://atom-simple.mock.local/tags/tag002/',
					title: '“tag002” Tag',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/tags/tag002/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '2021-01-02T08:00:00+00:00',
					updated: '2021-01-02T08:00:00+00:00',
					content: '<p>Content in “tag002” Tag</p>',
					contentType: 'html',
					categories: []
				}
			]);
		});

		describe('when the taxonomy has no index page', () => {

			before(async () => {
				document = (await loadBuiltHTML('categories/feed.xml', {xml: true})).document;
			});

			it('has defaulted feed information', () => {
				assert.equal(document.querySelector('feed > title')?.textContent, 'All Categories');
			});

		});

	});

	describe('term page Atom', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/tag001/feed.xml', {xml: true})).document;
		});

		it('has a feed element', () => {
			const feed = document.querySelectorAll('feed');
			assert.equal(feed.length, 1);
			assert.equal(feed[0].getAttribute('xmlns'), 'http://www.w3.org/2005/Atom');
			assert.equal(feed[0].getAttribute('xml:lang'), 'en');
		});

		it('has a feed with information', () => {
			const title = document.querySelector('feed > title');
			const altLink = document.querySelector('feed > link[rel=alternate]');
			const selfLink = document.querySelector('feed > link[rel=self]');
			const author = document.querySelector('feed > author');

			assert.equal(title?.textContent, 'Mock Title Term');
			assert.equal(title?.getAttribute('type'), 'html');

			assert.equal(altLink?.getAttribute('href'), 'https://atom-simple.mock.local/tags/tag001/');
			assert.equal(altLink?.getAttribute('rel'), 'alternate');
			assert.equal(altLink?.getAttribute('type'), 'text/html');

			assert.equal(selfLink?.getAttribute('href'), 'https://atom-simple.mock.local/tags/tag001/feed.xml');
			assert.equal(selfLink?.getAttribute('rel'), 'self');
			assert.equal(selfLink?.getAttribute('type'), 'application/atom+xml');

			assert.equal(author?.querySelector('name')?.textContent, 'Unknown');
			assert.equal(author?.querySelector('uri')?.textContent, undefined);

			assert.equal(author?.querySelector('email')?.textContent, undefined);

			assert.equal(document.querySelector('feed > id')?.textContent, 'https://atom-simple.mock.local/tags/tag001/');
			assert.equal(document.querySelector('feed > rights')?.textContent, `Copyright © ${new Date().getFullYear()}`);
			assert.equal(document.querySelector('feed > updated')?.textContent, '2021-01-02T08:00:00+00:00');
		});

		it('has an entry element representing each page with the term', () => {
			const entries = document.querySelectorAll('feed > entry');
			assert.equal(entries.length, 2);
			const entryData = [...entries].map(item => {
				return {
					id: item.querySelector('id')?.textContent,
					title: item.querySelector('title')?.textContent,
					titleType: item.querySelector('title')?.getAttribute('type'),
					authorName: item.querySelector('author > name')?.textContent,
					authorEmail: item.querySelector('author > email')?.textContent,
					authorUri: item.querySelector('author > uri')?.textContent,
					link: item.querySelector('link')?.getAttribute('href'),
					linkRel: item.querySelector('link')?.getAttribute('rel'),
					linkType: item.querySelector('link')?.getAttribute('type'),
					published: item.querySelector('published')?.textContent,
					updated: item.querySelector('updated')?.textContent,
					content: item.querySelector('content')?.textContent,
					contentType: item.querySelector('content')?.getAttribute('type'),
					categories: [...item.querySelectorAll('category')].map(category => {
						return {
							scheme: category.getAttribute('scheme'),
							term: category.getAttribute('term'),
							label: category.getAttribute('label')
						};
					})
				};
			});
			assert.deepEqual(entryData, [
				{
					id: 'https://atom-simple.mock.local/section001s/item001/',
					title: 'Mock Title Single Page In Section',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/section001s/item001/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '2021-01-02T08:00:00+00:00',
					updated: '2021-01-02T08:00:00+00:00',
					content: '<p>Mock Content Single Page In Section</p>\n',
					contentType: 'html',
					categories: [
						{
							scheme: 'https://atom-simple.mock.local/categories/cat001/',
							term: 'cat001',
							label: 'cat001'
						},
						{
							scheme: 'https://atom-simple.mock.local/tags/tag001/',
							term: 'tag001',
							label: 'tag001'
						},
						{
							scheme: 'https://atom-simple.mock.local/tags/tag002/',
							term: 'tag002',
							label: 'tag002'
						}
					]
				},
				{
					id: 'https://atom-simple.mock.local/section002s/item001/',
					title: 'Mock Title Single Page In Section',
					titleType: 'html',
					authorName: 'Unknown',
					authorEmail: undefined,
					authorUri: undefined,
					link: 'https://atom-simple.mock.local/section002s/item001/',
					linkRel: 'alternate',
					linkType: 'text/html',
					published: '2021-01-01T08:00:00+00:00',
					updated: '2021-01-01T08:00:00+00:00',
					content: '<p>Mock Content Single Page In Section</p>\n',
					contentType: 'html',
					categories: [
						{
							scheme: 'https://atom-simple.mock.local/categories/cat001/',
							term: 'cat001',
							label: 'cat001'
						},
						{
							scheme: 'https://atom-simple.mock.local/tags/tag001/',
							term: 'tag001',
							label: 'tag001'
						},
						{
							scheme: 'https://atom-simple.mock.local/tags/tag002/',
							term: 'tag002',
							label: 'tag002'
						}
					]
				}
			]);
		});

		describe('when the term has no index page', () => {

			before(async () => {
				document = (await loadBuiltHTML('tags/tag002/feed.xml', {xml: true})).document;
			});

			it('has defaulted feed information', () => {
				assert.equal(document.querySelector('feed > title')?.textContent, '“tag002” Tag');
			});

		});

	});

});
