import { authService } from '../services/authService.js';

export const authController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email e senha são obrigatórios' });
      }

      const result = await authService.login({ email, password });
      return res.json({
        success: true,
        message: 'Autenticado com sucesso',
        data: result
      });
    } catch (err) {
      return res.status(401).json({ success: false, error: err.message });
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refresh({ refreshToken });
      return res.json({
        success: true,
        message: 'Tokens renovados com rotatividade de chaves realizada com sucesso',
        data: tokens
      });
    } catch (err) {
      return res.status(403).json({ success: false, error: err.message });
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const authHeader = req.headers.authorization;
      const accessToken = authHeader && authHeader.split(' ')[1];
      const result = await authService.logout({ refreshToken, accessToken });
      return res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  },

  me: async (req, res) => {
    return res.json({
      success: true,
      user: req.user
    });
  }
};
