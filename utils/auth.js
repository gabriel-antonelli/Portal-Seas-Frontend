import Router from "next/router";
import {useEffect, useState} from "react";
import {useListSexQuery} from "../providers/listSexQuery";
import {Loading} from "../components";
import LoginPage from "../pages/login/loginPage";
import Navbar from "../components/navbar";

export function Login(token) {
    document.cookie = "token=Bearer " + token;
}

export function LogOut() {
    const token = GetCookie();
    if (token.exists) {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        Router.push("/");
        return true;
    }
    return false;
}

export function GetCookie() {
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
    return false;
}

export function withAuth(Component) {
    return (pageProps) => {
        const [isLoggedIn, setLoginStatus] = useState(false);
        const {refetch} = useListSexQuery();
        const [loading, setLoading] = useState(true);

        async function verify() {
            if (typeof await window !== "undefined") {
                const newFetch = await refetch();
                await setLoading(newFetch.isLoading);
                if (GetCookie().value && newFetch.isSuccess && newFetch.data.status === 200)
                    await setLoginStatus(true);
                else await Router.push("/");
            }
        }

        useEffect(() => {
            verify();
        }, []);
        if (isLoggedIn)
            return (
                <>
                    <Navbar/>
                    <Component {...pageProps} />
                </>
            )
        if (loading)
            return <Loading/>;
        return <LoginPage/>;
    };
}
