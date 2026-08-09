import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, CheckCircle2, XCircle, Clock, FileText, AlertCircle } from 'lucide-react';
import { SessionRecord, SessionStatus } from '../types';

interface SessionModalProps {
  session: SessionRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onFinishSession: (sessionId: string, status: SessionStatus, notes?: string) => void;
}

export const SessionModal: React.FC<SessionModalProps> = ({
  session,
  isOpen,
  onClose,
  onFinishSession,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionState, setSessionState] = useState<'IN_PROGRESS' | 'STATUS_CONFIRMATION'>('IN_PROGRESS');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen && session) {
      setSeconds(0);
      setIsRunning(true);
      setSessionState('IN_PROGRESS');
      setNotes('');
    }
  }, [isOpen, session]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  if (!isOpen || !session) return null;

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndClick = () => {
    setIsRunning(false);
    setSessionState('STATUS_CONFIRMATION');
  };

  const handleStatusSelect = (status: SessionStatus) => {
    onFinishSession(session.id, status, notes);
  };

  return (
    <div
      id="session-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        id="session-modal-content"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Session in Progress
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {session.activityName}
            </h2>
          </div>
          <button
            id="close-session-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          >
            ✕
          </button>
        </div>

        {sessionState === 'IN_PROGRESS' ? (
          <>
            {/* Professional Instructions Display */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Professional Instructions</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {session.notes ||
                  'Perform exercise with smooth, controlled movement. Do not force motion beyond comfort limits.'}
              </p>
            </div>

            {/* Live Timer */}
            <div className="text-center py-6 bg-teal-50/50 dark:bg-teal-950/30 rounded-2xl border border-teal-100/80 dark:border-teal-900/40">
              <div className="flex items-center justify-center gap-2 text-xs font-medium text-teal-700 dark:text-teal-400 mb-1">
                <Clock className="w-4 h-4" />
                <span>Elapsed Time</span>
              </div>
              <div className="text-5xl font-mono font-bold text-slate-900 dark:text-white tracking-wider">
                {formatTime(seconds)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Target Duration: {session.durationMins} minutes
              </p>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                id="toggle-timer-pause-btn"
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Resume</span>
                  </>
                )}
              </button>

              <button
                id="end-session-modal-btn"
                onClick={handleEndClick}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-xs shadow-teal-600/30"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>End Session</span>
              </button>
            </div>
          </>
        ) : (
          /* Session Status Confirmation View */
          <div className="space-y-5 py-2">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Did you complete this session?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Session recorded duration: {formatTime(seconds)}
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Session Notes (Optional):
              </label>
              <textarea
                id="session-completion-notes-input"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Completed all sets comfortably..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Three distinct required states */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                id="session-status-completed-btn"
                onClick={() => handleStatusSelect('COMPLETED')}
                className="flex flex-col items-center gap-2 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-900 dark:text-emerald-200 transition-colors"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span className="text-xs font-bold">Completed</span>
              </button>

              <button
                id="session-status-not-completed-btn"
                onClick={() => handleStatusSelect('NOT_COMPLETED')}
                className="flex flex-col items-center gap-2 p-3.5 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-900 dark:text-rose-200 transition-colors"
              >
                <XCircle className="w-6 h-6 text-rose-600" />
                <span className="text-xs font-bold">Not Completed</span>
              </button>

              <button
                id="session-status-update-later-btn"
                onClick={() => handleStatusSelect('NOT_RECORDED')}
                className="flex flex-col items-center gap-2 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <AlertCircle className="w-6 h-6 text-slate-500" />
                <span className="text-xs font-bold">Update Later</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
