'use strict';

describe('website with images', () => {
	let document;

	before(async () => {
		await hugoBuild({
			name: 'images'
		});
	});

	describe('section page', () => {
		before(async () => {
			document = (await loadBuiltHTML('section001s/index.html')).document;
		});

		describe('body', () => {
			it('contains a representation of each piece of content in the section, including thumbnails', () => {
				const subject = findTestElements(document, 'content-summary').map((summary) => {
					return {
						title: findTestElements(
							summary,
							'content-summary-title'
						)[0]?.textContent.trim(),
						url: findTestElements(summary, 'content-summary-link')[0]?.getAttribute(
							'href'
						)
					};
				});
				assert.equal(subject.length, 2);

				assert.equal(subject[0].title, 'Mock Title Single Page In Section');
				assert.notEqual(subject[0].url, null, '/section001s/item001/');

				assert.equal(subject[1].title, 'Untitled Section001');
				assert.notEqual(subject[1].url, null, '/section001s/item002/');
			});

			it('contains structured image data for each piece of content in the section', () => {
				const subject = findTestElements(document, 'content-summary').map((summary) => {
					const { image, thumbnailUrl } = parseStructuredData(summary);
					return {
						image,
						thumbnailUrl
					};
				});

				assert.equal(
					subject[0].image,
					'https://images.mock.local/section001s/item001/image-b.jpg'
				);
				assert.match(
					subject[0].thumbnailUrl,
					/^https:\/\/images\.mock\.local\/section001s\/item001\/image-b_.*_256x256_.*\.jpg$/
				);

				assert.equal(
					subject[1].image,
					'https://images.mock.local/section001s/item002/image-a.png'
				);
				assert.match(
					subject[1].thumbnailUrl,
					/^https:\/\/images\.mock\.local\/section001s\/item002\/image-a_.*_256x256_.*\.png$/
				);
			});
		});
	});

	describe('single page', () => {
		before(async () => {
			document = (await loadBuiltHTML('page001/index.html')).document;
		});

		describe('head', () => {
			it('has an opengraph meta image element set to the page main image', () => {
				const og = parseOpenGraphMeta(document);
				assert.equal(og.image, 'https://images.mock.local/page001/image-b.jpg');
				assert.equal(og['image:alt'], 'Mock Image Alt B');
			});

			it('has a twitter meta image element set to the page main image', () => {
				const twitter = parseTwitterMeta(document);
				assert.equal(twitter.image, 'https://images.mock.local/page001/image-b.jpg');
				assert.equal(twitter['image:alt'], 'Mock Image Alt B');
			});
		});

		describe('when the page has no main image specified', () => {
			before(async () => {
				document = (await loadBuiltHTML('page002/index.html')).document;
			});

			describe('head', () => {
				it('has an opengraph meta image element set to the first image found', () => {
					const og = parseOpenGraphMeta(document);
					assert.equal(og.image, 'https://images.mock.local/page002/image-a.png');
					assert.equal(og['image:alt'], 'image-a.png');
				});

				it('has a twitter meta image element set to the first image found', () => {
					const twitter = parseTwitterMeta(document);
					assert.equal(twitter.image, 'https://images.mock.local/page002/image-a.png');
					assert.equal(twitter['image:alt'], 'image-a.png');
				});
			});
		});
	});

	describe('single page in section', () => {
		before(async () => {
			document = (await loadBuiltHTML('section001s/item001/index.html')).document;
		});

		describe('head', () => {
			it('has an opengraph meta image element set to the page main image', () => {
				const og = parseOpenGraphMeta(document);
				assert.equal(og.image, 'https://images.mock.local/section001s/item001/image-b.jpg');
				assert.equal(og['image:alt'], 'Mock Image Alt B');
			});

			it('has a twitter meta image element set to the page main image', () => {
				const twitter = parseTwitterMeta(document);
				assert.equal(
					twitter.image,
					'https://images.mock.local/section001s/item001/image-b.jpg'
				);
				assert.equal(twitter['image:alt'], 'Mock Image Alt B');
			});
		});

		describe('body', () => {
			it('contains structured data for the page main image and thumbnail', () => {
				const data = parseStructuredData(findTestElements(document, 'content-full')[0]);

				assert.equal(
					data.image,
					'https://images.mock.local/section001s/item001/image-b.jpg'
				);
				assert.match(
					data.thumbnailUrl,
					/^https:\/\/images\.mock\.local\/section001s\/item001\/image-b_.*_256x256_.*\.jpg$/
				);
			});
		});

		describe('when the page has no main image specified', () => {
			before(async () => {
				document = (await loadBuiltHTML('section001s/item002/index.html')).document;
			});

			describe('head', () => {
				it('has an opengraph meta image element set to the first image found', () => {
					const og = parseOpenGraphMeta(document);
					assert.equal(
						og.image,
						'https://images.mock.local/section001s/item002/image-a.png'
					);
					assert.equal(og['image:alt'], 'image-a.png');
				});

				it('has a twitter meta image element set to the first image found', () => {
					const twitter = parseTwitterMeta(document);
					assert.equal(
						twitter.image,
						'https://images.mock.local/section001s/item002/image-a.png'
					);
					assert.equal(twitter['image:alt'], 'image-a.png');
				});
			});

			describe('body', () => {
				it('contains structured data for the page main image and thumbnail', () => {
					const data = parseStructuredData(findTestElements(document, 'content-full')[0]);

					assert.equal(
						data.image,
						'https://images.mock.local/section001s/item002/image-a.png'
					);
					assert.match(
						data.thumbnailUrl,
						/^https:\/\/images\.mock\.local\/section001s\/item002\/image-a_.*_256x256_.*\.png$/
					);
				});
			});
		});
	});
});
