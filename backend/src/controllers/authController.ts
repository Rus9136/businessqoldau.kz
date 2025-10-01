import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as authService from '../services/authService';
import { AppError } from '../middleware/errorHandler';

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Full name must not exceed 100 characters'),
  phone: z.string().regex(/^\+77\d{9}$/, 'Phone must be in format +77XXXXXXXXX'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const result = await authService.register(validatedData);

    res.status(201).json({
      message: 'Регистрация успешно завершена! Теперь вы можете войти в систему.',
      userId: result.userId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError(error.issues[0].message, 400));
    } else {
      next(error);
    }
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.login(validatedData);

    res.json({
      message: 'Login successful',
      ...result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError(error.issues[0].message, 400));
    } else {
      next(error);
    }
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = refreshTokenSchema.parse(req.body);
    const result = await authService.refreshAccessToken(validatedData.refreshToken);

    res.json({
      message: 'Token refreshed',
      ...result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError(error.issues[0].message, 400));
    } else {
      next(error);
    }
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = refreshTokenSchema.parse(req.body);
    await authService.logout(validatedData.refreshToken);

    res.json({
      message: 'Logout successful',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError(error.issues[0].message, 400));
    } else {
      next(error);
    }
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = verifyEmailSchema.parse(req.body);
    await authService.verifyEmail(validatedData.token);

    res.json({
      message: 'Email verified successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError(error.issues[0].message, 400));
    } else {
      next(error);
    }
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = forgotPasswordSchema.parse(req.body);
    await authService.requestPasswordReset(validatedData.email);

    res.json({
      message: 'If the email exists, a password reset link has been sent',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError(error.issues[0].message, 400));
    } else {
      next(error);
    }
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = resetPasswordSchema.parse(req.body);
    await authService.resetPassword(validatedData.token, validatedData.password);

    res.json({
      message: 'Password reset successful. Please login with your new password.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError(error.issues[0].message, 400));
    } else {
      next(error);
    }
  }
};