import { Router } from 'express';

const router = Router();

// Placeholder routes - will be implemented in later stages
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

// TODO: Add route modules
// router.use('/auth', authRoutes);
// router.use('/profile', profileRoutes);
// router.use('/applications', applicationRoutes);
// router.use('/contacts', contactRoutes);

export default router;