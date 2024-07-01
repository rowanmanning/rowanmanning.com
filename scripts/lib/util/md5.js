'use strict';

const crypto = require('node:crypto');

module.exports = function md5(string) {
	return crypto.createHash('md5').update(string).digest('hex');
};
