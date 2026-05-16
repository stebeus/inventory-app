const toCamelCase = (string) => {
	const parsedString = String(string);

	const capitalizeRemainder = (string, character) =>
		string + (character.charAt(0).toUpperCase() + character.slice(1));

	return parsedString
		.toLowerCase()
		.split(' ')
		.reduce(capitalizeRemainder)
		.replace(/[^0-9A-Za-z]/g, '');
};

const toKebabCase = (string) => {
	const parsedString = String(string);

	return parsedString
		.toLowerCase()
		.trim()
		.replaceAll(' ', '-')
		.replace(/[^0-9A-Za-z-]/g, '');
};

export { toCamelCase, toKebabCase };
