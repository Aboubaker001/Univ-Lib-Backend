import { z } from 'zod';

export const newUserSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters",
  }),
  familyName: z.string().min(2, {
    message: "Family name must be at least 2 characters",
  }),
  studentId: z.string().regex(/^(199[0-9]|20[0-1][0-9]|202[0-4])[0-9]{8}$/, {
    message: "Student ID must be in the correct format (e.g., 202412345678)",
  }),
  faculty: z.enum(["ST", "SMA", "HSS", "ECMS", "LPS", "AL", "IS", "ENL"]),
  academicYear: z.enum(["1", "2", "3", "4", "5", "6"]),
  major: z.string().min(2, {
    message: "Major must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().regex(/^\+213[0-9]{9}$/, {
    message: "Phone number must be in the format +213 followed by 9 digits",
  }),
  idCardUrl: z.string().optional(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  idProfilePic: z.string().optional(),
  role: z.enum(['STUDENT', 'LIBRARIAN', 'ADMIN']).default('STUDENT'),
  isVerified: z.boolean().default(false),
  reservationLimit: z.number().default(3),
}).refine(data => {
  // Combine country code and phone number
  return true;
});