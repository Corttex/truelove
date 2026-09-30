import React, { useMemo } from 'react';
import { usePlatformStore } from '../../services/store';
import { MapPin, Users, Compass, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const MatchDensityMap: React.FC = () => {
  const { profiles } = usePlatformStore();

  const cityStats = useMemo(() => {
    const map = new Map<string, { city: string; state: string; count: number; men: number; women: number; verified: number }>();

    profiles.forEach(p => {
      const key = `${p.city}|${p.state}`;
      const curr = map.get(key) || { city: p.city, state: p.state, count: 0, men: 0, women: 0, verified: 0 };
      curr.count += 1;
      if (p.gender === 'homem') curr.men += 1;
      if (p.gender === 'mulher') curr.women += 1;
      if (p.verified) curr.verified += 1;
      map.set(key, curr);
    });

    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [profiles]);

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ color: 'var(--tl-gold-500)', fontWeight: 800, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Painel do Dono · Matchable Density
          </span>
          <span className="owner-badge">Prevenção de Salão Vazio</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--text-primary)', fontWeight: 600 }}>
          Densidade Geográfica & Liquidez de Matching
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Monitore o equilíbrio de gênero e a concentração de perfis 35+ por capital para direcionar campanhas de aquisição.
        </p>
      </motion.div>

      {/* Grid of Cities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
        {cityStats.map((stat, idx) => {
          const ratioMen = stat.count > 0 ? Math.round((stat.men / stat.count) * 100) : 50;
          const ratioWomen = 100 - ratioMen;

          return (
            <motion.div 
              key={`${stat.city}-${stat.state}`} 
              className="card-box" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ y: -2 }}
              style={{ padding: '20px 24px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={18} color="var(--tl-gold-500)" />
                    {stat.city}, {stat.state}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {stat.verified} de {stat.count} perfis verificados 35+
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--tl-brand-600)' }}>
                    {stat.count}
                  </strong>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>membros</span>
                </div>
              </div>

              {/* Progress bar of gender ratio */}
              <div style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px', fontWeight: 600 }}>
                  <span style={{ color: '#2b736c' }}>Homens: {ratioMen}% ({stat.men})</span>
                  <span style={{ color: '#af495a' }}>Mulheres: {ratioWomen}% ({stat.women})</span>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                  <div style={{ width: `${ratioMen}%`, background: '#2b736c' }} />
                  <div style={{ width: `${ratioWomen}%`, background: '#af495a' }} />
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>
                {stat.count >= 3 ? (
                  <span style={{ color: 'var(--status-success)', fontWeight: 600 }}>
                    ✓ Densidade saudável para apresentações locais
                  </span>
                ) : (
                  <span style={{ color: 'var(--status-warning)', fontWeight: 600 }}>
                    ⚠️ Baixa densidade: sugerir expansão para estado ({stat.state})
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
