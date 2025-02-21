'use strict';

const { readdir, stat } = require('node:fs/promises');
const { readdirSync, statSync } = require('node:fs');
const path = require('node:path');

/**
 * List all files in a directory recursively.
 *
 * @public
 * @param {string} directoryPath
 *     The directory path to look for files in.
 * @returns {Promise<string[]>}
 *     Resolves with an array of strings, each string is a file path.
 */
async function listAllFiles(directoryPath) {
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
}

/**
 * List all files in a directory recursively and synchronously.
 *
 * @public
 * @param {string} directoryPath
 *     The directory path to look for files in.
 * @returns {string[]}
 *     Returns an array of strings, each string is a file path.
 */
function listAllFilesSync(directoryPath) {
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
}

let _exports = Object.assign(listAllFiles, { sync: listAllFilesSync });
_exports = Object.assign(_exports, { default: _exports });

/** @type {typeof _exports} */
module.exports = _exports;
