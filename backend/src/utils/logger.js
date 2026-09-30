export const logger = {
  info: (msg, meta = {}) => {
    console.log(`[${new Date().toISOString()}] [INFO] ${msg}`, Object.keys(meta).length ? JSON.stringify(meta) : '');
  },
  warn: (msg, meta = {}) => {
    console.warn(`[${new Date().toISOString()}] [WARN] ⚠️ ${msg}`, Object.keys(meta).length ? JSON.stringify(meta) : '');
  },
  error: (msg, meta = {}) => {
    console.error(`[${new Date().toISOString()}] [ERROR] ❌ ${msg}`, Object.keys(meta).length ? JSON.stringify(meta) : '');
  },
  agent: (agentName, action, result = {}) => {
    console.log(`[${new Date().toISOString()}] [AGENT: ${agentName}] 🤖 ${action}`, JSON.stringify(result));
  }
};
