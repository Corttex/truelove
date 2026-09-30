import React, { useState } from 'react';
import { 
  Zap, ShieldCheck, CheckCircle2, 
  Workflow, ArrowRight, Server, Play,
  Layers, Database, Sparkles, MessageCircle, Heart, Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AutomationsHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const workflows = [
    {
      id: 'wf-1',
      category: 'onboarding',
      categoryLabel: 'Triagem & Entrada',
      title: 'Triagem Inteligente (WhatsApp & Direct) -> IA Sofia -> CRM',
      trigger: 'Mensagem Recebida (Meta / WhatsApp / Direct)',
      nodesCount: 7,
      status: 'active',
      desc: 'Recebe mensagens iniciais, valida a regra 35+ com IA Sofia, extrai localização e direciona o perfil qualificado diretamente ao funil do Dono.'
    },
    {
      id: 'wf-2',
      category: 'match',
      categoryLabel: 'Afinidade & Matches',
      title: 'Disparo Noturno de Matches de Alta Afinidade (>= 80%)',
      trigger: 'Execução Automática Diária às 22:00',
      nodesCount: 5,
      status: 'active',
      desc: 'Motor algorítmico consulta perfis com alta afinidade mútua na mesma região metropolitana e dispara notificações elegantes nos celulares dos usuários.'
    },
    {
      id: 'wf-3',
      category: 'retention',
      categoryLabel: 'Reengajamento & Chat',
      title: 'Reativação de Conversas Paradas (48 horas sem resposta)',
      trigger: 'Monitoramento Contínuo (Intervalo de 6h)',
      nodesCount: 4,
      status: 'active',
      desc: 'Agente Clara identifica conversas estagnadas pós-match e envia quebra-gelo personalizado baseado em interesses em comum (ex: livros, gastronomia).'
    },
    {
      id: 'wf-4',
      category: 'security',
      categoryLabel: 'Segurança & KYC 35+',
      title: 'Notificação Imediata de Aprovação Documental (CNH/RG)',
      trigger: 'Evento: Auditoria Documental Aprovada',
      nodesCount: 3,
      status: 'active',
      desc: 'Após validação do documento e biometria facial, dispara mensagem de confirmação no WhatsApp com o selo verificado e liberação total do app.'
    },
    {
      id: 'wf-5',
      category: 'match',
      categoryLabel: 'Afinidade & Matches',
      title: 'Radar de Proximidade & Encontros em Grupo (Double Date)',
      trigger: 'Novo Membro Verificado na Região',
      nodesCount: 6,
      status: 'active',
      desc: 'Calcula compatibilidade geográfica de bairros próximos e convida solteiros cultos para experiências gastronômicas compartilhadas.'
    },
    {
      id: 'wf-6',
      category: 'security',
      categoryLabel: 'Segurança & KYC 35+',
      title: 'Escudo Anti-Golpe & Detecção de Padrões Suspeitos',
      trigger: 'Monitoramento de Eventos em Tempo Real',
      nodesCount: 8,
      status: 'active',
      desc: 'Algoritmo de proteção contra contas falsas, linguagem invasiva ou tentativa de compartilhamento prematuro de chaves financeiras.'
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos os Fluxos' },
    { id: 'onboarding', label: 'Triagem & Entrada' },
    { id: 'match', label: 'Afinidade & Matches' },
    { id: 'retention', label: 'Reengajamento' },
    { id: 'security', label: 'Segurança & KYC' }
  ];

  const filteredWorkflows = selectedCategory === 'all' 
    ? workflows 
    : workflows.filter(w => w.category === selectedCategory);

  return (
    <div style={{ padding: '44px 32px 64px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ color: 'var(--tl-rose-500)', background: 'rgba(199, 94, 112, 0.12)', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Orquestração Inteligente & Workflows
          </span>
          <span style={{ fontSize: '12px', color: 'var(--status-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            ● Motores de Automação Operando em Tempo Real
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
          Gestor de Automações do Sistema
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '6px', maxWidth: '750px', lineHeight: 1.5 }}>
          Visão geral dos fluxos automáticos ativos na plataforma True Love: regras de qualificação, disparos de sintonia, réguas de reengajamento e auditoria de segurança.
        </p>
      </div>

      {/* Filter Category Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              border: selectedCategory === cat.id ? '1px solid var(--tl-rose-500)' : '1px solid var(--border-color)',
              background: selectedCategory === cat.id ? 'var(--tl-rose-500)' : 'var(--card-bg)',
              color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Workflows List */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '28px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '20px', color: 'var(--text-primary)', fontWeight: 700 }}>
              Automações Ativas ({filteredWorkflows.length})
            </h3>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Monitoradas e processadas continuamente pela infraestrutura True Love
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          {filteredWorkflows.map(wf => (
            <motion.div 
              key={wf.id}
              whileHover={{ y: -4 }}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '22px',
                background: 'var(--bg-primary)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <CheckCircle2 size={14} /> Ativo 24/7
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--tl-rose-500)', background: 'rgba(199, 94, 112, 0.1)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                    {wf.categoryLabel}
                  </span>
                </div>

                <strong style={{ fontSize: '16px', color: 'var(--text-primary)', display: 'block', marginBottom: '8px', lineHeight: 1.35 }}>
                  {wf.title}
                </strong>

                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {wf.desc}
                </p>
              </div>

              <div style={{ marginTop: '18px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Gatilho: <strong style={{ color: 'var(--text-primary)' }}>{wf.trigger}</strong>
                </span>

                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {wf.nodesCount} etapas no fluxo
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};
