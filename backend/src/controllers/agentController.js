import { agentEngineService, leadService } from '../services/agentEngineService.js';
import { ENV } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const agentController = {
  getAgents: (req, res) => {
    const agents = agentEngineService.listAgents();
    return res.json({ success: true, count: agents.length, data: agents });
  },

  toggleAgent: (req, res, next) => {
    try {
      const { id } = req.params;
      const updated = agentEngineService.toggleAgent(id);
      return res.json({ success: true, message: `Agente ${updated.name} atualizado`, data: updated });
    } catch (err) {
      return res.status(404).json({ success: false, error: err.message });
    }
  },

  simulateInbound: async (req, res, next) => {
    try {
      const { phone, name, message, channel } = req.body;
      if (!phone || !message) {
        return res.status(400).json({ success: false, error: 'Telefone e mensagem são obrigatórios' });
      }

      const result = await agentEngineService.simulateInbound({ phone, name, message, channel });
      return res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  getLeads: (req, res) => {
    const leads = leadService.listLeads();
    return res.json({ success: true, count: leads.length, data: leads });
  }
};

export const metaController = {
  verifyWebhook: (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === ENV.META_VERIFY_TOKEN) {
      logger.info('✅ [Meta Webhook] Verificação de Token Meta efetuada com sucesso!');
      return res.status(200).send(challenge);
    } else {
      logger.warn('❌ [Meta Webhook] Falha de autenticação do token da Meta:', { receivedToken: token });
      return res.status(403).json({ error: 'Token de verificação inválido' });
    }
  },

  receiveWebhook: async (req, res, next) => {
    try {
      const body = req.body;
      logger.info('📩 [Meta Webhook] Payload recebido da Meta Graph API:', { object: body.object });

      if (body.object === 'whatsapp_business_account' || body.object === 'instagram') {
        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messages = value?.messages;

        if (messages && messages[0]) {
          const msg = messages[0];
          const from = msg.from;
          const text = msg.text?.body || '';
          const contactName = value.contacts?.[0]?.profile?.name || 'Lead Meta';

          await agentEngineService.simulateInbound({
            phone: from,
            name: contactName,
            message: text,
            channel: body.object === 'whatsapp_business_account' ? 'whatsapp' : 'instagram'
          });
        }
      }

      return res.status(200).json({ status: 'EVENT_RECEIVED' });
    } catch (err) {
      next(err);
    }
  }
};

export const metricsController = {
  getHealth: (req, res) => {
    return res.json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      nodeEnv: ENV.NODE_ENV,
      services: {
        database: 'connected_or_memory_resilient',
        agents: '5_autonomous_agents_ready',
        auth: 'jwt_hs256_active'
      }
    });
  },

  getMetrics: (req, res) => {
    const stats = agentEngineService.getStats();
    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...stats
    });
  }
};
