import { findUserByEmail, findUserById, verifyPassword } from '../models/User.js';
import { generateTokenPair, rotateRefreshToken, revokeToken } from '../utils/jwtHelper.js';
import { logger } from '../utils/logger.js';

export const authService = {
  login: async ({ email, password }) => {
    const user = findUserByEmail(email);
    if (!user) {
      logger.warn(`Tentativa de login com email inexistente: ${email}`);
      throw new Error('Credenciais inválidas');
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      logger.warn(`Tentativa de login com senha incorreta para: ${email}`);
      throw new Error('Credenciais inválidas');
    }

    const tokens = generateTokenPair(user);
    logger.info(`Login efetuado com sucesso para ${user.email} [${user.role}]`);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      },
      ...tokens
    };
  },

  refresh: async ({ refreshToken }) => {
    if (!refreshToken) {
      throw new Error('Refresh token é obrigatório');
    }

    // Executa rotatividade estrita de chaves e revogação do refresh token anterior
    const newTokens = rotateRefreshToken(refreshToken, findUserById);
    return newTokens;
  },

  logout: async ({ refreshToken, accessToken }) => {
    if (refreshToken) revokeToken(refreshToken);
    if (accessToken) revokeToken(accessToken);
    return { success: true, message: 'Sessão encerrada com sucesso' };
  }
};
