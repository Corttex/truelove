export type Role = 'member' | 'moderator' | 'support' | 'matchmaker' | 'finance' | 'super_admin';

export type UserTier = 'FREE' | 'PLUS' | 'CONCIERGE';

export type FunnelStageId = 
  | 'lead_incomplete'       // Cadastro incompleto / sem bio / sem fotos
  | 'pending_verification'  // Aguardando aprovação de doc/idade 35+
  | 'active_unmatched'      // Perfil ativo, procurando pessoas
  | 'matched_inactive'      // Teve match, mas ainda não mandou msg
  | 'in_conversation'       // Conversando no chat
  | 'active_paid'           // Assinante Plus ou Concierge
  | 'at_risk_churn';        // Sem login há > 5 dias

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'homem' | 'mulher' | 'outro';
  city: string;
  state: string;
  profession: string;
  statusText: string;
  relationshipGoal: string;
  bio: string;
  interests: string[];
  values: string[];
  lifestyle: string[];
  children?: string;
  photoUrl: string;
  active: boolean;
  verified: boolean;
  ageAssured: boolean;
  minAge: number;
  maxAge: number;
  onboardingStep: number;
  onboardingComplete: boolean;
  consentSensitive: boolean;
  tier: UserTier;
  lastActiveDays: number;
  locationScope?: 'nearby' | 'selected' | 'anywhere';
  preferredLocations?: string[];
  
  // CRM Attributes for Owner
  funnelStage: FunnelStageId;
  phone?: string;
  email?: string;
  createdAt: string;
  ownerNotes?: string[];
  crmTags?: string[];
  documentStatus: 'verified' | 'pending' | 'rejected' | 'not_sent';
  documentType?: string;
  documentNumberMasked?: string;
  totalMatchesCount: number;
  totalMessagesCount: number;
  lifetimeValue: number; // in BRL
}

export interface FunnelAutomationRule {
  id: string;
  title: string;
  description: string;
  stageTrigger: FunnelStageId;
  actionType: 'push_notification' | 'whatsapp_message' | 'email_digest' | 'matchmaker_intro' | 'tier_discount';
  messageTemplate: string;
  delayHours: number;
  isActive: boolean;
  executionCount: number;
  conversionRate: number; // 0 - 100%
  lastRun?: string;
}

export interface CustomerFilterState {
  search: string;
  city: string;
  state: string;
  gender: 'all' | 'homem' | 'mulher';
  tier: 'all' | UserTier;
  funnelStage: 'all' | FunnelStageId;
  documentStatus: 'all' | 'verified' | 'pending' | 'rejected' | 'not_sent';
  minAge: number;
  maxAge: number;
  onlyActive: boolean;
  sortBy: 'recent' | 'lastActive' | 'affinity' | 'age';
}

export interface FinanceMetrics {
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
  totalPaidUsers: number;
  totalFreeUsers: number;
  plusUsersCount: number;
  conciergeUsersCount: number;
  churnRateMonthly: number;
  averageLtv: number;
  recentTransactions: TransactionRecord[];
}

export interface TransactionRecord {
  id: string;
  profileId: string;
  profileName: string;
  amount: number;
  tier: UserTier;
  paymentMethod: 'credit_card' | 'pix' | 'apple_pay';
  status: 'paid' | 'pending' | 'refunded' | 'failed';
  date: string;
}

export interface MatchAffinityResult {
  eligible: boolean;
  score: number; // 0 - 100
  label: 'Excelente afinidade' | 'Boa afinidade' | 'Afinidade relevante' | 'Afinidade inicial' | 'Não elegível';
  reasons: string[];
  rejectionReasons: string[];
}

export interface ChatMessage {
  id: string;
  matchId: string;
  senderProfileId: string;
  text: string;
  createdAt: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface MatchItem {
  id: string;
  profileA: string;
  profileB: string;
  active: boolean;
  createdAt: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface ModerationReport {
  id: string;
  reporterProfileId: string;
  reportedProfileId: string;
  reason: string;
  details: string;
  status: 'open' | 'reviewing' | 'resolved' | 'dismissed';
  createdAt: string;
  actionTaken?: string;
}

export interface ConciergeCase {
  id: string;
  profileId: string;
  assignedAdmin: string;
  status: 'active' | 'pending' | 'closed';
  notes: string;
  suggestedProfileIds: string[];
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  actor: string;
  role: Role;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
}

// ==========================================
// MOTOR DE AGENTES DE IA & INTEGRAÇÃO META
// ==========================================

export type AgentRoleType = 
  | 'meta_inbound_triage'   // Agente 1: Recepção e filtro Meta (WhatsApp / IG)
  | 'kyc_qualification'     // Agente 2: Qualificação documental e elegibilidade 35+
  | 'cupid_matching'        // Agente 3: Cruzamento noturno de afinidade (>80%)
  | 'anti_churn_revival'    // Agente 4: Reengajamento automático de inativos
  | 'vip_concierge_upsell'; // Agente 5: Identificador de clientes para plano VIP

export interface AIAgentConfig {
  id: string;
  name: string;
  roleType: AgentRoleType;
  description: string;
  model: 'gpt-4o' | 'claude-3-5-sonnet' | 'gemini-1.5-pro' | 'llama-3.3-70b';
  status: 'active' | 'paused' | 'processing';
  autoMode: boolean;
  totalActionsExecuted: number;
  successRate: number; // 0 - 100%
  lastRunTimestamp: string;
  instructions: string;
}

export interface MetaChannelIntegration {
  whatsappStatus: 'connected' | 'disconnected' | 'qr_needed';
  whatsappPhoneNumber: string;
  instagramStatus: 'connected' | 'disconnected';
  instagramAccountHandle: string;
  webhookUrl: string;
  verifyToken: string;
  metaAppId: string;
  autoTriageEnabled: boolean;
  messagesProcessedTotal: number;
  leadsCreatedFromMeta: number;
}

export type MetaIntentType = 'interest_serious' | 'casual_rejected' | 'support_question' | 'spam';

export interface InboundMetaMessage {
  id: string;
  channel: 'whatsapp' | 'instagram';
  senderIdentifier: string; // phone or @handle
  senderName: string;
  rawText: string;
  timestamp: string;
  processedByAgent: boolean;
  analysis?: {
    isQualified35Plus: boolean;
    detectedAge?: number;
    detectedCity?: string;
    detectedGoal?: string;
    intentType: MetaIntentType;
    sentimentScore: number;
    actionTaken: string;
    suggestedFunnelStage: FunnelStageId;
  };
}
