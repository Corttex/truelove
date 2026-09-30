import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  REDIS_URL: process.env.REDIS_URL || 'redis://redis:6379',
  META_VERIFY_TOKEN: process.env.META_VERIFY_TOKEN || 'truelove_meta_token_secure_2026',
  META_ACCESS_TOKEN: process.env.META_ACCESS_TOKEN || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  JWT_SECRET: process.env.JWT_SECRET || 'truelove_jwt_access_secret_production_key_2026',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'truelove_jwt_refresh_secret_production_key_2026',
  JWT_KEY_VERSION: process.env.JWT_KEY_VERSION || 'v1',
  S3_ENDPOINT: process.env.S3_ENDPOINT || '',
  S3_BUCKET: process.env.S3_BUCKET || 'truelove-kyc-storage',
  LANGFUSE_HOST: process.env.LANGFUSE_HOST || 'http://langfuse:3000',
  LANGFUSE_PUBLIC_KEY: process.env.LANGFUSE_PUBLIC_KEY || '',
  LANGFUSE_SECRET_KEY: process.env.LANGFUSE_SECRET_KEY || ''
};
