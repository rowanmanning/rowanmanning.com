'use strict';

describe('website with a staging redirect', () => {
	let document;

	before(async () => {
		await hugoBuild({
			name: 'staging-redirect',
			environment: 'staging'
		});
	});

	describe('single page', () => {
		before(async () => {
			document = (await loadBuiltHTML('page001/index.html')).document;
		});

		describe('head', () => {
			it('has a robots meta element set to "noindex"', () => {
				const subject = document
					.querySelector('meta[name=robots]')
					?.getAttribute('content');
				assert.equal(subject, 'noindex');
			});

			it('has a refresh meta element', () => {
				const subject = document
					.querySelector('meta[http-equiv=refresh]')
					?.getAttribute('content');
				assert.equal(subject, `0;URL='https://staging-redirect.mock.local/page001/'`);
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

			it('does not have a refresh meta element', () => {
				const subject = document
					.querySelector('meta[http-equiv=refresh]')
					?.getAttribute('content');
				assert.equal(subject, undefined);
			});
		});
	});
});
