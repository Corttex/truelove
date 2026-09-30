import { ENV } from './env.js';

export const JWT_CONFIG = {
  ACCESS_SECRET: ENV.JWT_SECRET,
  REFRESH_SECRET: ENV.JWT_REFRESH_SECRET,
  KEY_VERSION: ENV.JWT_KEY_VERSION,
  // Conforme Referência da Imagem 4:
  ACCESS_EXPIRES_IN: '15m',     // Expiração curta (15 minutos)
  REFRESH_EXPIRES_IN: '7d',     // Refresh token de 7 dias com rotatividade
  ALGORITHM: 'HS256',
  ISSUER: 'truelove-auth-service',
  AUDIENCE: 'truelove-platform'
};
