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

export type ApiResponse = {
  message: string;
  status?: string;
  data?: any;
};
