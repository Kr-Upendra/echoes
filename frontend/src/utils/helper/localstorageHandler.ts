const USER_KEYS = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  USER_ID: "userId",
  USER_ROLE: "userRole",
  PROFILE_PICTURE: "profilePicture",
  EMAIL: "email",
};

export const setUserData = (data: any) => {
  localStorage.setItem(USER_KEYS.FIRST_NAME, data?.firstName);
  localStorage.setItem(USER_KEYS.LAST_NAME, data?.lastName);
  localStorage.setItem(USER_KEYS.USER_ID, data?.userId);
  localStorage.setItem(USER_KEYS.USER_ROLE, data?.role);
  localStorage.setItem(USER_KEYS.PROFILE_PICTURE, data?.profilePicture);
  localStorage.setItem(USER_KEYS.EMAIL, data?.email);
};

export const getUserData = () => {
  return {
    firstName: localStorage.getItem(USER_KEYS.FIRST_NAME),
    lastName: localStorage.getItem(USER_KEYS.LAST_NAME),
    userId: localStorage.getItem(USER_KEYS.USER_ID),
    userRole: localStorage.getItem(USER_KEYS.USER_ROLE),
    profilePicture: localStorage.getItem(USER_KEYS.PROFILE_PICTURE),
  };
};

export const clearUserData = () => {
  Object.values(USER_KEYS).forEach((key) => localStorage.removeItem(key));
};

export const isUserLoggedIn = () => {
  return !!localStorage.getItem(USER_KEYS.USER_ID);
};
