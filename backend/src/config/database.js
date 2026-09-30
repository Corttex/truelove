import pg from 'pg';
import { ENV } from './env.js';

let pool = null;

if (ENV.DATABASE_URL) {
  try {
    pool = new pg.Pool({
      connectionString: ENV.DATABASE_URL,
      connectionTimeoutMillis: 5000,
      max: 20,
      idleTimeoutMillis: 30000
    });

    pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.warn('⚠️ [Postgres] Conexão com banco relacional falhou. Operando em modo de resiliência in-memory:', err.message);
      } else {
        console.log('✅ [Postgres] Pool conectado ao PostgreSQL com sucesso em:', res.rows[0].now);
      }
    });
  } catch (e) {
    console.warn('⚠️ [Postgres] Erro ao instanciar pool:', e.message);
  }
} else {
  console.log('ℹ️ [Postgres] DATABASE_URL não configurada. Usando Data Layer in-memory.');
}

export const getDb = () => pool;
export default pool;
