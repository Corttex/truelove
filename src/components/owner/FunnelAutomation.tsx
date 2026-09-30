import React, { useState } from 'react';
import { usePlatformStore, platformStore } from '../../services/store';
import { FunnelStageId, FunnelAutomationRule } from '../../types';
import { 
  Zap, ArrowRight, Play, CheckCircle, Clock, Plus, 
  Send, Users, Sparkles, MessageCircle, Mail, AlertCircle, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STAGES: { id: FunnelStageId; title: string; color: string; description: string }[] = [
  { id: 'lead_incomplete', title: '1. Cadastro Incompleto', color: '#b27c44', description: 'Parou no onboarding' },
  { id: 'pending_verification', title: '2. Doc em Análise', color: '#c8935b', description: 'Validação 35+ pendente' },
  { id: 'active_unmatched', title: '3. Ativo sem Match', color: '#2b736c', description: 'Buscando conexões' },
  { id: 'matched_inactive', title: '4. Match sem Conversa', color: '#8858a6', description: 'Match recíproco sem msg' },
  { id: 'in_conversation', title: '5. No Chat Ativo', color: '#1b8a5a', description: 'Trocando mensagens' },
  { id: 'active_paid', title: '6. Assinante Plus/VIP', color: '#d89f64', description: 'MRR gerado' },
  { id: 'at_risk_churn', title: '7. Risco de Churn', color: '#c3303e', description: 'Inativo > 5 dias' }
];

export const FunnelAutomation: React.FC = () => {
  const { profiles, automations } = usePlatformStore();
  const [activeTab, setActiveTab] = useState<'kanban' | 'rules'>('kanban');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Rule Modal state
  const [showNewRuleModal, setShowNewRuleModal] = useState(false);
  const [ruleTitle, setRuleTitle] = useState('');
  const [ruleDesc, setRuleDesc] = useState('');
  const [ruleStage, setRuleStage] = useState<FunnelStageId>('lead_incomplete');
  const [ruleAction, setRuleAction] = useState<FunnelAutomationRule['actionType']>('push_notification');
  const [ruleTemplate, setRuleTemplate] = useState('');
  const [ruleDelay, setRuleDelay] = useState(12);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTestTrigger = (rule: FunnelAutomationRule) => {
    platformStore.executeAutomationRuleManually(rule.id);
    showToast(`⚡ Disparo de teste executado para regra "${rule.title}"! ${rule.actionType.toUpperCase()}`);
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleTitle.trim() || !ruleTemplate.trim()) return;

    platformStore.addAutomationRule({
      title: ruleTitle.trim(),
      description: ruleDesc.trim(),
      stageTrigger: ruleStage,
      actionType: ruleAction,
      messageTemplate: ruleTemplate.trim(),
      delayHours: ruleDelay,
      isActive: true
    });

    setShowNewRuleModal(false);
    setRuleTitle('');
    setRuleDesc('');
    setRuleTemplate('');
    showToast('Nova regra de automação criada e ativada no funil!');
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            className="tl-toast"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles size={18} color="var(--tl-gold-400)" />
            <span style={{ fontWeight: 600 }}>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ color: 'var(--tl-gold-500)', fontWeight: 800, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Painel do Dono · Automação de Funil
            </span>
            <span className="owner-badge">Gatilhos Inteligentes</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--text-primary)', fontWeight: 600 }}>
            Funil de Usuários & Réguas de Engajamento
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Acompanhe a jornada dos clientes desde o primeiro cadastro até a assinatura recorrente e configure gatilhos automáticos.
          </p>
        </div>

        {/* Tab switchers & New Rule CTA */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '4px', borderRadius: 'var(--radius-full)', display: 'flex', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setActiveTab('kanban')}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '13px',
                background: activeTab === 'kanban' ? 'var(--bg-card)' : 'transparent',
                color: activeTab === 'kanban' ? 'var(--tl-brand-600)' : 'var(--text-muted)',
                boxShadow: activeTab === 'kanban' ? 'var(--card-shadow)' : 'none'
              }}
            >
              Pipeline Visual (Kanban)
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '13px',
                background: activeTab === 'rules' ? 'var(--bg-card)' : 'transparent',
                color: activeTab === 'rules' ? 'var(--tl-brand-600)' : 'var(--text-muted)',
                boxShadow: activeTab === 'rules' ? 'var(--card-shadow)' : 'none'
              }}
            >
              Regras & Automações ({automations.filter(a => a.isActive).length} ativas)
            </button>
          </div>

          <motion.button 
            className="btn-primary" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowNewRuleModal(true)}
          >
            <Plus size={16} /> Nova Automação
          </motion.button>
        </div>
      </motion.div>

      {/* KPI Funnel Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        {STAGES.map((s, idx) => {
          const count = profiles.filter(p => p.funnelStage === s.id).length;
          return (
            <motion.div 
              key={s.id} 
              className="card-box" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              style={{ padding: '16px 18px', borderLeft: `4px solid ${s.color}` }}
            >
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                {s.title.split('. ')[1]}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                <strong style={{ fontSize: '26px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>{count}</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>usuários</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tab 1: Kanban Board with Framer Motion */}
      {activeTab === 'kanban' && (
        <div className="kanban-board">
          {STAGES.map((stage) => {
            const stageProfiles = profiles.filter(p => p.funnelStage === stage.id);
            const stageAutomations = automations.filter(a => a.stageTrigger === stage.id && a.isActive);

            return (
              <div key={stage.id} className="kanban-column">
                <div className="kanban-column-header">
                  <div>
                    <span style={{ color: stage.color, marginRight: '6px' }}>●</span>
                    <span>{stage.title}</span>
                  </div>
                  <span className="kanban-counter">{stageProfiles.length}</span>
                </div>

                {/* Automation trigger indicator on column */}
                {stageAutomations.length > 0 && (
                  <div style={{ padding: '6px 14px', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--tl-brand-600)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={12} color="var(--tl-gold-500)" />
                    <span>{stageAutomations.length} regra(s) ativa(s)</span>
                  </div>
                )}

                <div className="kanban-cards-wrap">
                  <AnimatePresence>
                    {stageProfiles.map((p) => (
                      <motion.div 
                        key={p.id} 
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="kanban-card"
                      >
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                          <img 
                            src={p.photoUrl} 
                            alt={p.name} 
                            style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover' }}
                          />
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <strong style={{ fontSize: '14px', display: 'block', color: 'var(--text-primary)' }}>
                              {p.name}, {p.age}
                            </strong>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                              {p.city}, {p.state}
                            </span>
                          </div>
                          <span className={`badge badge-tier-${p.tier.toLowerCase()}`} style={{ padding: '2px 6px', fontSize: '10px' }}>
                            {p.tier}
                          </span>
                        </div>

                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', margin: '6px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {p.bio || 'Sem bio informada.'}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--text-muted)' }}>
                          <span>Matches: {p.totalMatchesCount}</span>
                          <span>{p.lastActiveDays === 0 ? 'Online hoje' : `Inativo ${p.lastActiveDays}d`}</span>
                        </div>

                        {/* Move to next stage quick button */}
                        <div style={{ marginTop: '10px', display: 'flex', gap: '6px' }}>
                          <select
                            style={{ fontSize: '11px', background: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '4px 6px', width: '100%' }}
                            value={p.funnelStage}
                            onChange={(e) => {
                              platformStore.updateProfileFunnelStage(p.id, e.target.value as FunnelStageId);
                              showToast(`Movido para "${e.target.value}"`);
                            }}
                          >
                            {STAGES.map(s => (
                              <option key={s.id} value={s.id}>Mover p/ {s.title.split('. ')[1]}</option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {stageProfiles.length === 0 && (
                    <div style={{ padding: '24px 12px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
                      Nenhum usuário nesta etapa.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Automations Manager */}
      {activeTab === 'rules' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {automations.map((rule, idx) => {
            const targetStage = STAGES.find(s => s.id === rule.stageTrigger);
            return (
              <motion.div 
                key={rule.id} 
                className="card-box" 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                style={{ padding: '22px 26px', borderLeft: `5px solid ${rule.isActive ? 'var(--tl-brand-600)' : 'var(--border-color)'}` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>{rule.title}</h3>
                      <span className={`badge ${rule.isActive ? 'badge-verified' : 'badge-rejected'}`}>
                        {rule.isActive ? '● Ativo' : 'Pausado'}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Gatilho: <strong>{targetStage?.title}</strong>
                      </span>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px' }}>
                      {rule.description}
                    </p>

                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '12px 14px', fontSize: '13px', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                      "{rule.messageTemplate}"
                    </div>
                  </div>

                  {/* Rule Metrics and Quick Execution */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Disparos Realizados</span>
                        <strong style={{ fontSize: '18px', color: 'var(--tl-brand-600)' }}>{rule.executionCount}</strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Taxa de Conversão</span>
                        <strong style={{ fontSize: '18px', color: 'var(--status-success)' }}>{rule.conversionRate}%</strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Delay de Envio</span>
                        <strong style={{ fontSize: '18px', color: 'var(--text-primary)' }}>{rule.delayHours}h</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                      <motion.button
                        className="btn-secondary"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                        onClick={() => handleTestTrigger(rule)}
                      >
                        <Play size={13} /> Testar Disparo Agora
                      </motion.button>

                      <motion.button
                        className={rule.isActive ? 'btn-secondary' : 'btn-primary'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ padding: '6px 14px', fontSize: '12px' }}
                        onClick={() => {
                          platformStore.toggleAutomationRule(rule.id);
                          showToast(`Regra "${rule.title}" ${rule.isActive ? 'pausada' : 'ativada'}!`);
                        }}
                      >
                        {rule.isActive ? 'Pausar Regra' : 'Ativar Regra'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* New Rule Modal with Framer Motion backdrop */}
      <AnimatePresence>
        {showNewRuleModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9000, padding: '20px' }}
          >
            <motion.div 
              className="card-box" 
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              style={{ maxWidth: '580px', width: '100%', padding: '28px' }}
            >
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', marginBottom: '6px', color: 'var(--text-primary)' }}>
                Criar Nova Regra de Automação
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                Automatize mensagens de reengajamento, ofertas de upgrade ou quebra-gelo inteligente.
              </p>

              <form onSubmit={handleCreateRule} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Título da Regra
                  </label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ex: Alerta de Match não respondido após 24h"
                    value={ruleTitle}
                    onChange={(e) => setRuleTitle(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Estágio de Disparo
                    </label>
                    <select
                      className="form-input"
                      value={ruleStage}
                      onChange={(e) => setRuleStage(e.target.value as FunnelStageId)}
                    >
                      {STAGES.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Canal de Envio
                    </label>
                    <select
                      className="form-input"
                      value={ruleAction}
                      onChange={(e) => setRuleAction(e.target.value as any)}
                    >
                      <option value="push_notification">Notificação Push (Apple APNs / Web)</option>
                      <option value="whatsapp_message">WhatsApp Oficial</option>
                      <option value="email_digest">Email Digest</option>
                      <option value="tier_discount">Cupom de Upgrade Plus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Texto da Mensagem (use tags: &#123;name&#125;, &#123;city&#125;)
                  </label>
                  <textarea 
                    className="form-input" 
                    rows={3} 
                    placeholder="Olá {name}, temos uma ótima notícia de afinidade para você em {city}..."
                    value={ruleTemplate}
                    onChange={(e) => setRuleTemplate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Tempo de Espera antes do disparo (horas): {ruleDelay}h
                  </label>
                  <input 
                    type="range" 
                    min={1} 
                    max={120} 
                    value={ruleDelay}
                    onChange={(e) => setRuleDelay(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button type="button" className="btn-secondary" onClick={() => setShowNewRuleModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    Criar e Ativar Automação
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
