import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

export interface TokenPayload {
  userId: string;
}

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId } as TokenPayload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId } as TokenPayload, jwtConfig.refreshSecret, {
    expiresIn: jwtConfig.refreshExpiresIn,
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, jwtConfig.secret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, jwtConfig.refreshSecret) as TokenPayload;
};

export const getRefreshTokenExpiry = (): Date => {
  // Parse refresh token expiry (e.g., "7d" -> 7 days)
  const expiryStr = jwtConfig.refreshExpiresIn;
  const match = expiryStr.match(/^(\d+)([dhms])$/);

  if (!match) {
    throw new Error('Invalid refresh token expiry format');
  }

  const [, amount, unit] = match;
  const value = parseInt(amount);
  const now = new Date();

  switch (unit) {
    case 'd':
      now.setDate(now.getDate() + value);
      break;
    case 'h':
      now.setHours(now.getHours() + value);
      break;
    case 'm':
      now.setMinutes(now.getMinutes() + value);
      break;
    case 's':
      now.setSeconds(now.getSeconds() + value);
      break;
  }

  return now;
};