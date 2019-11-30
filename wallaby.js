'use strict';

module.exports = () => ({
	debug: true,
	testFramework: 'mocha',
	files: [
		'src/**/*.ts'
	],
	tests: [
		'test/*.spec.ts'
	],
	env: {
		type: 'node'
	}
});
