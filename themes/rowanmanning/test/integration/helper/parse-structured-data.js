'use strict';

module.exports = function parseStructuredData(element) {
	if (!element) {
		throw new TypeError('Element must be an HTML Element');
	}
	const script = element.querySelector('script[type="application/ld+json"]');
	if (!script) {
		throw new TypeError('Element must contain an JSON-LD script');
	}
	return JSON.parse(script.textContent);
};
