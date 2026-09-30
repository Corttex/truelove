import React, { useState } from 'react';
import { ClientCRM } from './ClientCRM';
import { FunnelAutomation } from './FunnelAutomation';
import { RegistrationManager } from './RegistrationManager';
import { FinancialCockpit } from './FinancialCockpit';
import { MatchDensityMap } from './MatchDensityMap';
import { AIAgentCockpit } from './AIAgentCockpit';
import { usePlatformStore } from '../../services/store';
import { Users, GitPullRequest, ShieldCheck, DollarSign, MapPin, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type OwnerTab = 'crm' | 'funnel' | 'registrations' | 'finance' | 'density' | 'ai_agents';

export const OwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OwnerTab>('crm');
  const { profiles, automations, finance } = usePlatformStore();

  const pendingVerificationCount = profiles.filter(p => p.documentStatus === 'pending' || !p.verified).length;
  const activeAutomationsCount = automations.filter(a => a.isActive).length;

  const tabs: { id: OwnerTab; label: string; icon: React.ReactNode; badge?: React.ReactNode }[] = [
    {
      id: 'crm',
      label: 'CRM & Filtros de Clientes',
      icon: <Users size={17} />,
      badge: (
        <span style={{ background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '11px', color: 'var(--tl-brand-600)', fontWeight: 700, border: '1px solid var(--border-color)' }}>
          {profiles.length}
        </span>
      )
    },
    {
      id: 'funnel',
      label: 'Automação do Funil',
      icon: <GitPullRequest size={17} />,
      badge: (
        <span style={{ background: 'var(--tl-gold-100)', color: 'var(--tl-gold-500)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 700 }}>
          {activeAutomationsCount} ativas
        </span>
      )
    },
    {
      id: 'ai_agents',
      label: 'Motor de Agentes & Meta',
      icon: <Bot size={17} />,
      badge: (
        <span style={{ background: 'var(--status-success-bg)', color: 'var(--status-success)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 700 }}>
          ● 5 IA Ativas
        </span>
      )
    },
    {
      id: 'registrations',
      label: 'Gestor de Cadastros (KYC 35+)',
      icon: <ShieldCheck size={17} />,
      badge: pendingVerificationCount > 0 ? (
        <span style={{ background: 'var(--status-warning-bg)', color: 'var(--status-warning)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 700 }}>
          {pendingVerificationCount} pendentes
        </span>
      ) : undefined
    },
    {
      id: 'finance',
      label: 'Financeiro & MRR',
      icon: <DollarSign size={17} />,
      badge: (
        <span style={{ background: 'var(--status-success-bg)', color: 'var(--status-success)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 700 }}>
          R$ {(finance.mrr).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}/mês
        </span>
      )
    },
    {
      id: 'density',
      label: 'Densidade de Cidades',
      icon: <MapPin size={17} />
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 60px)', background: 'var(--bg-primary)' }}>
      {/* Secondary Sub-nav for Owner Suite */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', padding: '0 32px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', gap: '20px', overflowX: 'auto' }}>
          
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 6px',
                  color: isActive ? 'var(--tl-brand-600)' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  position: 'relative'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge}

                {/* Animated active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="owner-tab-underline"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      borderRadius: '3px 3px 0 0',
                      background: 'var(--tl-brand-600)'
                    }}
                  />
                )}
              </motion.button>
            );
          })}

        </div>
      </div>

      {/* Tab Render with Framer Motion transitions */}
      <div style={{ flex: 1, backgroundColor: 'var(--bg-primary)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {activeTab === 'crm' && <ClientCRM />}
            {activeTab === 'funnel' && <FunnelAutomation />}
            {activeTab === 'ai_agents' && <AIAgentCockpit />}
            {activeTab === 'registrations' && <RegistrationManager />}
            {activeTab === 'finance' && <FinancialCockpit />}
            {activeTab === 'density' && <MatchDensityMap />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
