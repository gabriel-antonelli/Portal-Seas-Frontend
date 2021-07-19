import {Requests} from "../utils";
import {useQuery} from "react-query";

export function useListUsersQuery() {
    const listUsers = async () => {
        return await Requests({
            url: "sexo",
            type: "get"
        });
    };
    return useQuery("user", listUsers, {
        enabled: false
    });
}
