import bcrypt from 'bcrypt';
import prisma from '../config/database';
import { generateAccessToken, generateRefreshToken, getRefreshTokenExpiry, verifyRefreshToken } from '../utils/jwt';
import { generateToken, sendVerificationEmail, sendPasswordResetEmail } from '../utils/email';
import { AppError } from '../middleware/errorHandler';

const SALT_ROUNDS = 10;

export interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
  };
}

export const register = async (input: RegisterInput): Promise<{ userId: string }> => {
  const { email, password, fullName, phone } = input;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user and profile in a transaction
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      emailVerified: true, // Auto-verify user on registration
      profile: {
        create: {
          fullName,
          phone,
        },
      },
    },
  });

  return { userId: user.id };
};

export const login = async (input: LoginInput): Promise<AuthResponse> => {
  const { email, password } = input;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    throw new AppError('Invalid credentials', 401);
  }

  // Generate tokens
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: getRefreshTokenExpiry(),
    },
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
    },
  };
};

export const refreshAccessToken = async (refreshToken: string): Promise<{ accessToken: string }> => {
  // Verify refresh token
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new AppError('Invalid refresh token', 401);
  }

  // Check if refresh token exists in database
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new AppError('Refresh token expired or invalid', 401);
  }

  // Generate new access token
  const accessToken = generateAccessToken(payload.userId);

  return { accessToken };
};

export const logout = async (refreshToken: string): Promise<void> => {
  // Delete refresh token from database
  await prisma.refreshToken.deleteMany({
    where: { token: refreshToken },
  });
};

export const verifyEmail = async (token: string): Promise<void> => {
  // Find verification token
  const verificationToken = await prisma.emailVerificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    throw new AppError('Invalid verification token', 400);
  }

  if (verificationToken.expiresAt < new Date()) {
    throw new AppError('Verification token expired', 400);
  }

  // Update user
  await prisma.user.update({
    where: { id: verificationToken.userId },
    data: { emailVerified: true },
  });

  // Delete verification token
  await prisma.emailVerificationToken.delete({
    where: { id: verificationToken.id },
  });
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Don't reveal if email exists or not
    return;
  }

  // Generate reset token
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour

  // Delete any existing reset tokens for this user
  await prisma.passwordResetToken.deleteMany({
    where: { userId: user.id },
  });

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });

  // Send password reset email
  try {
    await sendPasswordResetEmail(email, token);
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw new AppError('Failed to send password reset email', 500);
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  // Find reset token
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken) {
    throw new AppError('Invalid reset token', 400);
  }

  if (resetToken.expiresAt < new Date()) {
    throw new AppError('Reset token expired', 400);
  }

  // Hash new password
  const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

  // Update user password
  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { passwordHash },
  });

  // Delete reset token
  await prisma.passwordResetToken.delete({
    where: { id: resetToken.id },
  });

  // Delete all refresh tokens for this user (force re-login)
  await prisma.refreshToken.deleteMany({
    where: { userId: resetToken.userId },
  });
};

export const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      emailVerified: true,
      role: true,
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};