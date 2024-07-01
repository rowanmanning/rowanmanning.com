'use strict';

module.exports = function findTestElements(document, types) {
	const resolvedTypes = Array.isArray(types) ? types : [types];
	const selector = resolvedTypes.map((type) => `[data-test="${type}"]`).join(', ');
	return [...document.querySelectorAll(selector)];
};
