import React from 'react';
import { BarChart3, TrendingUp, Calendar, Activity, Heart, Shield } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from 'recharts';
import { SafetyBanner } from '../components/SafetyBanner';

export const ProgressPage: React.FC = () => {
  const adherenceTrendData = [
    { week: 'Week 1', Planned: 7, Recorded: 5, ActiveDays: 4 },
    { week: 'Week 2', Planned: 8, Recorded: 7, ActiveDays: 6 },
    { week: 'Week 3 (Target)', Planned: 8, Recorded: 8, ActiveDays: 6 },
  ];

  const checkInRatingsData = [
    { session: 'Sess 1', Difficulty: 4, Comfort: 2, Energy: 3 },
    { session: 'Sess 2', Difficulty: 3, Comfort: 3, Energy: 4 },
    { session: 'Sess 3', Difficulty: 3, Comfort: 4, Energy: 4 },
    { session: 'Sess 4', Difficulty: 2, Comfort: 4, Energy: 4 },
    { session: 'Sess 5', Difficulty: 2, Comfort: 5, Energy: 4 },
  ];

  return (
    <div id="pravya-progress-page" className="space-y-6 pb-12 max-w-5xl mx-auto">
      <SafetyBanner type="subtle" />

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
            <BarChart3 className="w-4 h-4 text-teal-600" />
            <span>Adherence Analytics</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Progress & Activity
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Visual tracking of routine session completion and self-reported comfort levels.
          </p>
        </div>

        <div className="bg-teal-50 dark:bg-teal-950 p-3 rounded-xl border border-teal-200 dark:border-teal-800 text-xs font-bold text-teal-800 dark:text-teal-300 shrink-0">
          Adherence Rate: 88%
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Planned vs Recorded Sessions Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Planned vs Recorded Sessions
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Activity Adherence</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adherenceTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="week" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Planned" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Recorded" fill="#0d9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Check-In Ratings Trend */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Check-In Comfort & Difficulty Ratings
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Self-Reported Ratings</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={checkInRatingsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="session" stroke="#888888" fontSize={11} />
                <YAxis domain={[1, 5]} stroke="#888888" fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="Difficulty" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="Comfort" stroke="#0d9488" strokeWidth={2} />
                <Line type="monotone" dataKey="Energy" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
        <Shield className="w-5 h-5 text-teal-600 shrink-0" />
        <span>
          These charts reflect user-recorded session completion and subjective comfort ratings. They do not constitute medical diagnosis or healing percentage calculations.
        </span>
      </div>
    </div>
  );
};
