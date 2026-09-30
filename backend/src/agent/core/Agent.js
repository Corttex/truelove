import { logger } from '../../utils/logger.js';

/**
 * Base Agent Class (Conforme Referência da Imagem 2 - agent/core/agent.py)
 * Encapsula: Planejador (Planner), Memória (Memory) e Executor de Ações (Executor)
 */
export class AutonomousAgent {
  constructor({ id, name, roleType, model, tools = [], systemPrompt = '' }) {
    this.id = id;
    this.name = name;
    this.roleType = roleType;
    this.model = model;
    this.tools = tools;
    this.systemPrompt = systemPrompt;
    this.shortTermMemory = [];
  }

  remember(entry) {
    this.shortTermMemory.push({
      timestamp: new Date().toISOString(),
      ...entry
    });
    if (this.shortTermMemory.length > 50) {
      this.shortTermMemory.shift(); // FIFO buffer
    }
  }

  async plan(context) {
    logger.agent(this.name, 'Planejando ação para contexto:', { contextKeys: Object.keys(context) });
    return {
      goal: `Resolver solicitação para ${this.roleType}`,
      steps: ['extract_intent', 'validate_criteria', 'execute_tool', 'dispatch_response']
    };
  }

  async executeTool(toolName, params) {
    const tool = this.tools.find(t => t.name === toolName);
    if (!tool) {
      throw new Error(`Ferramenta ${toolName} não está disponível para o agente ${this.name}`);
    }
    logger.agent(this.name, `Executando ferramenta ${toolName}`, params);
    return await tool.execute(params);
  }
}
