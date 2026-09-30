import React, { useState } from 'react';
import { 
  Server, Terminal, Copy, Check, Play, Globe, Shield, 
  Code, RefreshCw, Layers, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  category: 'Meta & Webhooks' | 'Agentes de IA' | 'CRM & Leads' | 'Afinidade & Match';
  summary: string;
  description: string;
  headers: Record<string, string>;
  requestBody?: any;
  responseSample: any;
}

const ENDPOINTS: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/v1/meta/webhook',
    category: 'Meta & Webhooks',
    summary: 'Validação e Handshake de Segurança da Meta',
    description: 'Endpoint obrigatório chamado pelos servidores da Meta (Facebook/WhatsApp) para confirmar a autenticidade do token de verificação (hub.challenge).',
    headers: { 'Accept': 'text/plain' },
    responseSample: '1158201444'
  },
  {
    method: 'POST',
    path: '/v1/meta/webhook',
    category: 'Meta & Webhooks',
    summary: 'Recebimento de Mensagens Inbound (WhatsApp & Instagram)',
    description: 'Recebe as mensagens digitadas por novos leads e usuários. Encaminha para a Agente Sofia para triagem automática 35+ e resposta.',
    headers: { 'Content-Type': 'application/json' },
    requestBody: {
      object: 'whatsapp_business_account',
      entry: [{
        changes: [{
          value: {
            messaging_product: 'whatsapp',
            contacts: [{ profile: { name: 'Antônio Prado' } }],
            messages: [{ from: '5541988221100', text: { body: 'Tenho 67 anos, moro em Goiânia e busco relacionamento sério.' } }]
          }
        }]
      }]
    },
    responseSample: { status: 'EVENT_RECEIVED' }
  },
  {
    method: 'GET',
    path: '/api/health',
    category: 'Agentes de IA',
    summary: 'Status do Motor de Agentes e Saúde da VPS',
    description: 'Retorna a saúde geral dos 5 agentes de IA, tempo de atividade (uptime), status da conexão com PostgreSQL e volumetria.',
    headers: { 'Accept': 'application/json' },
    responseSample: {
      status: 'online',
      system: 'True Love AI Agent & Automation Engine',
      uptimeSeconds: 84920,
      databaseStatus: 'connected',
      agentsCount: 5,
      inboundProcessed: 847,
      leadsGenerated: 312
    }
  },
  {
    method: 'POST',
    path: '/api/leads/simulate',
    category: 'CRM & Leads',
    summary: 'Injeção e Teste de Lead Inbound',
    description: 'Permite simular mensagens recebidas para avaliar a acurácia semântica e a classificação automática no funil.',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer tl_live_sec_2026' },
    requestBody: {
      channel: 'whatsapp',
      senderName: 'Clara Meireles',
      senderIdentifier: '+55 11 99876-5432',
      rawText: 'Olá! Sou advogada, 48 anos, divorciada em SP. Quero saber se tem homens com nível cultural bacana.'
    },
    responseSample: {
      success: true,
      analysis: {
        isQualified35Plus: true,
        detectedAge: 48,
        detectedCity: 'São Paulo (SP)',
        detectedGoal: 'Relacionamento sério e duradouro',
        sentimentScore: 0.95,
        targetFunnelStage: 'phone_validated'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/matching/calculate',
    category: 'Afinidade & Match',
    summary: 'Cálculo de Afinidade Ponderada Jaccard',
    description: 'Cruza dois perfis 35+ com base em localização, valores morais, estilo de vida e metas de relacionamento.',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer tl_live_sec_2026' },
    requestBody: {
      profileIdA: 'usr-1',
      profileIdB: 'usr-4',
      weights: { city: 25, interests: 30, values: 30, lifestyle: 15 }
    },
    responseSample: {
      affinityScore: 91,
      isReciprocalQualified: true,
      commonValues: ['Família em 1º Lugar', 'Espiritualidade', 'Estabilidade'],
      explanation: 'Alta sintonia em valores familiares e estilo de vida tranquilo na mesma cidade.'
    }
  }
];

export const ApiHub: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(ENDPOINTS[1]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [liveResponse, setLiveResponse] = useState<any>(null);
  const [activeCodeLang, setActiveCodeLang] = useState<'curl' | 'js' | 'python'>('curl');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setLiveResponse(null);
    setTimeout(() => {
      setIsExecuting(false);
      setLiveResponse({
        timestamp: new Date().toISOString(),
        httpStatus: 200,
        statusText: 'OK',
        durationMs: Math.floor(Math.random() * 25 + 18),
        data: selectedEndpoint.responseSample
      });
    }, 450);
  };

  const renderSnippet = () => {
    const baseUrl = 'https://api.truelove.com.br';
    if (activeCodeLang === 'curl') {
      return `curl -X ${selectedEndpoint.method} "${baseUrl}${selectedEndpoint.path}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer tl_live_sec_2026"${selectedEndpoint.requestBody ? ` \\\n  -d '${JSON.stringify(selectedEndpoint.requestBody, null, 2)}'` : ''}`;
    } else if (activeCodeLang === 'js') {
      return `const response = await fetch("${baseUrl}${selectedEndpoint.path}", {
  method: "${selectedEndpoint.method}",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer tl_live_sec_2026"
  }${selectedEndpoint.requestBody ? `,\n  body: JSON.stringify(${JSON.stringify(selectedEndpoint.requestBody, null, 2)})` : ''}
});
const data = await response.json();
console.log(data);`;
    } else {
      return `import requests

url = "${baseUrl}${selectedEndpoint.path}"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer tl_live_sec_2026"
}
${selectedEndpoint.requestBody ? `payload = ${JSON.stringify(selectedEndpoint.requestBody, null, 4)}
response = requests.${selectedEndpoint.method.toLowerCase()}(url, json=payload, headers=headers)` : `response = requests.${selectedEndpoint.method.toLowerCase()}(url, headers=headers)`}

print(response.json())`;
    }
  };

  return (
    <div style={{ padding: '44px 32px 64px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ color: 'var(--tl-forest-500)', background: 'rgba(20, 83, 79, 0.1)', padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Portal do Desenvolvedor & Gateway
          </span>
          <span style={{ fontSize: '12px', color: 'var(--status-success)', fontWeight: 600 }}>
            ● Gateway Online (api.truelove.com.br)
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>
          Central de APIs de Conexão & Webhooks
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '6px' }}>
          Documentação viva e interativa para conectar a Meta (WhatsApp / Instagram), bots externos, n8n e CRM.
        </p>
      </div>

      {/* Grid Layout: Endpoints Sidebar + Endpoint Tester */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Endpoints Sidebar */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <strong style={{ fontSize: '13px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Endpoints Disponíveis ({ENDPOINTS.length})
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>v1 / REST</span>
          </div>

          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {ENDPOINTS.map((ep, idx) => {
              const isSelected = selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedEndpoint(ep);
                    setLiveResponse(null);
                  }}
                  style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid var(--border-color)',
                    background: isSelected ? 'rgba(197, 99, 109, 0.08)' : 'transparent',
                    borderLeft: isSelected ? '4px solid var(--tl-rose-500)' : '4px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: ep.method === 'GET' ? '#0284c7' : '#16a34a',
                      color: '#ffffff'
                    }}>
                      {ep.method}
                    </span>
                    <code style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                      {ep.path}
                    </code>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {ep.summary}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Endpoint Tester & Playground */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Main Card */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px' }}>
            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: selectedEndpoint.method === 'GET' ? '#0284c7' : '#16a34a',
                  color: '#ffffff'
                }}>
                  {selectedEndpoint.method}
                </span>
                <code style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  https://api.truelove.com.br{selectedEndpoint.path}
                </code>
              </div>

              <motion.button
                onClick={handleExecute}
                disabled={isExecuting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'var(--tl-rose-500)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: isExecuting ? 'not-allowed' : 'pointer'
                }}
              >
                {isExecuting ? <RefreshCw size={14} className="spin" /> : <Play size={14} fill="#fff" />}
                <span>{isExecuting ? 'Testando...' : 'Testar Requisição'}</span>
              </motion.button>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, margin: '0 0 20px 0' }}>
              {selectedEndpoint.description}
            </p>

            {/* Request Body (if any) */}
            {selectedEndpoint.requestBody && (
              <div style={{ marginBottom: '20px' }}>
                <strong style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
                  Corpo da Requisição (Payload JSON):
                </strong>
                <pre style={{
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '14px',
                  fontSize: '12px',
                  color: 'var(--text-primary)',
                  overflowX: 'auto',
                  margin: 0
                }}>
                  {JSON.stringify(selectedEndpoint.requestBody, null, 2)}
                </pre>
              </div>
            )}

            {/* Code Snippets (cURL, JS, Python) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {(['curl', 'js', 'python'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setActiveCodeLang(lang)}
                      style={{
                        background: activeCodeLang === lang ? 'var(--tl-rose-500)' : 'var(--bg-primary)',
                        color: activeCodeLang === lang ? '#fff' : 'var(--text-muted)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleCopy(renderSnippet(), 'snippet')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {copiedKey === 'snippet' ? <Check size={13} color="var(--status-success)" /> : <Copy size={13} />}
                  <span>{copiedKey === 'snippet' ? 'Copiado!' : 'Copiar Código'}</span>
                </button>
              </div>

              <pre style={{
                background: '#090d16',
                color: '#38bdf8',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '12px',
                overflowX: 'auto',
                margin: 0,
                fontFamily: 'monospace',
                lineHeight: 1.45
              }}>
                {renderSnippet()}
              </pre>
            </div>
          </div>

          {/* Live Response Card */}
          {liveResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="var(--status-success)" />
                  <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                    Resposta Recebida da API
                  </strong>
                  <span style={{ fontSize: '11px', background: 'rgba(34, 197, 94, 0.15)', color: '#16a34a', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    HTTP {liveResponse.httpStatus} {liveResponse.statusText}
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Latência: <strong>{liveResponse.durationMs}ms</strong>
                </span>
              </div>

              <pre style={{
                background: '#090d16',
                color: '#86efac',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '12px',
                overflowX: 'auto',
                margin: 0,
                fontFamily: 'monospace'
              }}>
                {JSON.stringify(liveResponse.data, null, 2)}
              </pre>
            </motion.div>
          )}

        </div>
      </div>

    </div>
  );
};
