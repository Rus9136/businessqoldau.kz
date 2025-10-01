import { Request, Response } from 'express';
import { z } from 'zod';
import {
  getAllApplications,
  updateApplicationStatus,
  getAllUsers,
  getApplicationStats,
} from '../services/adminService';

// Validation schemas
const getApplicationsSchema = z.object({
  status: z.enum(['draft', 'submitted']).optional(),
  category: z.enum(['starter', 'active', 'it']).optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});

const updateStatusSchema = z.object({
  status: z.enum(['draft', 'submitted']),
});

const getUsersSchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  role: z.enum(['user', 'admin']).optional(),
});

/**
 * GET /api/admin/applications
 * Get all applications with filters and pagination
 */
export const getApplicationsHandler = async (req: Request, res: Response) => {
  try {
    const validation = getApplicationsSchema.safeParse(req.query);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid query parameters',
        details: validation.error.errors,
      });
    }

    const result = await getAllApplications(validation.data);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Get applications error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch applications',
    });
  }
};

/**
 * PUT /api/admin/applications/:id/status
 * Update application status
 */
export const updateApplicationStatusHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate UUID
    if (!z.string().uuid().safeParse(id).success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid application ID',
      });
    }

    const validation = updateStatusSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body',
        details: validation.error.errors,
      });
    }

    const application = await updateApplicationStatus(id, validation.data.status);

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error: any) {
    console.error('Update application status error:', error);

    if (error.message === 'Application not found') {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to update application status',
    });
  }
};

/**
 * GET /api/admin/users
 * Get all users with profiles
 */
export const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const validation = getUsersSchema.safeParse(req.query);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid query parameters',
        details: validation.error.errors,
      });
    }

    const result = await getAllUsers(validation.data);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
    });
  }
};

/**
 * GET /api/admin/stats
 * Get application statistics
 */
export const getStatsHandler = async (req: Request, res: Response) => {
  try {
    const stats = await getApplicationStats();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
    });
  }
};
