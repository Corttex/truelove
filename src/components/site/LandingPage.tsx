import React, { useState } from 'react';
import { 
  Heart, ShieldCheck, Sparkles, UserCheck, Lock, Award, 
  Check, ArrowRight, Smartphone, Compass, Users, CheckCircle2,
  HelpCircle, MessageCircle, Star, Sliders, ChevronDown,
  RotateCcw, X, Zap, MapPin, Eye, Quote, ShieldAlert,
  Moon, Wine, Users2, Pin, Smile, Music, Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingPageProps {
  onOpenApp: () => void;
  onOpenOwner: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenApp, onOpenOwner }) => {
  // Interactive Discovery Showcase State (Tinder & Badoo)
  const [showcaseMode, setShowcaseMode] = useState<'tinder' | 'badoo'>('tinder');
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState(0);
  const [swipeToast, setSwipeToast] = useState<string | null>(null);

  // Interactive Affinity Calculator State
  const [selectedCity, setSelectedCity] = useState('São Paulo (SP)');
  const [selectedAgeRange, setSelectedAgeRange] = useState('40 a 55 anos');
  const [openCityDropdown, setOpenCityDropdown] = useState(false);
  const [openAgeDropdown, setOpenAgeDropdown] = useState(false);

  const cityOptions = [
    'São Paulo (SP)',
    'Rio de Janeiro (RJ)',
    'Curitiba (PR)',
    'Belo Horizonte (MG)',
    'Brasília (DF)',
    'Porto Alegre (RS)',
    'Salvador (BA)'
  ];

  const ageOptions = [
    '35 a 45 anos',
    '40 a 55 anos',
    '50 a 65 anos',
    '60+ anos'
  ];
  const [selectedValues, setSelectedValues] = useState<string[]>(['Família em 1º Lugar', 'Conversas Profundas']);
  const [calculatedAffinity, setCalculatedAffinity] = useState<number | null>(92);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const showcaseProfiles = [
    {
      name: 'Renata Vasconcellos',
      age: 43,
      profession: 'Juíza Federal',
      city: 'Curitiba, PR',
      intent: 'Relacionamento sério com propósito de casamento',
      bio: 'Aprecio conversas profundas com bom vinho, leitura e viagens históricas. Busco um parceiro leal, com maturidade emocional e bom humor.',
      affinity: '96% de Sintonia',
      tags: ['Família em 1º lugar', 'Vinhos & Gastronomia', 'Espiritualidade', 'Não fumo'],
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80',
      verified: true
    },
    {
      name: 'Marcelo Alcantara',
      age: 48,
      profession: 'Arquiteto Urbanista & Empresário',
      city: 'São Paulo, SP',
      intent: 'Construir família e parceria de longo prazo',
      bio: 'Pai presente de dois adolescentes. Amante de design, jazz e culinária italiana aos domingos. Valorizo transparência e cumplicidade.',
      affinity: '93% de Sintonia',
      tags: ['Pai dedicado', 'Jazz & Cultura', 'Diálogo maduro', 'Esportes ao ar livre'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
      verified: true
    },
    {
      name: 'Adriana Bastos',
      age: 41,
      profession: 'Médica Cardiologista',
      city: 'Belo Horizonte, MG',
      intent: 'Amor verdadeiro sem joguinhos',
      bio: 'Rotina agitada que recompensa com calma no fim de semana. Gosto de trilhas na natureza e jantares intimistas. Sem tempo a perder.',
      affinity: '95% de Sintonia',
      tags: ['Vida Saudável', 'Conversas sinceras', 'Trilhas', 'Afinidade de valores'],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
      verified: true
    }
  ];

  const badooNearbyProfiles = [
    {
      name: 'Eduardo Fontes',
      age: 51,
      profession: 'Engenheiro Naval',
      city: 'Rio de Janeiro (1.4 km)',
      intent: 'Casamento & Lar',
      tags: ['Vela & Mar', 'Lealdade'],
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
      status: 'Online agora'
    },
    {
      name: 'Helena Duarte',
      age: 44,
      profession: 'Diretora Pedagógica',
      city: 'Rio de Janeiro (2.8 km)',
      intent: 'Relacionamento Sério',
      tags: ['Literatura', 'Família'],
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      status: 'Ativa hoje'
    },
    {
      name: 'Ricardo Sampaio',
      age: 46,
      profession: 'Advogado Tributarista',
      city: 'Rio de Janeiro (3.5 km)',
      intent: 'Companheirismo Duradouro',
      tags: ['Ciclismo', 'Cinema clássico'],
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=500&q=80',
      status: 'Verificado CNH'
    },
    {
      name: 'Clarice Ramos',
      age: 39,
      profession: 'Psicóloga Clínica',
      city: 'Rio de Janeiro (4.1 km)',
      intent: 'Amor Verdadeiro',
      tags: ['Conversas profundas', 'Música instrumental'],
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
      status: 'Online agora'
    }
  ];

  const handleSwipeAction = (action: string) => {
    let msg = '';
    if (action === 'like') msg = '❤️ Curtida enviada com elegância!';
    else if (action === 'superlike') msg = '⭐ Super Sintonia enviada com destaque!';
    else if (action === 'pass') msg = '✕ Perfil passado discretamente.';
    else if (action === 'rewind') msg = '↺ Último perfil recuperado!';
    else if (action === 'boost') msg = '⚡ Boost ativado: 5x mais visibilidade!';

    setSwipeToast(msg);
    setTimeout(() => setSwipeToast(null), 2500);

    if (action !== 'rewind' && action !== 'boost') {
      setCurrentSwipeIndex(prev => (prev + 1) % showcaseProfiles.length);
    } else if (action === 'rewind') {
      setCurrentSwipeIndex(prev => (prev - 1 + showcaseProfiles.length) % showcaseProfiles.length);
    }
  };

  const toggleValue = (val: string) => {
    setSelectedValues(prev => 
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
    setCalculatedAffinity(Math.min(98, 75 + (selectedValues.length * 6)));
  };

  const sampleValues = [
    'Família em 1º Lugar', 'Conversas Profundas', 'Espiritualidade', 
    'Viagens & Cultura', 'Vida Saudável', 'Estabilidade Emocional',
    'Apreciar Boa Gastronomia', 'Maturidade & Diálogo'
  ];

  const comparisonRows = [
    { feature: 'Foco exclusivo no público maduro (35+ anos)', truelove: true, bumble: false, tinder: false, badoo: false },
    { feature: 'Verificação documental obrigatória (anti-golpe / sem fakes)', truelove: true, bumble: 'Opcional', tinder: 'Opcional', badoo: 'Opcional' },
    { feature: 'Afinidade explicável por valores e metas (não apenas aparência)', truelove: true, bumble: 'Parcial', tinder: false, badoo: false },
    { feature: 'Reciprocidade estrita (chat mútuo sem invasão ou spam)', truelove: true, bumble: true, tinder: true, badoo: false },
    { feature: 'Curadoria humana e serviço de Matchmaker (Concierge VIP)', truelove: true, bumble: false, tinder: false, badoo: false },
    { feature: 'Privacidade de dados e discrição sem repasse para anúncios', truelove: true, bumble: false, tinder: false, badoo: false }
  ];

  const successStories = [
    {
      name1: 'Juliana',
      name2: 'Roberto',
      names: 'Juliana (44) & Roberto (47)',
      city: 'Curitiba, PR',
      status: 'Casados há 8 meses',
      quote: 'Recebi a mensagem dele logo no primeiro dia. Conversamos sobre rotina, filhos e valores. Nos casamos 8 meses depois em uma cerimônia intimista.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80'
    },
    {
      name1: 'Patrícia',
      name2: 'Carlos',
      names: 'Patrícia (42) & Carlos (49)',
      city: 'São Paulo, SP',
      status: 'Noivos',
      quote: 'A validação de CNH me deu a segurança que faltava. Encontrei um homem íntegro, educado e pronto para construir uma vida a dois.',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80'
    },
    {
      name1: 'Marisa',
      name2: 'Fernando',
      names: 'Marisa (53) & Fernando (56)',
      city: 'Rio de Janeiro, RJ',
      status: 'Casados há 1 ano',
      quote: 'Depois de anos viúva, achei que não sentiria borboletas no estômago de novo. O True Love uniu nossas histórias com propósito e hoje viajamos o Brasil juntos.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const faqs = [
    {
      q: 'Por que o True Love é exclusivo para pessoas a partir de 35 anos?',
      a: 'Comprovamos que o público maduro tem expectativas completamente diferentes dos jovens universitários. Quem tem mais de 35 anos busca clareza de intenções, estabilidade, valores alinhados e não tem tempo a perder com superficialidades ou joguinhos.'
    },
    {
      q: 'Como funciona a verificação documental e biometria facial?',
      a: 'Nosso Agente de IA Arthur audita o documento oficial (CNH ou RG) e cruza com uma selfie biométrica ao vivo para confirmar a data de nascimento e garantir que quem está atrás da foto é exatamente a mesma pessoa. Perfis falsos e golpistas são barrados na entrada.'
    },
    {
      q: 'Outros usuários podem ver meu telefone ou redes sociais?',
      a: 'Jamais. Seus contatos, endereço exato e documentos são 100% confidenciais e protegidos sob a LGPD. O contato dentro do True Love acontece exclusivamente através do chat mútuo criptografado.'
    },
    {
      q: 'O que é o serviço de Concierge VIP?',
      a: 'É um atendimento exclusivo com matchmakers humanos profissionais. Nossos consultores analisam seu perfil, seus hábitos e suas exigências para sugerir introduções altamente compatíveis, além de oferecerem feedback confidencial de encontros.'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      
      {/* 1. HERO SECTION COM IMAGEM GERADA POR IA & PROVA SOCIAL */}
      <section style={{
        background: 'linear-gradient(155deg, #18050c 0%, #350a18 50%, #4a0e22 100%)',
        color: '#ffffff',
        padding: '90px 24px 110px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Ambient Glow */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(197, 99, 109, 0.35) 0%, transparent 70%)', filter: 'blur(50px)' }} />

        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '48px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          
          {/* Left Hero Text Content */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', padding: '6px 16px', borderRadius: 'var(--radius-full)', marginBottom: '22px' }}
            >
              <Sparkles size={15} color="#fda4af" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffe4cc', letterSpacing: '0.04em' }}>
                EXCLUSIVO PARA 35+ ANOS · CONEXÕES INTENCIONAIS NO BRASIL
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(36px, 4.5vw, 56px)', 
                fontWeight: 600, 
                lineHeight: 1.15, 
                marginBottom: '20px', 
                letterSpacing: '-0.02em', 
                color: '#ffffff' 
              }}
            >
              Onde pessoas maduras encontram conversas verdadeiras e amor com propósito.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'rgba(255, 255, 255, 0.92)', maxWidth: '640px', marginBottom: '32px', lineHeight: 1.6 }}
            >
              Diga adeus à superficialidade dos apps de deslizar. No True Love, todos os perfis têm identidade verificada, maturidade comprovada e afinidade baseada no que realmente importa: valores, família e objetivos de vida.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}
            >
              <motion.button 
                className="btn-gold" 
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{ padding: '15px 30px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={onOpenApp}
              >
                <Smartphone size={20} /> Conheça nosso App
              </motion.button>
            </motion.div>

            {/* Value bullets */}
            <div style={{ display: 'flex', gap: '22px', fontSize: '13px', color: 'rgba(255,255,255,0.9)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={15} color="#fda4af" /> Validação documental 35+</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={15} color="#fda4af" /> Sem perfis fakes ou golpistas</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={15} color="#fda4af" /> Chat seguro com dupla aprovação</span>
            </div>
          </div>

          {/* Right Hero Image Card (AI Generated Authentic Brazilian Couple) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            style={{ position: 'relative' }}
          >
            {/* The Image Container with Luxury Borders and Glow */}
            <div style={{
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.2)',
              position: 'relative',
              background: '#220813'
            }}>
              <img 
                src="/images/hero_couple_mature.jpg" 
                alt="Casal maduro feliz em encontro elegante"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />

              {/* Gradient bottom overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(24, 5, 12, 0.95) 0%, rgba(24, 5, 12, 0.25) 50%, transparent 100%)'
              }} />

              {/* Top Floating Badge */}
              <div style={{ position: 'absolute', top: '18px', left: '18px', background: 'rgba(74, 16, 36, 0.90)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#fda4af" />
                <span>Casais Reais 35+ no Brasil</span>
              </div>

              {/* Top Right Affinity Badge */}
              <div style={{ position: 'absolute', top: '18px', right: '18px', background: '#ffffff', color: 'var(--tl-brand-700)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '5px', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
                <Sparkles size={14} color="var(--tl-rose-500)" />
                <span>94% de Sintonia</span>
              </div>

              {/* Bottom Quote inside Image Card */}
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#fda4af" color="#fda4af" />
                  ))}
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#ffffff', fontStyle: 'italic', lineHeight: 1.45 }}>
                  "Após anos decepcionada em outros apps, no True Love conversei com pessoas que queriam o mesmo que eu. Hoje estamos noivos."
                </p>
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#ffd4a8', fontWeight: 700 }}>
                  Cláudia & Fernando · São Paulo (SP)
                </div>
              </div>
            </div>

            {/* Bottom floating badge: Double Opt-in Guarantee (LiquidGlass Frosted Blurry Morphism) */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              style={{
                position: 'absolute',
                bottom: '-22px',
                right: '-16px',
                background: 'rgba(26, 7, 16, 0.88)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                padding: '14px 20px',
                borderRadius: '18px',
                boxShadow: '0 16px 36px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#ffffff',
                zIndex: 10
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.3) 0%, rgba(136, 19, 55, 0.5) 100%)', border: '1px solid rgba(244, 63, 94, 0.4)', color: '#ff8a9e', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Lock size={18} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Reciprocidade Estrita</strong>
                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 500 }}>Sem mensagens não solicitadas</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2.3 INOVAÇÕES INSPIRADAS NO NOVO DESIGN DO TINDER (EDITORIAL 35+) */}
      <section style={{
        padding: '30px 24px 80px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Section Headline */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span style={{ color: 'var(--tl-rose-500)', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Inovação em Relacionamento Maduro
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', color: 'var(--text-primary)', marginTop: '8px', fontWeight: 600 }}>
            Muita coisa mudou desde a última vez que você se relacionou.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '680px', margin: '10px auto 0' }}>
            Esqueça encontros constrangedores ou a sensação de estar em uma entrevista de emprego. O True Love reinventou a experiência para quem valoriza leveza, amizade e sintonia:
          </p>
        </div>

        {/* 3 Featured Editorial Cards (Direct from Tinder's new Card Redesign) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '26px', marginBottom: '40px' }}>
          
          {/* Card 1: Double Date 35+ (Deep Wine) */}
          <motion.div 
            whileHover={{ y: -6 }}
            style={{
              background: 'linear-gradient(145deg, #420d1a 0%, #2e0812 100%)',
              color: '#ffffff',
              borderRadius: '24px',
              padding: '34px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '430px',
              boxShadow: '0 16px 36px rgba(66, 13, 26, 0.35)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ff8a9e', display: 'block', marginBottom: '6px' }}>
                Double Date 35+
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 600, color: '#ffffff', margin: 0, lineHeight: 1.15 }}>
                Com amigos &gt; sem pressão.
              </h3>
            </div>

            {/* Visual Icon Centerpiece */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '26px 0' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '84px', height: '84px', borderRadius: '50%', background: 'radial-gradient(circle, #e11d48 0%, #881337 100%)', boxShadow: '0 12px 30px rgba(225, 29, 72, 0.5)', display: 'grid', placeItems: 'center' }}>
                  <Users2 size={40} color="#ffffff" />
                </div>
                <div style={{ position: 'absolute', bottom: '-8px', right: '-12px', background: '#be123c', padding: '5px 11px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, color: '#fff', border: '2px solid #420d1a' }}>
                  🍷 Jantar a 4
                </div>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                O primeiro encontro não precisa parecer uma sabatina. Você leva um amigo(a), seu match leva outro. Quatro adultos em uma boa mesa conversando com leveza.
              </p>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffb3c1', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={onOpenApp}>
                Conheça o Encontro a Quatro <ArrowRight size={14} />
              </span>
            </div>
          </motion.div>

          {/* Card 2: Modo Astrologia & Química Cósmica (Dark Plum Space) */}
          <motion.div 
            className="card-box"
            whileHover={{ y: -6 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '430px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c084fc', display: 'block', marginBottom: '6px' }}>
                Modo Astrologia & Espiritualidade
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
                Química cósmica & valores de alma.
              </h3>
            </div>

            {/* Visual Icon Centerpiece */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '26px 0' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '84px', height: '84px', borderRadius: '50%', background: 'radial-gradient(circle, #38bdf8 0%, #1e1b4b 100%)', boxShadow: '0 12px 30px rgba(56, 189, 248, 0.4)', display: 'grid', placeItems: 'center' }}>
                  <Moon size={40} color="#e0f2fe" fill="#38bdf8" />
                </div>
                <div style={{ position: 'absolute', top: '-6px', right: '-8px' }}>
                  <Sparkles size={22} color="#fde047" />
                </div>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                Um pouco de contexto cósmico ajuda bastante. Consulte signos solares, ascendentes, crenças e valores existenciais antes de dar o primeiro passo.
              </p>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--tl-rose-500)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={onOpenApp}>
                Descubra sua Sintonia Cósmica <ArrowRight size={14} />
              </span>
            </div>
          </motion.div>

          {/* Card 3: Bom Gosto & Gastronomia (Warm Linen Clean) */}
          <motion.div 
            className="card-box"
            whileHover={{ y: -6 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '430px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--tl-rose-500)', display: 'block', marginBottom: '6px' }}>
                Estilo de Vida & Boa Mesa
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
                Bom gosto & conversas que fluem.
              </h3>
            </div>

            {/* Visual Icon Centerpiece */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '26px 0' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '84px', height: '84px', borderRadius: '50%', background: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)', boxShadow: '0 12px 28px rgba(244, 63, 94, 0.3)', display: 'grid', placeItems: 'center' }}>
                  <Wine size={38} color="#ffffff" />
                </div>
                <div style={{ position: 'absolute', bottom: '-8px', right: '-16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '5px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  Afinidade Real
                </div>
              </div>
            </div>

            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                Seus livros preferidos, viagens marcantes e o que você aprecia beber aos sábados dizem mais sobre você do que qualquer biografia artificial.
              </p>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--tl-rose-500)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={onOpenApp}>
                Explorar Solteiros Cultos <ArrowRight size={14} />
              </span>
            </div>
          </motion.div>

        </div>

        {/* Big Impact Wine Banner (Double Date 35+ High Contrast) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            marginTop: '60px',
            background: 'linear-gradient(145deg, #2b0815 0%, #4a1024 45%, #240612 100%)',
            textAlign: 'center',
            borderRadius: '28px',
            padding: '52px 36px',
            border: '1px solid rgba(225, 29, 72, 0.35)',
            boxShadow: '0 24px 60px rgba(43, 8, 21, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Ambient Radial Glow */}
          <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244, 63, 94, 0.28) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.12)', color: '#ffb3c1', padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 800, marginBottom: '20px', border: '1px solid rgba(255, 255, 255, 0.18)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              🍷 Encontro a Quatro · Sem Pressão
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 700,
              lineHeight: 1.25,
              color: '#ffffff',
              margin: '0 auto 18px',
              maxWidth: '840px',
              letterSpacing: '-0.01em'
            }}>
              <span style={{ color: '#fda4af', display: 'block', marginBottom: '4px' }}>Você + um amigo(a).</span>
              <span style={{ color: '#fda4af', display: 'block', marginBottom: '4px' }}>Seu match + um amigo(a).</span>
              <span style={{ color: '#fcd34d', display: 'block', marginBottom: '12px', fontWeight: 800 }}>Super de boa.</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>O primeiro encontro é mais leve quando compartilhado.</span>
            </h3>

            <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.92)', maxWidth: '700px', margin: '0 auto 28px', lineHeight: 1.6 }}>
              O <strong>Double Date 35+</strong> do True Love elimina a pressão de encontros formais. Quatro adultos com maturidade, boa conversa em um restaurante agradável e zero constrangimento.
            </p>

            <button 
              className="btn-gold" 
              onClick={onOpenApp}
              style={{ 
                padding: '15px 36px', 
                fontSize: '15px', 
                border: '2px solid rgba(255, 255, 255, 0.35)',
                boxShadow: '0 10px 28px rgba(0, 0, 0, 0.35)',
                cursor: 'pointer'
              }}
            >
              Experimentar Encontros em Grupo <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2.4 MODO MÚSICA & BAGAGEM CULTURAL 35+ (BENCHMARKING TINDER REDESIGN 2026) */}
      <section style={{
        position: 'relative',
        background: 'url(/images/romantic_bg.jpg) center/cover fixed',
        padding: '140px 24px',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-primary)', opacity: 0.85 }}></div>
        <div style={{ maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          
          {/* Top Editorial Headline (Rosa Magenta / Serifada) */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4.2vw, 52px)',
              fontWeight: 700,
              color: '#db2777',
              margin: '0 auto 8px',
              letterSpacing: '-0.02em',
              lineHeight: 1.15
            }}>
              Uma música diz mais do que um simples "oi"
            </h2>
            <span style={{
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              Modo Música &amp; Cultura 35+
            </span>
          </div>

          {/* Central Callout: "Sem pular" */}
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '54px', height: '54px', borderRadius: '50%', background: 'rgba(219, 39, 119, 0.12)', color: '#db2777', marginBottom: '14px' }}>
              <Music size={26} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 10px 0' }}>
              Sem pular
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Adicione o que você está ouvindo ao seu perfil. O <strong>Modo Música</strong> mostra você para pessoas com um gosto musical e bagagem parecidos. Esqueça o "oi, tudo bem", sua playlist agora puxa assunto por você.
            </p>
          </div>

          {/* Candid Polaroid Mosaic with Speech Bubbles (Directly from Tinder Redesign) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '28px',
            alignItems: 'center',
            position: 'relative',
            padding: '16px 8px'
          }}>
            {/* Polaroid 1 */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 0 }}
              style={{
                transform: 'rotate(-2.2deg)',
                background: '#ffffff',
                padding: '14px 14px 20px 14px',
                borderRadius: '16px',
                boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.08)',
                position: 'relative'
              }}
            >
              {/* Floating Speech Bubble */}
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '16px',
                background: '#ffffff',
                color: '#1e293b',
                padding: '8px 14px',
                borderRadius: '18px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                fontSize: '12px',
                fontWeight: 600,
                maxWidth: '230px',
                lineHeight: 1.35,
                border: '1px solid rgba(0,0,0,0.06)',
                zIndex: 2
              }}>
                "Chico Buarque &amp; Elis no vinil é o meu ritual de domingo."
              </div>

              <div style={{ height: '260px', borderRadius: '12px', overflow: 'hidden', marginTop: '12px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" 
                  alt="Perfil Madura com gosto por MPB" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', padding: '0 4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Marina, 43 · Curadora</span>
                <span style={{ fontSize: '11px', background: 'rgba(219, 39, 119, 0.12)', color: '#db2777', padding: '3px 8px', borderRadius: '999px', fontWeight: 700 }}>🎵 MPB &amp; Jazz</span>
              </div>
            </motion.div>

            {/* Polaroid 2 */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 0 }}
              style={{
                transform: 'rotate(1.8deg)',
                background: '#ffffff',
                padding: '14px 14px 20px 14px',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                border: '1px solid rgba(0,0,0,0.08)',
                position: 'relative'
              }}
            >
              {/* Floating Speech Bubble */}
              <div style={{
                position: 'absolute',
                top: '-16px',
                right: '16px',
                background: '#ffffff',
                color: '#1e293b',
                padding: '8px 14px',
                borderRadius: '18px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                fontSize: '12px',
                fontWeight: 600,
                maxWidth: '250px',
                lineHeight: 1.35,
                border: '1px solid rgba(0,0,0,0.06)',
                zIndex: 2
              }}>
                "Dire Straits e Rock dos anos 80: se curte, já temos 80% de química ;)"
              </div>

              <div style={{ height: '270px', borderRadius: '12px', overflow: 'hidden', marginTop: '12px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80" 
                  alt="Homem maduro elegante" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', padding: '0 4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Rodrigo, 48 · Arquiteto</span>
                <span style={{ fontSize: '11px', background: 'rgba(219, 39, 119, 0.12)', color: '#db2777', padding: '3px 8px', borderRadius: '999px', fontWeight: 700 }}>🎸 Rock Clássico</span>
              </div>
            </motion.div>

            {/* Polaroid 3 */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: 0 }}
              style={{
                transform: 'rotate(-1.5deg)',
                background: '#ffffff',
                padding: '14px 14px 20px 14px',
                borderRadius: '16px',
                boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.08)',
                position: 'relative'
              }}
            >
              {/* Photo with optimized position so face is 100% visible */}
              <div style={{ height: '260px', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                  alt="Luciana - Médica 41 anos sorrindo" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                />
                {/* Speech Bubble relocated to the lower jacket area so her face remains completely clear */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  right: '10px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  color: '#1e293b',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  fontSize: '11px',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  border: '1px solid rgba(0,0,0,0.08)',
                  zIndex: 2
                }}>
                  "Shows de jazz em bistrôs charmosos com bom vinho: quem topa?"
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', padding: '0 4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Luciana, 41 · Médica</span>
                <span style={{ fontSize: '11px', background: 'rgba(219, 39, 119, 0.12)', color: '#db2777', padding: '3px 8px', borderRadius: '999px', fontWeight: 700 }}>🎷 Jazz &amp; Vinhos</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2.5 SHOWCASE INTERATIVO: EXPERIÊNCIA DE DESCOBERTA (TINDER SWIPE & BADOO RADAR) */}
      <section style={{
        position: 'relative',
        background: 'url(/images/romantic_bg.jpg) center/cover fixed',
        padding: '140px 24px 140px',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-primary)', opacity: 0.95 }}></div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ color: 'var(--tl-rose-500)', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Demonstração Interativa do Aplicativo Oficial
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '34px', color: 'var(--text-primary)', marginTop: '6px', fontWeight: 600 }}>
            Escolha como você prefere descobrir novas conexões
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '650px', margin: '8px auto 0' }}>
            Combinamos a agilidade fluida do modo deslizar com a transparência do radar de proximidade e selos de intenção verificados.
          </p>

          {/* Mode Switcher */}
          <div style={{ display: 'inline-flex', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '999px', padding: '4px', marginTop: '24px' }}>
            <button
              onClick={() => setShowcaseMode('tinder')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 22px',
                borderRadius: '999px',
                border: 'none',
                background: showcaseMode === 'tinder' ? 'linear-gradient(135deg, #fd267a, #ff6036)' : 'transparent',
                color: showcaseMode === 'tinder' ? '#fff' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              🔥 Modo Deslizar (Swipe Ágil)
            </button>
            <button
              onClick={() => setShowcaseMode('badoo')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 22px',
                borderRadius: '999px',
                border: 'none',
                background: showcaseMode === 'badoo' ? '#7839ee' : 'transparent',
                color: showcaseMode === 'badoo' ? '#fff' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              📍 Perto de Você (Radar de Proximidade)
            </button>
          </div>
        </div>

        {/* Floating action toast */}
        <AnimatePresence>
          {swipeToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                position: 'fixed',
                top: '90px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--tl-forest-900)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '999px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                zIndex: 9999,
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <CheckCircle2 size={16} color="#86efac" />
              {swipeToast}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content based on showcaseMode */}
        {showcaseMode === 'tinder' ? (
          <div style={{ maxWidth: '440px', margin: '0 auto' }}>
            <motion.div
              key={currentSwipeIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="card-box"
              style={{
                padding: 0,
                overflow: 'hidden',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                position: 'relative'
              }}
            >
              {/* Profile Image with Gradient */}
              <div style={{ position: 'relative', height: '400px' }}>
                <img 
                  src={showcaseProfiles[currentSwipeIndex].image} 
                  alt={showcaseProfiles[currentSwipeIndex].name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.3) 50%, transparent 100%)'
                }} />

                {/* Top Badge: Affinity & Verification */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: '#fff', padding: '5px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} color="#38bdf8" /> Perfil Verificado 35+
                  </div>
                  <div style={{ background: '#ec4899', color: '#fff', padding: '5px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={13} /> {showcaseProfiles[currentSwipeIndex].affinity}
                  </div>
                </div>

                {/* Bottom Profile Details */}
                <div style={{ position: 'absolute', bottom: '16px', left: '18px', right: '18px', color: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#fff' }}>
                      {showcaseProfiles[currentSwipeIndex].name}, {showcaseProfiles[currentSwipeIndex].age}
                    </h3>
                  </div>
                  <div style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '10px' }}>
                    {showcaseProfiles[currentSwipeIndex].profession} · {showcaseProfiles[currentSwipeIndex].city}
                  </div>

                  {/* Badoo/Bumble Intent Badge */}
                  <div style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255, 255, 255, 0.25)', padding: '6px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    🎯 Busca: {showcaseProfiles[currentSwipeIndex].intent}
                  </div>

                  <p style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: 1.4, margin: '0 0 10px 0' }}>
                    "{showcaseProfiles[currentSwipeIndex].bio}"
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {showcaseProfiles[currentSwipeIndex].tags.map((tag, tIdx) => (
                      <span key={tIdx} style={{ fontSize: '11px', background: 'rgba(0,0,0,0.5)', padding: '3px 9px', borderRadius: '999px', color: '#e2e8f0' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* TINDER 5-BUTTON GAMEPAD */}
              <div style={{
                background: 'var(--bg-primary)',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderTop: '1px solid var(--border-color)'
              }}>
                {/* 1. Rewind (Yellow) */}
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipeAction('rewind')}
                  title="Rebobinar / Voltar"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    border: '1.5px solid #eab308',
                    color: '#eab308',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 3px 10px rgba(234, 179, 8, 0.2)'
                  }}
                >
                  <RotateCcw size={18} />
                </motion.button>

                {/* 2. Pass / Dislike (Red) */}
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipeAction('pass')}
                  title="Passar / Não agora"
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    border: '2px solid #ef4444',
                    color: '#ef4444',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(239, 68, 68, 0.25)'
                  }}
                >
                  <X size={26} strokeWidth={2.5} />
                </motion.button>

                {/* 3. Super Like (Cyan) */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipeAction('superlike')}
                  title="Super Sintonia"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    border: '1.5px solid #0284c7',
                    color: '#0284c7',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 3px 12px rgba(2, 132, 199, 0.2)'
                  }}
                >
                  <Star size={20} fill="#0284c7" />
                </motion.button>

                {/* 4. Like / Heart (Pink/Rose) */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipeAction('like')}
                  title="Curtir com Elegância"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fd267a, #ff6036)',
                    border: 'none',
                    color: '#ffffff',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(253, 38, 122, 0.35)'
                  }}
                >
                  <Heart size={26} fill="#ffffff" />
                </motion.button>

                {/* 5. Boost (Purple) */}
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipeAction('boost')}
                  title="Boost de Visibilidade"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--card-bg)',
                    border: '1.5px solid #a855f7',
                    color: '#a855f7',
                    display: 'grid',
                    placeItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 3px 10px rgba(168, 85, 247, 0.2)'
                  }}
                >
                  <Zap size={18} fill="#a855f7" />
                </motion.button>
              </div>

              {/* Gamepad helper label */}
              <div style={{ textAlign: 'center', padding: '8px 12px', background: 'var(--bg-secondary)', fontSize: '11px', color: 'var(--text-muted)' }}>
                ↺ Voltar · ✕ Pular · ★ Super Sintonia · ♥ Curtir · ⚡ Destaque
              </div>
            </motion.div>
          </div>
        ) : (
          /* BADOO NEARBY RADAR GRID */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px'
          }}>
            {badooNearbyProfiles.map((p, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="card-box"
                style={{ padding: 0, overflow: 'hidden', borderRadius: '18px', position: 'relative' }}
              >
                <div style={{ height: '220px', position: 'relative' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }} />
                  
                  {/* Status & Distance */}
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', padding: '3px 8px', borderRadius: '999px', fontSize: '11px', color: '#86efac', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                    {p.status}
                  </div>

                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', padding: '3px 8px', borderRadius: '999px', fontSize: '11px', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={11} color="#f43f5e" /> {p.city}
                  </div>

                  {/* Name & intent */}
                  <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px', color: '#fff' }}>
                    <div style={{ fontSize: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {p.name}, {p.age}
                      <ShieldCheck size={14} color="#38bdf8" />
                    </div>
                    <div style={{ fontSize: '12px', color: '#cbd5e1' }}>{p.profession}</div>
                  </div>
                </div>

                <div style={{ padding: '14px' }}>
                  <div style={{ background: 'rgba(120, 57, 238, 0.1)', color: '#7839ee', border: '1px solid rgba(120, 57, 238, 0.25)', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, marginBottom: '10px', textAlign: 'center' }}>
                    🎯 {p.intent}
                  </div>

                  <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    {p.tags.map((tag, tIdx) => (
                      <span key={tIdx} style={{ fontSize: '10px', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '999px', color: 'var(--text-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className="tl-btn tl-btn-primary"
                    onClick={() => handleSwipeAction('like')}
                    style={{ width: '100%', justifyContent: 'center', fontSize: '12px', padding: '8px' }}
                  >
                    <Heart size={14} /> Mútuo Interesse
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        </div>
      </section>

      {/* 2.6 MÓDULO "A FIM DE CONVERSAR AGORA?" (BENCHMARKING BADOO CONFIANÇA & CONEXÃO IMEDIATA) */}
      <section style={{
        padding: '30px 24px 70px',
        maxWidth: '1150px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'linear-gradient(145deg, #2b0815 0%, #4a1024 45%, #240612 100%)',
          border: '1px solid rgba(225, 29, 72, 0.28)',
          borderRadius: '32px',
          padding: '48px 36px',
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: '40px',
          alignItems: 'center',
          boxShadow: '0 24px 60px rgba(43, 8, 21, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Ambient Brand Glow */}
          <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244, 63, 94, 0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Left Column: Conversational Pitch */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.12)', color: '#ffb3c1', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 800, marginBottom: '16px', border: '1px solid rgba(255, 255, 255, 0.15)', letterSpacing: '0.05em' }}>
              <Sparkles size={14} color="#fcd34d" /> SEM PERDA DE TEMPO
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: '0 0 16px 0',
              letterSpacing: '-0.02em'
            }}>
              A fim de conversar agora?
            </h2>

            <p style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.88)',
              lineHeight: 1.6,
              marginBottom: '26px'
            }}>
              Não precisa esperar dias por uma conexão. Pule direto para as conversas que importam: aquela parte em que vocês trocam ideias, compartilham histórias de vida e descobrem se há química de verdade.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button 
                className="btn-gold" 
                onClick={onOpenApp}
                style={{ 
                  padding: '14px 28px', 
                  fontSize: '15px', 
                  border: '2px solid rgba(255, 255, 255, 0.45)',
                  boxShadow: '0 8px 24px rgba(225, 29, 72, 0.4)',
                  cursor: 'pointer'
                }}
              >
                Ver Quem Está Online Agora <ArrowRight size={16} />
              </button>
              
              <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                🔒 100% verificado com biometria facial e CNH
              </span>
            </div>
          </div>

          {/* Right Column: 3x3 Mockup Grid of Online 35+ Members */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            background: 'rgba(20, 4, 10, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '24px',
            padding: '22px',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.35)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', padding: '0 4px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }} />
                Disponíveis para Conversar
              </span>
              <span style={{ fontSize: '11px', color: '#ff8a9e', fontWeight: 700, letterSpacing: '0.02em' }}>São Paulo &amp; Capitais</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { name: 'Ana', age: 41, role: 'Advogada', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
                { name: 'João', age: 46, role: 'Engenheiro', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
                { name: 'Miguel', age: 44, role: 'Empresário', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
                { name: 'Bruno', age: 39, role: 'Arquiteto', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
                { name: 'Carolina', age: 42, role: 'Médica', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
                { name: 'Isabel', age: 45, role: 'Juíza', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },
                { name: 'Pedro', age: 49, role: 'Executivo', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' },
                { name: 'Sônia', age: 52, role: 'Psicóloga', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80' },
                { name: 'Fernanda', age: 38, role: 'Designer', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
              ].map((item, idx) => (
                <div key={idx} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '110px' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 65%)' }} />
                  <div style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', border: '1.5px solid #fff' }} />
                  <div style={{ position: 'absolute', bottom: '6px', left: '6px', right: '6px', color: '#fff', fontSize: '11px', fontWeight: 700, lineHeight: 1.2 }}>
                    {item.name}, {item.age}
                    <span style={{ display: 'block', fontSize: '9px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>{item.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIMULADOR INTERATIVO DE AFINIDADE NA LANDING PAGE */}
      <section style={{
        background: 'var(--card-bg)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '70px 24px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ color: 'var(--tl-forest-500)', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Calculadora de Compatibilidade 35+
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--text-primary)', marginTop: '6px', fontWeight: 600 }}>
              Veja como o Motor de Afinidade funciona para você
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
              Selecione seus critérios e veja a precisão matemática do cruzamento de valores:
            </p>
          </div>

          <div style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '22px',
            padding: '32px',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '32px',
            alignItems: 'center'
          }}>
            {/* Controls */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {/* Custom City Dropdown */}
                <div style={{ position: 'relative' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Sua Cidade:
                  </label>
                  <button
                    type="button"
                    onClick={() => { setOpenCityDropdown(!openCityDropdown); setOpenAgeDropdown(false); }}
                    style={{
                      width: '100%',
                      padding: '11px 16px',
                      borderRadius: '12px',
                      background: 'var(--card-bg)',
                      border: openCityDropdown ? '1.5px solid var(--tl-brand-600)' : '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      boxShadow: openCityDropdown ? '0 0 0 3px rgba(165, 58, 95, 0.15)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{selectedCity}</span>
                    <ChevronDown size={15} style={{ transform: openCityDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: 'var(--text-muted)' }} />
                  </button>

                  <AnimatePresence>
                    {openCityDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 6px)',
                          left: 0,
                          right: 0,
                          background: 'var(--bg-surface)',
                          border: '1.5px solid var(--border-color)',
                          borderRadius: '14px',
                          padding: '6px',
                          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.22)',
                          zIndex: 100,
                          maxHeight: '220px',
                          overflowY: 'auto'
                        }}
                      >
                        {cityOptions.map((city) => (
                          <div
                            key={city}
                            onClick={() => {
                              setSelectedCity(city);
                              setOpenCityDropdown(false);
                            }}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '8px',
                              fontSize: '13px',
                              fontWeight: selectedCity === city ? 700 : 500,
                              color: selectedCity === city ? 'var(--tl-brand-600)' : 'var(--text-primary)',
                              background: selectedCity === city ? 'rgba(165, 58, 95, 0.12)' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease'
                            }}
                            onMouseEnter={e => { if (selectedCity !== city) e.currentTarget.style.background = 'var(--bg-secondary)'; }}
                            onMouseLeave={e => { if (selectedCity !== city) e.currentTarget.style.background = 'transparent'; }}
                          >
                            <span>{city}</span>
                            {selectedCity === city && <Check size={14} color="var(--tl-brand-600)" />}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Custom Age Range Dropdown */}
                <div style={{ position: 'relative' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Faixa Etária Alvo:
                  </label>
                  <button
                    type="button"
                    onClick={() => { setOpenAgeDropdown(!openAgeDropdown); setOpenCityDropdown(false); }}
                    style={{
                      width: '100%',
                      padding: '11px 16px',
                      borderRadius: '12px',
                      background: 'var(--card-bg)',
                      border: openAgeDropdown ? '1.5px solid var(--tl-brand-600)' : '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      boxShadow: openAgeDropdown ? '0 0 0 3px rgba(165, 58, 95, 0.15)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{selectedAgeRange}</span>
                    <ChevronDown size={15} style={{ transform: openAgeDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', color: 'var(--text-muted)' }} />
                  </button>

                  <AnimatePresence>
                    {openAgeDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 6px)',
                          left: 0,
                          right: 0,
                          background: 'var(--bg-surface)',
                          border: '1.5px solid var(--border-color)',
                          borderRadius: '14px',
                          padding: '6px',
                          boxShadow: '0 20px 48px rgba(0, 0, 0, 0.22)',
                          zIndex: 100,
                          maxHeight: '220px',
                          overflowY: 'auto'
                        }}
                      >
                        {ageOptions.map((age) => (
                          <div
                            key={age}
                            onClick={() => {
                              setSelectedAgeRange(age);
                              setOpenAgeDropdown(false);
                            }}
                            style={{
                              padding: '10px 14px',
                              borderRadius: '8px',
                              fontSize: '13px',
                              fontWeight: selectedAgeRange === age ? 700 : 500,
                              color: selectedAgeRange === age ? 'var(--tl-brand-600)' : 'var(--text-primary)',
                              background: selectedAgeRange === age ? 'rgba(165, 58, 95, 0.12)' : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              transition: 'background 0.15s ease'
                            }}
                            onMouseEnter={e => { if (selectedAgeRange !== age) e.currentTarget.style.background = 'var(--bg-secondary)'; }}
                            onMouseLeave={e => { if (selectedAgeRange !== age) e.currentTarget.style.background = 'transparent'; }}
                          >
                            <span>{age}</span>
                            {selectedAgeRange === age && <Check size={14} color="var(--tl-brand-600)" />}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
                Seus Valores Inegociáveis (clique para alternar):
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {sampleValues.map((val, idx) => {
                  const isChecked = selectedValues.includes(val);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleValue(val)}
                      style={{
                        background: isChecked ? 'var(--tl-rose-500)' : 'var(--card-bg)',
                        color: isChecked ? '#ffffff' : 'var(--text-primary)',
                        border: isChecked ? '1px solid var(--tl-rose-500)' : '1px solid var(--border-color)',
                        padding: '6px 14px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: isChecked ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {isChecked ? '✓ ' : '+ '} {val}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Result Gauge */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                Compatibilidade Estimada
              </div>
              
              <div style={{ fontSize: '54px', fontWeight: 800, color: 'var(--tl-rose-500)', fontFamily: 'var(--font-serif)', margin: '4px 0' }}>
                {calculatedAffinity}%
              </div>

              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--status-success)', marginBottom: '12px' }}>
                ● Alta Afinidade Mútua em {selectedCity.split(' ')[0]}
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 18px 0', lineHeight: 1.45 }}>
                Encontramos solteiros verificados que também selecionaram <strong>{selectedValues.slice(0, 2).join(' e ')}</strong> na sua região.
              </p>

              <button 
                className="btn-gold" 
                onClick={onOpenApp}
                style={{ 
                  width: '100%', 
                  justifyContent: 'center',
                  padding: '14px 24px',
                  fontSize: '15px',
                  border: '2px solid rgba(255, 255, 255, 0.35)',
                  boxShadow: '0 8px 24px rgba(165, 58, 95, 0.35)',
                  cursor: 'pointer'
                }}
              >
                Conhecer Solteiros Compatíveis <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TABELA COMPARATIVA: TRUE LOVE VS APPS CONVENCIONAIS */}
      <section style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '34px', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>
            Por que o True Love é a Escolha Definitiva
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '6px' }}>
            Compare nossos padrões de maturidade e segurança com os aplicativos convencionais:
          </p>
        </div>

        <div className="card-box" style={{ padding: '0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: 700 }}>Recurso ou Critério</th>
                <th style={{ padding: '16px 20px', color: 'var(--tl-rose-500)', fontWeight: 800, background: 'rgba(197, 99, 109, 0.08)' }}>True Love 35+</th>
                <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 600 }}>Bumble</th>
                <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 600 }}>Tinder</th>
                <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 600 }}>Badoo</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 20px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {row.feature}
                  </td>
                  <td style={{ padding: '14px 20px', background: 'rgba(197, 99, 109, 0.08)', fontWeight: 700, color: 'var(--tl-rose-500)' }}>
                    ✓ Sim (Exclusivo)
                  </td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                    {row.bumble === true ? '✓ Sim' : row.bumble === false ? '✕ Não' : row.bumble}
                  </td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                    {row.tinder === true ? '✓ Sim' : row.tinder === false ? '✕ Não' : row.tinder}
                  </td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>
                    {row.badoo === true ? '✓ Sim' : row.badoo === false ? '✕ Não' : row.badoo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4.6 HISTÓRIAS REAIS DE SUCESSO (BENCHMARKING BADOO HISTÓRIAS DE SUCESSO) */}
      <section style={{ padding: '80px 24px', maxWidth: '1180px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: 'var(--tl-rose-500)', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Histórias de Sucesso Reais
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.8vw, 42px)', color: 'var(--text-primary)', marginTop: '6px', fontWeight: 600 }}>
            Conexões que viraram casamentos e novas famílias
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '640px', margin: '8px auto 0' }}>
            Histórias reais de homens e mulheres a partir de 35 anos que reencontraram o amor no True Love:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '40px' }}>
          {successStories.map((story, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="card-box"
              style={{ padding: '16px', overflow: 'hidden', borderRadius: '22px' }}
            >
              {/* Photo with Badoo-style name badges */}
              <div style={{ position: 'relative', height: '220px', borderRadius: '16px', overflow: 'hidden', marginBottom: '18px' }}>
                <img src={story.image} alt={story.names} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                {/* Name Badge 1 (Top Left) */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#420d1a', color: '#ffffff', padding: '5px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 800, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', letterSpacing: '0.02em' }}>
                  {story.name1}
                </div>

                {/* Name Badge 2 (Bottom Right) */}
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: '#420d1a', color: '#ffffff', padding: '5px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 800, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', letterSpacing: '0.02em' }}>
                  {story.name2}
                </div>
              </div>

              {/* Quote below photo */}
              <div style={{ padding: '0 8px 12px' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.55, margin: '0 0 14px 0' }}>
                  "{story.quote}"
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '12px' }}>
                  <span style={{ color: 'var(--tl-rose-500)', fontWeight: 700 }}>💍 {story.status}</span>
                  <span style={{ color: 'var(--text-muted)' }}>📍 {story.city}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA like Badoo Screenshot 4 */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '14px', color: 'var(--tl-rose-500)', fontWeight: 700, cursor: 'pointer' }} onClick={onOpenApp}>
            Descubra mais histórias de sucesso no app →
          </span>
          <button 
            className="btn-gold" 
            onClick={onOpenApp}
            style={{ padding: '14px 36px', fontSize: '15px' }}
          >
            Criar Cadastro Grátis
          </button>
        </div>
      </section>

      {/* 2. SÍNTESE GLOBAL & SEGURANÇA 35+ (UNIFICAÇÃO DOS 4 GIGANTES + PROTOCOLO DE SEGURANÇA) */}
      <section style={{ 
        padding: '110px 24px', 
        position: 'relative',
        background: 'url(/images/romantic_bg.jpg) center/cover no-repeat',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-primary)', opacity: 0.90 }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto' }}>
          
          {/* Header Unificado */}
          <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 48px' }}>
            <span style={{ 
              color: 'var(--tl-brand-600)', 
              fontWeight: 800, 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.12em',
              background: 'rgba(165, 58, 95, 0.1)',
              padding: '6px 18px',
              borderRadius: '999px',
              display: 'inline-block',
              marginBottom: '14px'
            }}>
              A Síntese dos Melhores Apps · Segurança e Inteligência 35+
            </span>
            <h2 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(32px, 4vw, 46px)', 
              color: 'var(--text-primary)', 
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: '0 0 16px 0'
            }}>
              Criado a partir do que funciona.<br />
              Com a sua segurança e maturidade em primeiro lugar.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.6, margin: '0 auto', maxWidth: '720px' }}>
              Reunimos os maiores aprendizados globais de design e psicologia de relacionamentos, combinando a fluidez dos melhores apps mundiais com validação documental rigorosa por CNH/RG e respeito mútuo estrito.
            </p>
          </div>

          {/* Sub-bar de Abordagem de Segurança */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '18px',
            padding: '22px 28px',
            marginBottom: '40px',
            boxShadow: '0 10px 28px rgba(0,0,0,0.07)',
            display: 'grid',
            gridTemplateColumns: 'minmax(240px, 1fr) 2fr',
            gap: '24px',
            alignItems: 'center',
            boxShadow: '0 8px 24px -4px rgba(0,0,0,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(165, 58, 95, 0.12)', display: 'grid', placeItems: 'center', color: 'var(--tl-brand-600)' }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '15px', color: 'var(--text-primary)', display: 'block' }}>Nossa Abordagem de Segurança</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Controle e tranquilidade em cada etapa</span>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
              Verificação biométrica facial 3D, auditoria documental por CNH/RG com IA, recurso exclusivo "Compartilhar meu Date", bloqueio instantâneo e denúncia discreta: ferramentas acessíveis para manter você no controle absoluto.
            </p>
          </div>

          {/* 6 Pilares Integrados em Grid 3x2 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '26px' }}>
            
            {/* Card 1: Do Bumble (Valores & Respeito) */}
            <motion.div 
              className="card-box" 
              whileHover={{ y: -6 }} 
              initial={{ opacity: 0, y: 25 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              style={{ padding: '30px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderTop: '4px solid #f59e0b', borderRadius: '20px', boxShadow: '0 14px 34px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', display: 'grid', placeItems: 'center' }}>
                    <Compass size={24} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#b45309', background: 'rgba(245, 158, 11, 0.12)', padding: '3px 10px', borderRadius: '999px' }}>
                    Foco em Valores & Respeito
                  </span>
                </div>
                <strong style={{ fontSize: '18px', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Valores e Hábitos em Destaque
                </strong>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 16px 0' }}>
                  Etiquetas de estilo de vida, hábitos, família e perguntas intencionais. Você sabe os valores essenciais e o momento de vida da pessoa antes de dar o primeiro passo.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#b45309', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <CheckCircle2 size={15} /> Sintonia de Valores e Intenções
              </div>
            </motion.div>

            {/* Card 2: Do Badoo (Auditoria de CNH & Biometria 3D) */}
            <motion.div 
              className="card-box" 
              whileHover={{ y: -6 }} 
              initial={{ opacity: 0, y: 25 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              style={{ padding: '30px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderTop: '4px solid var(--tl-brand-600)', borderRadius: '20px', boxShadow: '0 14px 34px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(165, 58, 95, 0.15)', color: 'var(--tl-brand-600)', display: 'grid', placeItems: 'center' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tl-brand-600)', background: 'rgba(165, 58, 95, 0.12)', padding: '3px 10px', borderRadius: '999px' }}>
                    Verificação & Proximidade
                  </span>
                </div>
                <strong style={{ fontSize: '18px', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Auditoria de CNH &amp; Biometria 3D
                </strong>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 16px 0' }}>
                  Validação documental oficial por CNH/RG e biometria facial 3D obrigatória. Tolerância zero com fakes, golpistas ou pessoas com menos de 35 anos.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--tl-brand-600)', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <CheckCircle2 size={15} /> 100% Perfis Reais e Auditados
              </div>
            </motion.div>

            {/* Card 3: Do POF (Química de Vida & Maturidade) */}
            <motion.div 
              className="card-box" 
              whileHover={{ y: -6 }} 
              initial={{ opacity: 0, y: 25 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              style={{ padding: '30px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderTop: '4px solid #ea580c', borderRadius: '20px', boxShadow: '0 14px 34px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(234, 88, 12, 0.15)', color: '#ea580c', display: 'grid', placeItems: 'center' }}>
                    <Heart size={24} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ea580c', background: 'rgba(234, 88, 12, 0.12)', padding: '3px 10px', borderRadius: '999px' }}>
                    Afinidade Profunda 35+
                  </span>
                </div>
                <strong style={{ fontSize: '18px', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Afinidade Explicável e Profunda
                </strong>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 16px 0' }}>
                  Cálculo de sintonia real entre objetivos de vida, momento profissional e espiritualidade. As conversas fluem naturalmente porque há afinidade concreta.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#ea580c', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <CheckCircle2 size={15} /> Índice de Sintonia Transparente
              </div>
            </motion.div>

            {/* Card 4: Do Tinder (Visual Imersivo & Fluidez) */}
            <motion.div 
              className="card-box" 
              whileHover={{ y: -6 }} 
              initial={{ opacity: 0, y: 25 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              style={{ padding: '30px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderTop: '4px solid #0284c7', borderRadius: '20px', boxShadow: '0 14px 34px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(2, 132, 199, 0.15)', color: '#0284c7', display: 'grid', placeItems: 'center' }}>
                    <Sliders size={24} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0284c7', background: 'rgba(2, 132, 199, 0.12)', padding: '3px 10px', borderRadius: '999px' }}>
                    Fluidez & Interface Dinâmica
                  </span>
                </div>
                <strong style={{ fontSize: '18px', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Visual Moderno Sem Poluição
                </strong>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 16px 0' }}>
                  Navegação tátil fluida, estética limpa e foco visual absoluto na pessoa. Sem anúncios intrusivos, pop-ups irritantes ou poluição visual.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#0284c7', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <CheckCircle2 size={15} /> Experiência Focada na Conexão
              </div>
            </motion.div>

            {/* Card 5: Respeito & Duplo Opt-in (Segurança no Chat) */}
            <motion.div 
              className="card-box" 
              whileHover={{ y: -6 }} 
              initial={{ opacity: 0, y: 25 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              style={{ padding: '30px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderTop: '4px solid #16a34a', borderRadius: '20px', boxShadow: '0 14px 34px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(22, 163, 74, 0.15)', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
                    <Smile size={24} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#16a34a', background: 'rgba(22, 163, 74, 0.12)', padding: '3px 10px', borderRadius: '999px' }}>
                    Proteção Ativa
                  </span>
                </div>
                <strong style={{ fontSize: '18px', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Converse com Respeito (Duplo Opt-in)
                </strong>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 16px 0' }}>
                  Nenhuma mensagem não solicitada. O chat só é liberado mediante interesse recíproco, com IA ativa que detecta assédio ou linguagem desrespeitosa.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#16a34a', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <CheckCircle2 size={15} /> Zero Spam ou Invasões
              </div>
            </motion.div>

            {/* Card 6: Controle & Date Seguro (Tranquilidade) */}
            <motion.div 
              className="card-box" 
              whileHover={{ y: -6 }} 
              initial={{ opacity: 0, y: 25 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              style={{ padding: '30px 24px', borderTop: '4px solid #7c3aed', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'rgba(124, 58, 237, 0.15)', color: '#7c3aed', display: 'grid', placeItems: 'center' }}>
                    <Lock size={24} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7c3aed', background: 'rgba(124, 58, 237, 0.12)', padding: '3px 10px', borderRadius: '999px' }}>
                    Blindagem 35+
                  </span>
                </div>
                <strong style={{ fontSize: '18px', color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                  Controle Total &amp; Date Seguro
                </strong>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 16px 0' }}>
                  Desfaça o match ou bloqueie em 1 clique sem constrangimento. Ferramenta exclusiva "Compartilhar meu Date" para enviar local e horário a amigos de confiança.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#7c3aed', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <CheckCircle2 size={15} /> Botão de Segurança e Discrição
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      
{/* 5. PLANOS TRANSPARENTES (FREE, PLUS, CONCIERGE VIP) */}
      <section id="pricing-section" style={{ padding: '60px 24px 100px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ color: 'var(--tl-brand-600)', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', background: 'rgba(165, 58, 95, 0.08)', padding: '6px 16px', borderRadius: '999px', display: 'inline-block' }}>
            Planos Transparentes e Sem Pegadinhas
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 3.8vw, 44px)', color: 'var(--text-primary)', margin: '14px 0 8px 0', fontWeight: 700, letterSpacing: '-0.01em' }}>
            Escolha o nível de acompanhamento que você deseja
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '640px', margin: '0 auto' }}>
            Sem taxas ocultas ou renovações surpresa. Você decide se quer navegar no seu ritmo ou ter um Matchmaker cuidando de tudo.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'stretch' }}>
          
          {/* Plan 1: Conexão (Free) */}
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ 
              background: 'var(--card-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1.5px solid var(--border-color)',
              borderRadius: '26px',
              padding: '38px 28px 34px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 36px -8px rgba(0, 0, 0, 0.08)',
              position: 'relative'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.05)', padding: '4px 10px', borderRadius: '6px' }}>
                  Essencial Gratuito
                </span>
                <span style={{ fontSize: '12px', color: 'var(--status-success)', fontWeight: 700 }}>● Permanente</span>
              </div>

              <strong style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', display: 'block', marginTop: '6px' }}>
                Plano Conexão
              </strong>

              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--text-primary)', margin: '12px 0 6px 0', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}>
                R$ 0 <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>/ permanente</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.5 }}>
                Ideal para conhecer a plataforma, validar seus documentos e receber sugestões com afinidade comprovada.
              </p>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '22px', marginBottom: '28px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
                  11 Benefícios Inclusos:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Validação documental e selo de perfil verificado 35+</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Apresentações diárias selecionadas por afinidade</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Chat seguro e ilimitado quando houver match mútuo</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Algoritmo de sintonia de valores, família e hábitos</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Proteção biométrica anti-golpes e tolerância zero a fakes</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Modo Discreto: controle de visibilidade da profissão e bairro</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Questionário de compatibilidade emocional e projetos de vida</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Teste de sintonia musical, cultural e hábitos de lazer</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Acesso à comunidade exclusiva de solteiros maduros no Brasil</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Notificações instantâneas de reciprocidade de interesse</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Suporte humanizado para dúvidas de verificação</span>
                  </li>
                </ul>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenApp}
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--tl-brand-700)',
                background: 'var(--bg-surface)',
                border: '2px solid var(--tl-brand-600)',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease'
              }}
            >
              <CheckCircle2 size={18} color="var(--tl-brand-600)" />
              <span>Criar Cadastro Grátis</span>
            </motion.button>
          </motion.div>

          {/* Plan 2: Plus (R$ 89 / mês) [MAIS ESCOLHIDO] */}
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ 
              background: 'linear-gradient(180deg, var(--card-bg) 0%, rgba(165, 58, 95, 0.05) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2.5px solid var(--tl-brand-600)',
              borderRadius: '26px',
              padding: '42px 28px 34px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 24px 50px -12px rgba(165, 58, 95, 0.28), 0 0 0 1px rgba(165, 58, 95, 0.15)'
            }}
          >
            {/* Pill Badge */}
            <div style={{ 
              position: 'absolute', 
              top: '-15px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              background: 'linear-gradient(135deg, #a53a5f 0%, #671834 100%)', 
              color: '#ffffff', 
              fontSize: '11px', 
              fontWeight: 800, 
              padding: '6px 20px', 
              borderRadius: '999px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em', 
              boxShadow: '0 6px 18px rgba(165, 58, 95, 0.45)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              whiteSpace: 'nowrap' 
            }}>
              <Sparkles size={14} color="#ffd4a8" /> MAIS ESCOLHIDO 35+
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tl-brand-600)', background: 'rgba(165, 58, 95, 0.12)', padding: '4px 10px', borderRadius: '6px' }}>
                  Controle &amp; Revelação
                </span>
                <span style={{ fontSize: '12px', color: 'var(--tl-brand-600)', fontWeight: 800 }}>★ 4.9 de Avaliação</span>
              </div>

              <strong style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', display: 'block', marginTop: '6px' }}>
                Plano Plus
              </strong>

              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--tl-brand-600)', margin: '12px 0 6px 0', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}>
                R$ 89 <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>/ mês</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.5 }}>
                Para quem quer agilidade máxima, controle e deseja saber exatamente quem curtiu seu perfil antes de decidir.
              </p>

              <div style={{ borderTop: '1px solid rgba(165, 58, 95, 0.2)', paddingTop: '22px', marginBottom: '28px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--tl-brand-700)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
                  11 Benefícios Premium:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4, fontWeight: 700, color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Todos os 11 benefícios do Plano Conexão inclusos</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4, fontWeight: 700, color: 'var(--tl-brand-700)' }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Ver quem curtiu seu perfil antes (revelação imediata)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Curtidas ilimitadas todos os dias sem limites</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Filtros avançados por cidade, hábitos, filhos e religião</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Rebobinar perfis pulados sem restrições</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>5 Destaques Semanais de perfil (Super Boost regional)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Navegação invisível: explore perfis sem registrar visita</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Modo Passaporte: conecte-se com pessoas de outras capitais</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Confirmação de leitura e status online no chat</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>3 Primeiras Mensagens diretas por semana antes do match</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-brand-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Atendimento prioritário e auditoria de segurança expressa</span>
                  </li>
                </ul>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenApp}
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '16px',
                fontWeight: 800,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #a53a5f 0%, #671834 100%)',
                border: 'none',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(165, 58, 95, 0.42)',
                transition: 'all 0.2s ease'
              }}
            >
              <Zap size={18} color="#ffd4a8" />
              <span>Assinar Plano Plus (R$ 89)</span>
            </motion.button>
          </motion.div>

          {/* Plan 3: Concierge VIP (R$ 789 / mês) */}
          <motion.div 
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ 
              background: 'linear-gradient(180deg, var(--card-bg) 0%, rgba(178, 124, 68, 0.08) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '2px solid rgba(200, 147, 91, 0.55)',
              borderRadius: '26px',
              padding: '42px 28px 34px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 24px 50px -12px rgba(178, 124, 68, 0.25), 0 0 0 1px rgba(200, 147, 91, 0.2)'
            }}
          >
            {/* Pill Badge */}
            <div style={{ 
              position: 'absolute', 
              top: '-15px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              background: 'linear-gradient(135deg, #b27c44 0%, #8a274d 100%)', 
              color: '#ffffff', 
              fontSize: '11px', 
              fontWeight: 800, 
              padding: '6px 20px', 
              borderRadius: '999px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.08em', 
              boxShadow: '0 6px 18px rgba(178, 124, 68, 0.4)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              whiteSpace: 'nowrap' 
            }}>
              <Award size={14} color="#ffd4a8" /> EXPERIÊNCIA EXCLUSIVA
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tl-gold-500)', background: 'rgba(178, 124, 68, 0.12)', padding: '4px 10px', borderRadius: '6px' }}>
                  Assessoria Humana VIP
                </span>
                <span style={{ fontSize: '12px', color: 'var(--tl-gold-500)', fontWeight: 800 }}>★ Atendimento 1 a 1</span>
              </div>

              <strong style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--tl-gold-500)', display: 'block', marginTop: '6px' }}>
                Concierge VIP
              </strong>

              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--tl-gold-500)', margin: '12px 0 6px 0', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}>
                R$ 789 <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>/ mês</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.5 }}>
                Curadoria humana individual e personalizada conduzida por um Matchmaker profissional dedicado à sua rotina.
              </p>

              <div style={{ borderTop: '1px solid rgba(178, 124, 68, 0.25)', paddingTop: '22px', marginBottom: '28px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--tl-gold-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
                  11 Benefícios Exclusivos VIP:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4, fontWeight: 700, color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={16} color="var(--tl-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Todos os benefícios do Plano Plus com acesso irrestrito</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4, fontWeight: 700, color: 'var(--tl-gold-500)' }}>
                    <CheckCircle2 size={16} color="var(--tl-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Matchmaker profissional dedicado conduzindo sua busca</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Entrevista individual profunda de alinhamento e expectativas</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Curadoria manual rigorosa de pretendentes antes de apresentar</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Agendamento de encontros em restaurantes parceiros nobres</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Consultoria de imagem pessoal e perfil conduzida por experts</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Blindagem absoluta de privacidade (perfil oculto da busca pública)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Apresentação executiva com dossiê de compatibilidade</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Feedback estruturado pós-encontro com o seu Matchmaker</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Acesso a eventos secretos e jantares de alto padrão 35+</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.4 }}>
                    <CheckCircle2 size={16} color="var(--tl-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Linha direta e suporte via WhatsApp 7 dias por semana</span>
                  </li>
                </ul>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenApp}
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '16px',
                fontWeight: 800,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #c8935b 0%, #8a274d 100%)',
                border: 'none',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(178, 124, 68, 0.45)',
                transition: 'all 0.2s ease'
              }}
            >
              <Award size={18} color="#ffd4a8" />
              <span>Solicitar Curadoria VIP (R$ 789)</span>
            </motion.button>
          </motion.div>

        </div>
      </section>

      {/* 5.5 MANIFESTO EDITORIAL: "OK, MAS... POR QUE O TRUE LOVE?" (BENCHMARKING TINDER REDESIGN 2026) */}
      <section style={{
        background: 'linear-gradient(150deg, #420d1a 0%, #2e0812 100%)',
        color: '#ffffff',
        padding: '90px 24px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        {/* Subtle Ambient Radial Glow */}
        <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(225, 29, 72, 0.25) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '56px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
          
          {/* Left Column: Manifesto Editorial Copy */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(34px, 4.4vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: '#ffffff',
              margin: '0 0 28px 0',
              letterSpacing: '-0.02em'
            }}>
              Ok, mas... <span style={{ fontStyle: 'italic', color: '#ffb3c1' }}>por que o True Love?</span>
            </h2>

            <p style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.88)',
              lineHeight: 1.7,
              marginBottom: '20px'
            }}>
              Com recursos como <strong>Double Date 35+</strong>, <strong>Modo Música &amp; Cultura</strong>, <strong>Modo Astrologia &amp; Sintonia de Alma</strong>, <strong>Auditoria Documental por IA</strong> e <strong>Verificação Biométrica Facial</strong>, o True Love é a primeira plataforma no Brasil criada exclusivamente para quem já passou dos 35 e busca relacionamentos intencionais, maduros e seguros.
            </p>

            <p style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.88)',
              lineHeight: 1.7,
              marginBottom: '20px'
            }}>
              Por trás de cada perfil aprovado, tem uma pessoa de verdade, com história, conquistas e propósitos claros. Esse sempre foi o nosso objetivo: criar um ambiente onde você conhece pessoas que talvez nunca conheceria na correria diária — alguém para viajar junto, compartilhar jantares memoráveis e um amor que cresce com maturidade e vira casamento.
            </p>

            <p style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.88)',
              lineHeight: 1.7,
              marginBottom: '32px'
            }}>
              Crie seu perfil em 3 minutos, defina suas preferências e comece a descobrir. Curta alguém e, se a pessoa curtir você de volta, deu match. A partir daí, é com vocês: troquem mensagens no chat com reciprocidade garantida, agendem um café ou convidem amigos para um Encontro a Quatro.
            </p>

            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#fca5a5' }}>
                Baixe o app do True Love grátis para iOS e Android — ou use pelo navegador.
              </span>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button 
                className="btn-gold" 
                onClick={onOpenApp}
                style={{ padding: '14px 28px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Smartphone size={18} /> Conheça nosso App
              </button>
            </div>
          </div>

          {/* Right Column: Floating Dark Smartphone Mockup (Directly from Screenshot 10) */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div
              whileHover={{ y: -8, rotate: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '320px',
                background: '#090d16',
                borderRadius: '44px',
                border: '6px solid #2d3748',
                boxShadow: '0 30px 70px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.15)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Dynamic Island / Notch */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 6px 0' }}>
                <div style={{ width: '88px', height: '18px', background: '#000000', borderRadius: '20px' }} />
              </div>

              {/* App Header */}
              <div style={{ padding: '6px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', gap: '10px', fontSize: '11px', fontWeight: 700 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Para você</span>
                  <span style={{ color: '#ff8a9e', borderBottom: '2px solid #ff8a9e', paddingBottom: '2px' }}>Double Date</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>Astrologia</span>
                </div>
                <Sparkles size={14} color="#ffd4a8" />
              </div>

              {/* Profile Card Inside Phone */}
              <div style={{ padding: '14px', height: '410px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ position: 'relative', height: '270px', borderRadius: '18px', overflow: 'hidden' }}>
                  <img 
                    src="/images/hero_couple_mature.jpg" 
                    alt="Casal Maduro em Encontro" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,13,22,0.92) 0%, transparent 60%)' }} />
                  
                  {/* Verified & Double Date Pill */}
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(66, 13, 26, 0.9)', backdropFilter: 'blur(6px)', padding: '3px 9px', borderRadius: '999px', fontSize: '10px', color: '#ffb3c1', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users2 size={12} /> Double Date Ativo
                  </div>

                  <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Helena 42 &amp; Carlos 46
                      <ShieldCheck size={16} color="#38bdf8" />
                    </div>
                    <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '2px' }}>
                      Médica &amp; Arquiteto · Curitiba
                    </div>
                  </div>
                </div>

                {/* Tags & Icebreaker */}
                <div>
                  <div style={{ display: 'flex', gap: '6px', margin: '8px 0', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.12)', color: '#e2e8f0', padding: '2px 8px', borderRadius: '999px' }}>🍷 Vinhos &amp; Boa Mesa</span>
                    <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.12)', color: '#e2e8f0', padding: '2px 8px', borderRadius: '999px' }}>🎵 MPB &amp; Jazz</span>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '8px 12px', fontSize: '11px', color: '#ffd4a8', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>💬 Puxe assunto: "Qual a sua vinícola preferida?"</span>
                  </div>
                </div>

                {/* Bottom App Actions (Tinder Buttons) */}
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: '8px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#f59e0b', display: 'grid', placeItems: 'center' }}>
                    <RotateCcw size={15} />
                  </div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', display: 'grid', placeItems: 'center' }}>
                    <X size={20} />
                  </div>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', display: 'grid', placeItems: 'center' }}>
                    <Star size={16} fill="#38bdf8" />
                  </div>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #fd267a, #ff6036)', color: '#ffffff', display: 'grid', placeItems: 'center', boxShadow: '0 4px 12px rgba(253, 38, 122, 0.4)' }}>
                    <Heart size={20} fill="#ffffff" />
                  </div>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', display: 'grid', placeItems: 'center' }}>
                    <Zap size={16} fill="#a855f7" />
                  </div>
                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* 6. FAQ (PERGUNTAS FREQUENTES) */}
      <section style={{ padding: '40px 24px 80px', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>
            Perguntas Frequentes
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="card-box" 
                style={{ padding: '18px 22px', cursor: 'pointer' }}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{faq.q}</strong>
                  <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', color: 'var(--text-muted)' }} />
                </div>
                {isOpen && (
                  <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6, margin: '12px 0 0 0' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. RODAPÉ MONUMENTAL EDITORIAL (BENCHMARKING TINDER REDESIGN 2026) */}
      <footer style={{
        background: 'linear-gradient(180deg, #380a13 0%, #1a0308 100%)',
        color: '#ffffff',
        padding: '80px 24px 20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          {/* 6-Column Navigation Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '36px',
            marginBottom: '60px'
          }}>
            {/* Col 1: Institutional & Language */}
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <img src="/favicon.svg" alt="True Love Logo" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>© 2026 True Love Tecnologia Ltda.</span>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.6, maxWidth: '380px', marginBottom: '20px' }}>
                O True Love é onde pessoas maduras se conectam de verdade, com segurança, intenção clara e maturidade emocional. Exclusivo para solteiros a partir de 35 anos. Recursos como Double Date 35+, Modo Música, Astrologia e Verificação Documental por IA foram criados para unir casais reais no Brasil.
              </p>
              
              {/* Language Pill Selector */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '7px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
                <span>🌐</span>
                <span>português (Brasil)</span>
              </div>
            </div>

            {/* Col 2: Jurídico & LGPD */}
            <div>
              <strong style={{ fontSize: '14px', color: '#fff', display: 'block', marginBottom: '16px' }}>Jurídico</strong>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                <li style={{ cursor: 'pointer' }}>Privacidade</li>
                <li style={{ cursor: 'pointer' }}>Política de Proteção de Dados (LGPD)</li>
                <li style={{ cursor: 'pointer' }}>Termos de Uso</li>
                <li style={{ cursor: 'pointer' }}>Política de Cookies</li>
                <li style={{ cursor: 'pointer' }}>Regras da Comunidade</li>
                <li style={{ cursor: 'pointer' }}>Declaração de Acessibilidade</li>
                <li style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Suas opções de privacidade</span>
                  <span style={{ background: '#22c55e', color: '#fff', fontSize: '10px', padding: '1px 5px', borderRadius: '4px' }}>✓</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Empresa & Recursos */}
            <div>
              <strong style={{ fontSize: '14px', color: '#fff', display: 'block', marginBottom: '16px' }}>Empresa</strong>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                <li style={{ cursor: 'pointer' }}>Perguntas Frequentes</li>
                <li style={{ cursor: 'pointer' }}>Double Date 35+</li>
                <li style={{ cursor: 'pointer' }}>Modo Música</li>
                <li style={{ cursor: 'pointer' }}>Modo Astrologia</li>
                <li style={{ cursor: 'pointer' }}>Histórias de Sucesso</li>
                <li style={{ cursor: 'pointer' }}>Assessoria de Imprensa</li>
                <li style={{ cursor: 'pointer' }}>Contato &amp; Suporte</li>
              </ul>
            </div>

            {/* Col 4: Ecossistema & Gestão */}
            <div>
              <strong style={{ fontSize: '14px', color: '#fff', display: 'block', marginBottom: '16px' }}>Ecossistema</strong>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
                
                <li style={{ cursor: 'pointer' }} onClick={onOpenApp}>App Web / PWA</li>
                <li style={{ cursor: 'pointer' }}>Central Master</li>
                <li style={{ cursor: 'pointer' }}>APIs de Conexão</li>
                <li style={{ cursor: 'pointer' }}>Motor de Automações</li>
              </ul>
            </div>

            {/* Col 5: Baixe o Aplicativo */}
            <div>
              <strong style={{ fontSize: '14px', color: '#fff', display: 'block', marginBottom: '16px' }}>Baixe o aplicativo!</strong>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>
                <li style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '10px' }} onClick={onOpenApp}>
                  <Smartphone size={16} /> App Store (iOS)
                </li>
                <li style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '8px 14px', borderRadius: '10px' }} onClick={onOpenApp}>
                  <Smartphone size={16} /> Google Play (Android)
                </li>
              </ul>
            </div>
          </div>

          {/* MONUMENTAL TYPOGRAPHIC WATERMARK (Directly from Tinder Redesign Screenshot 1) */}
          <div style={{
            width: '100%',
            overflow: 'hidden',
            textAlign: 'center',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <h1 style={{
              fontSize: 'clamp(58px, 15vw, 185px)',
              fontWeight: 900,
              lineHeight: 0.82,
              color: '#ff334b',
              textTransform: 'uppercase',
              letterSpacing: '-0.04em',
              margin: '0 auto',
              padding: 0,
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              userSelect: 'none',
              pointerEvents: 'none',
              opacity: 0.95
            }}>
              TRUE LOVE
            </h1>
          </div>

        </div>
      </footer>

    </div>
  );
};
