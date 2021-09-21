/**
 * Sanitize an object by removing keys with `undefined` value to avoid issue with NextJs
 * https://github.com/vercel/next.js/discussions/11209
 */
export function removeUndefined<T>(obj: T): T {
	return Object.fromEntries(
		Object.entries(obj).filter(([, value]) => value !== undefined)
	) as T
}

/**
 * Return a promis that resolves after the specified dealy
 */
export async function wait(delay: number) {
	return await new Promise((resolve) => setTimeout(resolve, delay))
}
