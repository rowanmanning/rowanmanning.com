'use strict';

module.exports = {
	extends: [
		'@rowanmanning/eslint-config'
	],
	rules: {
		'jsdoc/require-jsdoc': 'off',
		'max-depth': 'off',
		'no-continue': 'off',
		'no-invalid-this': 'off',
		'no-new': 'off',
		'require-atomic-updates': 'off'
	}
};
