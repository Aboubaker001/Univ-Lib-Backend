import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT;
export const JWT = process.env.JWT;
export const APP_EMAIL = process.env.APP_EMAIL;
export const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const SUPABASE_KEY = process.env.SUPABASE_KEY;
export const SUPABASE_URL = process.env.SUPABASE_URL;
export const APP_URI = process.env.APP_URI;
export const CLIENT_URI = process.env.APP_URI;
export const RESERVATION_LIMIT = parseInt(process.env.RESERVATION_LIMIT);
export const RESERVATION_EXPIRE = parseInt(process.env.RESERVATION_EXPIRE);