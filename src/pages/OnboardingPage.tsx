import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, Stethoscope, ArrowRight, AlertTriangle } from 'lucide-react';
import { StorageService } from '../lib/storage';
import { RecoveryCategory } from '../types';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState<RecoveryCategory>('Orthopedic');
  const [conditionName, setConditionName] = useState('Ankle Fracture Rehabilitation');
  const [recoveryGoal, setRecoveryGoal] = useState('Restore full range of motion for daily walking');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [followUpDate, setFollowUpDate] = useState('');
  const [providerName, setProviderName] = useState('Dr. Sarah Lin, DPT');
  const [hasPlanOption, setHasPlanOption] = useState<'YES' | 'NO' | null>(null);

  const categories: RecoveryCategory[] = [
    'Orthopedic',
    'Post-Surgery',
    'Neurological',
    'Physical Therapy',
    'Sports Injury',
    'Cardiac / Pulmonary',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasPlanOption) return;

    if (hasPlanOption === 'YES') {
      StorageService.updateProfile({
        category,
        conditionName,
        recoveryGoal,
        startDate,
        followUpDate: followUpDate || 'Not set',
        providerName,
        hasProfessionalPlan: true,
      });
      navigate('/plan');
    }
  };

  return (
    <div id="pravya-onboarding-page" className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-bold">
          <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
          <span>Setup Recovery Journey</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Welcome to PRAVYA
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Organize and visualize the rehabilitation plan provided by your qualified healthcare professional.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        {/* Recovery Category */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
            Recovery Category:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`cat-btn-${cat.replace(/\s+/g, '')}`}
                onClick={() => setCategory(cat)}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                  category === cat
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Condition Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
            Condition / Injury Name:
          </label>
          <input
            id="onboarding-condition-input"
            type="text"
            required
            value={conditionName}
            onChange={(e) => setConditionName(e.target.value)}
            placeholder="e.g. Right Ankle Fracture, Knee Replacement"
            className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Recovery Goal */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
            Recovery Goal:
          </label>
          <input
            id="onboarding-goal-input"
            type="text"
            required
            value={recoveryGoal}
            onChange={(e) => setRecoveryGoal(e.target.value)}
            placeholder="e.g. Walk unassisted, return to recreational swimming"
            className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Dates & Provider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              Plan Start Date:
            </label>
            <input
              id="onboarding-start-date-input"
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              Provider / Therapist Name:
            </label>
            <input
              id="onboarding-provider-input"
              type="text"
              required
              value={providerName}
              onChange={(e) => setProviderName(e.target.value)}
              placeholder="e.g. Dr. Sarah Lin, DPT"
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* CRITICAL QUESTION */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <label className="block text-sm font-extrabold text-slate-900 dark:text-white">
            Do you already have a professional rehabilitation plan?
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              id="onboarding-plan-yes-btn"
              onClick={() => setHasPlanOption('YES')}
              className={`p-4 rounded-xl border flex items-center gap-3 text-left transition-all ${
                hasPlanOption === 'YES'
                  ? 'bg-teal-50 dark:bg-teal-950 border-teal-600 text-teal-900 dark:text-teal-100 ring-2 ring-teal-500/20'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <div>
                <p className="font-bold text-xs">Yes, I have a plan</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Provided by my doctor or physical therapist
                </p>
              </div>
            </button>

            <button
              type="button"
              id="onboarding-plan-no-btn"
              onClick={() => setHasPlanOption('NO')}
              className={`p-4 rounded-xl border flex items-center gap-3 text-left transition-all ${
                hasPlanOption === 'NO'
                  ? 'bg-amber-50 dark:bg-amber-950 border-amber-600 text-amber-900 dark:text-amber-100 ring-2 ring-amber-500/20'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="font-bold text-xs">I need to consult a professional</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  I don't have a medical plan yet
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* If NO plan is selected */}
        {hasPlanOption === 'NO' && (
          <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 p-4 rounded-xl space-y-2 text-amber-900 dark:text-amber-200 text-xs">
            <p className="font-bold text-sm">Professional Plan Required</p>
            <p>
              Please consult a qualified healthcare professional for an appropriate rehabilitation plan.
            </p>
            <p className="text-[11px] text-amber-800 dark:text-amber-300">
              PRAVYA strictly organizes existing medical plans and does not invent or generate unapproved exercises.
            </p>
          </div>
        )}

        {/* Submit button */}
        {hasPlanOption === 'YES' && (
          <button
            type="submit"
            id="onboarding-submit-btn"
            className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs shadow-teal-600/30 transition-all"
          >
            <span>Proceed to Plan Setup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
};
