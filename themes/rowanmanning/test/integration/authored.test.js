'use strict';

describe('authored website', () => {
	let document;

	before(async () => {
		await hugoBuild({
			name: 'authored'
		});
	});

	describe('home page', () => {

		before(async () => {
			document = (await loadBuiltHTML('index.html')).document;
		});

		describe('head', () => {

			it('does not have an author link element', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

		});

	});

	describe('section page', () => {

		before(async () => {
			document = (await loadBuiltHTML('section001s/index.html')).document;
		});

		describe('head', () => {

			it('has an author link element with the site author URL', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.strictEqual(subject, 'https://site.author.local/');
			});

		});

		describe('body', () => {

			it('contains structured author data for each piece of content in the section', () => {
				const subject = findTestElements(document, 'content-summary').map(summary => {
					return parseStructuredData(summary).author;
				});

				assert.deepEqual(subject, [
					{
						'@type': 'Person',
						image: 'https://site.author.local/photo.png',
						name: 'Mock Site Author',
						url: 'https://site.author.local/'
					},
					{
						'@type': 'Person',
						image: 'https://page.author.local/photo.png',
						name: 'Mock Page Author',
						url: 'https://page.author.local/'
					},
					{
						'@type': 'Person',
						image: null,
						name: 'Mock Incomplete Author',
						url: null
					}
				]);
			});

		});

	});

	describe('single page', () => {

		before(async () => {
			document = (await loadBuiltHTML('page001/index.html')).document;
		});

		describe('head', () => {

			it('has an author link element with the site author URL', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.strictEqual(subject, 'https://site.author.local/');
			});

			it('has twitter meta elements containing the site author Twitter handle', () => {
				const twitter = parseTwitterMeta(document);
				assert.strictEqual(twitter.site, '@mocksiteauthor_twitter');
			});

		});

		describe('body', () => {

			it('does not contain a link to the author', () => {
				const subject = findTestElements(document.body, 'content-author-url')[0]?.getAttribute('href');
				assert.isUndefined(subject);
			});

		});

		describe('when the page has an author', () => {

			before(async () => {
				document = (await loadBuiltHTML('page002/index.html')).document;
			});

			describe('head', () => {

				it('has an author link element with the page author URL', () => {
					const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
					assert.strictEqual(subject, 'https://page.author.local/');
				});

				it('has twitter meta elements containing the page author Twitter handle', () => {
					const twitter = parseTwitterMeta(document);
					assert.strictEqual(twitter.site, '@mockpageauthor_twitter');
				});

			});

			describe('body', () => {

				it('does not contain a link to the author', () => {
					const subject = findTestElements(document.body, 'content-author-url')[0]?.getAttribute('href');
					assert.isUndefined(subject);
				});

			});

		});

		describe('when the page has an author without Twitter or URL properties', () => {

			before(async () => {
				document = (await loadBuiltHTML('page003/index.html')).document;
			});

			describe('head', () => {

				it('does not have an author link element', () => {
					const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
					assert.isUndefined(subject);
				});

				it('does not have twitter meta elements for the site', () => {
					const twitter = parseTwitterMeta(document);
					assert.isUndefined(twitter.site);
				});

			});

			describe('body', () => {

				it('does not contain a link to the author', () => {
					const subject = findTestElements(document.body, 'content-author-url')[0]?.getAttribute('href');
					assert.isUndefined(subject);
				});

			});

		});

	});

	describe('single page in section', () => {

		before(async () => {
			document = (await loadBuiltHTML('section001s/item001/index.html')).document;
		});

		describe('head', () => {

			it('has an author link element with the site author URL', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.strictEqual(subject, 'https://site.author.local/');
			});

			it('has opengraph meta elements containing the site author URL', () => {
				const og = parseOpenGraphMeta(document);
				assert.strictEqual(og['article:author'], 'https://site.author.local/');
			});

			it('has twitter meta elements containing the site author Twitter handle', () => {
				const twitter = parseTwitterMeta(document);
				assert.strictEqual(twitter.site, '@mocksiteauthor_twitter');
			});

		});

		describe('body', () => {

			it('contains a link to the site author URL', () => {
				const subject = findTestElements(document.body, 'content-author-url')[0]?.getAttribute('href');
				assert.strictEqual(subject, 'https://site.author.local/');
			});

		});

		describe('when the page has an author', () => {

			before(async () => {
				document = (await loadBuiltHTML('section001s/item002/index.html')).document;
			});

			describe('head', () => {

				it('has an author link element with the page author URL', () => {
					const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
					assert.strictEqual(subject, 'https://page.author.local/');
				});

				it('has opengraph meta elements containing the page author URL', () => {
					const og = parseOpenGraphMeta(document);
					assert.strictEqual(og['article:author'], 'https://page.author.local/');
				});

				it('has twitter meta elements containing the page author Twitter handle', () => {
					const twitter = parseTwitterMeta(document);
					assert.strictEqual(twitter.site, '@mockpageauthor_twitter');
				});

			});

			describe('body', () => {

				it('contains a link to the page author URL', () => {
					const subject = findTestElements(document.body, 'content-author-url')[0]?.getAttribute('href');
					assert.strictEqual(subject, 'https://page.author.local/');
				});

			});

		});

		describe('when the page has an author without Twitter or URL properties', () => {

			before(async () => {
				document = (await loadBuiltHTML('section001s/item003/index.html')).document;
			});

			describe('head', () => {

				it('does not have an author link element', () => {
					const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
					assert.isUndefined(subject);
				});

				it('does not have opengraph meta elements for the author', () => {
					const og = parseOpenGraphMeta(document);
					assert.isUndefined(og['article:author']);
				});

				it('does not have twitter meta elements for the site', () => {
					const twitter = parseTwitterMeta(document);
					assert.isUndefined(twitter.site);
				});

			});

			describe('body', () => {

				it('does not contain a link to the author', () => {
					const subject = findTestElements(document.body, 'content-author-url')[0]?.getAttribute('href');
					assert.isUndefined(subject);
				});

			});

		});

	});

	describe('taxonomy page', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/index.html')).document;
		});

		describe('head', () => {

			it('has an author link element with the site author URL', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.strictEqual(subject, 'https://site.author.local/');
			});

		});

	});

	describe('term page', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/tag001/index.html')).document;
		});

		describe('head', () => {

			it('has an author link element with the site author URL', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.strictEqual(subject, 'https://site.author.local/');
			});

		});

	});

	describe('404 page', () => {

		before(async () => {
			document = (await loadBuiltHTML('404.html')).document;
		});

		describe('head', () => {

			it('does not have an author link element', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

		});

	});

	describe('home page RSS', () => {

		before(async () => {
			document = (await loadBuiltHTML('index.xml', {xml: true})).document;
		});

		it('has author information in the channel', () => {
			assert.strictEqual(document.querySelector('channel > managingEditor')?.textContent, 'mock@site.author.local (Mock Site Author)');
			assert.strictEqual(document.querySelector('channel > webMaster')?.textContent, 'mock@site.author.local (Mock Site Author)');
		});

		it('has author information in each item', () => {
			const items = document.querySelectorAll('channel > item');
			assert.lengthOf(items, 6);
			const itemData = [...items].map(item => {
				return {
					title: item.querySelector('title')?.textContent,
					author: item.querySelector('author')?.textContent
				};
			});
			assert.deepEqual(itemData, [
				{
					title: 'Mock Title Single Page In Section',
					author: 'mock@site.author.local (Mock Site Author)'
				},
				{
					title: 'Mock Title Single Page In Section',
					author: 'mock@page.author.local (Mock Page Author)'
				},
				{
					title: 'Mock Title Single Page In Section',
					author: undefined
				},
				{
					title: 'Mock Title Single Page',
					author: 'mock@site.author.local (Mock Site Author)'
				},
				{
					title: 'Mock Title Single Page',
					author: 'mock@page.author.local (Mock Page Author)'
				},
				{
					title: 'Mock Title Single Page',
					author: undefined
				}
			]);
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

			it('contains a link to the site author GitHub', () => {
				const subject = findTestElements(header, 'header-github')[0]?.getAttribute('href');
				assert.strictEqual(subject, 'https://github.com/mocksiteauthor_github');
			});

			it('contains a rel="me" link to the site author GitHub', () => {
				const subject = findTestElements(header, 'header-github')[0]?.getAttribute('rel');
				assert.strictEqual(subject, 'me');
			});

			it('contains a link to the site author Twitter', () => {
				const subject = findTestElements(header, 'header-twitter')[0]?.getAttribute('href');
				assert.strictEqual(subject, 'https://twitter.com/mocksiteauthor_twitter');
			});

			it('contains a rel="me" link to the site author Twitter', () => {
				const subject = findTestElements(header, 'header-twitter')[0]?.getAttribute('rel');
				assert.strictEqual(subject, 'me');
			});

			describe('when the page has an author', () => {

				before(async () => {
					document = (await loadBuiltHTML('section001s/item002/index.html')).document;
					header = findTestElements(document.body, 'header')[0];
				});

				it('contains a link to the site author GitHub', () => {
					const subject = findTestElements(header, 'header-github')[0]?.getAttribute('href');
					assert.strictEqual(subject, 'https://github.com/mocksiteauthor_github');
				});

				it('does not contain a rel="me" link to the site author GitHub', () => {
					const subject = findTestElements(header, 'header-github')[0]?.getAttribute('rel');
					assert.isNull(subject);
				});

				it('contains a link to the site author Twitter', () => {
					const subject = findTestElements(header, 'header-twitter')[0]?.getAttribute('href');
					assert.strictEqual(subject, 'https://twitter.com/mocksiteauthor_twitter');
				});

				it('does not contain a rel="me" link to the site author Twitter', () => {
					const subject = findTestElements(header, 'header-twitter')[0]?.getAttribute('rel');
					assert.isNull(subject);
				});

			});

		});

		describe('footer', () => {
			let footer;

			before(() => {
				footer = findTestElements(document.body, 'footer')[0];
			});

			it('contains a copyright notice which includes the author name', () => {
				const subject = findTestElements(footer, 'footer-copyright')[0]?.textContent.trim();
				assert.strictEqual(subject, `Copyright © ${new Date().getFullYear()}, Mock Site Author`);
			});

		});

	});

});
