
import FeedLink from './components/feed-link';
import SiteSearch from './components/site-search';
import WebmentionForm from './components/webmention-form';
import hotkeys from 'hotkeys-js';

// Wait for the DOM to be loaded before doing anything
document.addEventListener('DOMContentLoaded', () => {

	// Set up site search
	const siteSearchBoxes = [...document.querySelectorAll('[data-component=site-search]')]
		.map(element => SiteSearch.init(element));

	// Set up webmention forms
	[...document.querySelectorAll('[data-component=webmention-form]')]
		.map(element => WebmentionForm.init(element));

	// Set up feed links
	[...document.querySelectorAll('[data-component=feed-link]')]
		.map(element => FeedLink.init(element));

	// Get next/previous buttons
	const nextPage = document.querySelector('[data-component=page-turner][rel=next]');
	const previousPage = document.querySelector('[data-component=page-turner][rel=prev]');

	// Set up shortcuts
	hotkeys.filter = ({target}) => {
		const {tagName} = target;
		return !(tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA');
	};
	hotkeys('/, s, cmd+k, ctrl+k', event => {
		siteSearchBoxes[0].focus();
		event.preventDefault();
	});
	if (nextPage) {
		hotkeys('right', () => {
			nextPage.click();
		});
	}
	if (previousPage) {
		hotkeys('left', () => {
			previousPage.click();
		});
	}

});
