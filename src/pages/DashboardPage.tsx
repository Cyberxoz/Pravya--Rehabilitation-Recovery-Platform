import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  CheckCircle2,
  CalendarCheck,
  MapPin,
  TrendingUp,
  Sparkles,
  Award,
  ArrowRight,
  ShieldAlert,
  Clock,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { SafetyBanner } from '../components/SafetyBanner';
import { StorageService } from '../lib/storage';
import { RecoveryProfile, SessionRecord, Milestone } from '../types';

interface DashboardPageProps {
  onStartSession: (session: SessionRecord) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onStartSession }) => {
  const [profile, setProfile] = useState<RecoveryProfile>(StorageService.getProfile());
  const [todaySessions, setTodaySessions] = useState<SessionRecord[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    setProfile(StorageService.getProfile());
    setTodaySessions(StorageService.getTodaySessions());
    setMilestones(StorageService.getMilestones());
  }, []);

  const completedTodayCount = todaySessions.filter((s) => s.status === 'COMPLETED').length;
  const totalTodayCount = todaySessions.length;

  const nextMilestone = milestones.find(
    (m) => m.status === 'IN_PROGRESS' || m.status === 'UPCOMING'
  );

  return (
    <div id="pravya-dashboard-page" className="space-y-6 pb-12">
      {/* Top Medical Safety Banner */}
      <SafetyBanner type="subtle" />

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Recovery Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            Your Recovery Journey
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {profile.conditionName} — {profile.providerName}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/journey"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-200 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 transition-colors"
          >
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>View Journey Map</span>
          </Link>
        </div>
      </div>

      {/* CORE FEATURE #1 METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Stage */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Current Stage</span>
            <Clock className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {profile.currentStage}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Plan start: {profile.startDate}
          </p>
        </div>

        {/* Today's Recovery */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Today's Recovery</span>
            <CalendarCheck className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {completedTodayCount} of {totalTodayCount} sessions recorded
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-600 h-full transition-all duration-300"
              style={{
                width: `${
                  totalTodayCount > 0 ? (completedTodayCount / totalTodayCount) * 100 : 0
                }%`,
              }}
            />
          </div>
        </div>

        {/* Next Milestone */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Next Milestone</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
            {nextMilestone?.title || 'Week 2 Completion Target'}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {nextMilestone?.description || '2 more planned sessions'}
          </p>
        </div>

        {/* Adherence Streak */}
        <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white p-5 rounded-2xl shadow-xs shadow-teal-600/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold opacity-90">
            <span>Adherence Streak</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-2xl font-extrabold tracking-tight">
            {profile.adherenceStreak} Days
          </p>
          <p className="text-[11px] opacity-80">
            Recorded routine activity (Adherence metric)
          </p>
        </div>
      </div>

      {/* TODAY'S PLANNED RECOVERY SESSIONS */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">
              Today's Planned Sessions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Exercises assigned in your professional plan
            </p>
          </div>
          <Link
            to="/today"
            className="text-xs font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400 flex items-center gap-1"
          >
            <span>View All Today</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {todaySessions.map((session) => {
            const isDone = session.status === 'COMPLETED';
            return (
              <div
                key={session.id}
                id={`dashboard-session-card-${session.id}`}
                className={`p-4 rounded-xl border transition-all ${
                  isDone
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/80'
                    : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/80 hover:border-teal-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    {session.activityName}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {session.status.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Duration: {session.durationMins} minutes
                </p>

                <button
                  id={`start-session-dashboard-btn-${session.id}`}
                  onClick={() => onStartSession(session)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    isDone
                      ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Re-record Session</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Session</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* USP QUICK HIGHLIGHTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What Changed? Preview */}
        <Link
          to="/what-changed"
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-400 transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 font-bold text-xs flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>CORE USP</span>
            </span>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>

          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              What Changed?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Factual week-over-week comparisons of recorded sessions, active days, and check-ins.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-teal-800 dark:text-teal-300 font-medium">
            "You recorded 2 more sessions this week compared to last week."
          </div>
        </Link>

        {/* Weekly Recovery Story Preview */}
        <Link
          to="/weekly"
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-teal-400 transition-all group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>WEEKLY STORY</span>
            </span>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>

          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Your Week in Recovery
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Visual magazine summary of your milestones, consistency, and adherence.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-700 dark:text-slate-300 italic">
            "Week 2 marked an impressive step forward in adherence..."
          </div>
        </Link>
      </div>

      {/* Safety Notice Footer */}
      <SafetyBanner type="warning" />
    </div>
  );
};
