'use strict';

const assert = require('proclaim');
const mockery = require('mockery');

// Note: mock file system is constructed in `../mock/node/fs`
describe('lib/list-all-files', () => {
	let fs;
	let listAllFiles;
	let path;

	beforeEach(() => {
		fs = require('../mock/node/fs');
		mockery.registerMock('fs', fs);
		path = require('../mock/node/path');
		mockery.registerMock('path', path);
		listAllFiles = require('../../../lib/list-all-files');
	});

	it('exports a function', () => {
		assert.isFunction(listAllFiles);
	});

	describe('listAllFiles(directoryPath)', () => {
		let returnValue;
		let resolvedValue;

		beforeEach(async () => {
			returnValue = listAllFiles('mock-dir');
			resolvedValue = await returnValue;
		});

		it('returns a promise', () => {
			assert.isInstanceOf(returnValue, Promise);
		});

		it('resolves with an array of file names, ignoring directories and non-files', () => {
			assert.isArray(resolvedValue);
			assert.deepEqual(resolvedValue, [
				'mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4',
				'mock-dir/mock-subdir-1/mock-file-3',
				'mock-dir/mock-file-1',
				'mock-dir/mock-file-2'
			]);
		});

		it('reads the directory and all subdirectories', () => {
			assert.callCount(fs.promises.readdir, 3);
			assert.calledWithExactly(fs.promises.readdir, 'mock-dir');
			assert.calledWithExactly(fs.promises.readdir, 'mock-dir/mock-subdir-1');
			assert.calledWithExactly(fs.promises.readdir, 'mock-dir/mock-subdir-1/mock-subdir-2');
		});

		it('stats each of the found file system entries', () => {
			assert.callCount(fs.promises.stat, 8);
			assert.calledWithExactly(fs.promises.stat, 'mock-dir/mock-subdir-1');
			assert.calledWithExactly(fs.promises.stat, 'mock-dir/mock-not-file-1');
			assert.calledWithExactly(fs.promises.stat, 'mock-dir/mock-file-1');
			assert.calledWithExactly(fs.promises.stat, 'mock-dir/mock-file-2');
			assert.calledWithExactly(fs.promises.stat, 'mock-dir/mock-subdir-1/mock-subdir-2');
			assert.calledWithExactly(fs.promises.stat, 'mock-dir/mock-subdir-1/mock-file-3');
			assert.calledWithExactly(fs.promises.stat, 'mock-dir/mock-subdir-1/mock-subdir-2/mock-not-file-2');
			assert.calledWithExactly(fs.promises.stat, 'mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4');
		});

	});

	describe('listAllFiles.sync(directoryPath)', () => {
		let returnValue;

		beforeEach(() => {
			returnValue = listAllFiles.sync('mock-dir');
		});

		it('returns an array of file names, ignoring directories and non-files', () => {
			assert.isArray(returnValue);
			assert.deepEqual(returnValue, [
				'mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4',
				'mock-dir/mock-subdir-1/mock-file-3',
				'mock-dir/mock-file-1',
				'mock-dir/mock-file-2'
			]);
		});

		it('reads the directory and all subdirectories', () => {
			assert.callCount(fs.readdirSync, 3);
			assert.calledWithExactly(fs.readdirSync, 'mock-dir');
			assert.calledWithExactly(fs.readdirSync, 'mock-dir/mock-subdir-1');
			assert.calledWithExactly(fs.readdirSync, 'mock-dir/mock-subdir-1/mock-subdir-2');
		});

		it('stats each of the found file system entries', () => {
			assert.callCount(fs.statSync, 8);
			assert.calledWithExactly(fs.statSync, 'mock-dir/mock-subdir-1');
			assert.calledWithExactly(fs.statSync, 'mock-dir/mock-not-file-1');
			assert.calledWithExactly(fs.statSync, 'mock-dir/mock-file-1');
			assert.calledWithExactly(fs.statSync, 'mock-dir/mock-file-2');
			assert.calledWithExactly(fs.statSync, 'mock-dir/mock-subdir-1/mock-subdir-2');
			assert.calledWithExactly(fs.statSync, 'mock-dir/mock-subdir-1/mock-file-3');
			assert.calledWithExactly(fs.statSync, 'mock-dir/mock-subdir-1/mock-subdir-2/mock-not-file-2');
			assert.calledWithExactly(fs.statSync, 'mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4');
		});

	});

});
