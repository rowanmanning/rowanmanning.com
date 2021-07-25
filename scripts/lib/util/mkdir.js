'use strict';

const fs = require('fs/promises');

module.exports = function mkdir(path) {
	return fs.mkdir(path, {recursive: true});
};
