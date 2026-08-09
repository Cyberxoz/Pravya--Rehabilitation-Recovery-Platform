import {
  RecoveryProfile,
  RehabPlan,
  SessionRecord,
  DailyCheckIn,
  Milestone,
  WeeklySummary,
  ReminderSetting,
  UserAuth,
  Activity,
  SessionStatus,
} from '../types';
import {
  mockUser,
  mockRecoveryProfile,
  mockRehabPlan,
  mockSessions,
  mockCheckIns,
  mockMilestones,
  mockWeeklySummaries,
  mockReminders,
} from './mockData';
import { supabase, isSupabaseConfigured } from './supabase';

const KEYS = {
  USER: 'pravya_user',
  PROFILE: 'pravya_recovery_profile',
  PLAN: 'pravya_rehab_plan',
  SESSIONS: 'pravya_sessions',
  CHECKINS: 'pravya_checkins',
  MILESTONES: 'pravya_milestones',
  SUMMARIES: 'pravya_weekly_summaries',
  REMINDERS: 'pravya_reminders',
};

// Local storage helpers
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing localStorage key "${key}":`, err);
  }
}

export const StorageService = {
  // Initialize default state if empty
  init() {
    if (!localStorage.getItem(KEYS.PROFILE)) {
      setItem(KEYS.USER, mockUser);
      setItem(KEYS.PROFILE, mockRecoveryProfile);
      setItem(KEYS.PLAN, mockRehabPlan);
      setItem(KEYS.SESSIONS, mockSessions);
      setItem(KEYS.CHECKINS, mockCheckIns);
      setItem(KEYS.MILESTONES, mockMilestones);
      setItem(KEYS.SUMMARIES, mockWeeklySummaries);
      setItem(KEYS.REMINDERS, mockReminders);
    }
  },

  // User Auth
  getUser(): UserAuth {
    return getItem(KEYS.USER, mockUser);
  },

  setUser(user: UserAuth): void {
    setItem(KEYS.USER, user);
  },

  // Recovery Profile
  getProfile(): RecoveryProfile {
    return getItem(KEYS.PROFILE, mockRecoveryProfile);
  },

  updateProfile(profile: Partial<RecoveryProfile>): RecoveryProfile {
    const current = this.getProfile();
    const updated = { ...current, ...profile };
    setItem(KEYS.PROFILE, updated);
    return updated;
  },

  // Rehabilitation Plan
  getPlan(): RehabPlan {
    return getItem(KEYS.PLAN, mockRehabPlan);
  },

  updatePlan(plan: RehabPlan): void {
    setItem(KEYS.PLAN, plan);
  },

  addActivityToPlan(activity: Omit<Activity, 'id' | 'planId'>): Activity {
    const plan = this.getPlan();
    const newAct: Activity = {
      ...activity,
      id: `act_${Date.now()}`,
      planId: plan.id,
    };
    plan.activities.push(newAct);
    plan.updatedAt = new Date().toISOString().split('T')[0];
    this.updatePlan(plan);
    return newAct;
  },

  updateActivityInPlan(activity: Activity): void {
    const plan = this.getPlan();
    const idx = plan.activities.findIndex((a) => a.id === activity.id);
    if (idx !== -1) {
      plan.activities[idx] = activity;
      plan.updatedAt = new Date().toISOString().split('T')[0];
      this.updatePlan(plan);
    }
  },

  deleteActivityFromPlan(activityId: string): void {
    const plan = this.getPlan();
    plan.activities = plan.activities.filter((a) => a.id !== activityId);
    plan.updatedAt = new Date().toISOString().split('T')[0];
    this.updatePlan(plan);
  },

  // Sessions
  getSessions(): SessionRecord[] {
    return getItem(KEYS.SESSIONS, mockSessions);
  },

  getTodaySessions(): SessionRecord[] {
    const today = new Date().toISOString().split('T')[0];
    const sessions = this.getSessions();
    const plan = this.getPlan();

    // Check if sessions for today already exist
    const todaySessions = sessions.filter((s) => s.date === today);
    if (todaySessions.length > 0) {
      return todaySessions;
    }

    // Auto-generate today's sessions from current plan activities
    const newTodaySessions: SessionRecord[] = plan.activities.map((act) => ({
      id: `sess_today_${act.id}_${Date.now()}`,
      userId: this.getUser().id,
      activityId: act.id,
      activityName: act.name,
      date: today,
      durationMins: act.durationMins,
      status: 'NOT_RECORDED',
    }));

    if (newTodaySessions.length > 0) {
      const allSessions = [...sessions, ...newTodaySessions];
      setItem(KEYS.SESSIONS, allSessions);
    }

    return newTodaySessions;
  },

  recordSessionStatus(
    sessionId: string,
    status: SessionStatus,
    notes?: string
  ): SessionRecord {
    const sessions = this.getSessions();
    const idx = sessions.findIndex((s) => s.id === sessionId);
    if (idx !== -1) {
      sessions[idx] = {
        ...sessions[idx],
        status,
        notes: notes || sessions[idx].notes,
        completedAt: status === 'COMPLETED' ? new Date().toISOString() : undefined,
      };
      setItem(KEYS.SESSIONS, sessions);

      // Recalculate streak
      this.recalculateStreak();

      return sessions[idx];
    }
    throw new Error('Session not found');
  },

  completeSession(sessionId: string, durationMins?: number, notes?: string): SessionRecord {
    if (durationMins) {
      const sessions = this.getSessions();
      const idx = sessions.findIndex((s) => s.id === sessionId);
      if (idx !== -1) {
        sessions[idx].durationMins = durationMins;
        setItem(KEYS.SESSIONS, sessions);
      }
    }
    return this.recordSessionStatus(sessionId, 'COMPLETED', notes);
  },

  // Check-ins
  getCheckIns(): DailyCheckIn[] {
    return getItem(KEYS.CHECKINS, mockCheckIns);
  },

  addCheckIn(checkIn: Omit<DailyCheckIn, 'id' | 'userId'>): DailyCheckIn {
    const checkIns = this.getCheckIns();
    const newCheckIn: DailyCheckIn = {
      ...checkIn,
      id: `chk_${Date.now()}`,
      userId: this.getUser().id,
    };
    checkIns.unshift(newCheckIn);
    setItem(KEYS.CHECKINS, checkIns);
    return newCheckIn;
  },

  // Milestones
  getMilestones(): Milestone[] {
    return getItem(KEYS.MILESTONES, mockMilestones);
  },

  addMilestone(milestone: Omit<Milestone, 'id' | 'userId'>): Milestone {
    const milestones = this.getMilestones();
    const newM: Milestone = {
      ...milestone,
      id: `m_${Date.now()}`,
      userId: this.getUser().id,
    };
    milestones.push(newM);
    setItem(KEYS.MILESTONES, milestones);
    return newM;
  },

  // Weekly Summaries
  getWeeklySummaries(): WeeklySummary[] {
    return getItem(KEYS.SUMMARIES, mockWeeklySummaries);
  },

  // Reminders
  getReminders(): ReminderSetting {
    return getItem(KEYS.REMINDERS, mockReminders);
  },

  updateReminders(settings: Partial<ReminderSetting>): ReminderSetting {
    const current = this.getReminders();
    const updated = { ...current, ...settings };
    setItem(KEYS.REMINDERS, updated);
    return updated;
  },

  // Recalculate Adherence Streak (strictly activity adherence)
  recalculateStreak() {
    const sessions = this.getSessions();
    // Group completed sessions by date
    const completedDates = new Set(
      sessions.filter((s) => s.status === 'COMPLETED').map((s) => s.date)
    );

    let streak = 0;
    const d = new Date();
    while (true) {
      const dateStr = d.toISOString().split('T')[0];
      if (completedDates.has(dateStr)) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        // Allow today to be uncompleted without breaking past streak
        const todayStr = new Date().toISOString().split('T')[0];
        if (dateStr === todayStr) {
          d.setDate(d.getDate() - 1);
          continue;
        }
        break;
      }
    }

    const profile = this.getProfile();
    profile.adherenceStreak = Math.max(streak, profile.adherenceStreak);
    setItem(KEYS.PROFILE, profile);
  },
};

// Initialize Storage on module import
StorageService.init();
