import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { checkApplicationPeriodForAuth } from '../middleware/applicationPeriod';

const router = Router();

// POST /api/auth/register - Register new user
router.post('/register', checkApplicationPeriodForAuth, authController.register);

// POST /api/auth/login - Login user
router.post('/login', checkApplicationPeriodForAuth, authController.login);

// POST /api/auth/refresh - Refresh access token
router.post('/refresh', authController.refresh);

// POST /api/auth/logout - Logout user
router.post('/logout', authController.logout);

// POST /api/auth/verify-email - Verify email with code
router.post('/verify-email', authController.verifyEmail);

// POST /api/auth/resend-code - Resend verification code
router.post('/resend-code', authController.resendVerificationCode);

// POST /api/auth/forgot-password - Request password reset
router.post('/forgot-password', authController.forgotPassword);

// POST /api/auth/verify-reset-code - Verify reset code
router.post('/verify-reset-code', authController.verifyResetCode);

// POST /api/auth/reset-password - Reset password with code
router.post('/reset-password', authController.resetPassword);

// GET /api/auth/me - Get current user info
router.get('/me', authenticate, authController.getCurrentUser);

export default router;