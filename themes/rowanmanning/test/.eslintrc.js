'use strict';

module.exports = {
	extends: [
		'@rowanmanning/eslint-config'
	],
	globals: {
		assert: 'readonly',
		findTestElements: 'readonly',
		hugoBuild: 'readonly',
		loadBuiltHTML: 'readonly',
		parseOpenGraphMeta: 'readonly',
		parseStructuredData: 'readonly',
		parseTwitterMeta: 'readonly'
	},
	rules: {
		camelcase: 'off',
		'max-len': 'off'
	}
};
