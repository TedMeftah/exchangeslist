/**
 * Check if a string is a URL, assume it is if it starts with `https://` or `http://`
 */
export function isURL(string: string): boolean {
	return string.startsWith('https://') || string.startsWith('http://')
}
