'use strict';

const fs = require('node:fs/promises');

module.exports = function mkdir(path) {
	return fs.mkdir(path, { recursive: true });
};
