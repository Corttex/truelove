import React, { useState } from 'react';
import { usePlatformStore, platformStore } from '../../services/store';
import { ShieldCheck, UserX, CheckCircle, Clock, AlertCircle, Sparkles, Eye, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RegistrationManager: React.FC = () => {
  const { profiles } = usePlatformStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const pendingProfiles = profiles.filter(p => p.documentStatus === 'pending' || !p.verified);
  const verifiedProfiles = profiles.filter(p => p.verified);

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
            Painel do Dono · Gestor de Cadastros
          </span>
          <span className="owner-badge">Auditoria KYC & 35+</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--text-primary)', fontWeight: 600 }}>
          Validação de Documentos & Elegibilidade Etária
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Garantia de segurança: sem perfis fakes ou menores de 35 anos. Validação criteriosa de identidade e fotos.
        </p>
      </motion.div>

      {/* Summary Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <motion.div className="card-box" whileHover={{ y: -2 }} style={{ padding: '18px 20px', borderLeft: '4px solid var(--status-warning)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Aguardando Verificação</span>
            <Clock size={18} color="var(--status-warning)" />
          </div>
          <strong style={{ fontSize: '28px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', display: 'block', marginTop: '6px' }}>
            {pendingProfiles.length}
          </strong>
        </motion.div>

        <motion.div className="card-box" whileHover={{ y: -2 }} style={{ padding: '18px 20px', borderLeft: '4px solid var(--status-success)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Perfis Verificados 35+</span>
            <CheckCircle size={18} color="var(--status-success)" />
          </div>
          <strong style={{ fontSize: '28px', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', display: 'block', marginTop: '6px' }}>
            {verifiedProfiles.length}
          </strong>
        </motion.div>

        <motion.div className="card-box" whileHover={{ y: -2 }} style={{ padding: '18px 20px', borderLeft: '4px solid var(--tl-brand-600)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Critério Rígido</span>
            <ShieldCheck size={18} color="var(--tl-brand-600)" />
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Apenas maiores de 35 anos com selfie e documento oficial aprovados recebem selo.
          </p>
        </motion.div>
      </div>

      {/* Pending Queue */}
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--text-primary)', marginBottom: '16px' }}>
        Fila de Aprovação Pendente ({pendingProfiles.length})
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence>
          {pendingProfiles.map((p, idx) => (
            <motion.div 
              key={p.id} 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.03 }}
              className="card-box" 
              style={{ padding: '20px 24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                
                {/* Profile Details */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <img 
                      src={p.photoUrl} 
                      alt={p.name}
                      style={{ width: '64px', height: '64px', borderRadius: '14px', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                    />
                    <button 
                      onClick={() => setSelectedPhoto(p.photoUrl)}
                      style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '50%', padding: '4px', boxShadow: 'var(--card-shadow)' }}
                      title="Ampliar foto"
                    >
                      <Eye size={12} color="var(--tl-brand-600)" />
                    </button>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{p.name}</strong>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: p.age >= 35 ? 'var(--status-success)' : 'var(--status-danger)' }}>
                        ({p.age} anos · {p.age >= 35 ? 'Idade Elegível ✓' : 'Abaixo de 35 anos ⚠️'})
                      </span>
                      <span className={`badge badge-${p.documentStatus}`}>
                        {p.documentStatus === 'pending' ? 'Documento em Análise' : 'Sem Envio'}
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {p.profession} · {p.city}, {p.state} · Tel: {p.phone || 'Não informado'}
                    </p>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <span>Tipo: <strong>{p.documentType || 'Aguardando envio'}</strong></span>
                      <span>·</span>
                      <span>Documento: <strong>{p.documentNumberMasked || '***.***.***-**'}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      platformStore.updateProfileVerification(p.id, 'verified');
                      showToast(`Cadastro de ${p.name} aprovado com sucesso!`);
                    }}
                  >
                    <CheckCircle size={15} /> Aprovar Documento & Ativar Selo
                  </motion.button>

                  <motion.button
                    className="btn-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ color: 'var(--status-danger)' }}
                    onClick={() => {
                      platformStore.updateProfileVerification(p.id, 'rejected');
                      showToast(`Documento de ${p.name} rejeitado.`);
                    }}
                  >
                    <UserX size={15} /> Rejeitar
                  </motion.button>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {pendingProfiles.length === 0 && (
          <div className="card-box" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            <CheckCircle size={32} color="var(--status-success)" style={{ margin: '0 auto 10px' }} />
            <h3>Fila zerada!</h3>
            <p style={{ fontSize: '14px', marginTop: '4px' }}>Todos os documentos e novos cadastros foram auditados.</p>
          </div>
        )}
      </div>

      {/* Photo Zoom Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{ maxWidth: '480px', width: '100%', background: 'var(--bg-card)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }}
            >
              <img src={selectedPhoto} alt="Auditoria" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Inspeção de Nitidez Facial e Autenticidade</p>
                <button className="btn-secondary" style={{ marginTop: '10px' }} onClick={() => setSelectedPhoto(null)}>Fechar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
