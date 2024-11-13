import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registrationSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const noteSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 words" })
    .max(50, { message: "Title must not exceed 50 words" }),
  content: z.string().min(20),
  tags: z
    .array(z.string())
    .nonempty({ message: "Tags must be an array of strings" }),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(4, "Password must be at least 6 characters"),
  newPassword: z.string().min(4, "Password must be at least 6 characters"),
});

const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zipcode: z.string().optional(),
});

// Going to add this lator
const socialMediaSchema = z.object({
  facebook: z.string().optional(),
  thread: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(1).optional(),
  about: z.string().optional(),
  address: addressSchema,
  socialMedia: socialMediaSchema,
});

export const voiceNoteSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 words" })
    .max(255, { message: "Title must not exceed 255 words" }),
  voiceNote: z.string({ message: "Voice note is required." }),
  description: z.string().optional(),
  tags: z
    .array(z.string())
    .nonempty({ message: "Tags must be an array of strings" })
    .optional(),
  isFavorite: z.boolean().default(false),
});

export const journalNoteSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must have at least 3 words" })
    .max(255, { message: "Title must not exceed 255 words" }),
  content: z.string().min(1, { message: "content is required." }),
  mood: z.string(),
  tags: z.array(z.string()).optional(),
});
