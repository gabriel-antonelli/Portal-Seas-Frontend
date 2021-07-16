export function Auth(token) {
  document.cookie = "token=Bearer " + token;
}

export function Logout() {
  const token = GetCookie();
  if (token.exists) {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
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
      return { all, exists, value };
    }
  }
  return false;
}
