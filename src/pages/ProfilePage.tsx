import React, { useState } from 'react';
import { User, Stethoscope, Shield, Save, Check } from 'lucide-react';
import { StorageService } from '../lib/storage';
import { RecoveryProfile } from '../types';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<RecoveryProfile>(StorageService.getProfile());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.updateProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div id="pravya-profile-page" className="space-y-6 pb-12 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          <User className="w-4 h-4 text-teal-600" />
          <span>Patient Account Settings</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Recovery Profile
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage your condition details and healthcare professional contacts.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Condition / Injury Name:
          </label>
          <input
            id="profile-condition-input"
            type="text"
            value={profile.conditionName}
            onChange={(e) => setProfile({ ...profile, conditionName: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Prescribing Provider Name:
          </label>
          <input
            id="profile-provider-input"
            type="text"
            value={profile.providerName}
            onChange={(e) => setProfile({ ...profile, providerName: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
            Recovery Goal:
          </label>
          <input
            id="profile-goal-input"
            type="text"
            value={profile.recoveryGoal}
            onChange={(e) => setProfile({ ...profile, recoveryGoal: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          id="save-profile-btn"
          className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              <span>Profile Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Profile Updates</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
