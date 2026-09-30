#!/usr/bin/env bash
# ==============================================================================
# True Love - Script de Instalação e Deploy Automático em VPS
# Compatível com Ubuntu 22.04 / 24.04 LTS e Debian 12
# ==============================================================================

set -e

echo "=================================================================="
echo "❤️ True Love - Iniciando Deploy do Motor de Agentes e Plataforma"
echo "=================================================================="

# 1. Atualização do Sistema
echo "📦 [1/5] Atualizando pacotes do sistema..."
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y curl git ufw fail2ban

# 2. Instalação do Docker se não existir
if ! command -v docker &> /dev/null; then
    echo "🐳 [2/5] Docker não encontrado. Instalando Docker oficial..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    sudo systemctl enable docker
    sudo systemctl start docker
    rm get-docker.sh
else
    echo "✅ [2/5] Docker já instalado."
fi

# 3. Verificação do docker compose
if ! docker compose version &> /dev/null; then
    echo "📦 Instalando docker-compose-plugin..."
    sudo apt-get install -y docker-compose-plugin
fi

# 4. Criando arquivo .env padrão se não existir
if [ ! -f .env ]; then
    echo "⚙️ [3/5] Gerando arquivo .env padrão..."
    cat <<EOT >> .env
POSTGRES_USER=truelove_admin
POSTGRES_PASSWORD=SecurePassword$(openssl rand -hex 6)!
POSTGRES_DB=truelove_prod
META_VERIFY_TOKEN=truelove_meta_token_secure_$(openssl rand -hex 4)
META_ACCESS_TOKEN=
PORT=4000
EOT
    echo "⚠️ Arquivo .env gerado. Personalize suas chaves se desejar!"
fi

# 5. Build e Inicialização dos Contêineres
echo "🚀 [4/5] Construindo imagens e iniciando contêineres Docker..."
docker compose down || true
docker compose up -d --build

# 6. Status Final
echo "=================================================================="
echo "🎉 [5/5] Deploy concluído com sucesso!"
echo "=================================================================="
docker compose ps
echo ""
echo "📡 Webhook Meta ativo em: http://SEU_IP:4000/v1/meta/webhook"
echo "🌐 Plataforma Web ativa em: http://SEU_IP:80"
echo "Para visualizar os logs dos Agentes em tempo real: docker compose logs -f agent_engine"
