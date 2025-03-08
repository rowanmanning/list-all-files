'use strict';

const assert = require('node:assert');
const { beforeEach, describe, it } = require('node:test');
const { listAllFiles, listAllFilesSync } = require('../..');

describe('listAllFiles(directoryPath)', () => {
	let resolvedValue;

	beforeEach(async () => {
		resolvedValue = await listAllFiles(`${__dirname}/fixture/main`);
	});

	it('resolves with the expected file paths', () => {
		assert.deepEqual(resolvedValue, [
			`${__dirname}/fixture/main/empty-directory/.gitkeep`,
			`${__dirname}/fixture/main/file-one.js`,
			`${__dirname}/fixture/main/full-directory/file-two.js`,
			`${__dirname}/fixture/main/full-directory/sub-directory/file-three.js`
		]);
	});
});

describe('listAllFilesSync(directoryPath)', () => {
	let returnValue;

	beforeEach(() => {
		returnValue = listAllFilesSync(`${__dirname}/fixture/main`);
	});

	it('returns the expected file paths', () => {
		assert.deepEqual(returnValue, [
			`${__dirname}/fixture/main/empty-directory/.gitkeep`,
			`${__dirname}/fixture/main/file-one.js`,
			`${__dirname}/fixture/main/full-directory/file-two.js`,
			`${__dirname}/fixture/main/full-directory/sub-directory/file-three.js`
		]);
	});
});
