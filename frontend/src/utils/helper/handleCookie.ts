import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: 1 });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: 7 });
};

export const removeTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN_KEY);
};

// {
//     data: {
//         accessToken: "",
//         refreshToken: "",
//         firstName: "",
//         lastname: "",
//         userId: "",
//         userRole: "",
//         profilePicture: ""
//     },
//     status: "success",
//     message: "user logged in successfully."
// }
