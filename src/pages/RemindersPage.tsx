import React, { useState, useEffect } from 'react';
import { Bell, Clock, Calendar, Check, Shield } from 'lucide-react';
import { StorageService } from '../lib/storage';
import { ReminderSetting } from '../types';
import { SafetyBanner } from '../components/SafetyBanner';

export const RemindersPage: React.FC = () => {
  const [reminders, setReminders] = useState<ReminderSetting>(StorageService.getReminders());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setReminders(StorageService.getReminders());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.updateReminders(reminders);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div id="pravya-reminders-page" className="space-y-6 pb-12 max-w-2xl mx-auto">
      <SafetyBanner type="subtle" />

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          <Bell className="w-4 h-4 text-teal-600" />
          <span>Supportive Notifications</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Session Reminder Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Configure gentle daily reminders to help stay aligned with your professional plan.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        {/* Toggle Enable */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Enable Daily Recovery Reminders
            </h3>
            <p className="text-xs text-slate-500">
              Receive supportive notifications on your scheduled recovery days
            </p>
          </div>

          <button
            type="button"
            id="toggle-reminders-btn"
            onClick={() => setReminders({ ...reminders, enabled: !reminders.enabled })}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              reminders.enabled ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                reminders.enabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Time */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
            Preferred Reminder Time:
          </label>
          <input
            id="reminder-time-input"
            type="time"
            value={reminders.time}
            onChange={(e) => setReminders({ ...reminders, time: e.target.value })}
            className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        {/* Notification Preview */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 space-y-1">
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Reminder Message Preview:
          </span>
          <p className="text-xs text-teal-800 dark:text-teal-300 font-medium">
            "We haven't received an update for today's session. Tap here to log your recovery check-in when ready."
          </p>
        </div>

        <button
          type="submit"
          id="save-reminders-btn"
          className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              <span>Settings Saved!</span>
            </>
          ) : (
            <span>Save Reminder Preferences</span>
          )}
        </button>
      </form>
    </div>
  );
};
