import { useState, useEffect } from 'react';
import { UserProfile, FunnelAutomationRule, FinanceMetrics, ModerationReport, ConciergeCase, AuditLogItem, FunnelStageId, UserTier } from '../types';
import { INITIAL_PROFILES, INITIAL_AUTOMATIONS, INITIAL_FINANCE_METRICS, INITIAL_REPORTS, INITIAL_AUDIT_LOGS } from './mockData';

const STORAGE_KEY = 'truelove_platform_state_v1';

export interface PlatformState {
  profiles: UserProfile[];
  automations: FunnelAutomationRule[];
  finance: FinanceMetrics;
  reports: ModerationReport[];
  conciergeCases: ConciergeCase[];
  auditLogs: AuditLogItem[];
  currentProfileId: string;
}

function loadState(): PlatformState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
  }
  return {
    profiles: INITIAL_PROFILES,
    automations: INITIAL_AUTOMATIONS,
    finance: INITIAL_FINANCE_METRICS,
    reports: INITIAL_REPORTS,
    conciergeCases: [
      {
        id: 'c-1',
        profileId: 'p-emanuel',
        assignedAdmin: 'Dono (Master)',
        status: 'active',
        notes: 'Cliente busca parcerias na zona sul do Rio de Janeiro com afinidade cultural.',
        suggestedProfileIds: ['p-maria'],
        createdAt: '2026-08-20T10:00:00Z'
      }
    ],
    auditLogs: INITIAL_AUDIT_LOGS,
    currentProfileId: 'p-maria'
  };
}

let state: PlatformState = loadState();
const listeners = new Set<() => void>();

function notify() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  listeners.forEach(fn => fn());
}

export const platformStore = {
  getState: () => state,
  
  subscribe: (fn: () => void) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },

  // Profile & CRM actions
  updateProfileFunnelStage: (profileId: string, stage: FunnelStageId) => {
    const profile = state.profiles.find(p => p.id === profileId);
    if (!profile) return;
    profile.funnelStage = stage;
    
    // Add audit log
    state.auditLogs.unshift({
      id: `log-${Date.now()}`,
      actor: 'Dono (Master)',
      role: 'super_admin',
      action: 'Mudança de Estágio no Funil',
      target: `${profile.name} -> ${stage}`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      ipAddress: '127.0.0.1'
    });

    notify();
  },

  updateProfileVerification: (profileId: string, status: 'verified' | 'rejected' | 'pending') => {
    const profile = state.profiles.find(p => p.id === profileId);
    if (!profile) return;
    profile.documentStatus = status;
    profile.verified = status === 'verified';
    if (status === 'verified') {
      profile.ageAssured = true;
      if (profile.funnelStage === 'pending_verification') {
        profile.funnelStage = 'active_unmatched';
      }
    }

    state.auditLogs.unshift({
      id: `log-${Date.now()}`,
      actor: 'Dono (Master)',
      role: 'super_admin',
      action: `Verificação de Documento: ${status.toUpperCase()}`,
      target: profile.name,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      ipAddress: '127.0.0.1'
    });

    notify();
  },

  updateProfileTier: (profileId: string, tier: UserTier) => {
    const profile = state.profiles.find(p => p.id === profileId);
    if (!profile) return;
    profile.tier = tier;
    
    // Adjust finance metrics
    if (tier === 'PLUS') {
      state.finance.mrr += 79;
      state.finance.plusUsersCount += 1;
      profile.lifetimeValue += 79;
      state.finance.recentTransactions.unshift({
        id: `tx-${Date.now()}`,
        profileId: profile.id,
        profileName: profile.name,
        amount: 79.00,
        tier: 'PLUS',
        paymentMethod: 'credit_card',
        status: 'paid',
        date: new Date().toISOString()
      });
    } else if (tier === 'CONCIERGE') {
      state.finance.mrr += 349;
      state.finance.conciergeUsersCount += 1;
      profile.lifetimeValue += 349;
      state.finance.recentTransactions.unshift({
        id: `tx-${Date.now()}`,
        profileId: profile.id,
        profileName: profile.name,
        amount: 349.00,
        tier: 'CONCIERGE',
        paymentMethod: 'pix',
        status: 'paid',
        date: new Date().toISOString()
      });
    }

    notify();
  },

  addOwnerNote: (profileId: string, noteText: string) => {
    const profile = state.profiles.find(p => p.id === profileId);
    if (!profile) return;
    if (!profile.ownerNotes) profile.ownerNotes = [];
    profile.ownerNotes.unshift(`[${new Date().toLocaleDateString('pt-BR')}] ${noteText}`);
    notify();
  },

  addCrmTag: (profileId: string, tag: string) => {
    const profile = state.profiles.find(p => p.id === profileId);
    if (!profile) return;
    if (!profile.crmTags) profile.crmTags = [];
    if (!profile.crmTags.includes(tag)) {
      profile.crmTags.push(tag);
      notify();
    }
  },

  removeCrmTag: (profileId: string, tag: string) => {
    const profile = state.profiles.find(p => p.id === profileId);
    if (!profile || !profile.crmTags) return;
    profile.crmTags = profile.crmTags.filter(t => t !== tag);
    notify();
  },

  // Automation rules
  toggleAutomationRule: (ruleId: string) => {
    const rule = state.automations.find(r => r.id === ruleId);
    if (!rule) return;
    rule.isActive = !rule.isActive;
    notify();
  },

  resolveReport: (reportId: string, status: 'resolved' | 'dismissed') => {
    const report = state.reports.find(r => r.id === reportId);
    if (!report) return;
    report.status = status;
    notify();
  },

  executeAutomationRuleManually: (ruleId: string) => {
    const rule = state.automations.find(r => r.id === ruleId);
    if (!rule) return;
    rule.executionCount += 1;
    rule.lastRun = new Date().toISOString();

    state.auditLogs.unshift({
      id: `log-${Date.now()}`,
      actor: 'Dono (Master)',
      role: 'super_admin',
      action: 'Disparo Manual de Automação',
      target: rule.title,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      ipAddress: '127.0.0.1'
    });

    notify();
  },

  addAutomationRule: (rule: Omit<FunnelAutomationRule, 'id' | 'executionCount' | 'conversionRate'>) => {
    const newRule: FunnelAutomationRule = {
      ...rule,
      id: `auto-${Date.now()}`,
      executionCount: 0,
      conversionRate: 0,
      lastRun: new Date().toISOString()
    };
    state.automations.unshift(newRule);
    notify();
  },

  // Reports
  updateReportStatus: (reportId: string, status: ModerationReport['status']) => {
    const report = state.reports.find(r => r.id === reportId);
    if (!report) return;
    report.status = status;
    notify();
  },

  // Reset to initial mock
  resetAll: () => {
    state = {
      profiles: INITIAL_PROFILES,
      automations: INITIAL_AUTOMATIONS,
      finance: INITIAL_FINANCE_METRICS,
      reports: INITIAL_REPORTS,
      conciergeCases: [],
      auditLogs: INITIAL_AUDIT_LOGS,
      currentProfileId: 'p-maria'
    };
    notify();
  }
};

export function usePlatformStore() {
  const [snapshot, setSnapshot] = useState(platformStore.getState());

  useEffect(() => {
    return platformStore.subscribe(() => {
      setSnapshot({ ...platformStore.getState() });
    });
  }, []);

  return snapshot;
}
