import { Router } from 'express';
import templateRoutes from './templateRoutes';

const router = Router();

console.log('📋 Routes module loaded');

// API info endpoint
router.get('/', (req, res) => {
  console.log('🎯 Root API handler called');
  res.json({
    message: 'Business Camp 2025 API',
    version: '1.0.0',
    endpoints: {
      templates: '/api/templates',
    },
  });
});

// Alternative root endpoint
router.get('', (req, res) => {
  console.log('🎯 Alternative root API handler called');
  res.json({
    message: 'Business Camp 2025 API (alternative)',
    version: '1.0.0',
    endpoints: {
      templates: '/api/templates',
    },
  });
});

// Template routes
router.use('/templates', templateRoutes);

export default router;