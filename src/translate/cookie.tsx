export const get = (key: string) => {
	const cookie = document.cookie.split(';').map((c) => c.split('=')).find(([cookieName]) => cookieName.trim() === key)
	return cookie && cookie[1];
}

export const set = (key: string, value: string) => document.cookie = `${key}=${value}`;