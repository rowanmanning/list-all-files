'use strict';

const sinon = require('sinon');

module.exports = {
	join: sinon.spy((...args) => args.join('/'))
};
