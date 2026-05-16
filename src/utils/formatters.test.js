import { equal } from 'node:assert/strict';
import { describe, it } from 'node:test';

import { toCamelCase, toKebabCase } from './formatters.js';

describe('toCamelCase', () => {
	it('parses inputs to strings', () => {
		equal(toCamelCase(null), 'null');
	});

	it('removes non-alphanumeric characters', () => {
		equal(toCamelCase('Hello, world!'), 'helloWorld');
	});

	it('camel cases strings', () => {
		equal(toCamelCase('John Do_e-123 '), 'johnDoe123');
	});
});

describe('toKebabCase', () => {
	it('parses inputs to strings', () => {
		equal(toKebabCase(null), 'null');
	});

	it('removes non-alphanumeric characters', () => {
		equal(toKebabCase('Hello, world!'), 'hello-world');
	});

	it('kebab cases strings', () => {
		equal(toKebabCase('John Do_e-123 '), 'john-doe-123');
	});
});
