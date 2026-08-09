import React from 'react';
import { Bot, ShieldAlert, Sparkles } from 'lucide-react';
import { AIChatDrawer } from '../components/AIChatDrawer';
import { StorageService } from '../lib/storage';

export const AssistantPage: React.FC = () => {
  const profile = StorageService.getProfile();

  return (
    <div id="pravya-assistant-page" className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          <Bot className="w-4 h-4 text-teal-600" />
          <span>Non-Diagnostic AI Companion</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          PRAVYA Recovery Assistant
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Ask questions about organizing your plan, summarizing session adherence, or generating your weekly recovery story.
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p>
          PRAVYA Assistant does not provide medical diagnoses, treatment prescriptions, or exercise generation. If you experience new or worsening pain, please contact your healthcare provider immediately.
        </p>
      </div>

      {/* Embedded Drawer View */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 h-[600px] overflow-hidden">
        <AIChatDrawer isOpen={true} onClose={() => {}} profile={profile} />
      </div>
    </div>
  );
};
