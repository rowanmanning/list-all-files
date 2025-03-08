'use strict';

const { readdir, stat } = require('node:fs/promises');
const { readdirSync, statSync } = require('node:fs');
const path = require('node:path');

/**
 * @import { listAllFiles, listAllFilesSync } from '.'
 */

/** @type {listAllFiles} */
exports.listAllFiles = async function listAllFiles(directoryPath) {
	/** @type {string[]} */
	let filePaths = [];
	for (const filePath of await readdir(directoryPath)) {
		const fullPath = path.join(directoryPath, filePath);
		const file = await stat(fullPath);
		if (file.isDirectory()) {
			filePaths = filePaths.concat(await listAllFiles(fullPath));
		} else if (file.isFile()) {
			filePaths.push(fullPath);
		}
	}
	return filePaths;
};

/** @type {listAllFilesSync} */
exports.listAllFilesSync = function listAllFilesSync(directoryPath) {
	/** @type {string[]} */
	let filePaths = [];
	for (const filePath of readdirSync(directoryPath)) {
		const fullPath = path.join(directoryPath, filePath);
		const file = statSync(fullPath);
		if (file.isDirectory()) {
			filePaths = filePaths.concat(listAllFilesSync(fullPath));
		} else if (file.isFile()) {
			filePaths.push(fullPath);
		}
	}
	return filePaths;
};
