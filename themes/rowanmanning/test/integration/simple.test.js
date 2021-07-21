'use strict';

describe('simple website', () => {
	let document;

	before(async () => {
		await hugoBuild({
			name: 'simple'
		});
	});

	describe('home page', () => {

		before(async () => {
			document = (await loadBuiltHTML('index.html')).document;
		});

		describe('head', () => {

			it('has a title element', () => {
				const subject = document.querySelector('title')?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Home');
			});

			it('has an html[lang] attribute', () => {
				const subject = document.querySelector('html')?.getAttribute('lang');
				assert.strictEqual(subject, 'en');
			});

			it('has a description meta element', () => {
				const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
				assert.strictEqual(subject, 'Mock Description Home');
			});

			it('has a canonical URL link element', () => {
				const subject = document.querySelector('link[rel=canonical]')?.getAttribute('href');
				assert.strictEqual(subject, 'https://simple.mock.local/');
			});

			it('does not have an author link element', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

			it('has a sitemap link element', () => {
				const subject = document.querySelector('link[rel=sitemap]');
				assert.strictEqual(subject?.getAttribute('href'), '/sitemap.xml');
				assert.strictEqual(subject?.getAttribute('title'), 'Sitemap');
			});

			it('does not have a robots meta element', () => {
				const subject = document.querySelector('meta[name=robots]')?.getAttribute('content');
				assert.isUndefined(subject);
			});

			it('does not have a refresh meta element', () => {
				const subject = document.querySelector('meta[http-equiv=refresh]')?.getAttribute('content');
				assert.isUndefined(subject);
			});

			it('has an alternate link element pointing to the site RSS feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
				assert.strictEqual(subject?.getAttribute('href'), '/index.xml');
				assert.strictEqual(subject?.getAttribute('title'), 'RSS feed for Mock Title Home');
			});

			it('does not have an alternate link element pointing to the site Atom feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/atom+xml"]');
				assert.isNull(subject);
			});

			it('has icon metadata', () => {
				assert.ok(document.querySelector('link[rel="shortcut icon"]')?.getAttribute('href'), 'favicon');
				assert.ok(document.querySelector('link[rel=icon][type="image/png"]')?.getAttribute('href'), 'icon');
				assert.ok(document.querySelector('link[rel=icon][sizes="192x192"]')?.getAttribute('href'), 'icon 192');
				assert.ok(document.querySelector('link[rel=apple-touch-icon]:not([sizes])')?.getAttribute('href'), 'apple icon');
				assert.ok(document.querySelector('link[rel=apple-touch-icon][sizes="76x76"]')?.getAttribute('href'), 'apple icon 76');
				assert.ok(document.querySelector('link[rel=apple-touch-icon][sizes="120x120"]')?.getAttribute('href'), 'apple icon 120');
				assert.ok(document.querySelector('link[rel=apple-touch-icon][sizes="152x152"]')?.getAttribute('href'), 'apple icon 152');
				assert.ok(document.querySelector('meta[name=msapplication-square70x70logo]')?.getAttribute('content'), 'ms icon 70');
				assert.ok(document.querySelector('meta[name=msapplication-square150x150logo]')?.getAttribute('content'), 'ms icon 150');
			});

			it('does not have opengraph meta elements', () => {
				const subject = document.querySelectorAll('meta[property^="og:"]');
				assert.lengthOf(subject, 0);
			});

			it('does not have twitter meta elements', () => {
				const subject = document.querySelectorAll('meta[property^="twitter:"]');
				assert.lengthOf(subject, 0);
			});

			it('does not have a webmention link element', () => {
				const subject = document.querySelector('link[rel=webmention]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

			it('does not have a pingback link element', () => {
				const subject = document.querySelector('link[rel=pingback]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Home');
			});

			it('contains the page content', () => {
				const subject = findTestElements(document.body, 'content-body')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Content Home');
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
				assert.strictEqual(subject, 'Mock Title Section');
			});

			it('has a description meta element', () => {
				const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
				assert.strictEqual(subject, 'Mock Description Section');
			});

			it('has a canonical URL link element', () => {
				const subject = document.querySelector('link[rel=canonical]')?.getAttribute('href');
				assert.strictEqual(subject, 'https://simple.mock.local/section001s/');
			});

			it('does not have an author link element', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

			it('has an alternate link element pointing to the list RSS feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
				assert.strictEqual(subject?.getAttribute('href'), '/section001s/index.xml');
				assert.strictEqual(subject?.getAttribute('title'), 'RSS feed for Mock Title Section');
			});

			it('does not have opengraph meta elements', () => {
				const subject = document.querySelectorAll('meta[property^="og:"]');
				assert.lengthOf(subject, 0);
			});

			it('does not have twitter meta elements', () => {
				const subject = document.querySelectorAll('meta[property^="twitter:"]');
				assert.lengthOf(subject, 0);
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Section');
			});

			it('contains the page content', () => {
				const subject = findTestElements(document.body, 'content-body')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Content Section');
			});

			it('contains a representation of each piece of content in the section', () => {
				const subject = findTestElements(document, 'content-summary').map(summary => {
					return {
						title: findTestElements(summary, 'content-summary-title')[0]?.textContent.trim(),
						url: findTestElements(summary, 'content-summary-link')[0]?.getAttribute('href')
					};
				});
				assert.lengthOf(subject, 2);

				assert.strictEqual(subject[0].title, 'Mock Title Single Page In Section');
				assert.isNotNull(subject[0].url, '/section001s/item001/');

				assert.strictEqual(subject[1].title, 'Untitled Section001');
				assert.isNotNull(subject[1].url, '/section001s/item002/');
			});

			it('contains structured data for each piece of content in the section', () => {
				const subject = findTestElements(document, 'content-summary').map(summary => {
					return parseStructuredData(summary);
				});

				assert.deepEqual(subject, [
					{
						'@context': 'https://schema.org/',
						'@type': 'BlogPosting',
						author: {
							'@type': 'Person',
							image: null,
							name: 'Unknown',
							url: null
						},
						dateModified: '2021-01-02T08:00:00Z',
						datePublished: '2021-01-02T08:00:00Z',
						description: 'Mock Description Single Page In Section',
						headline: 'Mock Title Single Page In Section',
						image: '',
						keywords: ['tag001', 'tag002'],
						mainEntityOfPage: {
							'@id': 'https://simple.mock.local/section001s/item001/',
							'@type': 'WebPage'
						},
						thumbnailUrl: '',
						url: 'https://simple.mock.local/section001s/item001/'
					},
					{
						'@context': 'https://schema.org/',
						'@type': 'BlogPosting',
						author: {
							'@type': 'Person',
							image: null,
							name: 'Unknown',
							url: null
						},
						dateModified: '2021-01-02T08:00:00Z',
						datePublished: '2021-01-02T08:00:00Z',
						description: 'Mock Content Single Page In Section',
						headline: 'Untitled Section001',
						image: '',
						keywords: null,
						mainEntityOfPage: {
							'@id': 'https://simple.mock.local/section001s/item002/',
							'@type': 'WebPage'
						},
						thumbnailUrl: '',
						url: 'https://simple.mock.local/section001s/item002/'
					}
				]);
			});

			it('contains a link to the section RSS feed', () => {
				assert.isNotNull(document.querySelector('a[href="/section001s/index.xml"]'));
			});

		});

		describe('when the section has no index page', () => {

			before(async () => {
				document = (await loadBuiltHTML('section002s/index.html')).document;
			});

			describe('head', () => {

				it('has a defaulted title element', () => {
					const subject = document.querySelector('title')?.textContent.trim();
					assert.strictEqual(subject, 'All Section002s');
				});

				it('does not have a description meta element', () => {
					const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
					assert.isUndefined(subject);
				});

				it('has an alternate link element pointing to the list RSS feed', () => {
					const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
					assert.strictEqual(subject?.getAttribute('href'), '/section002s/index.xml');
					assert.strictEqual(subject?.getAttribute('title'), 'RSS feed for All Section002s');
				});

			});

			describe('body', () => {

				it('contains a level 1 heading element with the page title', () => {
					const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
					assert.strictEqual(subject, 'All Section002s');
				});

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
				assert.strictEqual(subject, 'Mock Title Single Page');
			});

			it('has a description meta element', () => {
				const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
				assert.strictEqual(subject, 'Mock Description Single Page');
			});

			it('has a canonical URL link element', () => {
				const subject = document.querySelector('link[rel=canonical]')?.getAttribute('href');
				assert.strictEqual(subject, 'https://simple.mock.local/page001/');
			});

			it('does not have an author link element', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

			it('does not have an alternate link element pointing to the site RSS feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
				assert.isNull(subject);
			});

			it('has opengraph meta elements', () => {
				const og = parseOpenGraphMeta(document);
				assert.deepEqual(og, {
					type: 'website',
					site_name: 'Mock Title Home',
					title: 'Mock Title Single Page',
					url: 'https://simple.mock.local/page001/',
					image: 'https://simple.mock.local/logo.png',
					'image:alt': 'Mock Title Single Page',
					description: 'Mock Description Single Page'
				});
			});

			it('has twitter meta elements', () => {
				const twitter = parseTwitterMeta(document);
				assert.deepEqual(twitter, {
					card: 'summary',
					url: 'https://simple.mock.local/page001/',
					title: 'Mock Title Single Page',
					image: 'https://simple.mock.local/logo-twitter.png',
					'image:alt': 'Mock Title Single Page',
					description: 'Mock Description Single Page'
				});
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Single Page');
			});

			it('contains the page content', () => {
				const subject = findTestElements(document.body, 'content-body')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Content Single Page');
			});

		});

		describe('when the page has no title or description', () => {

			before(async () => {
				document = (await loadBuiltHTML('page002/index.html')).document;
			});

			describe('head', () => {

				it('has a defaulted title element', () => {
					const subject = document.querySelector('title')?.textContent.trim();
					assert.strictEqual(subject, 'Untitled Page');
				});

				it('has a description meta element defaulted to the page summary', () => {
					const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
					assert.strictEqual(subject, 'Mock Content Single Page');
				});

			});

			describe('body', () => {

				it('contains a level 1 heading element with the page title', () => {
					const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
					assert.strictEqual(subject, 'Untitled Page');
				});

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
				assert.strictEqual(subject, 'Mock Title Single Page In Section');
			});

			it('has a description meta element', () => {
				const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
				assert.strictEqual(subject, 'Mock Description Single Page In Section');
			});

			it('has a canonical URL link element', () => {
				const subject = document.querySelector('link[rel=canonical]')?.getAttribute('href');
				assert.strictEqual(subject, 'https://simple.mock.local/section001s/item001/');
			});

			it('does not have an author link element', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

			it('has opengraph meta elements', () => {
				const og = parseOpenGraphMeta(document);
				assert.deepEqual(og, {
					'article:published_time': '2021-01-02 08:00:00 +0000 UTC',
					'article:tag': [
						'tag001',
						'tag002'
					],
					type: 'article',
					site_name: 'Mock Title Home',
					title: 'Mock Title Single Page In Section',
					url: 'https://simple.mock.local/section001s/item001/',
					image: 'https://simple.mock.local/logo.png',
					'image:alt': 'Mock Title Single Page In Section',
					description: 'Mock Description Single Page In Section'
				});
			});

			it('has twitter meta elements', () => {
				const twitter = parseTwitterMeta(document);
				assert.deepEqual(twitter, {
					card: 'summary',
					url: 'https://simple.mock.local/section001s/item001/',
					title: 'Mock Title Single Page In Section',
					image: 'https://simple.mock.local/logo-twitter.png',
					'image:alt': 'Mock Title Single Page In Section',
					description: 'Mock Description Single Page In Section'
				});
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Single Page In Section');
			});

			it('contains the page content', () => {
				const subject = findTestElements(document.body, 'content-body')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Content Single Page In Section');
			});

			it('contains structured data for the page', () => {
				const data = parseStructuredData(findTestElements(document, 'content-full')[0]);
				assert.deepEqual(data, {
					'@context': 'https://schema.org/',
					'@type': 'BlogPosting',
					author: {
						'@type': 'Person',
						image: null,
						name: 'Unknown',
						url: null
					},
					dateModified: '2021-01-02T08:00:00Z',
					datePublished: '2021-01-02T08:00:00Z',
					description: 'Mock Description Single Page In Section',
					headline: 'Mock Title Single Page In Section',
					image: '',
					keywords: ['tag001', 'tag002'],
					mainEntityOfPage: {
						'@id': 'https://simple.mock.local/section001s/item001/',
						'@type': 'WebPage'
					},
					thumbnailUrl: '',
					url: 'https://simple.mock.local/section001s/item001/'
				});
			});

			it('contains a link to the section RSS feed', () => {
				assert.isNotNull(document.querySelector('a[href="/section001s/index.xml"]'));
			});

		});

		describe('when the page has no title or description', () => {

			before(async () => {
				document = (await loadBuiltHTML('section001s/item002/index.html')).document;
			});

			describe('head', () => {

				it('has a title element', () => {
					const subject = document.querySelector('title')?.textContent.trim();
					assert.strictEqual(subject, 'Untitled Section001');
				});

				it('has a description meta element defaulting to the page summary', () => {
					const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
					assert.strictEqual(subject, 'Mock Content Single Page In Section');
				});

			});

			describe('body', () => {

				it('contains a level 1 heading element with the page title', () => {
					const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
					assert.strictEqual(subject, 'Untitled Section001');
				});

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
				assert.strictEqual(subject, 'Mock Title Taxonomy');
			});

			it('has a description meta element', () => {
				const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
				assert.strictEqual(subject, 'Mock Description Taxonomy');
			});

			it('has a canonical URL link element', () => {
				const subject = document.querySelector('link[rel=canonical]')?.getAttribute('href');
				assert.strictEqual(subject, 'https://simple.mock.local/tags/');
			});

			it('does not have an author link element', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

			it('has an alternate link element pointing to the taxonomy RSS feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
				assert.strictEqual(subject?.getAttribute('href'), '/tags/index.xml');
				assert.strictEqual(subject?.getAttribute('title'), 'RSS feed for Mock Title Taxonomy');
			});

			it('does not have opengraph meta elements', () => {
				const subject = document.querySelectorAll('meta[property^="og:"]');
				assert.lengthOf(subject, 0);
			});

			it('does not have twitter meta elements', () => {
				const subject = document.querySelectorAll('meta[property^="twitter:"]');
				assert.lengthOf(subject, 0);
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Taxonomy');
			});

			it('contains the page content', () => {
				const subject = findTestElements(document.body, 'content-body')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Content Taxonomy');
			});

			it('contains a representation of each term in the taxonomy', () => {
				const subject = findTestElements(document, 'term-summary');
				assert.lengthOf(subject, 2);
				assert.strictEqual(subject[0].textContent.trim(), 'Mock Title Term (2)', 'name 1 match');
				assert.isNotNull(subject[0].querySelector('a[href="/tags/tag001/"]'), 'link 1 match');
				assert.strictEqual(subject[1].textContent.trim(), 'tag002 (2)', 'name 2 match');
				assert.isNotNull(subject[1].querySelector('a[href="/tags/tag002/"]'), 'link 2 match');
			});

		});

		describe('when the taxonomy has no index page', () => {

			before(async () => {
				document = (await loadBuiltHTML('categories/index.html')).document;
			});

			describe('head', () => {

				it('has a defaulted title element', () => {
					const subject = document.querySelector('title')?.textContent.trim();
					assert.strictEqual(subject, 'All Categories');
				});

				it('does not have a description meta element', () => {
					const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
					assert.isUndefined(subject);
				});

				it('has an alternate link element pointing to the list RSS feed', () => {
					const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
					assert.strictEqual(subject?.getAttribute('href'), '/categories/index.xml');
					assert.strictEqual(subject?.getAttribute('title'), 'RSS feed for All Categories');
				});

			});

			describe('body', () => {

				it('contains a level 1 heading element with the page title', () => {
					const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
					assert.strictEqual(subject, 'All Categories');
				});

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
				assert.strictEqual(subject, 'Mock Title Term');
			});

			it('has a description meta element', () => {
				const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
				assert.strictEqual(subject, 'Mock Description Term');
			});

			it('has a canonical URL link element', () => {
				const subject = document.querySelector('link[rel=canonical]')?.getAttribute('href');
				assert.strictEqual(subject, 'https://simple.mock.local/tags/tag001/');
			});

			it('does not have an author link element', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

			it('has an alternate link element pointing to the term RSS feed', () => {
				const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
				assert.strictEqual(subject?.getAttribute('href'), '/tags/tag001/index.xml');
				assert.strictEqual(subject?.getAttribute('title'), 'RSS feed for Mock Title Term');
			});

			it('does not have opengraph meta elements', () => {
				const subject = document.querySelectorAll('meta[property^="og:"]');
				assert.lengthOf(subject, 0);
			});

			it('does not have twitter meta elements', () => {
				const subject = document.querySelectorAll('meta[property^="twitter:"]');
				assert.lengthOf(subject, 0);
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Term');
			});

			it('contains the page content', () => {
				const subject = findTestElements(document.body, 'content-body')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Content Term');
			});

			it('contains a representation of each piece of content in the term', () => {
				const subject = findTestElements(document, 'content-summary').map(summary => {
					return {
						title: findTestElements(summary, 'content-summary-title')[0]?.textContent.trim(),
						url: findTestElements(summary, 'content-summary-link')[0]?.getAttribute('href')
					};
				});
				assert.lengthOf(subject, 2);

				assert.strictEqual(subject[0].title, 'Mock Title Single Page In Section');
				assert.strictEqual(subject[0].url, '/section001s/item001/');

				assert.strictEqual(subject[1].title, 'Mock Title Single Page In Section');
				assert.strictEqual(subject[1].url, '/section002s/item001/');
			});

		});

		describe('when the term has no index page', () => {

			before(async () => {
				document = (await loadBuiltHTML('tags/tag002/index.html')).document;
			});

			describe('head', () => {

				it('has a defaulted title element', () => {
					const subject = document.querySelector('title')?.textContent.trim();
					assert.strictEqual(subject, '“tag002” Tag');
				});

				it('does not have a description meta element', () => {
					const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
					assert.isUndefined(subject);
				});

				it('has an alternate link element pointing to the list RSS feed', () => {
					const subject = document.querySelector('link[rel=alternate][type="application/rss+xml"]');
					assert.strictEqual(subject?.getAttribute('href'), '/tags/tag002/index.xml');
					assert.strictEqual(subject?.getAttribute('title'), 'RSS feed for “tag002” Tag');
				});

			});

			describe('body', () => {

				it('contains a level 1 heading element with the page title', () => {
					const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
					assert.strictEqual(subject, 'Content With Tag “tag002”');
				});

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
				assert.strictEqual(subject, '404');
			});

			it('does not have a description meta element', () => {
				const subject = document.querySelector('meta[name=description]')?.getAttribute('content');
				assert.isUndefined(subject);
			});

			it('does not have a canonical URL link element', () => {
				const subject = document.querySelector('link[rel=canonical]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

			it('does not have an author link element', () => {
				const subject = document.querySelector('link[rel=author]')?.getAttribute('href');
				assert.isUndefined(subject);
			});

		});

		describe('body', () => {

			it('contains a level 1 heading element with the page title', () => {
				const subject = findTestElements(document.body, 'content-title')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Error 404: Page Not Found');
			});

		});

	});

	describe('sitemap', () => {

		before(async () => {
			document = (await loadBuiltHTML('sitemap.xml', {xml: true})).document;
		});

		it('has a urlset', () => {
			const subject = document.querySelectorAll('urlset');
			assert.lengthOf(subject, 1);
		});

		it('has a url element representing each page in the site', () => {
			const subject = document.querySelectorAll('url');
			assert.lengthOf(subject, 14);
			const urls = [...subject].map(url => url.querySelector('loc')?.textContent);
			assert.deepEqual(urls, [
				'https://simple.mock.local/section001s/item002/',
				'https://simple.mock.local/categories/cat001/',
				'https://simple.mock.local/categories/',
				'https://simple.mock.local/',
				'https://simple.mock.local/section001s/',
				'https://simple.mock.local/section001s/item001/',
				'https://simple.mock.local/tags/',
				'https://simple.mock.local/tags/tag001/',
				'https://simple.mock.local/tags/tag002/',
				'https://simple.mock.local/section002s/item002/',
				'https://simple.mock.local/section002s/item001/',
				'https://simple.mock.local/section002s/',
				'https://simple.mock.local/page002/',
				'https://simple.mock.local/page001/'
			]);
		});

	});

	describe('home page RSS', () => {

		before(async () => {
			document = (await loadBuiltHTML('index.xml', {xml: true})).document;
		});

		it('has an rss element', () => {
			const rss = document.querySelectorAll('rss');
			assert.lengthOf(rss, 1);
			assert.strictEqual(rss[0].getAttribute('version'), '2.0');
			assert.strictEqual(rss[0].getAttribute('xmlns:atom'), 'http://www.w3.org/2005/Atom');
		});

		it('has a channel with feed information', () => {
			const channels = document.querySelectorAll('channel');
			assert.lengthOf(channels, 1);
			const atomLink = document.querySelector('channel > [rel=self]');
			assert.strictEqual(document.querySelector('channel > title')?.textContent, 'Mock Title Home');
			assert.strictEqual(document.querySelector('channel > link')?.textContent, 'https://simple.mock.local/');
			assert.strictEqual(atomLink?.tagName, 'atom:link');
			assert.strictEqual(atomLink?.getAttribute('href'), 'https://simple.mock.local/index.xml');
			assert.strictEqual(atomLink?.getAttribute('rel'), 'self');
			assert.strictEqual(atomLink?.getAttribute('type'), 'application/rss+xml');
			assert.strictEqual(document.querySelector('channel > description')?.textContent, 'Mock Description Home');
			assert.strictEqual(document.querySelector('channel > language')?.textContent, 'en');
			assert.strictEqual(document.querySelector('channel > copyright')?.textContent, `Copyright © ${new Date().getFullYear()}`);
			assert.strictEqual(document.querySelector('channel > lastBuildDate')?.textContent, 'Sat, 02 Jan 2021 08:00:00 +0000');
			assert.isUndefined(document.querySelector('channel > managingEditor')?.textContent);
			assert.isUndefined(document.querySelector('channel > webMaster')?.textContent);
		});

		it('has an item element representing each regular page in the site', () => {
			const items = document.querySelectorAll('channel > item');
			assert.lengthOf(items, 6);
			const itemData = [...items].map(item => {
				return {
					guid: item.querySelector('guid')?.textContent,
					title: item.querySelector('title')?.textContent,
					author: item.querySelector('author')?.textContent,
					link: item.querySelector('link')?.textContent,
					pubDate: item.querySelector('pubDate')?.textContent,
					description: item.querySelector('description')?.textContent,
					categories: [...item.querySelectorAll('category')].map(category => category.textContent)
				};
			});
			assert.deepEqual(itemData, [
				{
					guid: 'https://simple.mock.local/section001s/item002/',
					title: 'Untitled Section001',
					author: undefined,
					link: 'https://simple.mock.local/section001s/item002/',
					pubDate: 'Sat, 02 Jan 2021 08:00:00 +0000',
					description: '<p>Mock Content Single Page In Section</p>\n',
					categories: []
				},
				{
					guid: 'https://simple.mock.local/section001s/item001/',
					title: 'Mock Title Single Page In Section',
					author: undefined,
					link: 'https://simple.mock.local/section001s/item001/',
					pubDate: 'Sat, 02 Jan 2021 08:00:00 +0000',
					description: '<p>Mock Content Single Page In Section</p>\n',
					categories: ['cat001', 'tag001', 'tag002']
				},
				{
					guid: 'https://simple.mock.local/section002s/item002/',
					title: 'Untitled Section002',
					author: undefined,
					link: 'https://simple.mock.local/section002s/item002/',
					pubDate: 'Fri, 01 Jan 2021 08:00:00 +0000',
					description: '<p>Mock Content Single Page In Section</p>\n',
					categories: []
				},
				{
					guid: 'https://simple.mock.local/section002s/item001/',
					title: 'Mock Title Single Page In Section',
					author: undefined,
					link: 'https://simple.mock.local/section002s/item001/',
					pubDate: 'Fri, 01 Jan 2021 08:00:00 +0000',
					description: '<p>Mock Content Single Page In Section</p>\n',
					categories: ['cat001', 'tag001', 'tag002']
				},
				{
					guid: 'https://simple.mock.local/page002/',
					title: 'Untitled Page',
					author: undefined,
					link: 'https://simple.mock.local/page002/',
					pubDate: 'Mon, 01 Jan 0001 00:00:00 +0000',
					description: '<p>Mock Content Single Page</p>\n',
					categories: []
				},
				{
					guid: 'https://simple.mock.local/page001/',
					title: 'Mock Title Single Page',
					author: undefined,
					link: 'https://simple.mock.local/page001/',
					pubDate: 'Mon, 01 Jan 0001 00:00:00 +0000',
					description: '<p>Mock Content Single Page</p>\n',
					categories: []
				}
			]);
		});

	});

	describe('section page RSS', () => {

		before(async () => {
			document = (await loadBuiltHTML('section001s/index.xml', {xml: true})).document;
		});

		it('has an rss element', () => {
			const rss = document.querySelectorAll('rss');
			assert.lengthOf(rss, 1);
			assert.strictEqual(rss[0].getAttribute('version'), '2.0');
			assert.strictEqual(rss[0].getAttribute('xmlns:atom'), 'http://www.w3.org/2005/Atom');
		});

		it('has a channel with feed information', () => {
			const channels = document.querySelectorAll('channel');
			assert.lengthOf(channels, 1);
			const atomLink = document.querySelector('channel > [rel=self]');
			assert.strictEqual(document.querySelector('channel > title')?.textContent, 'Mock Title Section');
			assert.strictEqual(document.querySelector('channel > link')?.textContent, 'https://simple.mock.local/section001s/');
			assert.strictEqual(atomLink?.tagName, 'atom:link');
			assert.strictEqual(atomLink?.getAttribute('href'), 'https://simple.mock.local/section001s/index.xml');
			assert.strictEqual(atomLink?.getAttribute('rel'), 'self');
			assert.strictEqual(atomLink?.getAttribute('type'), 'application/rss+xml');
			assert.strictEqual(document.querySelector('channel > description')?.textContent, 'Mock Description Section');
			assert.strictEqual(document.querySelector('channel > language')?.textContent, 'en');
			assert.strictEqual(document.querySelector('channel > copyright')?.textContent, `Copyright © ${new Date().getFullYear()}`);
			assert.strictEqual(document.querySelector('channel > lastBuildDate')?.textContent, 'Sat, 02 Jan 2021 08:00:00 +0000');
			assert.isUndefined(document.querySelector('channel > managingEditor')?.textContent);
			assert.isUndefined(document.querySelector('channel > webMaster')?.textContent);
		});

		it('has an item element representing each page in the section', () => {
			const items = document.querySelectorAll('channel > item');
			assert.lengthOf(items, 2);
			const itemData = [...items].map(item => {
				return {
					guid: item.querySelector('guid')?.textContent,
					title: item.querySelector('title')?.textContent,
					author: item.querySelector('author')?.textContent,
					link: item.querySelector('link')?.textContent,
					pubDate: item.querySelector('pubDate')?.textContent,
					description: item.querySelector('description')?.textContent,
					categories: [...item.querySelectorAll('category')].map(category => category.textContent)
				};
			});
			assert.deepEqual(itemData, [
				{
					guid: 'https://simple.mock.local/section001s/item002/',
					title: 'Untitled Section001',
					author: undefined,
					link: 'https://simple.mock.local/section001s/item002/',
					pubDate: 'Sat, 02 Jan 2021 08:00:00 +0000',
					description: '<p>Mock Content Single Page In Section</p>\n',
					categories: []
				},
				{
					guid: 'https://simple.mock.local/section001s/item001/',
					title: 'Mock Title Single Page In Section',
					author: undefined,
					link: 'https://simple.mock.local/section001s/item001/',
					pubDate: 'Sat, 02 Jan 2021 08:00:00 +0000',
					description: '<p>Mock Content Single Page In Section</p>\n',
					categories: ['cat001', 'tag001', 'tag002']
				}
			]);
		});

		describe('when the section has no index page', () => {

			before(async () => {
				document = (await loadBuiltHTML('section002s/index.xml', {xml: true})).document;
			});

			it('has defaulted feed information', () => {
				assert.strictEqual(document.querySelector('channel > title')?.textContent, 'All Section002s');
				assert.strictEqual(document.querySelector('channel > description')?.textContent, 'Recent content in All Section002s');
			});

		});

	});

	describe('taxonomy page RSS', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/index.xml', {xml: true})).document;
		});

		it('has an rss element', () => {
			const rss = document.querySelectorAll('rss');
			assert.lengthOf(rss, 1);
			assert.strictEqual(rss[0].getAttribute('version'), '2.0');
			assert.strictEqual(rss[0].getAttribute('xmlns:atom'), 'http://www.w3.org/2005/Atom');
		});

		it('has a channel with feed information', () => {
			const channels = document.querySelectorAll('channel');
			assert.lengthOf(channels, 1);
			const atomLink = document.querySelector('channel > [rel=self]');
			assert.strictEqual(document.querySelector('channel > title')?.textContent, 'Mock Title Taxonomy');
			assert.strictEqual(document.querySelector('channel > link')?.textContent, 'https://simple.mock.local/tags/');
			assert.strictEqual(atomLink?.tagName, 'atom:link');
			assert.strictEqual(atomLink?.getAttribute('href'), 'https://simple.mock.local/tags/index.xml');
			assert.strictEqual(atomLink?.getAttribute('rel'), 'self');
			assert.strictEqual(atomLink?.getAttribute('type'), 'application/rss+xml');
			assert.strictEqual(document.querySelector('channel > description')?.textContent, 'Mock Description Taxonomy');
			assert.strictEqual(document.querySelector('channel > language')?.textContent, 'en');
			assert.strictEqual(document.querySelector('channel > copyright')?.textContent, `Copyright © ${new Date().getFullYear()}`);
			assert.strictEqual(document.querySelector('channel > lastBuildDate')?.textContent, 'Sat, 02 Jan 2021 08:00:00 +0000');
			assert.isUndefined(document.querySelector('channel > managingEditor')?.textContent);
			assert.isUndefined(document.querySelector('channel > webMaster')?.textContent);
		});

		it('has an item element representing each term in the taxonomy', () => {
			const items = document.querySelectorAll('channel > item');
			assert.lengthOf(items, 2);
			const itemData = [...items].map(item => {
				return {
					guid: item.querySelector('guid')?.textContent,
					title: item.querySelector('title')?.textContent,
					author: item.querySelector('author')?.textContent,
					link: item.querySelector('link')?.textContent,
					pubDate: item.querySelector('pubDate')?.textContent,
					description: item.querySelector('description')?.textContent,
					categories: [...item.querySelectorAll('category')].map(category => category.textContent)
				};
			});
			assert.deepEqual(itemData, [
				{
					guid: 'https://simple.mock.local/tags/tag001/',
					title: 'Mock Title Term',
					author: undefined,
					link: 'https://simple.mock.local/tags/tag001/',
					pubDate: 'Sat, 02 Jan 2021 08:00:00 +0000',
					description: '<p>Mock Content Term</p>\n',
					categories: []
				},
				{
					guid: 'https://simple.mock.local/tags/tag002/',
					title: '“tag002” Tag',
					author: undefined,
					link: 'https://simple.mock.local/tags/tag002/',
					pubDate: 'Sat, 02 Jan 2021 08:00:00 +0000',
					description: '<p>Content in “tag002” Tag</p>',
					categories: []
				}
			]);
		});

		describe('when the taxonomy has no index page', () => {

			before(async () => {
				document = (await loadBuiltHTML('categories/index.xml', {xml: true})).document;
			});

			it('has defaulted feed information', () => {
				assert.strictEqual(document.querySelector('channel > title')?.textContent, 'All Categories');
				assert.strictEqual(document.querySelector('channel > description')?.textContent, 'Recent content in All Categories');
			});

		});

	});

	describe('term page RSS', () => {

		before(async () => {
			document = (await loadBuiltHTML('tags/tag001/index.xml', {xml: true})).document;
		});

		it('has an rss element', () => {
			const rss = document.querySelectorAll('rss');
			assert.lengthOf(rss, 1);
			assert.strictEqual(rss[0].getAttribute('version'), '2.0');
			assert.strictEqual(rss[0].getAttribute('xmlns:atom'), 'http://www.w3.org/2005/Atom');
		});

		it('has a channel with feed information', () => {
			const channels = document.querySelectorAll('channel');
			assert.lengthOf(channels, 1);
			const atomLink = document.querySelector('channel > [rel=self]');
			assert.strictEqual(document.querySelector('channel > title')?.textContent, 'Mock Title Term');
			assert.strictEqual(document.querySelector('channel > link')?.textContent, 'https://simple.mock.local/tags/tag001/');
			assert.strictEqual(atomLink?.tagName, 'atom:link');
			assert.strictEqual(atomLink?.getAttribute('href'), 'https://simple.mock.local/tags/tag001/index.xml');
			assert.strictEqual(atomLink?.getAttribute('rel'), 'self');
			assert.strictEqual(atomLink?.getAttribute('type'), 'application/rss+xml');
			assert.strictEqual(document.querySelector('channel > description')?.textContent, 'Mock Description Term');
			assert.strictEqual(document.querySelector('channel > language')?.textContent, 'en');
			assert.strictEqual(document.querySelector('channel > copyright')?.textContent, `Copyright © ${new Date().getFullYear()}`);
			assert.strictEqual(document.querySelector('channel > lastBuildDate')?.textContent, 'Sat, 02 Jan 2021 08:00:00 +0000');
			assert.isUndefined(document.querySelector('channel > managingEditor')?.textContent);
			assert.isUndefined(document.querySelector('channel > webMaster')?.textContent);
		});

		it('has an item element representing each page with the term', () => {
			const items = document.querySelectorAll('channel > item');
			assert.lengthOf(items, 2);
			const itemData = [...items].map(item => {
				return {
					guid: item.querySelector('guid')?.textContent,
					title: item.querySelector('title')?.textContent,
					author: item.querySelector('author')?.textContent,
					link: item.querySelector('link')?.textContent,
					pubDate: item.querySelector('pubDate')?.textContent,
					description: item.querySelector('description')?.textContent,
					categories: [...item.querySelectorAll('category')].map(category => category.textContent)
				};
			});
			assert.deepEqual(itemData, [
				{
					guid: 'https://simple.mock.local/section001s/item001/',
					title: 'Mock Title Single Page In Section',
					author: undefined,
					link: 'https://simple.mock.local/section001s/item001/',
					pubDate: 'Sat, 02 Jan 2021 08:00:00 +0000',
					description: '<p>Mock Content Single Page In Section</p>\n',
					categories: ['cat001', 'tag001', 'tag002']
				},
				{
					guid: 'https://simple.mock.local/section002s/item001/',
					title: 'Mock Title Single Page In Section',
					author: undefined,
					link: 'https://simple.mock.local/section002s/item001/',
					pubDate: 'Fri, 01 Jan 2021 08:00:00 +0000',
					description: '<p>Mock Content Single Page In Section</p>\n',
					categories: ['cat001', 'tag001', 'tag002']
				}
			]);
		});

		describe('when the term has no index page', () => {

			before(async () => {
				document = (await loadBuiltHTML('tags/tag002/index.xml', {xml: true})).document;
			});

			it('has defaulted feed information', () => {
				assert.strictEqual(document.querySelector('channel > title')?.textContent, '“tag002” Tag');
				assert.strictEqual(document.querySelector('channel > description')?.textContent, 'Recent content in “tag002” Tag');
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

			it('contains a link to the home page', () => {
				const subject = findTestElements(header, 'header-site-name')[0]?.getAttribute('href');
				assert.strictEqual(subject, 'https://simple.mock.local/');
			});

			it('contains the home page title', () => {
				const subject = findTestElements(header, 'header-site-name')[0]?.textContent.trim();
				assert.strictEqual(subject, 'Mock Title Home');
			});

			it('does not contain a link to GitHub', () => {
				const subject = findTestElements(header, 'header-github')[0]?.getAttribute('href');
				assert.isUndefined(subject);
			});

			it('does not contain a link to Twitter', () => {
				const subject = findTestElements(header, 'header-twitter')[0]?.getAttribute('href');
				assert.isUndefined(subject);
			});

		});

		describe('footer', () => {
			let footer;

			before(() => {
				footer = findTestElements(document.body, 'footer')[0];
			});

			it('contains a copyright notice', () => {
				const subject = findTestElements(footer, 'footer-copyright')[0]?.textContent.trim();
				assert.strictEqual(subject, `Copyright © ${new Date().getFullYear()}`);
			});

		});

	});

});
