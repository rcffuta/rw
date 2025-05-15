export const JWT_SECRET = process.env.SECURE_SECRET!;
export const JWT_EXPIRES_IN = '7d';
export const MAX_DAYS = 7 * 24 * 60 * 60 * 1000;
export const IS_PROD = process.env.NODE_ENV === 'production';

export const DOMAIN = IS_PROD ? '.vercel.app' : undefined;

export const AUTH_KEY = "session";

export type UserAuthPayload = {
    userId: number;
    username: string;
    isAdmin: boolean;
    email: string;
    image?: string;
};