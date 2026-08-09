import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Minus, Calendar, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { SafetyBanner } from '../components/SafetyBanner';

export const WhatChangedPage: React.FC = () => {
  // Factual comparison data between Week 1 and Week 2
  const week1Data = {
    plannedSessions: 7,
    recordedSessions: 5,
    activeDays: 4,
    notRecordedSessions: 2,
    milestones: 3,
    checkIns: 4,
    avgDifficulty: 3.2,
    avgComfort: 3.5,
  };

  const week2Data = {
    plannedSessions: 8,
    recordedSessions: 7,
    activeDays: 6,
    notRecordedSessions: 1,
    milestones: 1,
    checkIns: 6,
    avgDifficulty: 2.8,
    avgComfort: 4.0,
  };

  const chartComparisonData = [
    {
      metric: 'Recorded Sessions',
      'Previous Week': week1Data.recordedSessions,
      'Current Week': week2Data.recordedSessions,
    },
    {
      metric: 'Active Days',
      'Previous Week': week1Data.activeDays,
      'Current Week': week2Data.activeDays,
    },
    {
      metric: 'Check-ins Completed',
      'Previous Week': week1Data.checkIns,
      'Current Week': week2Data.checkIns,
    },
  ];

  const trendData = [
    { day: 'Mon', 'Previous Week': 1, 'Current Week': 1 },
    { day: 'Tue', 'Previous Week': 1, 'Current Week': 2 },
    { day: 'Wed', 'Previous Week': 0, 'Current Week': 1 },
    { day: 'Thu', 'Previous Week': 1, 'Current Week': 1 },
    { day: 'Fri', 'Previous Week': 1, 'Current Week': 1 },
    { day: 'Sat', 'Previous Week': 1, 'Current Week': 1 },
    { day: 'Sun', 'Previous Week': 0, 'Current Week': 0 },
  ];

  return (
    <div id="pravya-what-changed-page" className="space-y-6 pb-12 max-w-5xl mx-auto">
      <SafetyBanner type="subtle" />

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            <span>Interactive USP</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            What Changed?
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Factual week-over-week comparison of recorded sessions, adherence, and check-ins.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-teal-50 dark:bg-teal-950 px-3.5 py-2 rounded-xl border border-teal-200 dark:border-teal-800 text-xs font-bold text-teal-800 dark:text-teal-300 shrink-0">
          <Calendar className="w-4 h-4 text-teal-600" />
          <span>Week 1 vs Week 2 Comparison</span>
        </div>
      </div>

      {/* FACTUAL STATEMENTS PANEL */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <span>Factual Key Highlights</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/60 space-y-1">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4 text-teal-600" />
              +2 Recorded Sessions
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              You recorded 2 more sessions this week (7 total) compared to last week (5 total).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/60 space-y-1">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4 text-teal-600" />
              +2 Active Days
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              You performed planned exercises on 6 days this week compared to 4 active days last week.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 space-y-1">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              -1 Unrecorded Session
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Unrecorded or skipped planned sessions decreased from 2 last week to 1 this week.
            </p>
          </div>
        </div>
      </div>

      {/* METRICS COMPARISON GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Planned Sessions */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Planned Sessions</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {week2Data.plannedSessions}
            </span>
            <span className="text-xs font-bold text-slate-400">
              vs {week1Data.plannedSessions} prev
            </span>
          </div>
        </div>

        {/* Recorded Sessions */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Recorded Sessions</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xl font-black text-teal-600 dark:text-teal-400">
              {week2Data.recordedSessions}
            </span>
            <span className="text-xs font-bold text-teal-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +2
            </span>
          </div>
        </div>

        {/* Active Days */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Active Days</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xl font-black text-teal-600 dark:text-teal-400">
              {week2Data.activeDays}
            </span>
            <span className="text-xs font-bold text-teal-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +2
            </span>
          </div>
        </div>

        {/* Safe Check-ins */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Check-ins Completed</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {week2Data.checkIns}
            </span>
            <span className="text-xs font-bold text-teal-600 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +2
            </span>
          </div>
        </div>
      </div>

      {/* RECHARTS COMPARISON CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Comparison */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Volume Comparison
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartComparisonData}>
                <XAxis dataKey="metric" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Previous Week" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Current Week" fill="#0d9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Pattern Line Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Daily Session Distribution
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="day" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Line type="monotone" dataKey="Previous Week" stroke="#94a3b8" strokeWidth={2} />
                <Line type="monotone" dataKey="Current Week" stroke="#0d9488" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
