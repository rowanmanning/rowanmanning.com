
import SiteSearch from './components/site-search';
import hotkeys from 'hotkeys-js';

// Wait for the DOM to be loaded before doing anything
document.addEventListener('DOMContentLoaded', () => {

	// Set up site search
	const siteSearchBoxes = [...document.querySelectorAll('[data-component=site-search]')]
		.map(element => SiteSearch.init(element));

	// Set up shortcuts
	hotkeys.filter = ({target}) => {
		const {tagName} = target;
		return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
	};
	hotkeys('/, s, cmd+k, ctrl+k', event => {
		siteSearchBoxes[0].focus();
		event.preventDefault();
	});

});
