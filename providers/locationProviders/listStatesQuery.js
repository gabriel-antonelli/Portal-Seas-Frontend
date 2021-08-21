import {Requests} from "../../utils";
import {useQuery} from "react-query";

export function useListStatesQuery(props) {
    const listStates = async () => {
        return Requests({
            url: "estado",
            type: "get"
        });
    };

    return useQuery("listStates", listStates, {
        refetchOnWindowFocus: false,
    });
}
