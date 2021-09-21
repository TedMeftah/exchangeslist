/**
 * Sanitize an object by removing keys with `undefined` value to avoid issue with NextJs
 * https://github.com/vercel/next.js/discussions/11209
 */
export function removeUndefined<T>(obj: T): T {
	return Object.fromEntries(
		Object.entries(obj).filter(([, value]) => value !== undefined)
	) as T
}