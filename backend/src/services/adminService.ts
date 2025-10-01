import prisma from '../config/database';
import { ApplicationStatus } from '@prisma/client';

/**
 * Get all applications with filters and pagination
 */
export const getAllApplications = async (params: {
  status?: ApplicationStatus;
  category?: string;
  page?: number;
  limit?: number;
}) => {
  const { status, category, page = 1, limit = 50 } = params;
  const skip = (page - 1) * limit;

  // Build filter object
  const where: any = {};
  if (status) {
    where.status = status;
  }
  if (category) {
    where.category = category;
  }

  // Get applications with user info
  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      where,
      skip,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
            profile: {
              select: {
                fullName: true,
                phone: true,
                city: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.application.count({ where }),
  ]);

  return {
    applications,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Update application status (admin only)
 */
export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
) => {
  // Check if application exists
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
  });

  if (!application) {
    throw new Error('Application not found');
  }

  // Update status
  const updated = await prisma.application.update({
    where: { id: applicationId },
    data: { status },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          profile: {
            select: {
              fullName: true,
              phone: true,
              city: true,
            },
          },
        },
      },
    },
  });

  return updated;
};

/**
 * Get all users with profiles
 */
export const getAllUsers = async (params: {
  page?: number;
  limit?: number;
  role?: string;
}) => {
  const { page = 1, limit = 50, role } = params;
  const skip = (page - 1) * limit;

  // Build filter
  const where: any = {};
  if (role) {
    where.role = role;
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        emailVerified: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          select: {
            fullName: true,
            phone: true,
            city: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get all contacts with pagination
 */
export const getAllContacts = async (params: {
  page?: number;
  limit?: number;
}) => {
  const { page = 1, limit = 50 } = params;
  const skip = (page - 1) * limit;

  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.contact.count(),
  ]);

  return {
    contacts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get contact by ID
 */
export const getContactById = async (contactId: string) => {
  const contact = await prisma.contact.findUnique({
    where: { id: contactId },
  });

  if (!contact) {
    throw new Error('Contact not found');
  }

  return contact;
};

/**
 * Get application statistics
 */
export const getApplicationStats = async () => {
  const [total, byStatus, byCategory] = await Promise.all([
    prisma.application.count(),
    prisma.application.groupBy({
      by: ['status'],
      _count: true,
    }),
    prisma.application.groupBy({
      by: ['category'],
      _count: true,
    }),
  ]);

  return {
    total,
    byStatus: byStatus.reduce((acc, item) => {
      acc[item.status] = item._count;
      return acc;
    }, {} as Record<string, number>),
    byCategory: byCategory.reduce((acc, item) => {
      acc[item.category] = item._count;
      return acc;
    }, {} as Record<string, number>),
  };
};
