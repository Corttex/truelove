import { AIAgentConfig, MetaChannelIntegration, InboundMetaMessage, UserProfile, FunnelStageId, MetaIntentType } from '../types';
import { platformStore } from './store';

export const INITIAL_AGENTS: AIAgentConfig[] = [
  {
    id: 'agent-1',
    name: 'Sofia · Triagem Meta (WhatsApp / IG)',
    roleType: 'meta_inbound_triage',
    description: 'Monitora conversas que chegam no WhatsApp e Direct do Instagram. Extrai nome, idade, cidade e intenção, filtrando curiosos e inserindo leads qualificados no funil.',
    model: 'gpt-4o',
    status: 'active',
    autoMode: true,
    totalActionsExecuted: 542,
    successRate: 98.4,
    lastRunTimestamp: new Date().toISOString(),
    instructions: 'Ler mensagem inbound. Identificar se o usuário procura relacionamento sério e se tem 35 anos ou mais. Extrair cidade e estado.'
  },
  {
    id: 'agent-2',
    name: 'Arthur · Auditor KYC 35+',
    roleType: 'kyc_qualification',
    description: 'Valida a consistência documental (CNH, RG) e pontua risco de fraudes ou perfis fakes antes da homologação final pelo dono.',
    model: 'claude-3-5-sonnet',
    status: 'active',
    autoMode: true,
    totalActionsExecuted: 310,
    successRate: 99.1,
    lastRunTimestamp: new Date().toISOString(),
    instructions: 'Verificar documento enviado, data de nascimento para garantir 35+ e nitidez facial na selfie.'
  },
  {
    id: 'agent-3',
    name: 'Eros · Cupido & Matchmaker Noturno',
    roleType: 'cupid_matching',
    description: 'Executa rotina noturna autônoma na VPS cruzando todos os perfis ativos na mesma cidade. Se a afinidade for superior a 80%, gera o gatilho de notificação.',
    model: 'gemini-1.5-pro',
    status: 'active',
    autoMode: true,
    totalActionsExecuted: 1240,
    successRate: 96.8,
    lastRunTimestamp: new Date().toISOString(),
    instructions: 'Calcular afinidade Jaccard ponderada (cidade, valores, interesses). Disparar recomendação se afinidade >= 80%.'
  },
  {
    id: 'agent-4',
    name: 'Clara · Guardiã Anti-Churn',
    roleType: 'anti_churn_revival',
    description: 'Detecta quem está há mais de 48h com match recíproco sem conversa ou inativo há 5 dias. Redige mensagem amigável com assuntos em comum.',
    model: 'llama-3.3-70b',
    status: 'active',
    autoMode: true,
    totalActionsExecuted: 418,
    successRate: 92.5,
    lastRunTimestamp: new Date().toISOString(),
    instructions: 'Identificar matches parados. Criar sugestão personalizada com base nos interesses em comum dos dois perfis.'
  },
  {
    id: 'agent-5',
    name: 'Lorenzo · Consultor Concierge VIP',
    roleType: 'vip_concierge_upsell',
    description: 'Analisa perfis com alto poder aquisitivo e rotina exigente. Apresenta os diferenciais do plano Concierge VIP de R$ 349/mês no momento propício.',
    model: 'gpt-4o',
    status: 'active',
    autoMode: true,
    totalActionsExecuted: 185,
    successRate: 88.0,
    lastRunTimestamp: new Date().toISOString(),
    instructions: 'Detectar usuários ativos com interesse em atendimento personalizado. Apresentar curadoria humana.'
  }
];

export const INITIAL_META_CONFIG: MetaChannelIntegration = {
  whatsappStatus: 'connected',
  whatsappPhoneNumber: '+55 (11) 97412-8800',
  instagramStatus: 'connected',
  instagramAccountHandle: '@truelove.oficial',
  webhookUrl: 'https://api.truelove.app/v1/meta/webhook',
  verifyToken: 'truelove_meta_token_secure_2026',
  metaAppId: '894120941829',
  autoTriageEnabled: true,
  messagesProcessedTotal: 847,
  leadsCreatedFromMeta: 312
};

export const INITIAL_META_MESSAGES: InboundMetaMessage[] = [
  {
    id: 'msg-meta-1',
    channel: 'whatsapp',
    senderIdentifier: '+55 (41) 98822-1100',
    senderName: 'Antônio Prado',
    rawText: 'Olá boa tarde! Vi o anúncio de vocês. Tenho 67 anos, sou aposentado de Goiânia e fiquei viúvo há 3 anos. Gostaria de saber como funciona para conhecer pessoas sérias.',
    timestamp: '2026-09-29T21:10:00Z',
    processedByAgent: true,
    analysis: {
      isQualified35Plus: true,
      detectedAge: 67,
      detectedCity: 'Goiânia (GO)',
      detectedGoal: 'Relacionamento sério',
      intentType: 'interest_serious',
      sentimentScore: 0.95,
      actionTaken: 'Criou Lead qualificado no CRM e enviou link do onboarding salvável.',
      suggestedFunnelStage: 'lead_incomplete'
    }
  },
  {
    id: 'msg-meta-2',
    channel: 'instagram',
    senderIdentifier: '@marcia.advogada',
    senderName: 'Márcia Ferreira',
    rawText: 'Boa noite! Tenho 52 anos, moro em São Paulo. Quero saber se tem homens maduros e educados na minha faixa etária cadastrados na cidade.',
    timestamp: '2026-09-29T20:30:00Z',
    processedByAgent: true,
    analysis: {
      isQualified35Plus: true,
      detectedAge: 52,
      detectedCity: 'São Paulo (SP)',
      detectedGoal: 'Relacionamento sério',
      intentType: 'interest_serious',
      sentimentScore: 0.92,
      actionTaken: 'Enviou estatísticas reais da densidade de SP e liberou convite para teste do app.',
      suggestedFunnelStage: 'active_unmatched'
    }
  }
];

class AIAgentEngine {
  private agents: AIAgentConfig[] = INITIAL_AGENTS;
  private metaConfig: MetaChannelIntegration = INITIAL_META_CONFIG;
  private messages: InboundMetaMessage[] = INITIAL_META_MESSAGES;

  getAgents() { return [...this.agents]; }
  getMetaConfig() { return { ...this.metaConfig }; }
  getMessages() { return [...this.messages]; }

  toggleAgentStatus(agentId: string) {
    const ag = this.agents.find(a => a.id === agentId);
    if (!ag) return;
    ag.status = ag.status === 'active' ? 'paused' : 'active';
  }

  toggleAgentAutoMode(agentId: string) {
    const ag = this.agents.find(a => a.id === agentId);
    if (!ag) return;
    ag.autoMode = !ag.autoMode;
  }

  // Intelligent parser for incoming Meta conversation (WhatsApp / Instagram Direct)
  processInboundMeta(text: string, senderName: string, identifier: string, channel: 'whatsapp' | 'instagram'): InboundMetaMessage {
    const lower = text.toLowerCase();

    // 1. Detect age
    let detectedAge: number | undefined;
    const ageMatch = lower.match(/(\d{2})\s*(anos|ano|idade)/) || lower.match(/tenho\s*(\d{2})/);
    if (ageMatch && ageMatch[1]) {
      detectedAge = parseInt(ageMatch[1], 10);
    } else if (lower.includes('aposentado') || lower.includes('viúv') || lower.includes('divorciad')) {
      detectedAge = 58; // Heuristic fallback
    }

    const isQualified35Plus = detectedAge ? detectedAge >= 35 : true;

    // 2. Detect City
    const cities = [
      'são paulo', 'rio de janeiro', 'brasília', 'belo horizonte', 'curitiba', 
      'salvador', 'goiânia', 'recife', 'porto alegre', 'fortaleza', 'florianópolis'
    ];
    let detectedCity = 'Não informada';
    for (const c of cities) {
      if (lower.includes(c)) {
        detectedCity = c.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        break;
      }
    }

    // 3. Detect Intent
    let intentType: MetaIntentType = 'interest_serious';
    if (lower.includes('apenas sexo') || lower.includes('casual') || lower.includes('encontros rápidos')) {
      intentType = 'casual_rejected';
    } else if (lower.includes('preço') || lower.includes('como funciona') || lower.includes('dúvida')) {
      intentType = 'support_question';
    }

    // 4. Determine Funnel Action
    let suggestedFunnelStage: FunnelStageId = 'lead_incomplete';
    let actionTaken = '';

    if (intentType === 'casual_rejected') {
      actionTaken = 'Incompatível: O Agente Sofia respondeu gentilmente que o True Love é focado exclusivamente em relacionamentos sérios 35+.';
      suggestedFunnelStage = 'at_risk_churn';
    } else if (!isQualified35Plus) {
      actionTaken = 'Rejeitado por idade: O Agente Sofia informou que a plataforma é restrita a 35 anos ou mais.';
      suggestedFunnelStage = 'at_risk_churn';
    } else {
      actionTaken = `Lead 35+ Qualificado! Sofia extraiu perfil (${detectedAge || '35+'} anos · ${detectedCity}) e gerou entrada no Funil do CRM.`;
      suggestedFunnelStage = 'lead_incomplete';

      // Automatically add/update lead in PlatformStore CRM
      try {
        const state = platformStore.getState();
        const existing = state.profiles.find(p => p.phone === identifier || p.name.toLowerCase() === senderName.toLowerCase());
        
        if (!existing) {
          const newProfile: UserProfile = {
            id: `p-meta-${Date.now()}`,
            name: senderName,
            age: detectedAge || 55,
            gender: 'outro',
            city: detectedCity !== 'Não informada' ? detectedCity : 'Rio de Janeiro',
            state: 'RJ',
            profession: 'Profissão a confirmar',
            statusText: 'Interessado via Meta',
            relationshipGoal: 'Relacionamento sério',
            bio: text,
            interests: ['Conversa', 'Viagens'],
            values: ['Respeito', 'Família'],
            lifestyle: ['Vida tranquila'],
            photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
            active: true,
            verified: false,
            ageAssured: true,
            minAge: 45,
            maxAge: 70,
            onboardingStep: 1,
            onboardingComplete: false,
            consentSensitive: false,
            tier: 'FREE',
            lastActiveDays: 0,
            funnelStage: 'lead_incomplete',
            phone: channel === 'whatsapp' ? identifier : undefined,
            email: `${senderName.toLowerCase().replace(/\s+/g, '')}@lead.truelove.app`,
            createdAt: new Date().toISOString(),
            ownerNotes: [`Captado automaticamente pelo Agente Sofia via ${channel.toUpperCase()}: "${text}"`],
            crmTags: ['Origem Meta', channel === 'whatsapp' ? 'WhatsApp' : 'Instagram', 'IA Qualificada'],
            documentStatus: 'not_sent',
            totalMatchesCount: 0,
            totalMessagesCount: 0,
            lifetimeValue: 0
          };

          state.profiles.unshift(newProfile);
          state.auditLogs.unshift({
            id: `log-${Date.now()}`,
            actor: 'Agente Sofia (IA)',
            role: 'super_admin',
            action: `Captura Automática Meta (${channel.toUpperCase()})`,
            target: `${senderName} (${detectedCity})`,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            ipAddress: '127.0.0.1 (VPS Agent)'
          });
        }
      } catch (err) {
        console.error('Error auto-syncing to platformStore', err);
      }
    }

    const newMessage: InboundMetaMessage = {
      id: `meta-msg-${Date.now()}`,
      channel,
      senderIdentifier: identifier,
      senderName,
      rawText: text,
      timestamp: new Date().toISOString(),
      processedByAgent: true,
      analysis: {
        isQualified35Plus,
        detectedAge,
        detectedCity,
        detectedGoal: 'Relacionamento sério',
        intentType,
        sentimentScore: 0.94,
        actionTaken,
        suggestedFunnelStage
      }
    };

    this.messages.unshift(newMessage);
    this.metaConfig.messagesProcessedTotal += 1;
    if (isQualified35Plus && intentType === 'interest_serious') {
      this.metaConfig.leadsCreatedFromMeta += 1;
    }

    // Increment Agent Sofia execution counter
    const sofia = this.agents.find(a => a.id === 'agent-1');
    if (sofia) {
      sofia.totalActionsExecuted += 1;
      sofia.lastRunTimestamp = new Date().toISOString();
    }

    return newMessage;
  }
}

export const agentEngine = new AIAgentEngine();
