/**
 * @rowanmanning/list-all-files module
 * @module @rowanmanning/list-all-files
 */
'use strict';

const {readdir, stat} = require('fs').promises;
const {readdirSync, statSync} = require('fs');
const path = require('path');

/**
 * List all files in a directory recursively.
 *
 * @access public
 * @param {String} directoryPath
 *     The directory path to look for files in.
 * @returns {Promise<Array<String>>}
 *     Resolves with an array of strings, each string is a file path.
 */
async function listAllFiles(directoryPath) {
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
 * @access public
 * @param {String} directoryPath
 *     The directory path to look for files in.
 * @returns {Array<String>}
 *     Returns an array of strings, each string is a file path.
 */
function listAllFilesSync(directoryPath) {
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

module.exports = listAllFiles;
module.exports.sync = listAllFilesSync;
