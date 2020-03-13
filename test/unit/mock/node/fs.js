'use strict';

const sinon = require('sinon');

const fs = {
	promises: {
		readdir: sinon.stub().resolves([]),
		stat: sinon.stub()
	},
	readdirSync: sinon.stub().returns([]),
	statSync: sinon.stub()
};

function createStatResult(isDirectory, isFile) {
	return {
		isDirectory: sinon.stub().returns(isDirectory),
		isFile: sinon.stub().returns(isFile)
	};
}

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
// There's probably a better way of doing this
fs.promises.readdir.withArgs('mock-dir').resolves(mockDirectory1);
fs.promises.readdir.withArgs('mock-dir/mock-subdir-1').resolves(mockDirectory2);
fs.promises.readdir.withArgs('mock-dir/mock-subdir-1/mock-subdir-2').resolves(mockDirectory3);
fs.promises.stat.withArgs('mock-dir/mock-subdir-1').resolves(createStatResult(true, false));
fs.promises.stat.withArgs('mock-dir/mock-not-file-1').resolves(createStatResult(false, false));
fs.promises.stat.withArgs('mock-dir/mock-file-1').resolves(createStatResult(false, true));
fs.promises.stat.withArgs('mock-dir/mock-file-2').resolves(createStatResult(false, true));
fs.promises.stat.withArgs('mock-dir/mock-subdir-1/mock-subdir-2').resolves(createStatResult(true, false));
fs.promises.stat.withArgs('mock-dir/mock-subdir-1/mock-file-3').resolves(createStatResult(false, true));
fs.promises.stat.withArgs('mock-dir/mock-subdir-1/mock-subdir-2/mock-not-file-2').resolves(createStatResult(false, false));
fs.promises.stat.withArgs('mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4').resolves(createStatResult(false, true));

// Create a mock sync file system.
// There's probably a better way of doing this
fs.readdirSync.withArgs('mock-dir').returns(mockDirectory1);
fs.readdirSync.withArgs('mock-dir/mock-subdir-1').returns(mockDirectory2);
fs.readdirSync.withArgs('mock-dir/mock-subdir-1/mock-subdir-2').returns(mockDirectory3);
fs.statSync.withArgs('mock-dir/mock-subdir-1').returns(createStatResult(true, false));
fs.statSync.withArgs('mock-dir/mock-not-file-1').returns(createStatResult(false, false));
fs.statSync.withArgs('mock-dir/mock-file-1').returns(createStatResult(false, true));
fs.statSync.withArgs('mock-dir/mock-file-2').returns(createStatResult(false, true));
fs.statSync.withArgs('mock-dir/mock-subdir-1/mock-subdir-2').returns(createStatResult(true, false));
fs.statSync.withArgs('mock-dir/mock-subdir-1/mock-file-3').returns(createStatResult(false, true));
fs.statSync.withArgs('mock-dir/mock-subdir-1/mock-subdir-2/mock-not-file-2').returns(createStatResult(false, false));
fs.statSync.withArgs('mock-dir/mock-subdir-1/mock-subdir-2/mock-file-4').returns(createStatResult(false, true));

module.exports = fs;
