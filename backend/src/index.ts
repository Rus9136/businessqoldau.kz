import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files - serve uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check (before API routes)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Request logging (can be removed in production)
app.use((req, res, next) => {
  console.log('📥 Request:', req.method, req.path);
  next();
});

// Test routes removed - Router is working correctly

// Routes
console.log('🔧 Mounting routes, typeof routes:', typeof routes);
console.log('🔧 Routes object:', routes);

app.use('/api', (req, res, next) => {
  console.log('🔍 API middleware called, path:', req.path, 'method:', req.method);
  next();
}, routes);
console.log('✅ Routes mounted successfully');

// 404 handler (must be after all routes)
app.use((req, res, next) => {
  console.log('⚠️  404 handler called for path:', req.path);
  res.status(404).json({
    error: 'Not found',
    code: 'NOT_FOUND',
    path: req.path
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});