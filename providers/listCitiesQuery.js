import {Requests} from "../utils";
import {useQuery} from "react-query";

export function useListCitiesQuery(id) {
    const listCities = async () => {
        return await Requests({
            url: "cidade/" + id,
            type: "get"
        });
    };
    return useQuery("listStates", listCities);
}
