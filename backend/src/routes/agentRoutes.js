import express from 'express';
import { agentController, metaController, metricsController } from '../controllers/agentController.js';
import { authenticateJWT, requireRoles } from '../middlewares/authMiddleware.js';

const agentRouter = express.Router();
agentRouter.get('/agents', agentController.getAgents);
agentRouter.post('/agents/:id/toggle', authenticateJWT, requireRoles(['superadmin', 'dono']), agentController.toggleAgent);
agentRouter.post('/agents/simulate-inbound', agentController.simulateInbound);
agentRouter.get('/leads', authenticateJWT, requireRoles(['superadmin', 'dono', 'concierge']), agentController.getLeads);

const metaRouter = express.Router();
metaRouter.get('/webhook', metaController.verifyWebhook);
metaRouter.post('/webhook', metaController.receiveWebhook);

const metricsRouter = express.Router();
metricsRouter.get('/health', metricsController.getHealth);
metricsRouter.get('/metrics', metricsController.getMetrics);

export { agentRouter, metaRouter, metricsRouter };
