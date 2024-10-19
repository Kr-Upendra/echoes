export type LoginFromData = {
  email: string;
  password: string;
};

export type RegisterFromData = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

export type UpdatePasswordFromData = {
  currentPassword: string;
  newPassword: string;
};

export type UpdateProfileFormData = {
  firstName?: string;
  lastName?: string;
  about?: string;
  profilePicture?: string;
  profileBanner?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipcode?: string;
  };
  socialMedia?: {
    facebook?: string;
    thread?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
};

export type ApiResponse = {
  message: string;
  status?: string;
  data?: any;
};
