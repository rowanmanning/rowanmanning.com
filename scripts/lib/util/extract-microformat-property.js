'use strict';

module.exports = function extractMicroformatProperty(item, property) {
	const properties = item?.properties;
	if (properties && properties[property]) {
		let subject = properties[property];
		if (Array.isArray(subject)) {
			subject = subject[0];
		}
		if (property === 'author') {
			if (subject && subject.properties) {
				subject = {
					name: extractMicroformatProperty(subject, 'name'),
					url: extractMicroformatProperty(subject, 'url')
				};
			}
			if (typeof subject === 'string') {
				subject = {
					name: subject,
					url: null
				};
			}
		}
		if (subject && subject.value) {
			subject = subject.value;
		}
		return subject || null;
	}
	return null;
};
