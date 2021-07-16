'use strict';

module.exports = function parseTwitterMeta(document) {
	return [...document.querySelectorAll('meta[name^="twitter:"]')].reduce((meta, element) => {
		const property = element.getAttribute('name').replace(/^twitter:/, '');
		meta[property] = element.getAttribute('content');
		return meta;
	}, {});
};
