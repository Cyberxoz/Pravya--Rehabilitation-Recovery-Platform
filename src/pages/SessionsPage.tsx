import React, { useState, useEffect } from 'react';
import { History, Filter, CheckCircle2, XCircle, AlertCircle, Calendar } from 'lucide-react';
import { StorageService } from '../lib/storage';
import { SessionRecord, SessionStatus } from '../types';
import { SafetyBanner } from '../components/SafetyBanner';

export const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<SessionRecord[]>([]);
  const [filter, setFilter] = useState<SessionStatus | 'ALL'>('ALL');

  useEffect(() => {
    setSessions(StorageService.getSessions());
  }, []);

  const filteredSessions = sessions.filter(
    (s) => filter === 'ALL' || s.status === filter
  );

  return (
    <div id="pravya-sessions-page" className="space-y-6 pb-12 max-w-4xl mx-auto">
      <SafetyBanner type="subtle" />

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
            <History className="w-4 h-4 text-teal-600" />
            <span>Session Logs</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Session History
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Record of completed, skipped, and scheduled recovery sessions.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold shrink-0">
          {(['ALL', 'COMPLETED', 'NOT_COMPLETED', 'NOT_RECORDED'] as const).map((st) => (
            <button
              key={st}
              id={`filter-session-btn-${st}`}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === st
                  ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {st === 'ALL' ? 'All' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Session Records */}
      <div className="space-y-3">
        {filteredSessions.map((session) => {
          const isCompleted = session.status === 'COMPLETED';
          const isNotCompleted = session.status === 'NOT_COMPLETED';

          return (
            <div
              key={session.id}
              id={`session-record-card-${session.id}`}
              className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`p-1 rounded-lg ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : isNotCompleted
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isNotCompleted ? (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-slate-500" />
                    )}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {session.activityName}
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {session.date}
                  </span>
                  <span>Duration: {session.durationMins} mins</span>
                </div>

                {session.notes && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic pt-1">
                    "{session.notes}"
                  </p>
                )}
              </div>

              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full self-start sm:self-center ${
                  isCompleted
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : isNotCompleted
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {session.status.replace('_', ' ')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
