const CURRENT_USER_INFO = "currentUser";

export const setUserData = (data: any) => {
  localStorage.setItem(CURRENT_USER_INFO, JSON.stringify(data));
};

export const getUserData = () => {
  const currentUserInfo: any = localStorage.getItem(CURRENT_USER_INFO);
  return JSON.parse(currentUserInfo);
};

export const clearUserData = () => {
  localStorage.removeItem(CURRENT_USER_INFO);
};

export const isUserLoggedIn = () => {
  return !!localStorage.getItem(CURRENT_USER_INFO);
};
