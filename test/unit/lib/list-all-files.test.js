'use strict';

const assert = require('node:assert');
const td = require('testdouble');

// Note: mock file system is constructed in a function below the tests
describe('lib/list-all-files', () => {
	let fs;
	let fsPromises;
	let listAllFiles;

	beforeEach(() => {
		fs = td.replace('fs');
		fsPromises = td.replace('fs/promises');
		createMockFileSystem(fs, fsPromises);
		listAllFiles = require('../../../lib/list-all-files');
	});

	it('exports a function', () => {
		assert.strictEqual(typeof listAllFiles, 'function');
	});

	describe('listAllFiles(directoryPath)', () => {
		let returnValue;
		let resolvedValue;

		beforeEach(async () => {
			returnValue = listAllFiles('mock-dir');
			resolvedValue = await returnValue;
		});

		it('returns a promise', () => {
			assert.ok(returnValue instanceof Promise);
		});

		it('resolves with an array of file names, ignoring directories and non-files', () => {
			assert.ok(Array.isArray(resolvedValue));
			assert.deepEqual(resolvedValue, [
				'mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4',
				'mock-dir/mock-subdir-1/mock-file-3',
				'mock-dir/mock-file-1',
				'mock-dir/mock-file-2'
			]);
		});

		it('reads the directory and all subdirectories', () => {
			assert.strictEqual(td.explain(fsPromises.readdir).callCount, 3);
			td.verify(fsPromises.readdir('mock-dir'), {times: 1});
			td.verify(fsPromises.readdir('mock-dir/mock-subdir-1'), {times: 1});
			td.verify(fsPromises.readdir('mock-dir/mock-subdir-1/mock-subdir-2'), {times: 1});
		});

		it('stats each of the found file system entries', () => {
			assert.strictEqual(td.explain(fsPromises.stat).callCount, 8);
			td.verify(fsPromises.stat('mock-dir/mock-subdir-1'), {times: 1});
			td.verify(fsPromises.stat('mock-dir/mock-not-file-1'), {times: 1});
			td.verify(fsPromises.stat('mock-dir/mock-file-1'), {times: 1});
			td.verify(fsPromises.stat('mock-dir/mock-file-2'), {times: 1});
			td.verify(fsPromises.stat('mock-dir/mock-subdir-1/mock-subdir-2'), {times: 1});
			td.verify(fsPromises.stat('mock-dir/mock-subdir-1/mock-file-3'), {times: 1});
			td.verify(fsPromises.stat('mock-dir/mock-subdir-1/mock-subdir-2/mock-not-file-2'), {times: 1});
			td.verify(fsPromises.stat('mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4'), {times: 1});
		});

	});

	describe('listAllFiles.sync(directoryPath)', () => {
		let returnValue;

		beforeEach(() => {
			returnValue = listAllFiles.sync('mock-dir');
		});

		it('returns an array of file names, ignoring directories and non-files', () => {
			assert.ok(Array.isArray(returnValue));
			assert.deepEqual(returnValue, [
				'mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4',
				'mock-dir/mock-subdir-1/mock-file-3',
				'mock-dir/mock-file-1',
				'mock-dir/mock-file-2'
			]);
		});

		it('reads the directory and all subdirectories', () => {
			assert.strictEqual(td.explain(fs.readdirSync).callCount, 3);
			td.verify(fs.readdirSync('mock-dir'), {times: 1});
			td.verify(fs.readdirSync('mock-dir/mock-subdir-1'), {times: 1});
			td.verify(fs.readdirSync('mock-dir/mock-subdir-1/mock-subdir-2'), {times: 1});
		});

		it('stats each of the found file system entries', () => {
			assert.strictEqual(td.explain(fs.statSync).callCount, 8);
			td.verify(fs.statSync('mock-dir/mock-subdir-1'), {times: 1});
			td.verify(fs.statSync('mock-dir/mock-not-file-1'), {times: 1});
			td.verify(fs.statSync('mock-dir/mock-file-1'), {times: 1});
			td.verify(fs.statSync('mock-dir/mock-file-2'), {times: 1});
			td.verify(fs.statSync('mock-dir/mock-subdir-1/mock-subdir-2'), {times: 1});
			td.verify(fs.statSync('mock-dir/mock-subdir-1/mock-file-3'), {times: 1});
			td.verify(fs.statSync('mock-dir/mock-subdir-1/mock-subdir-2/mock-not-file-2'), {times: 1});
			td.verify(fs.statSync('mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4'), {times: 1});
		});

	});

	describe('.default', () => {
		it('aliases the module exports', () => {
			assert.strictEqual(listAllFiles, listAllFiles.default);
		});
	});

});

/**
 * Create a mock file system. There's probably a better way of doing this.
 *
 * @param {import('fs')} fs
 *     The file system module.
 * @param {import('fs/promises')} fsPromises
 *     The promise-based file system module.
 */
function createMockFileSystem(fs, fsPromises) {
	const mockDirectory1 = [
		'mock-subdir-1',
		'mock-not-file-1',
		'mock-file-1',
		'mock-file-2'
	];
	const mockDirectory2 = [
		'mock-subdir-2',
		'mock-file-3'
	];
	const mockDirectory3 = [
		'mock-not-file-2',
		'mock-file-4'
	];

	// Create a mock async file system.
	td.when(fsPromises.readdir('mock-dir')).thenResolve(mockDirectory1);
	td.when(fsPromises.readdir('mock-dir/mock-subdir-1')).thenResolve(mockDirectory2);
	td.when(fsPromises.readdir('mock-dir/mock-subdir-1/mock-subdir-2')).thenResolve(mockDirectory3);
	td.when(fsPromises.stat('mock-dir/mock-subdir-1')).thenResolve(createMockStat(true, false));
	td.when(fsPromises.stat('mock-dir/mock-not-file-1')).thenResolve(createMockStat(false, false));
	td.when(fsPromises.stat('mock-dir/mock-file-1')).thenResolve(createMockStat(false, true));
	td.when(fsPromises.stat('mock-dir/mock-file-2')).thenResolve(createMockStat(false, true));
	td.when(fsPromises.stat('mock-dir/mock-subdir-1/mock-subdir-2')).thenResolve(createMockStat(true, false));
	td.when(fsPromises.stat('mock-dir/mock-subdir-1/mock-file-3')).thenResolve(createMockStat(false, true));
	td.when(fsPromises.stat('mock-dir/mock-subdir-1/mock-subdir-2/mock-not-file-2')).thenResolve(createMockStat(false, false));
	td.when(fsPromises.stat('mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4')).thenResolve(createMockStat(false, true));

	// Create a mock sync file system.
	td.when(fs.readdirSync('mock-dir')).thenReturn(mockDirectory1);
	td.when(fs.readdirSync('mock-dir/mock-subdir-1')).thenReturn(mockDirectory2);
	td.when(fs.readdirSync('mock-dir/mock-subdir-1/mock-subdir-2')).thenReturn(mockDirectory3);
	td.when(fs.statSync('mock-dir/mock-subdir-1')).thenReturn(createMockStat(true, false));
	td.when(fs.statSync('mock-dir/mock-not-file-1')).thenReturn(createMockStat(false, false));
	td.when(fs.statSync('mock-dir/mock-file-1')).thenReturn(createMockStat(false, true));
	td.when(fs.statSync('mock-dir/mock-file-2')).thenReturn(createMockStat(false, true));
	td.when(fs.statSync('mock-dir/mock-subdir-1/mock-subdir-2')).thenReturn(createMockStat(true, false));
	td.when(fs.statSync('mock-dir/mock-subdir-1/mock-file-3')).thenReturn(createMockStat(false, true));
	td.when(fs.statSync('mock-dir/mock-subdir-1/mock-subdir-2/mock-not-file-2')).thenReturn(createMockStat(false, false));
	td.when(fs.statSync('mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4')).thenReturn(createMockStat(false, true));
}

/**
 * Create a mock file system stat object.
 *
 * @param {boolean} isDirectory
 *     Whether the stat should represent a directory.
 * @param {boolean} isFile
 *     Whether the stat should represent a file.
 * @returns {{isDirectory: Function, isFile: Function}}
 *     Returns a mock stat object.
 */
function createMockStat(isDirectory, isFile) {
	const isDirectoryFn = td.function();
	const isFileFn = td.function();
	td.when(isDirectoryFn()).thenReturn(isDirectory);
	td.when(isFileFn()).thenReturn(isFile);
	return {
		isDirectory: isDirectoryFn,
		isFile: isFileFn
	};
}
