import { Router } from 'express';
import authRoutes from './auth';
import profileRoutes from './profile';

const router = Router();

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Business Camp 2025 API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      applications: '/api/applications',
      contacts: '/api/contacts',
    },
  });
});

// Route modules
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);

// TODO: Add remaining route modules
// router.use('/applications', applicationRoutes);
// router.use('/contacts', contactRoutes);

export default router;