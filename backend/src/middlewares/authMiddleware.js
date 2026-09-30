import { verifyAccessToken } from '../utils/jwtHelper.js';
import { logger } from '../utils/logger.js';

/**
 * Middleware de Autenticação JWT com Suporte a RBAC (Role-Based Access Control)
 * Conforme Imagem 4: Verificação de Tokens Curtos (15m) e Claims de Permissão
 */
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Token de autenticação não fornecido no cabeçalho Authorization: Bearer <token>'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // { userId, email, role, permissions, keyVersion }
    next();
  } catch (err) {
    logger.warn('Tentativa de acesso com token inválido ou expirado:', { error: err.message, ip: req.ip });
    return res.status(403).json({
      success: false,
      error: 'Token inválido ou expirado. Renove sua sessão usando o endpoint /api/v1/auth/refresh.',
      code: 'TOKEN_EXPIRED_OR_INVALID'
    });
  }
};

/**
 * Middleware para exigir papéis RBAC específicos (ex: 'superadmin', 'dono', 'concierge')
 */
export const requireRoles = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Usuário não autenticado' });
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      logger.warn(`Acesso negado para usuário ${req.user.email}. Papel [${req.user.role}] não tem privilégios para esta rota.`, { path: req.originalUrl });
      return res.status(403).json({
        success: false,
        error: 'Acesso negado. Você não possui as permissões necessárias para acessar este recurso.',
        requiredRoles: allowedRoles,
        currentRole: req.user.role
      });
    }

    next();
  };
};
