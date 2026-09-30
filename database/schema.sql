-- ==============================================================================
-- True Love APP Oficial — PostgreSQL / Supabase Production Schema
-- Conexões com contexto 35+, Segurança KYC, CRM do Dono e Automação de Funil
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('member', 'moderator', 'support', 'matchmaker', 'finance', 'super_admin');
CREATE TYPE user_tier AS ENUM ('FREE', 'PLUS', 'CONCIERGE');
CREATE TYPE funnel_stage AS ENUM ('lead_incomplete', 'pending_verification', 'active_unmatched', 'matched_inactive', 'in_conversation', 'active_paid', 'at_risk_churn');
CREATE TYPE doc_status AS ENUM ('not_sent', 'pending', 'verified', 'rejected');
CREATE TYPE report_status AS ENUM ('open', 'reviewing', 'resolved', 'dismissed');

-- 2. USERS & AUTH TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30),
    role user_role DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_sign_in_at TIMESTAMP WITH TIME ZONE,
    is_banned BOOLEAN DEFAULT FALSE
);

-- 3. PROFILES TABLE (35+ Demographics & Relationship Goals)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(120) NOT NULL,
    birth_date DATE NOT NULL,
    age INT GENERATED ALWAYS AS (DATE_PART('year', AGE(birth_date))) STORED,
    gender VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    profession VARCHAR(120),
    status_text VARCHAR(60), -- Solteiro(a), Divorciado(a), Viúvo(a)
    relationship_goal VARCHAR(80) DEFAULT 'Relacionamento sério',
    bio TEXT,
    interests TEXT[] DEFAULT '{}',
    values TEXT[] DEFAULT '{}',
    lifestyle TEXT[] DEFAULT '{}',
    children VARCHAR(80),
    photo_url TEXT,
    
    -- Verification & Status
    active BOOLEAN DEFAULT TRUE,
    verified BOOLEAN DEFAULT FALSE,
    age_assured BOOLEAN DEFAULT FALSE,
    min_age INT DEFAULT 35,
    max_age INT DEFAULT 75,
    onboarding_step INT DEFAULT 1,
    onboarding_complete BOOLEAN DEFAULT FALSE,
    consent_sensitive BOOLEAN DEFAULT FALSE,
    tier user_tier DEFAULT 'FREE',
    
    -- CRM Fields
    funnel_stage funnel_stage DEFAULT 'lead_incomplete',
    document_status doc_status DEFAULT 'not_sent',
    document_type VARCHAR(60),
    document_number_masked VARCHAR(60),
    owner_notes TEXT[] DEFAULT '{}',
    crm_tags TEXT[] DEFAULT '{}',
    lifetime_value NUMERIC(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Constraint: 35+ enforcement
ALTER TABLE profiles ADD CONSTRAINT check_mature_age CHECK (birth_date <= (CURRENT_DATE - INTERVAL '35 years'));

-- 4. INTERACTIONS (INTERESTS & MATCHES)
CREATE TABLE IF NOT EXISTS interests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    to_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(from_profile_id, to_profile_id)
);

CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_a UUID REFERENCES profiles(id) ON DELETE CASCADE,
    profile_b UUID REFERENCES profiles(id) ON DELETE CASCADE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_message_at TIMESTAMP WITH TIME ZONE
);

-- 5. CHAT MESSAGES
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    sender_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    text VARCHAR(1000) NOT NULL,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. FUNNEL AUTOMATIONS (CRM RULES)
CREATE TABLE IF NOT EXISTS funnel_automations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    stage_trigger funnel_stage NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    message_template TEXT NOT NULL,
    delay_hours INT DEFAULT 24,
    is_active BOOLEAN DEFAULT TRUE,
    execution_count INT DEFAULT 0,
    conversion_rate NUMERIC(5, 2) DEFAULT 0.00,
    last_run_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. FINANCIAL TRANSACTIONS & SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tier user_tier NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(40) NOT NULL, -- pix, credit_card, apple_pay
    status VARCHAR(30) DEFAULT 'paid',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. AUDIT LOGS (LGPD COMPLIANCE)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_name VARCHAR(120) NOT NULL,
    actor_role user_role NOT NULL,
    action VARCHAR(120) NOT NULL,
    target_resource VARCHAR(200) NOT NULL,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES for fast CRM querying and matching
CREATE INDEX IF NOT EXISTS idx_profiles_location ON profiles(city, state);
CREATE INDEX IF NOT EXISTS idx_profiles_age ON profiles(age);
CREATE INDEX IF NOT EXISTS idx_profiles_funnel ON profiles(funnel_stage);
CREATE INDEX IF NOT EXISTS idx_profiles_tier ON profiles(tier);
CREATE INDEX IF NOT EXISTS idx_matches_profiles ON matches(profile_a, profile_b);
CREATE INDEX IF NOT EXISTS idx_messages_match ON messages(match_id, created_at);
