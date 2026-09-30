import { kycValidatorTool } from '../tools/kycValidator.js';
import { whatsappDispatcherTool } from '../tools/matchingEngine.js';
import { logger } from '../../utils/logger.js';

/**
 * Inbound Triage Flow (Conforme Imagem 2 - agent/workflows/task_flow.py)
 * Orquestra o fluxo completo de entrada de mensagens do WhatsApp e Instagram
 */
export const runInboundTriageFlow = async ({ fromPhone, senderName = 'Visitante', textMessage, channel = 'whatsapp' }) => {
  logger.info(`[Workflow: InboundTriageFlow] Iniciado para ${fromPhone} via ${channel}`);

  const lower = textMessage.toLowerCase();
  
  // 1. Extração heurística de idade
  const ageMatch = textMessage.match(/\b([3-8][0-9])\s*(anos|a)?\b/i);
  const declaredAge = ageMatch ? parseInt(ageMatch[1], 10) : 42;

  // 2. Extração de intenção
  let intention = 'relacionamento_serio';
  if (lower.includes('casamento') || lower.includes('casar')) intention = 'casamento';
  if (lower.includes('amizade') || lower.includes('companheirismo')) intention = 'companheirismo';

  // 3. Validação de Idade (Filtro 35+)
  const isEligible = declaredAge >= 35;

  let replyText = '';
  let leadStage = 'descartado_idade';

  if (!isEligible) {
    replyText = `Olá, ${senderName}. Agradecemos imensamente o seu contato! O True Love é um clube com foco exclusivo em pessoas a partir de 35 anos que buscam relacionamentos maduros e duradouros. Desejamos muito sucesso na sua caminhada! ✨`;
  } else {
    leadStage = 'triagem_concluida';
    replyText = `Olá, ${senderName}! Seja muito bem-vindo(a) ao True Love. Ficamos muito felizes em receber alguém com o seu perfil e momento de vida. Aqui, cada membro passa por verificação documental para garantir conversas verdadeiras e sem perda de tempo. Gostaria de enviar sua foto/CNH para ativarmos seu convite? 🌹`;
  }

  // 4. Executa envio da mensagem via ferramenta
  await whatsappDispatcherTool.execute({
    recipientPhone: fromPhone,
    textBody: replyText
  });

  // 5. Retorna o resultado estruturado
  const result = {
    phone: fromPhone,
    name: senderName,
    channel,
    declaredAge,
    isEligible,
    intention,
    leadStage,
    replyText,
    processedAt: new Date().toISOString()
  };

  logger.info(`[Workflow: InboundTriageFlow] Concluído com estágio [${leadStage}]`, { isEligible });
  return result;
};
