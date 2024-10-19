const CURRENT_USER_INFO = "currentUser";

interface ICurrentUser {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  userId: string;
  role: string;
}

export const setUserData = (data: ICurrentUser) => {
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
