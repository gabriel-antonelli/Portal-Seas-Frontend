import axios from "axios";

export default async function Requests(options){
    try{
        const url = process.env.NEXT_PUBLIC_API_URL + options.url;
        if(options.body){
            const result = await axios(
                {
                    method: options.type,
                    url: url,
                    data: options.body
                }
            )
            return result;
        }
        const result = await axios.get(url, {
            params: options.params
        })
        return result;
    }
    catch(err){
        return await err;
    }
}