'use strict';

const {promisify} = require('util');
const exec = promisify(require('child_process').exec);
const fs = require('fs/promises');

const buildDirectory = `${__dirname}/../build`;

module.exports = async function hugoBuild(name) {
	const sourceDirectory = `${__dirname}/../mock/${name}`;

	// Remove the build directory
	if (await isDirectory(buildDirectory)) {
		await exec(`rm -rf ${buildDirectory}`);
	}

	// Build the site
	await exec(`
		hugo
			--environment="production"
			--config="${sourceDirectory}/config.yml"
			--source="${sourceDirectory}"
			--destination="${buildDirectory}"
			--theme="${__dirname}/../../.."
			--buildDrafts
			--ignoreCache
			--gc
	`.replace(/[\t\r\n]+/g, ' '));
};

async function isDirectory(path) {
	try {
		const stat = await fs.stat(path);
		return stat.isDirectory();
	} catch (error) {
		return false;
	}
}
