import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, FileText, Stethoscope, AlertCircle, Check } from 'lucide-react';
import { StorageService } from '../lib/storage';
import { RehabPlan, Activity } from '../types';
import { SafetyBanner } from '../components/SafetyBanner';

export const PlanPage: React.FC = () => {
  const [plan, setPlan] = useState<RehabPlan>(StorageService.getPlan());
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for adding new activity from professional plan
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [durationMins, setDurationMins] = useState(10);
  const [sets, setSets] = useState(2);
  const [reps, setReps] = useState(10);
  const [frequency, setFrequency] = useState('Daily');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setPlan(StorageService.getPlan());
  }, []);

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !instructions.trim()) return;

    StorageService.addActivityToPlan({
      name: name.trim(),
      instructions: instructions.trim(),
      durationMins,
      sets,
      reps,
      frequency,
      scheduledDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      notes: notes.trim(),
    });

    setPlan(StorageService.getPlan());
    setShowAddModal(false);
    setName('');
    setInstructions('');
    setNotes('');
  };

  const handleDeleteActivity = (actId: string) => {
    if (confirm('Remove this activity from your professional plan record?')) {
      StorageService.deleteActivityFromPlan(actId);
      setPlan(StorageService.getPlan());
    }
  };

  return (
    <div id="pravya-plan-page" className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Top Banner */}
      <SafetyBanner
        type="subtle"
        customText="PRAVYA organizes information provided by your healthcare professional. It does not invent or modify medical instructions."
      />

      {/* Plan Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Healthcare Professional Plan</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {plan.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Prescribing Professional: <strong className="text-slate-800 dark:text-slate-200">{plan.providerName}</strong>
          </p>
        </div>

        <button
          id="add-activity-modal-trigger-btn"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs shadow-teal-600/30 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Professional Activity</span>
        </button>
      </div>

      {/* Activities Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Prescribed Activities ({plan.activities.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.activities.map((act) => (
            <div
              key={act.id}
              id={`plan-activity-card-${act.id}`}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {act.name}
                  </h3>
                  <button
                    id={`delete-act-btn-${act.id}`}
                    onClick={() => handleDeleteActivity(act.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-lg"
                    title="Delete activity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-teal-800 dark:text-teal-300">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 border border-teal-200/60 dark:border-teal-800">
                    Duration: {act.durationMins} mins
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {act.sets} Sets × {act.reps} Reps
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Frequency: {act.frequency}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60 space-y-1 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-teal-600" />
                    Doctor Instructions:
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {act.instructions}
                  </p>
                </div>

                {act.notes && (
                  <p className="text-[11px] text-slate-500 italic">
                    Note: {act.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Activity Modal */}
      {showAddModal && (
        <div
          id="add-activity-modal-backdrop"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            id="add-activity-modal-content"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Add Prescribed Activity
              </h3>
              <button
                id="close-add-activity-modal-btn"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddActivity} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Activity Name:
                </label>
                <input
                  id="add-act-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Quadriceps Isometric Holds"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Professional Instructions (exact text from your provider):
                </label>
                <textarea
                  id="add-act-instructions-input"
                  rows={3}
                  required
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Contract thigh muscle while lying flat. Hold for 5 seconds..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Duration (mins):
                  </label>
                  <input
                    id="add-act-duration-input"
                    type="number"
                    value={durationMins}
                    onChange={(e) => setDurationMins(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Sets:
                  </label>
                  <input
                    id="add-act-sets-input"
                    type="number"
                    value={sets}
                    onChange={(e) => setSets(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Reps:
                  </label>
                  <input
                    id="add-act-reps-input"
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Frequency:
                </label>
                <input
                  id="add-act-frequency-input"
                  type="text"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="e.g. 2x Daily"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Provider Notes (Optional):
                </label>
                <input
                  id="add-act-notes-input"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Stop if pain exceeds 3/10..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                id="save-new-act-btn"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save to Plan</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
