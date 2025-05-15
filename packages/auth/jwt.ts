import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET, UserAuthPayload } from './constants';

export function signJwt(payload: UserAuthPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwt(token: string): UserAuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserAuthPayload;
  } catch {
    return null;
  }
}
 