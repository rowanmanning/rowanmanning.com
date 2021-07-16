'use strict';

module.exports = function findTestElements(document, types) {
	types = Array.isArray(types) ? types : [types];
	const selector = types.map(type => `[data-test="${type}"]`).join(', ');
	return [...document.querySelectorAll(selector)];
};
