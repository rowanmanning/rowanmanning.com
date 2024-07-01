import { fathomConfig } from '@params';
import accessibleAutocomplete from 'accessible-autocomplete';
import search from '../utils/search';

const maxContentLength = 280;

export default class SiteSearch {
	// Construct a single site search
	constructor(rootElement) {
		this.rootElement = rootElement;
		this.labelElement = this.rootElement.querySelector('label');
		this.fallbackFormElement = this.rootElement.querySelector('form');

		// Replace the fallback search input with a wrapper element
		this.fallbackFormElement.parentElement.removeChild(this.fallbackFormElement);

		// Initialise an accessible autocomplete
		accessibleAutocomplete({
			element: this.rootElement,
			id: this.labelElement.getAttribute('for'),
			minLength: 2,

			// Don't confirm the selection when you click outside the autocomplete
			confirmOnBlur: false,

			// Change the CSS namespace to suit this site
			cssNamespace: 'site-search',

			// Always display as an overlay – we don't want content shifting
			displayMenu: 'overlay',

			// Function to populate results as the user types
			source: async (query, populateResults) => {
				populateResults(await search(`${query}`));
			},

			// When a result is selected, go to that page
			onConfirm: (result) => {
				if (window.fathom && fathomConfig.goalIds.search) {
					window.fathom.trackGoal(fathomConfig.goalIds.search, 0);
				}
				if (result) {
					document.location = result.page.url;
				}
			},

			templates: {
				// The value that gets added into the input when a result is selected
				inputValue: (result) => {
					if (result) {
						return result.page.title;
					}
				},

				// How suggestions are displayed
				suggestion: (result) => {
					if (result) {
						let { title, description, content } = result.page;
						const metadata = Object.values(result.matchData.metadata);

						// The snippet can either be the description or content
						let snippet = description;

						// Only bother marking the first thing
						if (metadata.length) {
							const match = metadata[0];

							if (match.title) {
								title = this.constructor.addMarkAtIndex(
									title,
									...match.title.position[0]
								);
							}

							// Mark occurrences in the description...
							if (match.description) {
								description = this.constructor.addMarkAtIndex(
									description,
									...match.description.position[0]
								);
								snippet = description;

								// Otherwise mark occurrences in the content
							} else if (match.content) {
								const [firstIndex, firstLength] = match.content.position[0];

								// Mark occurences
								content = this.constructor.addMarkAtIndex(
									content,
									...match.content.position[0]
								);

								// Trim to the first occurence
								content = content.substr(
									Math.max(0, firstIndex - maxContentLength / 2),
									firstLength + maxContentLength
								);

								// Remove the first and last words
								const words = content.split(/\s+/);
								content = `…${words.splice(1, words.length - 2).join(' ')}…`;
								snippet = content;
							}
						}

						return `
							<p class="site-search__option-title">${title}</p>
							<p class="site-search__option-content">${snippet}</p>
						`;
					}
				}
			}
		});

		const idSelector = `#${this.labelElement.getAttribute('for')}`;
		this.inputElement = this.rootElement.querySelector(idSelector);
	}

	// Focus the search box
	focus() {
		this.inputElement.focus();
	}

	// Construct a single site search
	static init(...args) {
		return new this(...args);
	}

	static addMarkAtIndex(string, index, length) {
		const chunks = [
			string.substr(0, index),
			string.substr(index, length),
			string.substr(index + length)
		];
		return `${chunks[0]}<mark>${chunks[1]}</mark>${chunks[2]}`;
	}
}
