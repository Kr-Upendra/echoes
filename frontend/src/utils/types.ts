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

export type NoteFormData = {
  title?: string;
  category?: string;
  content?: string;
  tags?: string[];
  isFavorite?: boolean;
};

export type Address = {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
};

export type SocialMedia = {
  facebook?: string;
  thread?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
};

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
  acceptedTypes: Record<string, string[]>;
  fileSize: FileSizeRange;
  dimension: DimensionRange;
  bucketName: string;
  formValue: string;
  keyName: string;
  dirName: string;
  preTitle: string;
}

export interface UpdateProfileFormData {
  firstName?: string;
  lastName?: string;
  about?: string;
  profilePicture?: string;
  profileBanner?: string;
  address?: Address;
  socialMedia?: SocialMedia;
}

export type MoodType = {
  moodType: "excited" | "happy" | "neutral" | "sad" | "angry";
};

export type JournalFormData = {
  title: string;
  content: string;
  mood: string;
  tags?: string[];
  images: any;
};

export type JournalUpdateFormData = {
  title?: string;
  content?: string;
  mood?: string;
  tags?: string[];
  images?: string[];
};
