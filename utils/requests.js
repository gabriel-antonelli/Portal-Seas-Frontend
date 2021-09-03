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
			url.search = new URLSearchParams(options.params).toString();
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
