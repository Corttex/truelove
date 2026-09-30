import express from 'express';
import { authController } from '../controllers/authController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public auth endpoints
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

// Protected auth endpoint (requires valid Bearer JWT)
router.get('/me', authenticateJWT, authController.me);

export default router;
