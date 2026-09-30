import { logger } from '../utils/logger.js';

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms`, {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent')
    });
  });
  next();
};

export const errorHandler = (err, req, res, next) => {
  logger.error(`Erro não capturado na rota ${req.method} ${req.path}:`, {
    message: err.message,
    stack: err.stack
  });

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Erro interno do servidor',
    timestamp: new Date().toISOString()
  });
};
