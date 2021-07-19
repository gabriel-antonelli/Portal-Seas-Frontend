import Router from "next/router";
import LoginPage from "../pages/login/loginPage";
import {useEffect, useState} from "react";
import {useListUsersQuery} from "../providers/listUsersQuery";

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
        const {refetch} = useListUsersQuery();
        useEffect(() => {
            if (typeof window !== "undefined") {
                const accessToken = GetCookie().value;
                const newFetch = refetch();
                if (accessToken && newFetch.isSuccess && newFetch.data.status === 200) {
                    setLoginStatus(true);
                } else {
                    Router.push("/");
                }
            }
        }, []);
        if (isLoggedIn) {
            return <Component {...pageProps} />;
        } else {
            return <LoginPage/>;
        }
    };
}
