export function getCookie(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }
  return decodeURIComponent(cookie.split("=")[1]);
}

export function getKuki(kuki : string,name: string) {
  const cookie = kuki
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }
  return decodeURIComponent(cookie.split("=")[1]);
}