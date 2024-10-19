import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
}

interface SocialMedia {
  facebook?: string;
  thread?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
}

interface IUserProfile {
  _id: string;
  userName?: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  profileBanner?: string;
  about: string;
  createdAt: string;
  updatedAt: string;
  address?: Address;
  socialMedia?: SocialMedia;
}

interface UserProfileState {
  userProfile: IUserProfile | null;
}

const initialState: UserProfileState = {
  userProfile: null,
};

const currentUserSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (
      state,
      action: PayloadAction<UserProfileState["userProfile"]>
    ) => {
      state.userProfile = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
  },
});

export const { setUserProfile, clearUserProfile } = currentUserSlice.actions;
export default currentUserSlice.reducer;
