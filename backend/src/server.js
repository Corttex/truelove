import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import { requestLogger, errorHandler } from './middlewares/requestLogger.js';
import authRoutes from './routes/authRoutes.js';
import { agentRouter, metaRouter, metricsRouter } from './routes/agentRoutes.js';
import { logger } from './utils/logger.js';
import './config/database.js'; // initialize pool

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// API Routes (Mounted under /api/v1 and legacy root for compatibility)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', agentRouter);
app.use('/api/v1/meta', metaRouter);
app.use('/api/v1', metricsRouter);

// Legacy and convenience routes (Direct Webhook Meta support)
app.use('/v1/meta', metaRouter);
app.use('/', agentRouter);
app.use('/', metricsRouter);

// Centralized error handler
app.use(errorHandler);

// Start server if not running in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(ENV.PORT, () => {
    logger.info(`🚀 [True Love Backend & Agent Engine] Operando na porta ${ENV.PORT} em modo ${ENV.NODE_ENV}`);
    logger.info(`🔐 [Auth System] JWT Access Token (15m) + Refresh Token (7d) com rotação ativo`);
    logger.info(`🤖 [Agents] Sofia, Arthur, Eros, Clara e Lorenzo prontos para triagem 24/7`);
    logger.info(`🌐 [Endpoints] Meta Webhook: /v1/meta/webhook | Auth: /api/v1/auth/login | Health: /health`);
  });
}

export default app;
