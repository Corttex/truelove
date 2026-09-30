import React, { useState, useEffect } from 'react';
import { Navigation, EcosystemSurface } from './components/Navigation';
import { OwnerDashboard } from './components/owner/OwnerDashboard';
import { LandingPage } from './components/site/LandingPage';
import { MasterAdmin } from './components/admin/MasterAdmin';
import { IPhoneSimulator } from './components/mobile/IPhoneSimulator';
import { AndroidSimulator } from './components/mobile/AndroidSimulator';
import { ApiHub } from './components/api/ApiHub';
import { AutomationsHub } from './components/automations/AutomationsHub';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

const SURFACE_PATHS: Record<EcosystemSurface, string> = {
  site: '/',
  admin: '/adminmaster',
  owner: '/painel',
  api: '/api',
  ios_app: '/ios',
  android_app: '/android',
  automations: '/automacoes'
};

function getSurfaceFromPath(pathname: string): EcosystemSurface {
  const clean = pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (clean === '/adminmaster') return 'admin';
  if (clean === '/painel') return 'owner';
  if (clean === '/api' || clean.includes('api.')) return 'api';
  if (clean === '/ios' || clean.includes('ios')) return 'ios_app';
  if (clean === '/android') return 'android_app';
  if (clean === '/automacoes' || clean.includes('n8n')) return 'automations';
  return 'site'; // Site na Raiz por padrão
}

export const AppContent: React.FC = () => {
  const [currentSurface, setCurrentSurface] = useState<EcosystemSurface>(() => 
    getSurfaceFromPath(window.location.pathname)
  );

  const handleSelectSurface = (surface: EcosystemSurface) => {
    setCurrentSurface(surface);
    const targetPath = SURFACE_PATHS[surface];
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ surface }, '', targetPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentSurface(getSurfaceFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="app-container">
      {/* Ecosystem Navigation Bar */}
      <Navigation 
        currentSurface={currentSurface} 
        onSelectSurface={handleSelectSurface} 
      />

      {/* Surface Router with Framer Motion transitions */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSurface}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            {/* Site na Raiz (/) */}
            {currentSurface === 'site' && (
              <LandingPage 
                onOpenApp={() => handleSelectSurface('ios_app')} 
                onOpenOwner={() => handleSelectSurface('owner')} 
              />
            )}

            {/* /adminmaster */}
            {currentSurface === 'admin' && <MasterAdmin />}

            {/* /painel (Dono) */}
            {currentSurface === 'owner' && <OwnerDashboard />}

            {/* api.dominio / /api */}
            {currentSurface === 'api' && <ApiHub />}

            {/* iOS APP */}
            {currentSurface === 'ios_app' && <IPhoneSimulator />}

            {/* Android APP */}
            {currentSurface === 'android_app' && <AndroidSimulator />}

            {/* /automacoes (n8n) */}
            {currentSurface === 'automations' && <AutomationsHub />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
