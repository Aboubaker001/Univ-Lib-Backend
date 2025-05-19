import { z } from "zod";

// Helper schemas
const isbnSchema = z.string().refine(
    (val) => /^(?:\d{10}|\d{13})$/.test(val),
    { message: "ISBN must be 10 or 13 digits" }
);

const yearSchema = z.number().int().min(1000).max(new Date().getFullYear());

const pageCountSchema = z.number().int().positive();

const urlSchema = z.string().url().or(z.literal(""));

// Book schemas
export const newBookSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    edition: z.string().min(1, { message: "Edition is required" }),
    isbn: isbnSchema,
    publisher: z.string().min(2, { message: "Publisher is required" }),
    publicationYear: yearSchema,
    pageCount: pageCountSchema,  // Fixed typo from 'pageCout' to 'pageCount'
    language: z.string().min(2, { message: "Language is required" }),
    coverUrl: urlSchema.optional(),
    digitalCopyUrl: urlSchema,
    keywords: z.array(z.string().min(1)).min(1, { message: "At least one keyword is required" }),
    authors: z.array(z.string().min(1)).min(1, { message: "At least one author is required" }),
}).strict();

export const updateBookSchema = newBookSchema
    .extend({
        status: z.enum(["AVAILABLE", "CHECKED_OUT", "RESERVED", "UNDER_MAINTENANCE", "LOST"]).optional(),
    })
    .partial()
    .strict()
    .refine(
        (data) => Object.keys(data).length > 0,
        { message: "At least one field must be provided for update" }
    );

// Additional related schemas
export const bookStatusSchema = z.enum(["AVAILABLE", "CHECKED_OUT", "RESERVED", "UNDER_MAINTENANCE", "LOST"]);

export const reservationStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED", "COMPLETED", "CANCELED", "OVERDUE", "RETURNED"]);

export const bookQuerySchema = z.object({
    status: bookStatusSchema.optional(),
    search: z.string().optional(),
    page: z.number().int().positive().optional().default(1),
    limit: z.number().int().positive().max(100).optional().default(10),
});