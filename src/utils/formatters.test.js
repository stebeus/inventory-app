import { equal } from 'node:assert/strict';
import { describe, it } from 'node:test';

import { toKebabCase } from './formatters.js';

describe('toKebabCase', () => {
	it('parses inputs to strings', () => {
		const string = toKebabCase(null);
		equal(string, 'null');
	});

	it('removes non-alphanumeric characters', () => {
		const string = toKebabCase('Hello, world!');
		equal(string, 'hello-world');
	});

	it('kebab cases strings', () => {
		const string = toKebabCase('John Do_e-123 ');
		equal(string, 'john-doe-123');
	});
});
