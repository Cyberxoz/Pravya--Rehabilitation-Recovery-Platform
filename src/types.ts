export type SessionStatus = 'COMPLETED' | 'NOT_COMPLETED' | 'NOT_RECORDED';

export type RecoveryCategory =
  | 'Orthopedic'
  | 'Post-Surgery'
  | 'Neurological'
  | 'Physical Therapy'
  | 'Sports Injury'
  | 'Cardiac / Pulmonary'
  | 'Other';

export interface RecoveryProfile {
  id: string;
  userId: string;
  category: RecoveryCategory;
  conditionName: string;
  recoveryGoal: string;
  startDate: string; // YYYY-MM-DD
  followUpDate: string; // YYYY-MM-DD
  providerName: string;
  hasProfessionalPlan: boolean;
  currentStage: string; // e.g. "Week 2 — In Progress"
  adherenceStreak: number; // Days in a row with recorded adherence
}

export interface Activity {
  id: string;
  planId: string;
  name: string;
  instructions: string;
  durationMins: number;
  sets: number;
  reps: number;
  frequency: string; // e.g., "2x Daily", "3x / week"
  scheduledDays: string[]; // e.g., ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  notes?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface RehabPlan {
  id: string;
  userId: string;
  title: string;
  providerName: string;
  createdAt: string;
  updatedAt: string;
  activities: Activity[];
}

export interface SessionRecord {
  id: string;
  userId: string;
  activityId: string;
  activityName: string;
  date: string; // YYYY-MM-DD
  completedAt?: string;
  durationMins: number;
  status: SessionStatus;
  notes?: string;
}

export interface DailyCheckIn {
  id: string;
  userId: string;
  sessionId?: string;
  date: string; // YYYY-MM-DD
  difficulty: number; // 1 (Very Easy) - 5 (Very Intense)
  comfort: number; // 1 (Low Comfort) - 5 (Very Comfortable)
  energy: number; // 1 (Low) - 5 (High)
  notes?: string;
}

export interface Milestone {
  id: string;
  userId: string;
  title: string;
  date: string;
  status: 'COMPLETED' | 'UPCOMING' | 'IN_PROGRESS';
  description: string;
  type: 'FIRST_SESSION' | 'FIRST_WEEK' | 'CONSISTENCY' | 'PROVIDER_MILESTONE' | 'CUSTOM';
  targetSessions?: number;
  recordedSessionsAtMilestone?: number;
}

export interface WeeklySummary {
  id: string;
  userId: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  plannedSessions: number;
  recordedSessions: number;
  activeDays: number;
  milestonesReached: number;
  checkinsCompleted: number;
  nextMilestoneTarget: string;
  storyText: string;
}

export interface ReminderSetting {
  id: string;
  userId: string;
  enabled: boolean;
  time: string; // HH:MM
  frequency: 'DAILY' | 'WEEKDAYS' | 'CUSTOM';
  customDays?: string[];
}

export interface UserAuth {
  id: string;
  email: string;
  name?: string;
  isAuthenticated: boolean;
}
