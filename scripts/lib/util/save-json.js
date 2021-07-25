'use strict';

const fs = require('fs/promises');

module.exports = function saveJSON(path, data) {
	return fs.writeFile(path, JSON.stringify(data, null, '\t'));
};
