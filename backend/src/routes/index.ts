import { Router } from 'express';
import authRoutes from './auth';
import profileRoutes from './profile';
import applicationRoutes from './application';
import contactRoutes from './contact';
import adminRoutes from './adminRoutes';
import templateRoutes from './templateRoutes';

const router = Router();

// API info endpoint
router.get('', (req, res) => {
  console.log('🎯 Root API handler called');
  res.json({
    message: 'Business Camp 2025 API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      applications: '/api/applications',
      contacts: '/api/contacts',
      admin: '/api/admin',
      templates: '/api/templates',
    },
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/applications', applicationRoutes);
router.use('/contacts', contactRoutes);
router.use('/admin', adminRoutes);
router.use('/templates', templateRoutes);

export default router;