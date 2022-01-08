require('dotenv').config();
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const SESSION_EXPIRY = process.env.SESSION_EXPIRY;
export const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const WHITELISTED_DOMAINS = (process.env.WHITELISTED_DOMAINS as string).split(',');
