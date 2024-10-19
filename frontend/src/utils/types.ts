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

type Address = {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
};

type SocialMedia = {
  facebook?: string;
  thread?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
};

export interface UpdateProfileFormData {
  firstName?: string;
  lastName?: string;
  about?: string;
  profilePicture?: string;
  profileBanner?: string;
  address?: Address;
  socialMedia?: SocialMedia;
}

export type ApiResponse = {
  message: string;
  status?: string;
  data?: any;
};

type FileSizeRange = {
  max: number;
  min: number;
};

type DimensionRange = {
  width: FileSizeRange;
  height: FileSizeRange;
};

export interface ImageProperties {
  acceptedTypes: Record<string, string[]>; // Mapping of accepted types to file extensions
  fileSize: FileSizeRange; // Object with max and min file size in bytes
  dimension: DimensionRange; // Object with width and height ranges
  bucketName: string; // Bucket name for storage
  keyName: string; // Key name for storage
  dirName: string; // Directory name for storage
}
