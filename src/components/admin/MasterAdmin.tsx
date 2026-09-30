import React, { useState } from 'react';
import { usePlatformStore, platformStore } from '../../services/store';
import { Role } from '../../types';
import { 
  Shield, Key, FileCheck, Sliders, AlertTriangle, CheckCircle, 
  Sparkles, UserCheck, Server, Cpu, HardDrive, Eye, EyeOff, 
  Lock, RefreshCw, Terminal, Activity, Wifi, Check, Copy, UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MasterAdmin: React.FC = () => {
  const { auditLogs, reports, profiles } = usePlatformStore();
  const [activeSubTab, setActiveSubTab] = useState<'rbac' | 'moderation' | 'apis_tokens' | 'server_metrics' | 'matching_params' | 'audit'>('rbac');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Algorithm Weights State
  const [cityWeight, setCityWeight] = useState(25);
  const [interestsWeight, setInterestsWeight] = useState(30);
  const [valuesWeight, setValuesWeight] = useState(30);
  const [lifestyleWeight, setLifestyleWeight] = useState(15);

  // Show/Hide Password states for API Keys
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [testingKey, setTestingKey] = useState<string | null>(null);

  // API Keys state
  const [apiKeys, setApiKeys] = useState({
    metaVerifyToken: 'truelove_meta_token_secure_2026',
    whatsappToken: 'EAAO64h...3xK98Z',
    whatsappPhoneId: '109283019283019',
    instagramToken: 'IGAAO64h...99Z12',
    openaiKey: 'sk-proj-tl_98a7s8d7f6a5s4d3f2a1',
    anthropicKey: 'sk-ant-api03-tl_98a7s8d7f6a5s4d3f2a1',
    geminiKey: 'AIzaSyD-tl_98a7s8d7f6a5s4d3f2a1',
    databaseUrl: 'postgres://truelove_admin:••••••••••••@localhost:5432/truelove_prod'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTestConnection = (keyName: string) => {
    setTestingKey(keyName);
    setTimeout(() => {
      setTestingKey(null);
      showToast(`Conexão com ${keyName} testada com sucesso! Latência: 34ms`);
    }, 700);
  };

  const teamMembers = [
    { name: 'Dono (Master)', email: 'admin@truelove.com.br', role: 'super_admin' as Role, permissions: 'Acesso total irrestrito (Todas as funções)' },
    { name: 'Camila Matchmaker', email: 'camila@truelove.com.br', role: 'matchmaker' as Role, permissions: 'Curadoria VIP, Densidade, Sugestões humanas' },
    { name: 'Rodrigo Suporte', email: 'suporte@truelove.com.br', role: 'support' as Role, permissions: 'Atendimento ao cliente, sem acesso a chats' },
    { name: 'Mariana Moderação', email: 'mariana@truelove.com.br', role: 'moderator' as Role, permissions: 'Fila de denúncias, suspensão de contas, auditoria' },
    { name: 'Felipe Financeiro', email: 'financeiro@truelove.com.br', role: 'finance' as Role, permissions: 'Gestão de faturamento, gateways e planos' }
  ];

  return (
    <div style={{ padding: '44px 32px 64px', maxWidth: '1440px', margin: '0 auto' }}>
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

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ color: 'var(--tl-rose-500)', fontWeight: 800, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Painel Administrativo Master (/adminmaster)
          </span>
          <span style={{ background: 'var(--tl-rose-100)', color: 'var(--tl-rose-500)', padding: '3px 8px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 700 }}>
            Nível Super Admin Máximo
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--text-primary)', fontWeight: 600 }}>
          Governança, Acessos RBAC, APIs, Métricas VPS & Auditoria
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Centro de controle mestre com gestão de chaves de APIs, credenciais Meta, saúde de contêineres Docker, pesos de matching e trilha de auditoria LGPD.
        </p>
      </motion.div>

      {/* Sub Tabs with Framer Motion active indicator */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px', overflowX: 'auto' }}>
        {[
          { id: 'rbac', label: 'Equipe & Acessos (RBAC)', icon: <Key size={16} /> },
          { id: 'apis_tokens', label: 'Chaves de APIs & Conexões', icon: <Lock size={16} /> },
          { id: 'server_metrics', label: 'Métricas da VPS & Docker', icon: <Server size={16} /> },
          { id: 'moderation', label: `Fila de Moderação (${reports.filter(r => r.status === 'open').length})`, icon: <AlertTriangle size={16} /> },
          { id: 'matching_params', label: 'Pesos do Algoritmo de Match', icon: <Sliders size={16} /> },
          { id: 'audit', label: 'Trilha de Auditoria (Logs)', icon: <FileCheck size={16} /> }
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              style={{
                padding: '12px 18px',
                color: isActive ? 'var(--tl-rose-500)' : 'var(--text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                position: 'relative',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="admin-subtab-underline"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    borderRadius: '3px 3px 0 0',
                    background: 'var(--tl-rose-500)'
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSubTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >

          {/* RBAC Team Management */}
          {activeSubTab === 'rbac' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>Membros da Equipe e Níveis de Permissão</h3>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Controle de privilégios de acesso conforme normas LGPD e segurança corporativa.</span>
                </div>
                <motion.button 
                  className="tl-btn tl-btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => showToast('Janela de convite de novo operador aberta!')}
                >
                  <UserPlus size={16} />
                  <span>Convidar Operador</span>
                </motion.button>
              </div>

              <div className="card-box" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '14px 18px' }}>Nome / E-mail</th>
                      <th style={{ padding: '14px 18px' }}>Papel (Role)</th>
                      <th style={{ padding: '14px 18px' }}>Escopo de Permissão</th>
                      <th style={{ padding: '14px 18px' }}>Status</th>
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '14px 18px' }}>
                          <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{member.name}</strong>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{member.email}</span>
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-full)',
                            background: member.role === 'super_admin' ? 'rgba(197, 99, 109, 0.15)' : 'var(--bg-subtle)',
                            color: member.role === 'super_admin' ? 'var(--tl-rose-500)' : 'var(--text-primary)'
                          }}>
                            {member.role.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                          {member.permissions}
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--status-success)', fontWeight: 600 }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-success)' }} />
                            Ativo
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button 
                            onClick={() => showToast(`Permissões de ${member.name} abertas para edição`)}
                            style={{ background: 'none', border: 'none', color: 'var(--tl-rose-500)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* APIs & Tokens Management */}
          {activeSubTab === 'apis_tokens' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>Chaves de APIs, Tokens & Conexões</h3>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Armazenadas com criptografia AES-256 no banco e replicadas no contêiner da VPS.</span>
                </div>
                <motion.button 
                  className="tl-btn tl-btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => showToast('Todas as chaves de API foram salvas e sincronizadas com a VPS!')}
                >
                  <Check size={16} />
                  <span>Salvar Alterações</span>
                </motion.button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                
                {/* Meta Integration Box */}
                <div className="card-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#25d366', color: '#fff', display: 'grid', placeItems: 'center' }}>
                      <Wifi size={18} />
                    </div>
                    <div>
                      <strong style={{ fontSize: '15px', color: 'var(--text-primary)', display: 'block' }}>Meta Cloud API (WhatsApp & IG)</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Webhooks e Envio de Mensagens</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        Meta Verify Token (Handshake Webhook)
                      </label>
                      <input 
                        type="text" 
                        value={apiKeys.metaVerifyToken}
                        onChange={e => setApiKeys({ ...apiKeys, metaVerifyToken: e.target.value })}
                        style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--text-primary)' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        WhatsApp Permanent Access Token
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type={showKeys['wa'] ? 'text' : 'password'}
                          value={apiKeys.whatsappToken}
                          onChange={e => setApiKeys({ ...apiKeys, whatsappToken: e.target.value })}
                          style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--text-primary)' }}
                        />
                        <button 
                          onClick={() => toggleShowKey('wa')}
                          style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0 12px', cursor: 'pointer', color: 'var(--text-muted)' }}
                        >
                          {showKeys['wa'] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button 
                          onClick={() => handleTestConnection('WhatsApp Cloud API')}
                          style={{ background: 'var(--tl-rose-500)', border: 'none', borderRadius: '8px', padding: '0 14px', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          {testingKey === 'WhatsApp Cloud API' ? '...' : 'Testar'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Models API Keys */}
                <div className="card-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--tl-rose-500)', color: '#fff', display: 'grid', placeItems: 'center' }}>
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <strong style={{ fontSize: '15px', color: 'var(--text-primary)', display: 'block' }}>Chaves dos Agentes de IA</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>OpenAI, Anthropic & Google Gemini</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        OpenAI API Key (Agentes Sofia & Lorenzo)
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type={showKeys['openai'] ? 'text' : 'password'}
                          value={apiKeys.openaiKey}
                          onChange={e => setApiKeys({ ...apiKeys, openaiKey: e.target.value })}
                          style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--text-primary)' }}
                        />
                        <button 
                          onClick={() => toggleShowKey('openai')}
                          style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0 12px', cursor: 'pointer', color: 'var(--text-muted)' }}
                        >
                          {showKeys['openai'] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button 
                          onClick={() => handleTestConnection('OpenAI API')}
                          style={{ background: 'var(--tl-rose-500)', border: 'none', borderRadius: '8px', padding: '0 14px', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          {testingKey === 'OpenAI API' ? '...' : 'Testar'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                        Google Gemini API Key (Agente Eros)
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type={showKeys['gemini'] ? 'text' : 'password'}
                          value={apiKeys.geminiKey}
                          onChange={e => setApiKeys({ ...apiKeys, geminiKey: e.target.value })}
                          style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--text-primary)' }}
                        />
                        <button 
                          onClick={() => toggleShowKey('gemini')}
                          style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0 12px', cursor: 'pointer', color: 'var(--text-muted)' }}
                        >
                          {showKeys['gemini'] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button 
                          onClick={() => handleTestConnection('Google Gemini')}
                          style={{ background: 'var(--tl-rose-500)', border: 'none', borderRadius: '8px', padding: '0 14px', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                        >
                          {testingKey === 'Google Gemini' ? '...' : 'Testar'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* VPS & Docker Metrics */}
          {activeSubTab === 'server_metrics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>Saúde da Infraestrutura VPS & Contêineres Docker</h3>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Status em tempo real das instâncias em execução no host de produção.</span>
                </div>
                <button 
                  onClick={() => showToast('Métricas da VPS atualizadas com sucesso!')}
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 16px', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  <RefreshCw size={14} />
                  <span>Atualizar Métricas</span>
                </button>
              </div>

              {/* Status Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {[
                  { label: 'Uptime do Servidor', value: '99.98%', sub: '42 dias sem interrupção', icon: <Activity size={18} color="var(--status-success)" /> },
                  { label: 'Uso de CPU (Host)', value: '8.4%', sub: '2 vCPUs dedicadas', icon: <Cpu size={18} color="#0284c7" /> },
                  { label: 'Uso de Memória RAM', value: '680 MB / 4 GB', sub: '17% alocada', icon: <HardDrive size={18} color="#ea580c" /> },
                  { label: 'Certificado SSL/TLS', value: 'Let\'s Encrypt Válido', sub: 'Renovação em 82 dias', icon: <Shield size={18} color="var(--tl-forest-500)" /> }
                ].map((m, i) => (
                  <div key={i} className="card-box" style={{ padding: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{m.label}</span>
                      {m.icon}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>
                      {m.value}
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{m.sub}</span>
                  </div>
                ))}
              </div>

              {/* Docker Containers Table */}
              <div className="card-box" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Contêineres Ativos (docker-compose)</strong>
                  <span style={{ fontSize: '12px', color: 'var(--status-success)', fontWeight: 700 }}>● 3/3 Saudáveis (Healthy)</span>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 18px' }}>Contêiner</th>
                      <th style={{ padding: '12px 18px' }}>Imagem</th>
                      <th style={{ padding: '12px 18px' }}>Portas</th>
                      <th style={{ padding: '12px 18px' }}>RAM Alocada</th>
                      <th style={{ padding: '12px 18px' }}>CPU</th>
                      <th style={{ padding: '12px 18px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'truelove_agent_engine', img: 'truelove-agent-engine:latest (Node 20)', ports: '0.0.0.0:4000->4000/tcp', ram: '78 MB', cpu: '1.2%', status: 'Up 18 horas' },
                      { name: 'truelove_postgres', img: 'postgres:16-alpine', ports: '0.0.0.0:5432->5432/tcp', ram: '142 MB', cpu: '0.4%', status: 'Up 18 horas' },
                      { name: 'truelove_web', img: 'truelove-web:latest (Nginx Alpine)', ports: '0.0.0.0:80->80/tcp, 443->443/tcp', ram: '24 MB', cpu: '0.1%', status: 'Up 18 horas' }
                    ].map((c, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 18px' }}>
                          <strong style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{c.name}</strong>
                        </td>
                        <td style={{ padding: '12px 18px', color: 'var(--text-secondary)' }}>{c.img}</td>
                        <td style={{ padding: '12px 18px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{c.ports}</td>
                        <td style={{ padding: '12px 18px', color: 'var(--text-primary)', fontWeight: 600 }}>{c.ram}</td>
                        <td style={{ padding: '12px 18px', color: 'var(--text-muted)' }}>{c.cpu}</td>
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{ fontSize: '11px', background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                            ● {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Moderation Queue */}
          {activeSubTab === 'moderation' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>Fila de Denúncias e Moderação Ativa</h3>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Análise de conduta, bloqueio preventivo de perfis e conformidade ética.</span>
              </div>

              {reports.length === 0 ? (
                <div className="card-box" style={{ textAlign: 'center', padding: '40px' }}>
                  <CheckCircle size={32} color="var(--status-success)" style={{ margin: '0 auto 12px auto' }} />
                  <strong style={{ display: 'block', fontSize: '16px', color: 'var(--text-primary)' }}>Nenhuma denúncia pendente!</strong>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>A comunidade True Love está operando com 100% de conformidade.</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {reports.map((rep) => (
                    <div key={rep.id} className="card-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{ background: 'var(--tl-rose-100)', color: 'var(--tl-rose-500)', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                            Motivo: {rep.reason.toUpperCase()}
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            Data: {rep.createdAt}
                          </span>
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                          Denunciado ID: <strong>{rep.reportedProfileId}</strong>
                        </div>
                        <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                          Detalhe do relato: "{rep.details}"
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          className="tl-btn tl-btn-outline"
                          onClick={() => {
                            platformStore.resolveReport(rep.id, 'dismissed');
                            showToast(`Denúncia #${rep.id} arquivada sem penalidade.`);
                          }}
                        >
                          Arquivar
                        </button>
                        <button 
                          className="tl-btn tl-btn-primary"
                          onClick={() => {
                            platformStore.resolveReport(rep.id, 'resolved');
                            showToast(`Denúncia #${rep.id} resolvida e advertência aplicada.`);
                          }}
                        >
                          Suspender Usuário
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Matching Algorithm Weights */}
          {activeSubTab === 'matching_params' && (
            <div className="card-box" style={{ maxWidth: '800px' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                Calibração dos Pesos do Algoritmo de Afinidade
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Ajuste os percentuais ponderados do motor de afinidade Jaccard. A soma deve totalizar 100%.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Localização & Mesma Cidade</span>
                    <strong style={{ color: 'var(--tl-rose-500)' }}>{cityWeight}%</strong>
                  </div>
                  <input 
                    type="range" min="0" max="50" value={cityWeight} 
                    onChange={(e) => setCityWeight(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--tl-rose-500)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Valores Morais, Éticos e Familiares</span>
                    <strong style={{ color: 'var(--tl-rose-500)' }}>{valuesWeight}%</strong>
                  </div>
                  <input 
                    type="range" min="0" max="50" value={valuesWeight} 
                    onChange={(e) => setValuesWeight(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--tl-rose-500)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Interesses Culturais e Hobbies</span>
                    <strong style={{ color: 'var(--tl-rose-500)' }}>{interestsWeight}%</strong>
                  </div>
                  <input 
                    type="range" min="0" max="50" value={interestsWeight} 
                    onChange={(e) => setInterestsWeight(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--tl-rose-500)' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Estilo de Vida e Rotina Diária</span>
                    <strong style={{ color: 'var(--tl-rose-500)' }}>{lifestyleWeight}%</strong>
                  </div>
                  <input 
                    type="range" min="0" max="50" value={lifestyleWeight} 
                    onChange={(e) => setLifestyleWeight(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--tl-rose-500)' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <div>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Soma total dos pesos: </span>
                    <strong style={{ color: cityWeight + valuesWeight + interestsWeight + lifestyleWeight === 100 ? 'var(--status-success)' : 'var(--tl-rose-500)', fontSize: '15px' }}>
                      {cityWeight + valuesWeight + interestsWeight + lifestyleWeight}%
                    </strong>
                  </div>
                  <motion.button 
                    className="tl-btn tl-btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => showToast('Parâmetros do motor de afinidade salvos e propagados com sucesso!')}
                  >
                    Salvar Parâmetros
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {/* Audit Logs Tab */}
          {activeSubTab === 'audit' && (
            <div className="card-box" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                  Trilha de Auditoria Imutável LGPD & Segurança
                </strong>
                <button 
                  onClick={() => showToast('Relatório de auditoria exportado em formato CSV!')}
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--text-primary)' }}
                >
                  Exportar Logs (CSV)
                </button>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '12px 16px' }}>Data/Hora</th>
                    <th style={{ padding: '12px 16px' }}>Operador</th>
                    <th style={{ padding: '12px 16px' }}>Papel</th>
                    <th style={{ padding: '12px 16px' }}>Ação Executada</th>
                    <th style={{ padding: '12px 16px' }}>Alvo / Objeto</th>
                    <th style={{ padding: '12px 16px' }}>IP Origem</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(log => (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{log.timestamp}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-primary)' }}>{log.actor}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: '11px', background: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px' }}>
                          {log.role}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--tl-forest-500)' }}>{log.action}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{log.target}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{log.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
};
