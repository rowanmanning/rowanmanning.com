
const find = /[^a-z0-9\-]+/;
const replace = '-';

export default function urlize(string) {
	return string.toLowerCase().replace(find, replace);
}
