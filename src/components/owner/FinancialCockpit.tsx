import React, { useState } from 'react';
import { usePlatformStore, platformStore } from '../../services/store';
import { DollarSign, TrendingUp, CreditCard, Users, ArrowUpRight, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FinancialCockpit: React.FC = () => {
  const { finance, profiles } = usePlatformStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const plusUsers = profiles.filter(p => p.tier === 'PLUS');
  const conciergeUsers = profiles.filter(p => p.tier === 'CONCIERGE');
  const freeUsers = profiles.filter(p => p.tier === 'FREE');

  const totalCalculatedMRR = (plusUsers.length * 79.00) + (conciergeUsers.length * 349.00);

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
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ color: 'var(--tl-gold-500)', fontWeight: 800, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Painel do Dono · Gestão Financeira
            </span>
            <span className="owner-badge">Receita Recorrente & Planos</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--text-primary)', fontWeight: 600 }}>
            Cockpit Financeiro & Faturamento MRR
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Acompanhe o faturamento das assinaturas Plus e Concierge VIP, LTV médio e transações recentes.
          </p>
        </div>

        <motion.button 
          className="btn-gold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const free = freeUsers[0];
            if (free) {
              platformStore.updateProfileTier(free.id, 'CONCIERGE');
              showToast(`Nova assinatura Concierge VIP simulada para ${free.name} (+R$ 349,00/mês)!`);
            } else {
              showToast('Todas as contas de teste já possuem plano pago!');
            }
          }}
        >
          <Sparkles size={15} /> Simular Assinatura VIP
        </motion.button>
      </motion.div>

      {/* Financial Metrics Cards with Framer Motion */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        
        <motion.div 
          className="card-box" 
          whileHover={{ y: -3 }}
          style={{ background: 'linear-gradient(145deg, #103f3c, #091a18)', color: '#ffffff', border: '1px solid rgba(42, 135, 127, 0.4)' }}
        >
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)', fontWeight: 700 }}>
            MRR (Receita Recorrente Mensal)
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <strong style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#ffffff' }}>
              R$ {totalCalculatedMRR.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </strong>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--tl-gold-400)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            <ArrowUpRight size={14} /> +18.4% vs mês anterior
          </span>
        </motion.div>

        <motion.div className="card-box" whileHover={{ y: -3 }}>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
            ARR (Faturamento Anual Projetado)
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <strong style={{ fontSize: '28px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
              R$ {(totalCalculatedMRR * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </strong>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', display: 'block' }}>
            Base de assinantes ativos
          </span>
        </motion.div>

        <motion.div className="card-box" whileHover={{ y: -3 }}>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
            LTV Médio por Assinante
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <strong style={{ fontSize: '28px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
              R$ {finance.averageLtv.toFixed(2)}
            </strong>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--status-success)', marginTop: '6px', display: 'block' }}>
            Tempo médio de retenção: 6.8 meses
          </span>
        </motion.div>

        <motion.div className="card-box" whileHover={{ y: -3 }}>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
            Taxa de Churn Mensal
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <strong style={{ fontSize: '28px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
              {finance.churnRateMonthly}%
            </strong>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--status-success)', marginTop: '6px', display: 'block' }}>
            Excelente (abaixo do teto de 5%)
          </span>
        </motion.div>

      </div>

      {/* Plan Breakdown Comparison */}
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--text-primary)', marginBottom: '16px' }}>
        Distribuição da Base por Plano
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* Free Plan */}
        <motion.div className="card-box" whileHover={{ y: -3 }} style={{ borderTop: '4px solid #b7c7c3' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Plano Free</h3>
            <span className="badge badge-tier-free">R$ 0,00</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', minHeight: '38px' }}>
            Acesso básico: perfil verificado, apresentações diárias e conversa após match recíproco.
          </p>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Assinantes na base:</span>
            <strong style={{ fontSize: '20px', color: 'var(--text-primary)' }}>{freeUsers.length}</strong>
          </div>
        </motion.div>

        {/* Plus Plan */}
        <motion.div className="card-box" whileHover={{ y: -3 }} style={{ borderTop: '4px solid var(--tl-brand-600)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Plano Plus</h3>
            <span className="badge badge-tier-plus">R$ 79,00 / mês</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', minHeight: '38px' }}>
            Filtros avançados por cidade/estado, ver quem curtiu antes, rebobinar perfis e matches ilimitados.
          </p>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Receita Gerada:</span>
            <strong style={{ fontSize: '20px', color: 'var(--tl-brand-600)' }}>
              R$ {(plusUsers.length * 79).toFixed(2)}/mês
            </strong>
          </div>
        </motion.div>

        {/* Concierge Plan */}
        <motion.div className="card-box" whileHover={{ y: -3 }} style={{ borderTop: '4px solid var(--tl-gold-500)', background: 'var(--bg-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--tl-gold-500)' }}>Concierge VIP</h3>
            <span className="badge badge-tier-concierge">R$ 349,00 / mês</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', minHeight: '38px' }}>
            Curadoria humana dedicada por Matchmaker, feedback pessoal e apresentações exclusivas.
          </p>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Receita Gerada:</span>
            <strong style={{ fontSize: '20px', color: 'var(--tl-gold-500)' }}>
              R$ {(conciergeUsers.length * 349).toFixed(2)}/mês
            </strong>
          </div>
        </motion.div>

      </div>

      {/* Transactions Table */}
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--text-primary)', marginBottom: '16px' }}>
        Transações e Assinaturas Recentes
      </h2>

      <div className="card-box" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
              <th style={{ padding: '14px 18px' }}>ID Transação</th>
              <th style={{ padding: '14px 18px' }}>Cliente</th>
              <th style={{ padding: '14px 18px' }}>Plano</th>
              <th style={{ padding: '14px 18px' }}>Método</th>
              <th style={{ padding: '14px 18px' }}>Valor</th>
              <th style={{ padding: '14px 18px' }}>Data</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {finance.recentTransactions.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 18px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{tx.id}</td>
                <td style={{ padding: '14px 18px', fontWeight: 600, color: 'var(--text-primary)' }}>{tx.profileName}</td>
                <td style={{ padding: '14px 18px' }}>
                  <span className={`badge badge-tier-${tx.tier.toLowerCase()}`}>{tx.tier}</span>
                </td>
                <td style={{ padding: '14px 18px', textTransform: 'uppercase', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {tx.paymentMethod === 'apple_pay' ? ' Apple Pay' : tx.paymentMethod === 'pix' ? '⚡ PIX' : '💳 Cartão de Crédito'}
                </td>
                <td style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--tl-brand-600)' }}>
                  R$ {tx.amount.toFixed(2)}
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  {new Date(tx.date).toLocaleDateString('pt-BR')} {new Date(tx.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span className="badge badge-verified">✓ Pago</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
