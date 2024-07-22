import Cookies from "universal-cookie";
const cookie = new Cookies();

const getExpiryDate = (type: string) => {
  const date = new Date();
  if (type === "24hours") {
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000); // افزودن 24 ساعت به زمان فعلی
  } else if (type === "30days") {
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000); // افزودن 30 روز به زمان فعلی
  }
  return date;
};

export const setCookie = (tokens: any) => {
  cookie.set("accessToken", tokens.accessToken, {
    expires: getExpiryDate("24hours"),
    path: "/"
  });
  cookie.set("refreshToken", tokens.accessToken, {
    expires: getExpiryDate("30days"),
    path: "/"
  });
};

export const getCookie = (cookieName: string) => {
  return cookie.get(cookieName)
};
