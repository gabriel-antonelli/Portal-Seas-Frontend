import { useQuery } from "react-query";
import { Requests } from "./requests";

export function useUser(email, password) {
  const loginUser = async () => {
    const data = await Requests({
      url: "auth",
      body: { senha: password, usuario: email },
      type: "post",
    });
    return data;
  };
  return useQuery("user", loginUser, {
    manual: true,
    enabled: false,
  });
}
