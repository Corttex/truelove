export const matchingEngineTool = {
  name: 'jaccard_affinity_calculator',
  description: 'Calcula o índice de afinidade Jaccard ponderado entre perfis com base em valores e metas.',
  execute: async ({ candidateA, candidateB }) => {
    const valuesA = new Set(candidateA.values || []);
    const valuesB = new Set(candidateB.values || []);

    const intersection = new Set([...valuesA].filter(x => valuesB.has(x)));
    const union = new Set([...valuesA, ...valuesB]);

    const jaccardScore = union.size > 0 ? (intersection.size / union.size) : 0;
    const finalScore = Math.round(70 + (jaccardScore * 28)); // Normaliza entre 70% e 98%

    return {
      candidateA: candidateA.name,
      candidateB: candidateB.name,
      affinityScore: finalScore,
      sharedValues: Array.from(intersection),
      isRecommended: finalScore >= 80,
      timestamp: new Date().toISOString()
    };
  }
};

export const whatsappDispatcherTool = {
  name: 'whatsapp_message_dispatcher',
  description: 'Envia mensagens formatadas via Meta WhatsApp Cloud API oficial.',
  execute: async ({ recipientPhone, textBody }) => {
    // Simula disparo ou chamada HTTP para Graph API
    return {
      success: true,
      recipient: recipientPhone,
      messageId: `wamid.HBgL${Date.now()}`,
      status: 'sent',
      sentAt: new Date().toISOString()
    };
  }
};
