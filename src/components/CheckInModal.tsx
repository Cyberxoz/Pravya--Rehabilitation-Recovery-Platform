import React, { useState } from 'react';
import { Heart, Activity, Zap, Check, Shield } from 'lucide-react';
import { DailyCheckIn } from '../types';

interface CheckInModalProps {
  isOpen: boolean;
  sessionId?: string;
  onClose: () => void;
  onSubmitCheckIn: (checkIn: Omit<DailyCheckIn, 'id' | 'userId'>) => void;
}

export const CheckInModal: React.FC<CheckInModalProps> = ({
  isOpen,
  sessionId,
  onClose,
  onSubmitCheckIn,
}) => {
  const [difficulty, setDifficulty] = useState(3);
  const [comfort, setComfort] = useState(4);
  const [energy, setEnergy] = useState(3);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitCheckIn({
      sessionId,
      date: new Date().toISOString().split('T')[0],
      difficulty,
      comfort,
      energy,
      notes: notes.trim(),
    });
    onClose();
  };

  return (
    <div
      id="checkin-modal-backdrop"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        id="checkin-modal-content"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Safe Check-in
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              How was today's session?
            </h2>
          </div>
          <button
            id="close-checkin-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Difficulty Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-teal-600" />
                Session Difficulty
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                Level {difficulty} / 5
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  id={`difficulty-btn-${val}`}
                  onClick={() => setDifficulty(val)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    difficulty === val
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
              <span>Very Easy</span>
              <span>Intense</span>
            </div>
          </div>

          {/* Comfort Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-teal-600" />
                Comfort Level
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                Level {comfort} / 5
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  id={`comfort-btn-${val}`}
                  onClick={() => setComfort(val)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    comfort === val
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
              <span>Low Comfort</span>
              <span>Very Comfortable</span>
            </div>
          </div>

          {/* Energy Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Energy Level
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                Level {energy} / 5
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  id={`energy-btn-${val}`}
                  onClick={() => setEnergy(val)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    energy === val
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Personal Observations / Notes (Optional):
            </label>
            <textarea
              id="checkin-notes-textarea"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Stretches felt smooth, kept room warm..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <Shield className="w-4 h-4 text-teal-600 shrink-0" />
            <span>PRAVYA logs your comfort ratings for personal reference. It does not medically interpret symptoms.</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="submit-checkin-btn"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-xs shadow-teal-600/30 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Save Safe Check-in</span>
          </button>
        </form>
      </div>
    </div>
  );
};
