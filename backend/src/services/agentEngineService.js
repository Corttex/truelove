import { defaultAgents, defaultLeads } from '../models/Agent.js';
import { runInboundTriageFlow } from '../agent/workflows/inboundTriageFlow.js';
import { logger } from '../utils/logger.js';

let agentsState = [...defaultAgents];
let leadsState = [...defaultLeads];
let auditLogsState = [];

export const agentEngineService = {
  listAgents: () => agentsState,

  toggleAgent: (id) => {
    const agent = agentsState.find(a => a.id === id);
    if (!agent) throw new Error('Agente não encontrado');
    agent.autoMode = !agent.autoMode;
    agent.status = agent.autoMode ? 'active' : 'paused';
    agent.lastRunTimestamp = new Date().toISOString();
    return agent;
  },

  simulateInbound: async ({ phone, name, message, channel = 'whatsapp' }) => {
    const result = await runInboundTriageFlow({
      fromPhone: phone,
      senderName: name,
      textMessage: message,
      channel
    });

    // Se o lead for qualificado (35+), insere no CRM
    if (result.isEligible) {
      const newLead = {
        id: `lead-${Date.now()}`,
        name: result.name,
        phone: result.phone,
        channel: result.channel,
        age: result.declaredAge,
        city: 'São Paulo',
        state: 'SP',
        stage: result.leadStage,
        qualifications: ['35+ comprovado', result.intention],
        kycStatus: 'pending',
        createdAt: new Date().toISOString()
      };
      leadsState.unshift(newLead);
    }

    // Atualiza estatísticas do agente Sofia
    const sofia = agentsState.find(a => a.id === 'agent-1');
    if (sofia) {
      sofia.totalActionsExecuted += 1;
      sofia.lastRunTimestamp = new Date().toISOString();
    }

    auditLogsState.unshift({
      timestamp: new Date().toISOString(),
      action: 'INBOUND_SIMULATION',
      agent: 'Sofia',
      phone: result.phone,
      isEligible: result.isEligible
    });

    return result;
  },

  getStats: () => {
    return {
      totalAgents: agentsState.length,
      activeAgents: agentsState.filter(a => a.status === 'active').length,
      totalLeadsInFunnel: leadsState.length,
      auditLogsCount: auditLogsState.length,
      uptime: process.uptime()
    };
  }
};

export const leadService = {
  listLeads: () => leadsState,
  
  updateLeadStage: (id, stage) => {
    const lead = leadsState.find(l => l.id === id);
    if (!lead) throw new Error('Lead não encontrado');
    lead.stage = stage;
    return lead;
  },

  approveKyc: (id) => {
    const lead = leadsState.find(l => l.id === id);
    if (!lead) throw new Error('Lead não encontrado');
    lead.kycStatus = 'approved';
    lead.stage = 'documentos_aprovados';
    return lead;
  }
};
