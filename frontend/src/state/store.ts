import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";
import userProfileReducer from "./slices/userProfileSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
