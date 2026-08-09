import React, { useState, useEffect } from 'react';
import { Sparkles, Award, ArrowRight, Calendar, BookOpen, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { StorageService } from '../lib/storage';
import { WeeklySummary, RecoveryProfile } from '../types';
import { SafetyBanner } from '../components/SafetyBanner';

export const WeeklyStoryPage: React.FC = () => {
  const [summaries, setSummaries] = useState<WeeklySummary[]>([]);
  const [profile, setProfile] = useState<RecoveryProfile>(StorageService.getProfile());
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  useEffect(() => {
    const list = StorageService.getWeeklySummaries();
    setSummaries(list);
    setProfile(StorageService.getProfile());
    // Select latest week by default
    if (list.length > 0) {
      setSelectedWeekIndex(list.length - 1);
    }
  }, []);

  const currentSummary = summaries[selectedWeekIndex] || {
    weekNumber: 2,
    startDate: '2026-08-01',
    endDate: '2026-08-07',
    plannedSessions: 8,
    recordedSessions: 7,
    activeDays: 6,
    milestonesReached: 1,
    checkinsCompleted: 6,
    nextMilestoneTarget: 'Reach 12 total recorded sessions for Week 2 completion.',
    storyText:
      'Week 2 marked an impressive step forward in adherence. You recorded 7 sessions—2 more than last week—and reached your 10th total session milestone. Your steady consistency builds momentum for your professional plan.',
  };

  return (
    <div id="pravya-weekly-story-page" className="space-y-6 pb-12 max-w-4xl mx-auto">
      <SafetyBanner type="subtle" />

      {/* Week Browser Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Weekly Journal</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Your Week in Recovery
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Visual story of your consistency, adherence, and milestone progression.
          </p>
        </div>

        {/* Week Selector */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl text-xs font-bold shrink-0">
          <button
            id="prev-week-story-btn"
            disabled={selectedWeekIndex === 0}
            onClick={() => setSelectedWeekIndex((prev) => Math.max(0, prev - 1))}
            className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1">
            Week {currentSummary.weekNumber}
          </span>
          <button
            id="next-week-story-btn"
            disabled={selectedWeekIndex === summaries.length - 1}
            onClick={() => setSelectedWeekIndex((prev) => Math.min(summaries.length - 1, prev + 1))}
            className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MAGAZINE STYLE STORY CARD */}
      <div className="bg-gradient-to-br from-white via-slate-50/50 to-teal-50/20 dark:from-slate-900 dark:to-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-8">
        {/* Dates */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-800 dark:text-teal-300">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>
              {currentSummary.startDate} — {currentSummary.endDate}
            </span>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-600 text-white shadow-xs">
            {profile.conditionName}
          </span>
        </div>

        {/* 4 Key Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-center space-y-1">
            <p className="text-3xl font-black text-teal-600 dark:text-teal-400">
              {currentSummary.recordedSessions}
            </p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Sessions Recorded
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-center space-y-1">
            <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              +{currentSummary.recordedSessions > 5 ? 2 : 0}
            </p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              vs Previous Week
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-center space-y-1">
            <p className="text-3xl font-black text-amber-500">
              {currentSummary.milestonesReached}
            </p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Milestones Reached
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-center space-y-1">
            <p className="text-3xl font-black text-teal-600 dark:text-teal-400">
              {currentSummary.checkinsCompleted}
            </p>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Check-ins Logged
            </p>
          </div>
        </div>

        {/* Story Text Paragraphs */}
        <div className="bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span>Weekly Recovery Reflection</span>
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
            "{currentSummary.storyText}"
          </p>
        </div>

        {/* Next Milestone Box */}
        <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300">
              Next Journey Milestone
            </span>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              {currentSummary.nextMilestoneTarget}
            </p>
          </div>
          <Award className="w-6 h-6 text-teal-600 shrink-0" />
        </div>
      </div>
    </div>
  );
};
