import React, { useState } from 'react';
import { usePlatformStore } from '../../services/store';
import { UserProfile } from '../../types';
import { 
  Heart, X, Sparkles, MessageCircle, MapPin, 
  ShieldCheck, Send, Check, ArrowLeft, MoreVertical,
  Compass, User, SlidersHorizontal, Smartphone,
  Flame, Grid, RotateCcw, Star, Zap, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AndroidSimulator: React.FC = () => {
  const { profiles } = usePlatformStore();
  const currentUserId = profiles[0]?.id || 'usr-1';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'discover' | 'matches' | 'chat' | 'profile'>('discover');
  const [discoveryMode, setDiscoveryMode] = useState<'swipe' | 'radar'>('swipe');
  const [selectedChatUser, setSelectedChatUser] = useState<UserProfile | null>(null);
  const [chatMessages, setChatMessages] = useState<{ id: string; sender: 'me' | 'them'; text: string; time: string }[]>([
    { id: '1', sender: 'them', text: 'Olá! Achei muito bacana que você também aprecia vinhos e literatura.', time: '14:20' },
    { id: '2', sender: 'me', text: 'Boa tarde! Sim, valorizo muito conversas profundas e tranquilidade.', time: '14:22' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const otherProfiles = profiles.filter(p => p.id !== currentUserId);
  const currentProfile = otherProfiles[currentIndex % Math.max(1, otherProfiles.length)] || profiles[0];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % otherProfiles.length);
  };

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { id: Date.now().toString(), sender: 'me', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setInputMsg('');
  };

  return (
    <div style={{ padding: '48px 16px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '20px', maxWidth: '520px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(37, 99, 235, 0.12)', color: '#2563eb', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>
          <Smartphone size={14} />
          <span>Android Material Design 3 · Google Pixel 9 Pro</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--text-primary)', margin: 0 }}>
          Experiência Nativa Android (Google Play & PWA)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>
          Interface otimizada com Material You, fontes escaláveis para 35+, contraste elevado e gestos fluidos.
        </p>
      </div>

      {/* Android Device Shell (Pixel 9 Pro Style) */}
      <div 
        style={{
          width: '390px',
          height: '780px',
          background: '#0f172a',
          borderRadius: '44px',
          padding: '12px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Device Bezel & Screen Container */}
        <div 
          style={{
            flex: 1,
            background: 'var(--bg-primary)',
            borderRadius: '34px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {/* Android Status Bar */}
          <div 
            style={{
              height: '36px',
              padding: '0 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              background: 'transparent',
              zIndex: 30
            }}
          >
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>

            {/* Central Camera Hole Punch (Pixel Style) */}
            <div 
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#000000',
                boxShadow: 'inset 0 0 2px rgba(255,255,255,0.2)'
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800 }}>5G</span>
              <div style={{ width: '18px', height: '9px', border: '1.5px solid currentColor', borderRadius: '2px', padding: '1px' }}>
                <div style={{ width: '80%', height: '100%', background: 'currentColor', borderRadius: '1px' }} />
              </div>
            </div>
          </div>

          {/* Android Top App Bar */}
          <div 
            style={{
              padding: '10px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-color)',
              background: 'var(--card-bg)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src="/favicon.svg" alt="True Love Favicon" style={{ width: '28px', height: '28px', borderRadius: '8px', objectFit: 'contain' }} />
              <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--text-primary)' }}>
                True Love
              </strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={handleNext}
                title="Filtros"
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}
              >
                <SlidersHorizontal size={18} />
              </button>
              <button 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '6px' }}
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Body Content by Tab */}
          <div style={{ flex: 1, overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column' }}>
            {activeTab === 'discover' && (
              <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column' }}>
                
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
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {/* Profile Card with Material You Elevation */}
                    <motion.div 
                      key={currentProfile.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        flex: 1,
                        borderRadius: '24px',
                        overflow: 'hidden',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                      }}
                    >
                      {/* Photo area */}
                      <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
                        <img 
                          src={currentProfile.photoUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'} 
                          alt={currentProfile.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        
                        {/* Gradient Overlay */}
                        <div 
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
                          }}
                        />

                        {/* Verified 35+ Badge */}
                        <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(20, 83, 79, 0.9)', backdropFilter: 'blur(8px)', color: '#fff', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <ShieldCheck size={13} color="#86efac" />
                          <span>Verificado 35+</span>
                        </div>

                        {/* Match Score Badge */}
                        <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255, 255, 255, 0.92)', color: 'var(--tl-rose-600)', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                          <Sparkles size={12} />
                          <span>89% Afinidade</span>
                        </div>

                        {/* Bottom Info on Card */}
                        <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px', color: '#fff' }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>
                              {currentProfile.name}, {currentProfile.age}
                            </h3>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', opacity: 0.9, marginTop: '3px' }}>
                            <MapPin size={12} />
                            <span>{currentProfile.city}, {currentProfile.state}</span>
                            <span>·</span>
                            <span>{currentProfile.profession || 'Arquiteta'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bio & Shared Values */}
                      <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                          "{currentProfile.bio || 'Busco alguém com valores firmes, que aprecie boas conversas e vida tranquila.'}"
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
                          {currentProfile.values.slice(0, 3).map((v, i) => (
                            <span key={i} style={{ background: 'var(--tl-gold-100)', color: 'var(--tl-gold-500)', fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '8px' }}>
                              ✓ {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Iconic Tinder Gamepad (5 Botões) */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '12px 0 2px 0' }}>
                      <motion.button
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--card-bg)', border: '1.5px solid #eab308', color: '#eab308', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(234, 179, 8, 0.2)' }}
                        title="Rebobinar"
                      >
                        <RotateCcw size={17} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNext}
                        style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--card-bg)', border: '1.5px solid #ef4444', color: '#ef4444', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)' }}
                        title="Pular"
                      >
                        <X size={22} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedChatUser(currentProfile);
                          setActiveTab('chat');
                        }}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--card-bg)', border: '1.5px solid #0284c7', color: '#0284c7', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(2, 132, 199, 0.2)' }}
                        title="Super Sintonia"
                      >
                        <Star size={17} fill="#0284c7" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedChatUser(currentProfile);
                          setActiveTab('chat');
                        }}
                        style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #fd267a 0%, #ff6036 100%)', border: 'none', color: '#ffffff', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 8px 18px rgba(253, 38, 122, 0.4)' }}
                        title="Curtir"
                      >
                        <Heart size={24} fill="#ffffff" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedChatUser(currentProfile);
                          setActiveTab('chat');
                        }}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--card-bg)', border: '1.5px solid #10b981', color: '#10b981', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.2)' }}
                        title="Chat Direto"
                      >
                        <MessageCircle size={17} />
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* 2. MODO BADOO: RADAR DE PESSOAS PRÓXIMAS (GRADE 2 COLUNAS) */}
                {discoveryMode === 'radar' && (
                  <div style={{ flex: 1, overflowY: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Perto de Você em {currentProfile.city}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--status-success)', fontWeight: 700 }}>● {otherProfiles.length} online</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {otherProfiles.map((p, idx) => (
                        <motion.div
                          key={p.id}
                          whileHover={{ y: -2 }}
                          onClick={() => {
                            setCurrentIndex(otherProfiles.findIndex(item => item.id === p.id));
                            setDiscoveryMode('swipe');
                          }}
                          style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <div style={{ height: '145px', position: 'relative', overflow: 'hidden' }}>
                            <img src={p.photoUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)' }} />
                            
                            {/* Badoo Blue Verification Badge */}
                            <div style={{ position: 'absolute', top: '6px', right: '6px', background: '#0284c7', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'grid', placeItems: 'center' }}>
                              <CheckCircle size={12} fill="#0284c7" color="#fff" />
                            </div>

                            <div style={{ position: 'absolute', bottom: '6px', left: '8px', right: '8px', color: '#fff' }}>
                              <strong style={{ fontSize: '12px', display: 'block' }}>{p.name}, {p.age}</strong>
                              <span style={{ fontSize: '10px', opacity: 0.9 }}>{p.city}</span>
                            </div>
                          </div>

                          <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <span style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', padding: '2px 5px', borderRadius: '4px', fontSize: '9px', fontWeight: 700, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {p.relationshipGoal}
                            </span>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', color: 'var(--text-muted)' }}>
                              <span>A {(idx * 2) + 1} km</span>
                              <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>● Ativo</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Chat View */}
            {activeTab === 'chat' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-primary)' }}>
                {/* Chat Top Bar */}
                <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--card-bg)' }}>
                  <button 
                    onClick={() => setActiveTab('discover')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '4px' }}
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <img 
                    src={selectedChatUser?.photoUrl || currentProfile.photoUrl} 
                    alt="avatar" 
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '14px', display: 'block', color: 'var(--text-primary)' }}>
                      {selectedChatUser?.name || currentProfile.name}
                    </strong>
                    <span style={{ fontSize: '11px', color: 'var(--status-success)', fontWeight: 600 }}>
                      ● Online · Afinidade 89%
                    </span>
                  </div>
                </div>

                {/* Messages List */}
                <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {chatMessages.map(msg => (
                    <div 
                      key={msg.id}
                      style={{
                        alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                        maxWidth: '82%',
                        background: msg.sender === 'me' ? 'var(--tl-rose-500)' : 'var(--card-bg)',
                        color: msg.sender === 'me' ? '#ffffff' : 'var(--text-primary)',
                        padding: '10px 14px',
                        borderRadius: msg.sender === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        fontSize: '13px',
                        lineHeight: '1.4'
                      }}
                    >
                      <div>{msg.text}</div>
                      <div style={{ fontSize: '10px', opacity: 0.7, textAlign: 'right', marginTop: '4px' }}>
                        {msg.time} {msg.sender === 'me' && '✓✓'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Android Input Area */}
                <div style={{ padding: '10px', background: 'var(--card-bg)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    value={inputMsg}
                    onChange={e => setInputMsg(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Mensagem respeitosa..."
                    style={{
                      flex: 1,
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '24px',
                      padding: '10px 16px',
                      fontSize: '13px',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                  <button 
                    onClick={handleSend}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'var(--tl-rose-500)',
                      border: 'none',
                      color: '#ffffff',
                      display: 'grid',
                      placeItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Material You Bottom Navigation Bar */}
          <div 
            style={{
              height: '64px',
              borderTop: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '0 12px'
            }}
          >
            {[
              { id: 'discover', label: 'Descobrir', icon: <Compass size={20} /> },
              { id: 'matches', label: 'Conexões', icon: <Heart size={20} /> },
              { id: 'chat', label: 'Conversas', icon: <MessageCircle size={20} /> },
              { id: 'profile', label: 'Meu Perfil', icon: <User size={20} /> }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    color: isActive ? 'var(--tl-rose-500)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '6px 12px'
                  }}
                >
                  {/* Material 3 active pill background */}
                  {isActive && (
                    <motion.div 
                      layoutId="material-nav-indicator"
                      style={{
                        position: 'absolute',
                        top: '2px',
                        width: '48px',
                        height: '26px',
                        borderRadius: '16px',
                        background: 'rgba(197, 99, 109, 0.15)',
                        zIndex: 0
                      }}
                    />
                  )}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {tab.icon}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: isActive ? 700 : 500, zIndex: 1 }}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Android Navigation Gesture Bar */}
          <div style={{ height: '16px', background: 'var(--card-bg)', display: 'grid', placeItems: 'center' }}>
            <div style={{ width: '72px', height: '4px', background: 'var(--text-muted)', opacity: 0.35, borderRadius: '2px' }} />
          </div>

        </div>
      </div>

      {/* Capacitor Android Terminal Helper */}
      <div style={{ marginTop: '20px', maxWidth: '440px', width: '100%', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '14px 18px', fontSize: '12px' }}>
        <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
          🤖 Como gerar o APK ou rodar no Android Studio:
        </strong>
        <code style={{ display: 'block', background: 'var(--bg-primary)', padding: '8px 12px', borderRadius: '8px', color: 'var(--tl-rose-500)', fontFamily: 'monospace' }}>
          npm run build && npx cap add android && npx cap open android
        </code>
      </div>

    </div>
  );
};
