'use strict';

module.exports = function parseOpenGraphMeta(document) {
	return [
		...document.querySelectorAll('meta[property^="og:"], meta[property^="article:"]')
	].reduce((meta, element) => {
		const property = element.getAttribute('property').replace(/^(og):/, '');
		const value = element.getAttribute('content');
		if (Array.isArray(meta[property])) {
			meta[property].push(value);
		} else if (meta[property]) {
			meta[property] = [meta[property], value];
		} else {
			meta[property] = value;
		}
		return meta;
	}, {});
};
