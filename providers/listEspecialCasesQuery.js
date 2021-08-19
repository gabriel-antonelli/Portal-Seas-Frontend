import {Requests} from "../utils";
import {useQuery} from "react-query";

export function useListEspecialCasesQuery() {
    const listEspecialCases = async () => {
        return await Requests({
            url: "casoespecial",
            type: "get"
        });
    };
    return useQuery("listEspecialCases", listEspecialCases, {
        refetchOnWindowFocus: false,
    });
}
