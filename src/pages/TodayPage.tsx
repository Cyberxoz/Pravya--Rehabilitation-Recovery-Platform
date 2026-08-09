import React, { useState, useEffect } from 'react';
import { Play, CheckCircle2, FileText, CalendarCheck, Clock, Sparkles } from 'lucide-react';
import { StorageService } from '../lib/storage';
import { SessionRecord } from '../types';
import { SafetyBanner } from '../components/SafetyBanner';

interface TodayPageProps {
  onStartSession: (session: SessionRecord) => void;
}

export const TodayPage: React.FC<TodayPageProps> = ({ onStartSession }) => {
  const [todaySessions, setTodaySessions] = useState<SessionRecord[]>([]);

  useEffect(() => {
    setTodaySessions(StorageService.getTodaySessions());
  }, []);

  const completedCount = todaySessions.filter((s) => s.status === 'COMPLETED').length;
  const totalCount = todaySessions.length;

  return (
    <div id="pravya-today-page" className="space-y-6 pb-12 max-w-4xl mx-auto">
      <SafetyBanner type="subtle" />

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Daily Recovery Focus
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Today's Recovery
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="bg-teal-50 dark:bg-teal-950 p-3 rounded-xl border border-teal-200/60 dark:border-teal-800/60 text-center shrink-0">
          <p className="text-xs font-bold text-teal-800 dark:text-teal-300">
            {completedCount} / {totalCount} Recorded
          </p>
          <p className="text-[10px] text-teal-600 dark:text-teal-400">
            {completedCount === totalCount && totalCount > 0
              ? 'All planned sessions logged!'
              : 'Keep going at your own pace'}
          </p>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {todaySessions.map((session, index) => {
          const isDone = session.status === 'COMPLETED';
          return (
            <div
              key={session.id}
              id={`today-session-row-${session.id}`}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                isDone
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-400'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300'
                    }`}
                  >
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {session.activityName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>Duration: {session.durationMins} minutes</span>
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider self-start sm:self-center ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {session.status.replace('_', ' ')}
                </span>
              </div>

              {/* Instructions Box */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-600" />
                  Professional Instructions:
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {session.notes ||
                    'Perform gently within comfortable movement limits. Follow provider guidance.'}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-1 flex justify-end">
                <button
                  id={`start-today-session-btn-${session.id}`}
                  onClick={() => onStartSession(session)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    isDone
                      ? 'bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50'
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs shadow-teal-600/30'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Completed — Click to Re-run</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>START SESSION</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
