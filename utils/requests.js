import axios from "axios";
import { GetCookie } from "./auth";

export async function Requests(options) {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + options.url;
    const token = GetCookie();
    if (token) axios.defaults.headers.common["Authorization"] = token.value;

    if (options.body) {
      return await axios({
        method: options.type,
        url: url,
        data: options.body,
      });
    }
    return await axios.get(url, {
      params: options.params,
    });
  } catch (err) {
    return await err;
  }
}
