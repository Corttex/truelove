import React, { useState } from 'react';
import { agentEngine } from '../../services/agentEngine';
import { AIAgentConfig, MetaChannelIntegration, InboundMetaMessage } from '../../types';
import { 
  Bot, MessageSquare, Zap, CheckCircle, 
  Send, Sparkles, AlertCircle, Play, Shield, RefreshCw, 
  ArrowRight, Radio, Server, Check, Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const AIAgentCockpit: React.FC = () => {
  const [agents, setAgents] = useState<AIAgentConfig[]>(agentEngine.getAgents());
  const [metaConfig, setMetaConfig] = useState<MetaChannelIntegration>(agentEngine.getMetaConfig());
  const [messages, setMessages] = useState<InboundMetaMessage[]>(agentEngine.getMessages());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Simulation form state
  const [simChannel, setSimChannel] = useState<'whatsapp' | 'instagram'>('whatsapp');
  const [simSenderName, setSimSenderName] = useState('Eduardo Silveira');
  const [simIdentifier, setSimIdentifier] = useState('+55 (41) 99123-4567');
  const [simText, setSimText] = useState('Olá! Vi a matéria de vocês. Tenho 62 anos, sou arquiteto aposentado em Curitiba e gostaria de conhecer alguém com hábitos tranquilos.');
  const [isProcessing, setIsProcessing] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleAuto = (agentId: string) => {
    agentEngine.toggleAgentAutoMode(agentId);
    setAgents([...agentEngine.getAgents()]);
    showToast('Modo de operação autônoma atualizado.');
  };

  const handleToggleStatus = (agentId: string) => {
    agentEngine.toggleAgentStatus(agentId);
    setAgents([...agentEngine.getAgents()]);
    showToast('Status do agente atualizado.');
  };

  const handleRunSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simText.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const processed = agentEngine.processInboundMeta(simText, simSenderName, simIdentifier, simChannel);
      setMessages([...agentEngine.getMessages()]);
      setMetaConfig({ ...agentEngine.getMetaConfig() });
      setAgents([...agentEngine.getAgents()]);
      setIsProcessing(false);
      showToast(`⚡ Agente Sofia processou a conversa e sincronizou com o Funil do CRM!`);
    }, 600);
  };

  const loadExample = (type: 'curitiba' | 'rj' | 'sp_casual' | 'under35') => {
    if (type === 'curitiba') {
      setSimSenderName('Eduardo Silveira');
      setSimIdentifier('+55 (41) 99123-4567');
      setSimChannel('whatsapp');
      setSimText('Olá! Vi a matéria de vocês. Tenho 62 anos, sou arquiteto aposentado em Curitiba e gostaria de conhecer alguém com hábitos tranquilos.');
    } else if (type === 'rj') {
      setSimSenderName('Gisela Drummond');
      setSimIdentifier('@gisela.artes');
      setSimChannel('instagram');
      setSimText('Boa noite! Tenho 59 anos, vivo no Rio de Janeiro, sou artista plástica e valorizo muito diálogo e cinema. Como posso me cadastrar?');
    } else if (type === 'sp_casual') {
      setSimSenderName('Marcos 28');
      setSimIdentifier('+55 (11) 98800-0011');
      setSimChannel('whatsapp');
      setSimText('Opa, procuro encontros casuais e rápidos sem compromisso.');
    } else if (type === 'under35') {
      setSimSenderName('Lucas Mendes');
      setSimIdentifier('@lucas.mendes');
      setSimChannel('instagram');
      setSimText('Olá, tenho 26 anos e gostaria de usar o aplicativo.');
    }
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

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ color: 'var(--tl-gold-500)', fontWeight: 800, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Painel do Dono · Motor de Agentes de IA (JEV)
          </span>
          <span className="owner-badge" style={{ background: 'var(--tl-brand-100)', color: 'var(--tl-brand-600)' }}>
            Autonomia 24/7 na VPS
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--text-primary)', fontWeight: 600 }}>
          Central de Agentes de IA & Integração Meta (WhatsApp & Instagram)
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Arquitetura JEV: Agentes inteligentes que leem mensagens, filtram clientes 35+, alimentam o Funil do CRM e operam a empresa sozinhos.
        </p>
      </motion.div>

      {/* Meta Connection Status Banner */}
      <div className="card-box" style={{ marginBottom: '28px', padding: '22px 28px', background: 'var(--bg-card)', borderLeft: '5px solid var(--tl-brand-600)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* WhatsApp */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#25d366', display: 'grid', placeItems: 'center', color: '#fff' }}>
                <MessageSquare size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '14px', display: 'block', color: 'var(--text-primary)' }}>WhatsApp Cloud API</strong>
                <span style={{ fontSize: '12px', color: 'var(--status-success)', fontWeight: 600 }}>
                  ● Conectado ({metaConfig.whatsappPhoneNumber})
                </span>
              </div>
            </div>

            {/* Instagram */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', display: 'grid', placeItems: 'center', color: '#fff' }}>
                <InstagramIcon size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '14px', display: 'block', color: 'var(--text-primary)' }}>Instagram Direct API</strong>
                <span style={{ fontSize: '12px', color: 'var(--status-success)', fontWeight: 600 }}>
                  ● Conectado ({metaConfig.instagramAccountHandle})
                </span>
              </div>
            </div>

            {/* Webhook Endpoint */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-secondary)', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <Server size={16} color="var(--text-muted)" />
              <span style={{ fontSize: '12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                {metaConfig.webhookUrl}
              </span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(metaConfig.webhookUrl);
                  showToast('URL do Webhook copiada!');
                }}
                style={{ padding: '2px 6px', color: 'var(--tl-brand-600)' }}
                title="Copiar URL para o Meta for Developers"
              >
                <Copy size={13} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Mensagens Filtradas</span>
              <strong style={{ fontSize: '20px', color: 'var(--text-primary)' }}>{metaConfig.messagesProcessedTotal}</strong>
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Leads Criados no Funil</span>
              <strong style={{ fontSize: '20px', color: 'var(--tl-brand-600)' }}>{metaConfig.leadsCreatedFromMeta}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 5 Autonomous AI Agents */}
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Bot size={22} color="var(--tl-gold-500)" />
        Equipe de Agentes Autônomos Ativos (5)
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '36px' }}>
        {agents.map((ag, idx) => {
          const isWorking = ag.status === 'active';
          return (
            <motion.div 
              key={ag.id}
              className="card-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ y: -3 }}
              style={{ padding: '20px', borderTop: `4px solid ${isWorking ? 'var(--tl-brand-600)' : 'var(--border-color)'}` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{ag.name}</h3>
                  <span style={{ fontSize: '11px', color: 'var(--tl-gold-500)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Modelo: {ag.model}
                  </span>
                </div>

                <span className={`badge ${isWorking ? 'badge-verified' : 'badge-rejected'}`} style={{ fontSize: '10px' }}>
                  {isWorking ? '● Ativo' : 'Pausado'}
                </span>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', minHeight: '58px', marginBottom: '14px' }}>
                {ag.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginBottom: '14px', color: 'var(--text-muted)' }}>
                <span>Ações: <strong style={{ color: 'var(--text-primary)' }}>{ag.totalActionsExecuted}</strong></span>
                <span>Assertividade: <strong style={{ color: 'var(--status-success)' }}>{ag.successRate}%</strong></span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <input 
                    type="checkbox" 
                    checked={ag.autoMode} 
                    onChange={() => handleToggleAuto(ag.id)}
                  />
                  Modo Autônomo
                </label>

                <button 
                  className={isWorking ? 'btn-secondary' : 'btn-primary'}
                  style={{ padding: '4px 10px', fontSize: '11px', minHeight: '30px' }}
                  onClick={() => handleToggleStatus(ag.id)}
                >
                  {isWorking ? 'Pausar' : 'Ativar'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Interactive Simulator: Test Meta Inbound & Funnel Feeding */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Left: Interactive Tester */}
        <div className="card-box" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Zap size={18} color="var(--tl-gold-500)" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--text-primary)' }}>
              Simulador de Entrada Meta (WhatsApp & Instagram)
            </h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '18px' }}>
            Envie uma mensagem de teste como se viesse da Meta Graph API para testar o filtro do Agente Sofia e ver a alimentação instantânea do Funil.
          </p>

          {/* Quick Examples Buttons */}
          <div style={{ marginBottom: '18px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
              Carregar Cenários Reais:
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ padding: '4px 10px', fontSize: '11px' }}
                onClick={() => loadExample('curitiba')}
              >
                Curitiba 62a (Aposentado)
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ padding: '4px 10px', fontSize: '11px' }}
                onClick={() => loadExample('rj')}
              >
                Rio 59a (Artista)
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ padding: '4px 10px', fontSize: '11px' }}
                onClick={() => loadExample('sp_casual')}
              >
                Casual (Incompatível)
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ padding: '4px 10px', fontSize: '11px' }}
                onClick={() => loadExample('under35')}
              >
                26 anos (Menor de 35)
              </button>
            </div>
          </div>

          <form onSubmit={handleRunSimulation} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Canal</label>
                <select 
                  className="form-input" 
                  value={simChannel}
                  onChange={(e) => setSimChannel(e.target.value as any)}
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Nome do Contato</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={simSenderName} 
                  onChange={(e) => setSimSenderName(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Telefone ou @handle
              </label>
              <input 
                type="text" 
                className="form-input" 
                value={simIdentifier} 
                onChange={(e) => setSimIdentifier(e.target.value)} 
                required 
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Mensagem Inbound Recebida
              </label>
              <textarea 
                className="form-input" 
                rows={3} 
                value={simText} 
                onChange={(e) => setSimText(e.target.value)} 
                required 
              />
            </div>

            <motion.button 
              type="submit" 
              className="btn-primary" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isProcessing}
              style={{ marginTop: '6px' }}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={15} className="spin-animation" />
                  Agente Sofia Processando...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Processar com Agente de IA & Alimentar CRM
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Right: Live Activity Log of Meta Messages Filtered */}
        <div className="card-box" style={{ padding: '26px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Feed de Triagem & Decisões Autônomas
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '18px' }}>
            Registro em tempo real da análise semântica, idade detectada e ação no funil.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '480px', overflowY: 'auto' }}>
            <AnimatePresence>
              {messages.map((m) => (
                <motion.div 
                  key={m.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-box"
                  style={{
                    padding: '14px 16px',
                    background: 'var(--bg-secondary)',
                    borderLeft: `4px solid ${m.analysis?.isQualified35Plus && m.analysis?.intentType === 'interest_serious' ? 'var(--status-success)' : 'var(--status-danger)'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {m.channel === 'whatsapp' ? (
                        <span style={{ color: '#25d366', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700 }}>
                          <MessageSquare size={13} /> WhatsApp
                        </span>
                      ) : (
                        <span style={{ color: '#e6683c', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700 }}>
                          <InstagramIcon size={13} /> Instagram
                        </span>
                      )}
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{m.senderName}</strong>
                    </div>

                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {new Date(m.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'var(--bg-card)', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-color)', margin: '6px 0' }}>
                    "{m.rawText}"
                  </p>

                  {/* Analysis output */}
                  {m.analysis && (
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <span>Idade: <strong style={{ color: m.analysis.isQualified35Plus ? 'var(--status-success)' : 'var(--status-danger)' }}>{m.analysis.detectedAge ? `${m.analysis.detectedAge} anos` : 'Indefinida'}</strong></span>
                        <span>Cidade: <strong style={{ color: 'var(--text-primary)' }}>{m.analysis.detectedCity}</strong></span>
                        <span>Intenção: <strong style={{ color: m.analysis.intentType === 'interest_serious' ? 'var(--status-success)' : 'var(--status-danger)' }}>{m.analysis.intentType}</strong></span>
                      </div>
                      <div style={{ color: 'var(--tl-brand-600)', fontWeight: 600, marginTop: '2px' }}>
                        ⚡ {m.analysis.actionTaken}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};
