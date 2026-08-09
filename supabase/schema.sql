-- PRAVYA Database Schema for PostgreSQL / Supabase
-- Medical Recovery Companion Database Schema with Row Level Security

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recovery Profiles
CREATE TABLE IF NOT EXISTS recovery_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  condition_name TEXT NOT NULL,
  recovery_goal TEXT,
  start_date DATE NOT NULL,
  follow_up_date DATE,
  provider_name TEXT,
  has_professional_plan BOOLEAN DEFAULT TRUE,
  current_stage TEXT DEFAULT 'Week 1 — In Progress',
  adherence_streak INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rehabilitation Plans
CREATE TABLE IF NOT EXISTS rehab_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  provider_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plan Activities
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID NOT NULL REFERENCES rehab_plans(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  instructions TEXT NOT NULL,
  duration_mins INT DEFAULT 10,
  sets INT DEFAULT 1,
  reps INT DEFAULT 1,
  frequency TEXT DEFAULT 'Daily',
  scheduled_days TEXT[] DEFAULT ARRAY['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  notes TEXT,
  video_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Session Tracking Records
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE SET NULL,
  activity_name TEXT NOT NULL,
  session_date DATE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_mins INT DEFAULT 10,
  status TEXT NOT NULL CHECK (status IN ('COMPLETED', 'NOT_COMPLETED', 'NOT_RECORDED')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily Safe Check-ins
CREATE TABLE IF NOT EXISTS daily_checkins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
  checkin_date DATE NOT NULL,
  difficulty INT CHECK (difficulty BETWEEN 1 AND 5),
  comfort INT CHECK (comfort BETWEEN 1 AND 5),
  energy INT CHECK (energy BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Milestones
CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  milestone_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('COMPLETED', 'UPCOMING', 'IN_PROGRESS')),
  description TEXT,
  type TEXT NOT NULL,
  target_sessions INT,
  recorded_sessions_at_milestone INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weekly Summaries
CREATE TABLE IF NOT EXISTS weekly_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_number INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  planned_sessions INT DEFAULT 0,
  recorded_sessions INT DEFAULT 0,
  active_days INT DEFAULT 0,
  milestones_reached INT DEFAULT 0,
  checkins_completed INT DEFAULT 0,
  next_milestone_target TEXT,
  story_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reminders
CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT TRUE,
  reminder_time TIME DEFAULT '10:00:00',
  frequency TEXT DEFAULT 'DAILY',
  custom_days TEXT[],
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ROW LEVEL SECURITY POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rehab_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- User Policies: Only access own data
CREATE POLICY "Users access own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users access own recovery profile" ON recovery_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own rehab plan" ON rehab_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access activities in own plan" ON activities FOR ALL USING (
  EXISTS (SELECT 1 FROM rehab_plans WHERE rehab_plans.id = activities.plan_id AND rehab_plans.user_id = auth.uid())
);
CREATE POLICY "Users access own sessions" ON sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own checkins" ON daily_checkins FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own milestones" ON milestones FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own weekly summaries" ON weekly_summaries FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own reminders" ON reminders FOR ALL USING (auth.uid() = user_id);
