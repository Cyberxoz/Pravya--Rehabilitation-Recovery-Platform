import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Sparkles, Flag, Award, Calendar, Check } from 'lucide-react';
import { StorageService } from '../lib/storage';
import { Milestone, RecoveryProfile } from '../types';
import { JourneyTimeline } from '../components/JourneyTimeline';
import { SafetyBanner } from '../components/SafetyBanner';

export const JourneyPage: React.FC = () => {
  const [profile, setProfile] = useState<RecoveryProfile>(StorageService.getProfile());
  const [milestones, setMilestones] = useState<Milestone[]>(StorageService.getMilestones());
  const [showAddModal, setShowAddModal] = useState(false);

  // New milestone form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setProfile(StorageService.getProfile());
    setMilestones(StorageService.getMilestones());
  }, []);

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    StorageService.addMilestone({
      title: title.trim(),
      description: description.trim() || 'Custom recovery milestone target',
      date,
      status: 'UPCOMING',
      type: 'CUSTOM',
    });

    setMilestones(StorageService.getMilestones());
    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div id="pravya-journey-page" className="space-y-6 pb-12 max-w-4xl mx-auto">
      <SafetyBanner type="subtle" />

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>Interactive USP</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Recovery Journey
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Visual milestone timeline mapping your rehabilitation progress from start to target.
          </p>
        </div>

        <button
          id="add-milestone-trigger-btn"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs shadow-teal-600/30 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Target Milestone</span>
        </button>
      </div>

      {/* The Visual Journey Timeline */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-600" />
            <span>Rehabilitation Journey Path</span>
          </h2>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800">
            {profile.currentStage}
          </span>
        </div>

        <JourneyTimeline
          milestones={milestones}
          currentStageText={profile.currentStage}
        />
      </div>

      {/* Add Milestone Modal */}
      {showAddModal && (
        <div
          id="add-milestone-modal-backdrop"
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            id="add-milestone-modal-content"
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Add Milestone Target
              </h3>
              <button
                id="close-add-milestone-modal-btn"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMilestone} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Milestone Title:
                </label>
                <input
                  id="add-milestone-title-input"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 15 Total Recorded Sessions"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Date:
                </label>
                <input
                  id="add-milestone-date-input"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description:
                </label>
                <textarea
                  id="add-milestone-desc-input"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Complete scheduled sessions consistently for 3 weeks..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                id="save-milestone-btn"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Target Milestone</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
