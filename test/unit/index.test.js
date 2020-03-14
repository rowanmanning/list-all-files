'use strict';

const assert = require('proclaim');

describe('index', () => {
	let index;
	let listAllFiles;

	beforeEach(() => {
		index = require('../../index');
		listAllFiles = require('../../lib/list-all-files');
	});

	it('aliases `lib/list-all-files`', () => {
		assert.strictEqual(index, listAllFiles);
	});

});
