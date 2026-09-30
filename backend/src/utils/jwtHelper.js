import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';

// In-Memory store for active refresh tokens & revoked list (can be backed by Redis in production)
const activeRefreshTokens = new Map();
const revokedTokens = new Set();

/**
 * Emite par de chaves JWT (Access Token de curta duração 15m + Refresh Token 7d)
 * Implementa padrão da Imagem 4: Expiração Curta + Refresh Tokens + Rotatividade
 */
export const generateTokenPair = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role, // 'superadmin' | 'dono' | 'concierge' | 'user'
    permissions: user.permissions || [],
    keyVersion: JWT_CONFIG.KEY_VERSION
  };

  const accessToken = jwt.sign(payload, JWT_CONFIG.ACCESS_SECRET, {
    expiresIn: JWT_CONFIG.ACCESS_EXPIRES_IN,
    algorithm: JWT_CONFIG.ALGORITHM,
    issuer: JWT_CONFIG.ISSUER,
    audience: JWT_CONFIG.AUDIENCE
  });

  const refreshToken = jwt.sign(
    { userId: user.id, tokenType: 'refresh', keyVersion: JWT_CONFIG.KEY_VERSION },
    JWT_CONFIG.REFRESH_SECRET,
    {
      expiresIn: JWT_CONFIG.REFRESH_EXPIRES_IN,
      algorithm: JWT_CONFIG.ALGORITHM,
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE
    }
  );

  // Armazena refresh token ativo para controle de sessão e revogação
  activeRefreshTokens.set(refreshToken, {
    userId: user.id,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  });

  return {
    accessToken,
    refreshToken,
    expiresIn: 900, // 15 minutos em segundos
    tokenType: 'Bearer',
    keyVersion: JWT_CONFIG.KEY_VERSION
  };
};

/**
 * Validação do Access Token
 */
export const verifyAccessToken = (token) => {
  if (revokedTokens.has(token)) {
    throw new Error('Token revogado previamente');
  }
  return jwt.verify(token, JWT_CONFIG.ACCESS_SECRET, {
    issuer: JWT_CONFIG.ISSUER,
    audience: JWT_CONFIG.AUDIENCE
  });
};

/**
 * Rotatividade de Refresh Tokens (Key & Token Rotation)
 * Invalida o refresh token anterior e gera um par novinho em folha
 */
export const rotateRefreshToken = (oldRefreshToken, userFinder) => {
  if (!activeRefreshTokens.has(oldRefreshToken) || revokedTokens.has(oldRefreshToken)) {
    throw new Error('Refresh token inválido, expirado ou revogado');
  }

  const decoded = jwt.verify(oldRefreshToken, JWT_CONFIG.REFRESH_SECRET, {
    issuer: JWT_CONFIG.ISSUER,
    audience: JWT_CONFIG.AUDIENCE
  });

  // Revoga o token antigo imediatamente (rotatividade estrita)
  activeRefreshTokens.delete(oldRefreshToken);
  revokedTokens.add(oldRefreshToken);

  const user = userFinder(decoded.userId);
  if (!user) {
    throw new Error('Usuário associado ao token não encontrado');
  }

  // Gera novo par
  return generateTokenPair(user);
};

export const revokeToken = (token) => {
  revokedTokens.add(token);
  activeRefreshTokens.delete(token);
};
