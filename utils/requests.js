import { GetCookie } from './auth';

export async function Requests(options) {
	try {
		const url = new URL(process.env.NEXT_PUBLIC_API_URL + options.url);
		const token = GetCookie(process.env.NEXT_PUBLIC_TOKEN);
		let init = {
			method: options.type,
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		if (token.tokenValue) {
			init = {
				...init,
				headers: {
					Authorization: token.tokenValue,
					...init.headers,
				},
			};
		}
		if (options.body) {
			init = {
				...init,
				body: JSON.stringify(options.body),
			};
		}
		if (options.params) {
			// eslint-disable-next-line no-unused-vars
			const searchParams = Object.fromEntries(Object.entries(options.params).filter(([_, v]) => v !== null && v !== undefined));
			url.search = new URLSearchParams(searchParams).toString();
		}
		const res = await fetch(url.toString(), init);
		return { data: await res.json(), success: res.ok, status: res.status };
	} catch (err) {
		if (err.response) {
			return err.response;
		}
		return err;
	}
}
