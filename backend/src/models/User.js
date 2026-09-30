import bcrypt from 'bcryptjs';

// Pre-seeded admin users for instant test & deployment
export const memoryUsers = [
  {
    id: 'usr_superadmin',
    name: 'Super Administrador Master',
    email: 'admin@truelove.com.br',
    passwordHash: bcrypt.hashSync('MasterRoot2026!', 8),
    role: 'superadmin',
    permissions: ['all', 'manage_keys', 'manage_team', 'view_vps', 'view_crm', 'manage_agents']
  },
  {
    id: 'usr_dono',
    name: 'Dono da Operação (CEO)',
    email: 'dono@truelove.com.br',
    passwordHash: bcrypt.hashSync('DonoVIP2026!', 8),
    role: 'dono',
    permissions: ['view_crm', 'manage_leads', 'approve_kyc', 'view_finance', 'manage_agents']
  },
  {
    id: 'usr_concierge',
    name: 'Lorenzo Matchmaker',
    email: 'concierge@truelove.com.br',
    passwordHash: bcrypt.hashSync('Concierge2026!', 8),
    role: 'concierge',
    permissions: ['view_crm', 'manage_vip_introductions', 'chat_moderation']
  }
];

export const findUserByEmail = (email) => {
  return memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id) => {
  return memoryUsers.find(u => u.id === id);
};

export const verifyPassword = (plainPassword, hash) => {
  return bcrypt.compareSync(plainPassword, hash);
};
