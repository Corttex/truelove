import React, { useState, useMemo } from 'react';
import { usePlatformStore, platformStore } from '../../services/store';
import { UserProfile, CustomerFilterState, FunnelStageId, UserTier } from '../../types';
import { 
  Search, Filter, UserCheck, Shield, Award, MapPin, 
  Phone, Mail, Tag, Plus, CheckCircle, XCircle, ChevronRight,
  TrendingUp, Calendar, AlertTriangle, ArrowUpDown, Sparkles, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FUNNEL_STAGE_LABELS: Record<FunnelStageId, string> = {
  lead_incomplete: 'Cadastro Incompleto',
  pending_verification: 'Aguardando Verificação',
  active_unmatched: 'Ativo sem Conexão',
  matched_inactive: 'Match sem Conversa',
  in_conversation: 'Conversando no Chat',
  active_paid: 'Assinante Ativo (Plus/VIP)',
  at_risk_churn: 'Risco de Churn (>5 dias)'
};

export const ClientCRM: React.FC = () => {
  const { profiles } = usePlatformStore();

  // Filters State
  const [filters, setFilters] = useState<CustomerFilterState>({
    search: '',
    city: '',
    state: '',
    gender: 'all',
    tier: 'all',
    funnelStage: 'all',
    documentStatus: 'all',
    minAge: 35,
    maxAge: 75,
    onlyActive: false,
    sortBy: 'recent'
  });

  // Selected Profile for 360 Drawer
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(profiles[0] || null);
  const [newNote, setNewNote] = useState('');
  const [newTag, setNewTag] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter Logic
  const filteredProfiles = useMemo(() => {
    return profiles.filter(p => {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesEmail = p.email?.toLowerCase().includes(query) ?? false;
        const matchesPhone = p.phone?.toLowerCase().includes(query) ?? false;
        const matchesCity = p.city.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesCity) return false;
      }

      if (filters.city && !p.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      if (filters.state && p.state !== filters.state) return false;
      if (filters.gender !== 'all' && p.gender !== filters.gender) return false;
      if (filters.tier !== 'all' && p.tier !== filters.tier) return false;
      if (filters.funnelStage !== 'all' && p.funnelStage !== filters.funnelStage) return false;
      if (filters.documentStatus !== 'all' && p.documentStatus !== filters.documentStatus) return false;
      if (p.age < filters.minAge || p.age > filters.maxAge) return false;
      if (filters.onlyActive && !p.active) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'lastActive') return a.lastActiveDays - b.lastActiveDays;
      if (filters.sortBy === 'age') return b.age - a.age;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [profiles, filters]);

  // Keep selectedProfile synced with store
  const activeProfile = profiles.find(p => p.id === selectedProfile?.id) || selectedProfile;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !activeProfile) return;
    platformStore.addOwnerNote(activeProfile.id, newNote.trim());
    setNewNote('');
    showToast('Nota salva com sucesso no histórico do cliente.');
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim() || !activeProfile) return;
    platformStore.addCrmTag(activeProfile.id, newTag.trim());
    setNewTag('');
    showToast(`Tag "${newTag.trim()}" adicionada.`);
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Toast Notification with Framer Motion */}
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

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ color: 'var(--tl-gold-500)', fontWeight: 800, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Painel do Dono · CRM 360°
            </span>
            <span className="owner-badge">Visão Executiva</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--text-primary)', fontWeight: 600 }}>
            Gestão de Clientes & Relacionamento
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Acompanhe a base de clientes, histórico de interações, auditoria de dados e status de qualificação.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <motion.button 
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilters({
              search: '',
              city: '',
              state: '',
              gender: 'all',
              tier: 'all',
              funnelStage: 'all',
              documentStatus: 'all',
              minAge: 35,
              maxAge: 75,
              onlyActive: false,
              sortBy: 'recent'
            })}
          >
            Limpar Filtros
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Filter Bar */}
      <motion.div 
        className="card-box" 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '24px', padding: '18px 22px' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'center' }}>
          {/* Search box */}
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '36px' }}
              placeholder="Buscar por nome, email ou cidade..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          {/* Tier filter */}
          <div>
            <select
              className="form-input"
              value={filters.tier}
              onChange={(e) => setFilters({ ...filters, tier: e.target.value as any })}
            >
              <option value="all">Todos os Planos</option>
              <option value="FREE">Apenas Free</option>
              <option value="PLUS">Assinantes Plus</option>
              <option value="CONCIERGE">Concierge VIP</option>
            </select>
          </div>

          {/* Funnel Stage Filter */}
          <div>
            <select
              className="form-input"
              value={filters.funnelStage}
              onChange={(e) => setFilters({ ...filters, funnelStage: e.target.value as any })}
            >
              <option value="all">Todas as Etapas do Funil</option>
              <option value="lead_incomplete">1. Cadastro Incompleto</option>
              <option value="pending_verification">2. Aguardando Verificação</option>
              <option value="active_unmatched">3. Ativo sem Match</option>
              <option value="matched_inactive">4. Match sem Conversa</option>
              <option value="in_conversation">5. Conversando no Chat</option>
              <option value="active_paid">6. Assinante Pago</option>
              <option value="at_risk_churn">7. Risco de Churn</option>
            </select>
          </div>

          {/* Document Status */}
          <div>
            <select
              className="form-input"
              value={filters.documentStatus}
              onChange={(e) => setFilters({ ...filters, documentStatus: e.target.value as any })}
            >
              <option value="all">Qualquer Status Documental</option>
              <option value="verified">Documento Aprovado</option>
              <option value="pending">Pendente de Análise</option>
              <option value="rejected">Rejeitado</option>
              <option value="not_sent">Não Enviado</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              className="form-input"
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
            >
              <option value="recent">Mais Recentes</option>
              <option value="lastActive">Atividade Recente</option>
              <option value="age">Maior Idade</option>
            </select>
          </div>
        </div>

        {/* Age Range and Active Only row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>Faixa Etária:</span>
            <input 
              type="number" 
              className="form-input" 
              style={{ width: '70px', padding: '6px 10px', minHeight: '34px' }}
              value={filters.minAge}
              min={35}
              max={80}
              onChange={(e) => setFilters({ ...filters, minAge: Number(e.target.value) })}
            />
            <span style={{ color: 'var(--text-muted)' }}>até</span>
            <input 
              type="number" 
              className="form-input" 
              style={{ width: '70px', padding: '6px 10px', minHeight: '34px' }}
              value={filters.maxAge}
              min={35}
              max={85}
              onChange={(e) => setFilters({ ...filters, maxAge: Number(e.target.value) })}
            />
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>anos</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              <input 
                type="checkbox"
                checked={filters.onlyActive}
                onChange={(e) => setFilters({ ...filters, onlyActive: e.target.checked })}
              />
              Apenas perfis ativos
            </label>

            <span style={{ fontSize: '13px', color: 'var(--tl-brand-600)', fontWeight: 700 }}>
              {filteredProfiles.length} clientes encontrados
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main CRM Content: Split view with Table / List and 360 Profile Details Drawer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Column: Client List with Stagger */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <AnimatePresence>
            {filteredProfiles.map((p, index) => {
              const isSelected = activeProfile?.id === p.id;
              return (
                <motion.div 
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  onClick={() => setSelectedProfile(p)}
                  className="card-box"
                  whileHover={{ y: -2 }}
                  style={{
                    padding: '16px 20px',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--tl-brand-600)' : 'var(--border-color)',
                    backgroundColor: isSelected ? 'var(--bg-subtle)' : 'var(--bg-card)',
                    borderWidth: isSelected ? '2px' : '1px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Photo / Avatar */}
                    <img 
                      src={p.photoUrl} 
                      alt={p.name}
                      style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', border: '2px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
                    />

                    {/* Main Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <strong style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{p.name}, {p.age}</strong>
                        {p.verified && (
                          <span className="badge badge-verified" style={{ padding: '2px 7px', fontSize: '11px' }}>
                            ✓ 35+ Verificado
                          </span>
                        )}
                        <span className={`badge badge-tier-${p.tier.toLowerCase()}`} style={{ padding: '2px 7px', fontSize: '11px' }}>
                          {p.tier}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-muted)' }}>
                        <span><MapPin size={13} style={{ display: 'inline', verticalAlign: '-1px' }} /> {p.city}, {p.state}</span>
                        <span>·</span>
                        <span>{p.profession}</span>
                        <span>·</span>
                        <span style={{ color: p.lastActiveDays === 0 ? 'var(--status-success)' : 'var(--text-muted)', fontWeight: p.lastActiveDays === 0 ? 600 : 400 }}>
                          {p.lastActiveDays === 0 ? 'Online hoje' : `Ativo há ${p.lastActiveDays}d`}
                        </span>
                      </div>

                      {/* Funnel Stage Pill */}
                      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', background: 'var(--bg-secondary)', padding: '3px 8px', borderRadius: '6px', fontWeight: 600, color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                          Funil: {FUNNEL_STAGE_LABELS[p.funnelStage]}
                        </span>

                        {p.crmTags?.map(tag => (
                          <span key={tag} style={{ fontSize: '11px', background: 'var(--tl-gold-100)', color: 'var(--tl-gold-500)', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions / Right icon */}
                    <div>
                      <ChevronRight size={18} color={isSelected ? 'var(--tl-brand-600)' : 'var(--text-muted)'} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredProfiles.length === 0 && (
            <div className="card-box" style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
              <AlertTriangle size={36} color="var(--tl-gold-500)" style={{ margin: '0 auto 12px' }} />
              <h3>Nenhum cliente atende a esses filtros.</h3>
              <p style={{ marginTop: '6px', fontSize: '14px' }}>Tente flexibilizar os critérios de idade, cidade ou status do funil.</p>
            </div>
          )}
        </div>

        {/* Right Column: 360° Profile Details & Owner Tools */}
        {activeProfile ? (
          <motion.div 
            key={activeProfile.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="card-box" 
            style={{ position: 'sticky', top: '80px', padding: '28px' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <img 
                  src={activeProfile.photoUrl} 
                  alt={activeProfile.name}
                  style={{ width: '84px', height: '84px', borderRadius: '18px', objectFit: 'cover', border: '3px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}
                />
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {activeProfile.name}, {activeProfile.age} anos
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '2px' }}>
                    {activeProfile.profession} · {activeProfile.city}, {activeProfile.state}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                    <span className={`badge badge-tier-${activeProfile.tier.toLowerCase()}`}>
                      Plano {activeProfile.tier}
                    </span>
                    <span className={`badge badge-${activeProfile.documentStatus}`}>
                      {activeProfile.documentStatus === 'verified' ? '✓ Doc Verificado' : activeProfile.documentStatus === 'pending' ? 'Doc em Análise' : 'Doc Pendente'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons for Owner */}
            <div style={{ background: 'var(--bg-secondary)', padding: '14px 16px', borderRadius: '10px', marginBottom: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-color)' }}>
              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Estágio do Funil</span>
                <select
                  style={{ display: 'block', marginTop: '4px', background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', fontWeight: 600 }}
                  value={activeProfile.funnelStage}
                  onChange={(e) => {
                    platformStore.updateProfileFunnelStage(activeProfile.id, e.target.value as FunnelStageId);
                    showToast(`Estágio alterado para "${FUNNEL_STAGE_LABELS[e.target.value as FunnelStageId]}"`);
                  }}
                >
                  <option value="lead_incomplete">1. Cadastro Incompleto</option>
                  <option value="pending_verification">2. Aguardando Verificação</option>
                  <option value="active_unmatched">3. Ativo sem Conexão</option>
                  <option value="matched_inactive">4. Match sem Conversa</option>
                  <option value="in_conversation">5. Conversando no Chat</option>
                  <option value="active_paid">6. Assinante Ativo (Plus/VIP)</option>
                  <option value="at_risk_churn">7. Risco de Churn</option>
                </select>
              </div>

              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Alterar Plano</span>
                <select
                  style={{ display: 'block', marginTop: '4px', background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', fontWeight: 600 }}
                  value={activeProfile.tier}
                  onChange={(e) => {
                    platformStore.updateProfileTier(activeProfile.id, e.target.value as UserTier);
                    showToast(`Plano de ${activeProfile.name} atualizado para ${e.target.value}!`);
                  }}
                >
                  <option value="FREE">Free (Gratuito)</option>
                  <option value="PLUS">Plus (R$ 79/mês)</option>
                  <option value="CONCIERGE">Concierge VIP (R$ 349/mês)</option>
                </select>
              </div>
            </div>

            {/* Document KYC Verification Box */}
            <div style={{ border: '1px solid var(--border-color)', borderRadius: '10px', padding: '16px', marginBottom: '20px', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--tl-brand-600)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={16} /> Verificação de Identidade 35+
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {activeProfile.documentType || 'Não informado'} ({activeProfile.documentNumberMasked || 'Sem doc'})
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ flex: 1, padding: '8px 12px', fontSize: '12px' }}
                  onClick={() => {
                    platformStore.updateProfileVerification(activeProfile.id, 'verified');
                    showToast('Documento aprovado e selo 35+ ativado!');
                  }}
                >
                  <CheckCircle size={14} /> Aprovar Documento
                </motion.button>
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ flex: 1, padding: '8px 12px', fontSize: '12px', color: 'var(--status-danger)' }}
                  onClick={() => {
                    platformStore.updateProfileVerification(activeProfile.id, 'rejected');
                    showToast('Documento marcado como rejeitado.');
                  }}
                >
                  <XCircle size={14} /> Rejeitar
                </motion.button>
              </div>
            </div>

            {/* Contact & Affection CV details */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Currículo Afetivo & Apresentação
              </h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                "{activeProfile.bio || 'Sem apresentação cadastrada.'}"
              </p>

              <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
                <div><strong>Telefone:</strong> <span style={{ color: 'var(--text-secondary)' }}>{activeProfile.phone || 'Não informado'}</span></div>
                <div><strong>Email:</strong> <span style={{ color: 'var(--text-secondary)' }}>{activeProfile.email || 'Não informado'}</span></div>
                <div><strong>Objetivo:</strong> <span style={{ color: 'var(--text-secondary)' }}>{activeProfile.relationshipGoal}</span></div>
                <div><strong>LTV Acumulado:</strong> <strong style={{ color: 'var(--tl-brand-600)' }}>R$ {activeProfile.lifetimeValue.toFixed(2)}</strong></div>
                <div><strong>Matches:</strong> <span style={{ color: 'var(--text-secondary)' }}>{activeProfile.totalMatchesCount} conexões</span></div>
                <div><strong>Mensagens:</strong> <span style={{ color: 'var(--text-secondary)' }}>{activeProfile.totalMessagesCount} enviadas</span></div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Interesses: </span>
                {activeProfile.interests.map(i => (
                  <span key={i} style={{ display: 'inline-block', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '2px 7px', fontSize: '12px', margin: '2px 4px' }}>
                    {i}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '6px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Valores: </span>
                {activeProfile.values.map(v => (
                  <span key={v} style={{ display: 'inline-block', background: 'var(--tl-gold-100)', color: 'var(--tl-gold-500)', borderRadius: '4px', padding: '2px 7px', fontSize: '12px', margin: '2px 4px', fontWeight: 600 }}>
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags Manager */}
            <div style={{ marginBottom: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                  Tags Internas do CRM
                </h4>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                {activeProfile.crmTags?.map(tag => (
                  <span 
                    key={tag}
                    style={{ background: 'var(--tl-brand-100)', color: 'var(--tl-brand-600)', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
                  >
                    #{tag}
                    <button 
                      onClick={() => platformStore.removeCrmTag(activeProfile.id, tag)}
                      style={{ color: 'var(--text-muted)', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddTag} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ minHeight: '34px', padding: '6px 10px', fontSize: '12px' }}
                  placeholder="Nova tag (ex: VIP, Exigente, Sem Filhos)..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <button type="submit" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', minHeight: '34px' }}>
                  <Plus size={14} /> Adicionar
                </button>
              </form>
            </div>

            {/* Private Owner Notes History */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Anotações Privadas do Dono / Suporte
              </h4>

              <div style={{ maxHeight: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                {activeProfile.ownerNotes && activeProfile.ownerNotes.length > 0 ? (
                  activeProfile.ownerNotes.map((note, index) => (
                    <div key={index} style={{ background: 'var(--tl-gold-100)', border: '1px solid var(--tl-gold-400)', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: 'var(--text-primary)' }}>
                      {note}
                    </div>
                  ))
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Nenhuma anotação gravada ainda.</span>
                )}
              </div>

              <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ minHeight: '34px', padding: '6px 10px', fontSize: '12px' }}
                  placeholder="Adicionar nota interna privada..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <button type="submit" className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', minHeight: '34px' }}>
                  Gravar
                </button>
              </form>
            </div>

          </motion.div>
        ) : null}

      </div>
    </div>
  );
};
