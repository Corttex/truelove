# True Love APP Oficial — Plataforma Completa

> Plataforma completa de relacionamentos intencionais para o público 35+ no Brasil.
> Integrando **Painel do Dono (CRM, Funil & Financeiro)**, **Site Institucional**, **Admin MASTER** e **App iOS / Apple**.

---

## 🏗️ Estrutura do Ecossistema

- **1. Painel do Dono (Centro de Comando de Negócio):**
  - **Agentes de IA & Meta (WhatsApp/Instagram):** Motor autônomo com 5 agentes inteligentes (Sofia, Arthur, Eros, Clara, Lorenzo) e integração via Webhooks oficiais da Meta com simulador live de triagem.
  - **CRM 360° & Filtros de Clientes:** Segmentação por idade, cidade, status documental, anotações internas privadas e tags operacionais.
  - **Automação do Funil:** Kanban visual em 7 etapas com réguas de gatilho automáticas via Push, WhatsApp ou E-mail.
  - **Gestor de Cadastros (KYC 35+):** Fila de auditoria de identidade e aprovação de selo verificado.
  - **Cockpit Financeiro:** Métricas de MRR, ARR, LTV médio, Churn e histórico de transações.
  - **Densidade de Matching:** Monitoramento de proporção homem/mulher por capital para evitar "salão vazio".

- **2. Site Institucional:**
  - Landing page editorial de alta conversão, apresentação dos planos Free, Plus e Concierge VIP, garantias de privacidade e segurança.

- **3. Admin MASTER:**
  - Governança geral de equipe com matriz de papéis (RBAC), fila de moderação de denúncias, calibração dos pesos do algoritmo e logs de auditoria LGPD.

- **4. App iOS (Apple):**
  - Simulador realista do iPhone 16 Pro com Apple Human Interface Guidelines, Dynamic Island, Apple Tab Bar, cards imersivos de afinidade explicável e chat seguro.
  - Compatível com PWA e exportação nativa iOS via Capacitor.

---

## 🚀 Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (porta 3000)
npm run dev

# Compilar para produção
npm run build
```

Abra no navegador: `http://localhost:3000/`

---

## 📱 Exportação para App Nativo iOS (Xcode / Apple TestFlight)

O projeto possui configuração do Capacitor pronta (`capacitor.config.json`):

```bash
# 1. Gerar o build web
npm run build

# 2. Adicionar a plataforma iOS (necessário macOS com Xcode instalado)
npx cap add ios

# 3. Sincronizar os assets
npx cap sync ios

# 4. Abrir no Xcode para envio à App Store
npx cap open ios
```

---

## 🗄️ Banco de Dados de Produção
 
O script SQL com o esquema relacional completo para PostgreSQL / Supabase está localizado em:
`database/schema.sql`.

---

## 🐳 Deploy Automatizado na VPS (Docker 1-Clique)

O ecossistema está 100% containerizado com Docker Compose:
- **`truelove_postgres`**: Banco relacional PostgreSQL 16
- **`truelove_agent_engine`**: Motor de IA com Webhooks Meta (porta 4000)
- **`truelove_web`**: Frontend Web / PWA Nginx com proxy reverso (porta 80/443)

Para rodar em qualquer VPS Linux:
```bash
# Executar script automático de deploy
bash deploy/vps-deploy.sh
```
Consulte o guia completo em [`deploy/vps-setup.md`](file:///c:/Users/Corttex/Desktop/@truelove/deploy/vps-setup.md).
