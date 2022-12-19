import { NextResponse } from 'next/server';

export default async function middleware(req) {
	const { ok } = await fetch('https://google.com');
	// fetch(process.env.NEXT_PUBLIC_API_URL + 'cor', {
	// headers: { Authorization: req.cookies[process.env.NEXT_PUBLIC_TOKEN] },
	// });
	const url = req.nextUrl.clone();
	url.pathname = '/login/loginPage'
	if (ok) {
		return NextResponse.next();
	} else if (req.nextUrl.href !== '/login/loginPage') {
		return NextResponse.redirect(url);
	}
}
