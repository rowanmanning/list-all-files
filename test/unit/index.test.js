'use strict';

const assert = require('proclaim');
const mockery = require('mockery');

describe('index', () => {
	let index;

	beforeEach(() => {
		mockery.registerMock('./lib/list-all-files', 'mock-list-all-files');
		index = require('../../index');
	});

	it('aliases `lib/list-all-files`', () => {
		assert.strictEqual(index, 'mock-list-all-files');
	});

});
