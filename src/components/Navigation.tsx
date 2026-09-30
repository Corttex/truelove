import React, { useState } from 'react';
import { Crown, Globe, Shield, Smartphone, Sun, Moon, Type, Terminal, Zap, Menu, X, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export type EcosystemSurface = 'site' | 'admin' | 'owner' | 'api' | 'ios_app' | 'android_app' | 'automations';

interface NavigationProps {
  currentSurface: EcosystemSurface;
  onSelectSurface: (surface: EcosystemSurface) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentSurface, onSelectSurface }) => {
  const { theme, toggleTheme, fontSizeMode, toggleFontSize } = useTheme();
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const navItems: { id: EcosystemSurface; label: string; path: string; icon: React.ReactNode }[] = [
    { id: 'site', label: 'Site (Raiz /)', path: '/', icon: <Globe size={14} /> },
    { id: 'admin', label: 'Admin MASTER (/adminmaster)', path: '/adminmaster', icon: <Shield size={14} /> },
    { id: 'owner', label: 'Painel Dono (/painel)', path: '/painel', icon: <Crown size={14} /> },
    { id: 'api', label: 'APIs (api.dominio)', path: '/api', icon: <Terminal size={14} /> },
    { id: 'ios_app', label: 'iOS APP', path: '/ios', icon: <Smartphone size={14} /> },
    { id: 'android_app', label: 'Android APP', path: '/android', icon: <Smartphone size={14} /> },
    { id: 'automations', label: 'Automações', path: '/automacoes', icon: <Zap size={14} /> }
  ];

  let fontSizeLabel = 'A';
  if (fontSizeMode === 'large') fontSizeLabel = 'A+';
  if (fontSizeMode === 'xlarge') fontSizeLabel = 'A++';

  return (
    <>
      {/* Top Header with White LiquidGlass Opaco Jateado & Centered Content */}
      <header className="ecosystem-bar" style={{ 
        background: 'rgba(255, 255, 255, 0.94)', 
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        boxShadow: '0 6px 24px -2px rgba(0, 0, 0, 0.07)',
        padding: '12px 0',
        zIndex: 1000,
        width: '100%'
      }}>
        <div style={{
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          {/* Brand Logo */}
          <div className="ecosystem-brand" onClick={() => onSelectSurface('site')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <motion.div 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img 
                src="/logo.svg" 
                alt="True Love - Encontros Maduros" 
                style={{ height: '52px', width: 'auto', display: 'block' }} 
              />
            </motion.div>
          </div>

          {/* Simple Easy Access Menu */}
          <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <button 
              onClick={() => {
                if (currentSurface !== 'site') onSelectSurface('site');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '15px', color: '#3d0c1b',
                padding: '8px 12px', borderRadius: '10px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--tl-brand-600)'; e.currentTarget.style.background = 'rgba(165, 58, 95, 0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#3d0c1b'; e.currentTarget.style.background = 'none'; }}
            >
              Início
            </button>

            <button 
              onClick={() => onSelectSurface('ios_app')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '15px', color: '#3d0c1b',
                padding: '8px 12px', borderRadius: '10px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--tl-brand-600)'; e.currentTarget.style.background = 'rgba(165, 58, 95, 0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#3d0c1b'; e.currentTarget.style.background = 'none'; }}
            >
              Conheça nosso App
            </button>

            <button 
              onClick={() => {
                if (currentSurface !== 'site') onSelectSurface('site');
                const faqEl = document.getElementById('faq-section');
                if (faqEl) {
                  faqEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollBy({ top: 1400, behavior: 'smooth' });
                }
              }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '15px', color: '#3d0c1b',
                padding: '8px 12px', borderRadius: '10px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--tl-brand-600)'; e.currentTarget.style.background = 'rgba(165, 58, 95, 0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#3d0c1b'; e.currentTarget.style.background = 'none'; }}
            >
              Perguntas Frequentes
            </button>

            <button 
              onClick={() => {
                if (currentSurface !== 'site') onSelectSurface('site');
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '15px', color: '#3d0c1b',
                padding: '8px 12px', borderRadius: '10px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--tl-brand-600)'; e.currentTarget.style.background = 'rgba(165, 58, 95, 0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#3d0c1b'; e.currentTarget.style.background = 'none'; }}
            >
              Contato
            </button>
          </nav>

          <div className="ecosystem-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Font Scaling for 35+ Clarity */}
            <motion.button 
              className="font-size-btn"
              onClick={toggleFontSize}
              title="Ajustar tamanho da fonte (3 níveis para leitura fácil)"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                background: 'rgba(74, 16, 36, 0.06)', 
                border: '1px solid rgba(74, 16, 36, 0.16)',
                color: '#4a1024',
                borderRadius: '10px',
                height: '38px',
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer'
              }}
            >
              <Type size={14} color="#4a1024" />
              <span style={{ fontSize: '13px', fontWeight: 800 }}>{fontSizeLabel}</span>
            </motion.button>

            {/* Dark / Light Mode Toggle */}
            <motion.button 
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title="Alternar Modo Escuro / Claro"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                background: 'rgba(74, 16, 36, 0.06)', 
                border: '1px solid rgba(74, 16, 36, 0.16)',
                borderRadius: '10px',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              {theme === 'light' ? <Moon size={16} color="#4a1024" /> : <Sun size={16} color="#b27c44" />}
            </motion.button>

            {/* CTA Button */}
            <motion.button 
              className="btn-gold"
              onClick={() => onSelectSurface('ios_app')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{ 
                padding: '9px 18px',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '999px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(165, 58, 95, 0.25)'
              }}
            >
              <Smartphone size={15} />
              <span>Conheça nosso App</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Floating Widget for Developer/Owner Functions */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
        
        <AnimatePresence>
          {isWidgetOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '260px'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Atalhos do Sistema
              </div>
              
              {navItems.map((item) => {
                const isActive = currentSurface === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectSurface(item.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                      borderRadius: '8px',
                      background: isActive ? 'var(--tl-brand-100)' : 'transparent',
                      color: isActive ? 'var(--tl-brand-700)' : 'var(--text-primary)',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '13px',
                      border: isActive ? '1px solid var(--tl-brand-500)' : '1px solid transparent',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsWidgetOpen(!isWidgetOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '56px', height: '56px',
            borderRadius: '50%',
            background: 'var(--tl-brand-600)',
            color: '#fff',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            boxShadow: '0 8px 24px rgba(165, 58, 95, 0.4)',
            border: '2px solid rgba(255,255,255,0.2)'
          }}
        >
          {isWidgetOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>
    </>
  );
};
export default Navigation;
