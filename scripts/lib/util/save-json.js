'use strict';

const fs = require('node:fs/promises');

module.exports = function saveJSON(path, data) {
	return fs.writeFile(path, JSON.stringify(data, null, '\t'));
};
