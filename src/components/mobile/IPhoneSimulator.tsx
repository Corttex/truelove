import React, { useState } from 'react';
import { usePlatformStore, platformStore } from '../../services/store';
import { calculateAffinity } from '../../services/affinityEngine';
import { UserProfile } from '../../types';
import { 
  Heart, Sparkles, Shield, User, MessageCircle, 
  MapPin, CheckCircle, ChevronLeft, Send, Award, 
  Compass, Info, X, Flame, Grid, RotateCcw, Star, Zap, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const IPhoneSimulator: React.FC = () => {
  const { profiles } = usePlatformStore();
  
  // Personas toggle: default to Maria Helena (64 anos, RJ)
  const [currentPersonaId, setCurrentPersonaId] = useState<string>('p-maria');
  const currentPersona = profiles.find(p => p.id === currentPersonaId) || profiles[0];

  // Mobile App Navigation Tab: 'discover' | 'connections' | 'chat' | 'profile' | 'concierge'
  const [mobileTab, setMobileTab] = useState<'discover' | 'connections' | 'chat' | 'profile' | 'concierge'>('discover');
  const [discoveryMode, setDiscoveryMode] = useState<'swipe' | 'radar'>('swipe');
  
  // Discover Card Index
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [showAffinityDrawer, setShowAffinityDrawer] = useState(false);
  const [activeChatProfile, setActiveChatProfile] = useState<UserProfile | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'me' | 'other'; text: string; time: string }>>([
    { sender: 'other', text: 'Olá! Fico muito contente com nosso interesse mútuo.', time: '14:20' },
    { sender: 'me', text: 'Olá! Também adorei ver que você aprecia viagens culturais e cinema clássico.', time: '14:22' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [matchedNotification, setMatchedNotification] = useState<string | null>(null);

  // Available candidate profiles (excluding current persona)
  const candidates = profiles.filter(p => p.id !== currentPersona.id && p.active && p.verified);
  const currentCandidate = candidates[candidateIndex % candidates.length];

  // Affinity calculation
  const affinityResult = currentCandidate 
    ? calculateAffinity(currentPersona, currentCandidate)
    : null;

  const handleInterest = () => {
    if (!currentCandidate) return;
    
    setMatchedNotification(`Parabéns! Houve interesse recíproco com ${currentCandidate.name}! O chat foi liberado.`);
    setTimeout(() => {
      setMatchedNotification(null);
      setCandidateIndex(prev => prev + 1);
    }, 2800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages(prev => [...prev, { sender: 'me', text: inputMsg.trim(), time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
    setInputMsg('');
  };

  return (
    <div style={{ padding: '48px 24px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'var(--bg-primary)', minHeight: 'calc(100vh - 60px)' }}>
      
      {/* Top Device Bar & Persona Selector */}
      <motion.div 
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '840px', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}
      >
        <div>
          <span style={{ color: 'var(--tl-brand-600)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Simulador Apple iOS · Human Interface Guidelines
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--text-primary)' }}>
            Experiência do Usuário no iPhone 16 Pro
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>Navegando como:</span>
          <select
            className="form-input"
            style={{ minHeight: '36px', padding: '6px 12px', fontSize: '13px', fontWeight: 600 }}
            value={currentPersonaId}
            onChange={(e) => {
              setCurrentPersonaId(e.target.value);
              setCandidateIndex(0);
            }}
          >
            <option value="p-maria">Maria Helena (64a · Rio de Janeiro)</option>
            <option value="p-emanuel">Emanuel Rocha (61a · Rio de Janeiro)</option>
            <option value="p-teresa">Teresa Martins (57a · Brasília)</option>
            <option value="p-beatriz">Beatriz Campos (44a · São Paulo)</option>
          </select>
        </div>
      </motion.div>

      {/* iPhone Pro Frame */}
      <motion.div 
        className="iphone-frame"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Dynamic Island */}
        <div className="dynamic-island">
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1c1c1e' }} />
          <div style={{ fontSize: '10px', color: '#888', fontWeight: 600 }}>True Love</div>
        </div>

        {/* Screen Area */}
        <div className="iphone-screen">
          
          {/* iOS Status Bar */}
          <div style={{ position: 'absolute', top: '14px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', zIndex: 100 }}>
            <span>09:41</span>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px' }}>5G</span>
              <span style={{ fontSize: '11px' }}>100%</span>
            </div>
          </div>

          {/* Match Alert Overlay */}
          <AnimatePresence>
            {matchedNotification && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{ position: 'absolute', inset: 0, background: 'rgba(10,38,36,0.95)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', color: '#fff' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  <Heart size={54} color="var(--tl-rose-500)" style={{ fill: 'var(--tl-rose-500)', marginBottom: '16px' }} />
                </motion.div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', marginBottom: '8px' }}>Interesse Recíproco!</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                  {matchedNotification}
                </p>
                <button 
                  className="btn-gold" 
                  style={{ marginTop: '20px', padding: '10px 20px', fontSize: '13px' }}
                  onClick={() => {
                    setMatchedNotification(null);
                    setMobileTab('chat');
                  }}
                >
                  Abrir Chat Agora
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Views based on mobileTab */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <AnimatePresence mode="wait">
              {/* VIEW 1: DISCOVER */}
              {mobileTab === 'discover' && currentCandidate && (
                <motion.div 
                  key={currentCandidate.id + discoveryMode}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px 14px', position: 'relative' }}
                >
                  {/* Mode Switcher: Tinder vs Badoo */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
                    <button
                      onClick={() => setDiscoveryMode('swipe')}
                      style={{
                        padding: '5px 14px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: discoveryMode === 'swipe' ? '#fd267a' : 'rgba(0,0,0,0.06)',
                        color: discoveryMode === 'swipe' ? '#ffffff' : 'var(--text-muted)',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: discoveryMode === 'swipe' ? '0 2px 8px rgba(253,38,122,0.3)' : 'none'
                      }}
                    >
                      <Flame size={13} /> Deslizar (Tinder)
                    </button>
                    <button
                      onClick={() => setDiscoveryMode('radar')}
                      style={{
                        padding: '5px 14px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: discoveryMode === 'radar' ? '#7c3aed' : 'rgba(0,0,0,0.06)',
                        color: discoveryMode === 'radar' ? '#ffffff' : 'var(--text-muted)',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: discoveryMode === 'radar' ? '0 2px 8px rgba(124,58,237,0.3)' : 'none'
                      }}
                    >
                      <Grid size={13} /> Perto de Você (Badoo)
                    </button>
                  </div>

                  {/* 1. MODO TINDER: SWIPE DECK & GAMEPAD DE 5 BOTÕES */}
                  {discoveryMode === 'swipe' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Discovery Card */}
                      <div style={{
                        position: 'relative',
                        flex: 1,
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: 'var(--card-shadow)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        backgroundImage: `url(${currentCandidate.photoUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '380px'
                      }}>
                        {/* Top Badges */}
                        <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', color: '#fff', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 600 }}>
                            {currentCandidate.city}, {currentCandidate.state}
                          </span>

                          {affinityResult && (
                            <button 
                              onClick={() => setShowAffinityDrawer(true)}
                              style={{ background: 'rgba(20,83,79,0.92)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Sparkles size={11} color="var(--tl-gold-400)" />
                              {affinityResult.score}% Afinidade
                            </button>
                          )}
                        </div>

                        {/* Gradient Card Overlay with Profile Info */}
                        <div style={{
                          background: 'linear-gradient(180deg, transparent 0%, rgba(10,38,36,0.6) 20%, rgba(10,38,36,0.96) 95%)',
                          padding: '40px 16px 16px',
                          color: '#ffffff'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <h3 style={{ fontSize: '22px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: '#ffffff', margin: 0 }}>
                              {currentCandidate.name}, {currentCandidate.age}
                            </h3>
                            {currentCandidate.verified && (
                              <CheckCircle size={17} color="#48d697" />
                            )}
                          </div>

                          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', margin: '2px 0 6px 0' }}>
                            {currentCandidate.profession} · {currentCandidate.relationshipGoal}
                          </p>

                          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.92)', lineHeight: '1.4', margin: '0 0 10px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            "{currentCandidate.bio}"
                          </p>

                          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                            {currentCandidate.interests.slice(0, 3).map(i => (
                              <span key={i} style={{ background: 'rgba(255,255,255,0.18)', padding: '2px 7px', borderRadius: 'var(--radius-full)', fontSize: '10px' }}>
                                {i}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Iconic Tinder Gamepad (5 Botões de Alta Resposta Tátil) */}
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '12px 0 4px 0' }}>
                        {/* 1. Rebobinar (Amarelo) */}
                        <motion.button
                          whileHover={{ scale: 1.12 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setCandidateIndex(prev => Math.max(0, prev - 1))}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--card-bg)', border: '1.5px solid #eab308', color: '#eab308', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(234, 179, 8, 0.2)' }}
                          title="Rebobinar perfil anterior"
                        >
                          <RotateCcw size={17} />
                        </motion.button>

                        {/* 2. Pular / Pass (Vermelho) */}
                        <motion.button
                          whileHover={{ scale: 1.12 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setCandidateIndex(prev => prev + 1)}
                          style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--card-bg)', border: '1.5px solid #ef4444', color: '#ef4444', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)' }}
                          title="Pular"
                        >
                          <X size={22} />
                        </motion.button>

                        {/* 3. Super Sintonia (Azul) */}
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleInterest}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--card-bg)', border: '1.5px solid #0284c7', color: '#0284c7', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(2, 132, 199, 0.2)' }}
                          title="Super Sintonia"
                        >
                          <Star size={17} fill="#0284c7" />
                        </motion.button>

                        {/* 4. Curtir / Interesse (Gradiente Tinder Flame) */}
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleInterest}
                          style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #fd267a 0%, #ff6036 100%)', border: 'none', color: '#ffffff', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 8px 18px rgba(253, 38, 122, 0.4)' }}
                          title="Curtir / Demonstrar Interesse"
                        >
                          <Heart size={24} fill="#ffffff" />
                        </motion.button>

                        {/* 5. Boost Concierge (Roxo) */}
                        <motion.button
                          whileHover={{ scale: 1.12 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowAffinityDrawer(true)}
                          style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--card-bg)', border: '1.5px solid #a855f7', color: '#a855f7', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(168, 85, 247, 0.2)' }}
                          title="Ver Afinidade e Valores"
                        >
                          <Zap size={17} fill="#a855f7" />
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {/* 2. MODO BADOO: RADAR DE PESSOAS PRÓXIMAS (GRADE 2 COLUNAS) */}
                  {discoveryMode === 'radar' && (
                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '2px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Solteiros 35+ Perto de Você</strong>
                        <span style={{ fontSize: '11px', color: 'var(--status-success)', fontWeight: 700 }}>● {candidates.length} online</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {candidates.map((cand, idx) => (
                          <motion.div
                            key={cand.id}
                            whileHover={{ y: -2 }}
                            onClick={() => {
                              setCandidateIndex(idx);
                              setDiscoveryMode('swipe');
                            }}
                            style={{
                              borderRadius: '16px',
                              overflow: 'hidden',
                              background: 'var(--card-bg)',
                              border: '1px solid var(--border-color)',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                              cursor: 'pointer',
                              position: 'relative',
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
                              <img src={cand.photoUrl} alt={cand.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)' }} />
                              
                              {/* Badoo Blue Verification Badge */}
                              <div style={{ position: 'absolute', top: '6px', right: '6px', background: '#0284c7', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'grid', placeItems: 'center' }}>
                                <CheckCircle size={12} fill="#0284c7" color="#fff" />
                              </div>

                              <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', color: '#fff' }}>
                                <strong style={{ fontSize: '12px', display: 'block' }}>{cand.name}, {cand.age}</strong>
                                <span style={{ fontSize: '10px', opacity: 0.9 }}>{cand.city}</span>
                              </div>
                            </div>

                            <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {cand.relationshipGoal}
                              </span>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', color: 'var(--text-muted)' }}>
                                <span>A {(idx * 2) + 2} km</span>
                                <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>● Online</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Affinity Breakdown Drawer with AnimatePresence */}
                  <AnimatePresence>
                    {showAffinityDrawer && affinityResult && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 500, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: '24px', overflow: 'hidden' }}
                      >
                        <motion.div 
                          initial={{ y: 80 }}
                          animate={{ y: 0 }}
                          exit={{ y: 80 }}
                          style={{ background: 'var(--bg-card)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '20px', color: 'var(--text-primary)' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>
                              Por que foram apresentados?
                            </strong>
                            <button onClick={() => setShowAffinityDrawer(false)}>
                              <X size={18} color="var(--text-muted)" />
                            </button>
                          </div>

                          <div style={{ background: 'var(--tl-brand-50)', padding: '10px 14px', borderRadius: '10px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Sparkles size={16} color="var(--tl-gold-500)" />
                            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--tl-brand-600)' }}>
                              {affinityResult.score}% · {affinityResult.label}
                            </span>
                          </div>

                          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                            {affinityResult.reasons.map((r, idx) => (
                              <li key={idx} style={{ display: 'flex', gap: '6px' }}>
                                <span style={{ color: 'var(--tl-brand-600)' }}>✓</span> {r}
                              </li>
                            ))}
                          </ul>

                          <button 
                            className="btn-primary" 
                            style={{ width: '100%', marginTop: '16px', padding: '10px', fontSize: '13px' }}
                            onClick={() => setShowAffinityDrawer(false)}
                          >
                            Entendido
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              )}

              {/* VIEW 2: CONNECTIONS */}
              {mobileTab === 'connections' && (
                <motion.div 
                  key="connections"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', marginBottom: '4px' }}>
                    Conexões Mútuas
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    O chat só é liberado quando ambas as pessoas demonstram interesse.
                  </p>

                  {profiles.slice(1, 4).map(other => (
                    <motion.div 
                      key={other.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveChatProfile(other);
                        setMobileTab('chat');
                      }}
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                    >
                      <img src={other.photoUrl} alt={other.name} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <strong style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'block' }}>{other.name}, {other.age}</strong>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{other.city} · Afinidade recíproca</span>
                      </div>
                      <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '11px', borderRadius: 'var(--radius-full)' }}>
                        Conversar
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* VIEW 3: CHAT */}
              {mobileTab === 'chat' && (
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                  {/* Chat Top Header */}
                  <div style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => setMobileTab('connections')}>
                      <ChevronLeft size={20} color="var(--text-primary)" />
                    </button>
                    <img src={activeChatProfile?.photoUrl || candidates[0]?.photoUrl} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ fontSize: '13px', display: 'block', color: 'var(--text-primary)' }}>
                        {activeChatProfile?.name || 'Roberto Almeida'}
                      </strong>
                      <span style={{ fontSize: '10px', color: 'var(--status-success)' }}>● Conexão Recíproca Ativa</span>
                    </div>
                  </div>

                  {/* Safety notice in chat */}
                  <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--tl-brand-600)', textAlign: 'center' }}>
                    🔒 <strong>Ambiente Seguro:</strong> Evite compartilhar dados financeiros ou senhas.
                  </div>

                  {/* Message Log */}
                  <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
                    {chatMessages.map((m, idx) => (
                      <div 
                        key={idx}
                        style={{
                          maxWidth: '82%',
                          alignSelf: m.sender === 'me' ? 'flex-end' : 'flex-start',
                          background: m.sender === 'me' ? 'var(--tl-brand-700)' : 'var(--bg-card)',
                          color: m.sender === 'me' ? '#ffffff' : 'var(--text-primary)',
                          padding: '10px 14px',
                          borderRadius: m.sender === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                          border: m.sender === 'me' ? 'none' : '1px solid var(--border-color)',
                          boxShadow: 'var(--card-shadow)'
                        }}
                      >
                        <p style={{ fontSize: '13px', margin: 0, lineHeight: 1.4 }}>{m.text}</p>
                        <span style={{ fontSize: '9px', opacity: 0.75, display: 'block', textAlign: 'right', marginTop: '4px' }}>{m.time}</span>
                      </div>
                    ))}
                  </div>

                  {/* Message Input Form */}
                  <form onSubmit={handleSendMessage} style={{ padding: '8px 12px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      className="form-input"
                      style={{ minHeight: '36px', padding: '6px 12px', fontSize: '12px', borderRadius: 'var(--radius-full)' }}
                      placeholder="Escreva uma mensagem gentil..."
                      value={inputMsg}
                      onChange={(e) => setInputMsg(e.target.value)}
                    />
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      type="submit" 
                      style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--tl-brand-700)', display: 'grid', placeItems: 'center', color: '#fff' }}
                    >
                      <Send size={15} />
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* VIEW 4: MY PROFILE */}
              {mobileTab === 'profile' && (
                <motion.div 
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ padding: '16px', overflowY: 'auto' }}
                >
                  <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                    <img src={currentPersona.photoUrl} alt={currentPersona.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 8px', border: '3px solid var(--tl-brand-600)' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>
                      {currentPersona.name}, {currentPersona.age}
                    </h3>
                    <span className="badge badge-verified" style={{ fontSize: '11px', marginTop: '4px' }}>
                      ✓ Documento 35+ Verificado
                    </span>
                  </div>

                  <div className="card-box" style={{ padding: '14px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Apresentação Pessoal</span>
                    <p style={{ fontSize: '13px', lineHeight: 1.5, marginTop: '4px', color: 'var(--text-secondary)' }}>"{currentPersona.bio}"</p>
                  </div>

                  <div className="card-box" style={{ padding: '14px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>Plano Ativo</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--tl-brand-600)' }}>Plano {currentPersona.tier}</strong>
                      <button className="btn-gold" style={{ padding: '4px 10px', fontSize: '11px' }}>Fazer Upgrade</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VIEW 5: CONCIERGE */}
              {mobileTab === 'concierge' && (
                <motion.div 
                  key="concierge"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ padding: '20px', textAlign: 'center' }}
                >
                  <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'var(--tl-gold-100)', display: 'grid', placeItems: 'center', margin: '0 auto 14px' }}>
                    <Award size={26} color="var(--tl-gold-500)" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Concierge VIP True Love
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
                    Um Matchmaker humano dedicado para analisar suas preferências, alinhar valores e sugerir encontros exclusivos com discrição absoluta.
                  </p>
                  <motion.button 
                    className="btn-gold" 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ width: '100%', padding: '10px', fontSize: '13px' }}
                  >
                    Solicitar Atendimento Humano
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* iOS Bottom Tab Bar */}
          <div className="ios-tab-bar">
            {[
              { id: 'discover', label: 'Descobrir', icon: <Compass size={19} /> },
              { id: 'connections', label: 'Conexões', icon: <Heart size={19} /> },
              { id: 'chat', label: 'Conversas', icon: <MessageCircle size={19} /> },
              { id: 'concierge', label: 'Concierge', icon: <Award size={19} /> },
              { id: 'profile', label: 'Perfil', icon: <User size={19} /> }
            ].map((tab) => {
              const isActive = mobileTab === tab.id;
              return (
                <motion.button 
                  key={tab.id}
                  whileTap={{ scale: 0.9 }}
                  className={`ios-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileTab(tab.id as any)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

        </div>
      </motion.div>
    </div>
  );
};
