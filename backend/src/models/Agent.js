export const defaultAgents = [
  {
    id: 'agent-1',
    name: 'Sofia · Triagem Meta (WhatsApp / IG)',
    roleType: 'meta_inbound_triage',
    model: 'gpt-4o / heuristic-engine',
    status: 'active',
    autoMode: true,
    totalActionsExecuted: 542,
    successRate: 98.4,
    lastRunTimestamp: new Date().toISOString()
  },
  {
    id: 'agent-2',
    name: 'Arthur · Auditor KYC 35+',
    roleType: 'kyc_qualification',
    model: 'claude-3-5-sonnet',
    status: 'active',
    autoMode: true,
    totalActionsExecuted: 310,
    successRate: 99.1,
    lastRunTimestamp: new Date().toISOString()
  },
  {
    id: 'agent-3',
    name: 'Eros · Cupido Noturno (Matchmaker)',
    roleType: 'cupid_matching',
    model: 'gemini-1.5-pro',
    status: 'active',
    autoMode: true,
    totalActionsExecuted: 1240,
    successRate: 96.8,
    lastRunTimestamp: new Date().toISOString()
  },
  {
    id: 'agent-4',
    name: 'Clara · Guardiã Anti-Churn',
    roleType: 'anti_churn_revival',
    model: 'llama-3.3-70b',
    status: 'active',
    autoMode: true,
    totalActionsExecuted: 418,
    successRate: 92.5,
    lastRunTimestamp: new Date().toISOString()
  },
  {
    id: 'agent-5',
    name: 'Lorenzo · Consultor Concierge VIP',
    roleType: 'vip_concierge_upsell',
    model: 'gpt-4o',
    status: 'active',
    autoMode: true,
    totalActionsExecuted: 185,
    successRate: 88.0,
    lastRunTimestamp: new Date().toISOString()
  }
];

export const defaultLeads = [
  {
    id: 'lead-1',
    name: 'Cláudia Regina Santos',
    phone: '+55 11 98765-4321',
    channel: 'whatsapp',
    age: 46,
    city: 'São Paulo',
    state: 'SP',
    stage: 'documentos_aprovados',
    qualifications: ['35+ comprovado', 'busca casamento', 'CNH validada'],
    kycStatus: 'approved',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'lead-2',
    name: 'Marcelo Bittencourt',
    phone: '+55 21 99887-1122',
    channel: 'instagram',
    age: 52,
    city: 'Rio de Janeiro',
    state: 'RJ',
    stage: 'match_liberado',
    qualifications: ['35+ comprovado', 'divorciado', 'filhos adultos'],
    kycStatus: 'approved',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'lead-3',
    name: 'Renata Albuquerque',
    phone: '+55 41 97711-2233',
    channel: 'whatsapp',
    age: 41,
    city: 'Curitiba',
    state: 'PR',
    stage: 'triagem_concluida',
    qualifications: ['35+ comprovado', 'médica', 'sem filhos'],
    kycStatus: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];
