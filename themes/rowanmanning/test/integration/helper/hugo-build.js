'use strict';

const { promisify } = require('node:util');
const exec = promisify(require('node:child_process').exec);
const fs = require('node:fs/promises');

const buildDirectory = `${__dirname}/../build`;

module.exports = async function hugoBuild({
	name,
	config = null,
	environment = 'production'
} = {}) {
	const sourceDirectory = `${__dirname}/../mock/content/${name}`;
	const configPath = config
		? `${__dirname}/../mock/config/${config}.yml`
		: `${sourceDirectory}/config.yml`;

	// Remove the build directory
	if (await isDirectory(buildDirectory)) {
		await exec(`rm -rf ${buildDirectory}`);
	}

	// Build the site
	await exec(
		`
		hugo
			--environment="${environment}"
			--config="${configPath}"
			--source="${sourceDirectory}"
			--destination="${buildDirectory}"
			--theme="${__dirname}/../../.."
			--buildDrafts
			--ignoreCache
			--gc
	`.replace(/[\t\r\n]+/g, ' ')
	);
};

async function isDirectory(path) {
	try {
		const stat = await fs.stat(path);
		return stat.isDirectory();
	} catch (_error) {
		return false;
	}
}
