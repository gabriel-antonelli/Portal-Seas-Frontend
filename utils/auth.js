//Libs
import {useEffect, useState} from "react";
import Router from "next/router";

//Providers
import {useListSexQuery} from "../providers";

//Components
import {Loading, NavBar} from "../components";
import LoginPage from "../pages/login/loginPage";

export function Login(token) {
    document.cookie = "token=Bearer " + token;
}

export function LogOut() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    Router.push("/")
}

export function GetCookie() {
    if (typeof window !== "undefined") {
        const all = document.cookie;
        if (all) {
            const exists = document.cookie
                .split("; ")
                .find((row) => row.startsWith("token="));
            if (exists) {
                const value = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("token="))
                    .split("=")[1];
                return {all, exists, value};
            }
        }
    }
    return {};
}

export function withAuth(Component) {
    return (pageProps) => {
        const [isLoggedIn, setLoginStatus] = useState(false);
        const {refetch} = useListSexQuery();
        const [loading, setLoading] = useState(true);

        async function verify() {
            if (typeof window !== "undefined") {
                const newFetch = await refetch();
                await setLoading(newFetch.isLoading);
                if (GetCookie().value && newFetch.isSuccess && newFetch.data.status === 200)
                    await setLoginStatus(true);
            }
        }

        useEffect(() => {
            verify();
        }, []);
        if (isLoggedIn)
            return (
                <>
                    <NavBar/>
                    <Component {...pageProps} />
                </>
            )
        if (loading)
            return <Loading show={true}/>;
        return <LoginPage/>;
    };
}
