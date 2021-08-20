import LoginPage from "./login/loginPage";
import {GetCookie} from "../utils";
import {useListSexQuery} from "../providers";
import Router from "next/router";

export default function Index() {
    const {refetch, isSuccess, data} = useListSexQuery();
    if (!data)
        refetch()
    if (GetCookie().value && isSuccess && data.status === 200)
        Router.push("/dashboard");
    return <LoginPage/>;
}
