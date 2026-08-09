import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Circle,
  Flag,
  Sparkles,
  ChevronRight,
  Calendar,
  Award,
  Activity,
  FileCheck2,
} from 'lucide-react';
import { Milestone } from '../types';

interface JourneyTimelineProps {
  milestones: Milestone[];
  currentStageText?: string;
  onSelectMilestone?: (milestone: Milestone) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  milestones,
  currentStageText = 'Week 2 — In Progress',
  onSelectMilestone,
}) => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    milestones[0] || null
  );

  const getMilestoneIcon = (m: Milestone) => {
    if (m.type === 'PROVIDER_MILESTONE') return <FileCheck2 className="w-4 h-4" />;
    if (m.type === 'FIRST_SESSION') return <Activity className="w-4 h-4" />;
    if (m.type === 'FIRST_WEEK') return <Award className="w-4 h-4" />;
    if (m.type === 'CONSISTENCY') return <Sparkles className="w-4 h-4" />;
    return <Flag className="w-4 h-4" />;
  };

  return (
    <div id="pravya-recovery-journey-timeline" className="space-y-6">
      {/* Timeline Visual Container */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-200 dark:border-teal-900/60 space-y-8 my-4">
        {milestones.map((m, idx) => {
          const isCompleted = m.status === 'COMPLETED';
          const isInProgress = m.status === 'IN_PROGRESS';
          const isUpcoming = m.status === 'UPCOMING';

          return (
            <div
              key={m.id}
              id={`journey-node-${m.id}`}
              onClick={() => {
                setSelectedMilestone(m);
                if (onSelectMilestone) onSelectMilestone(m);
              }}
              className={`relative cursor-pointer group transition-all duration-200 ${
                selectedMilestone?.id === m.id ? 'scale-[1.01]' : ''
              }`}
            >
              {/* Timeline Node Badge / Icon */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-transform duration-200 group-hover:scale-110 shadow-xs ${
                  isCompleted
                    ? 'bg-teal-600 text-white border-white dark:border-slate-900 shadow-teal-600/30'
                    : isInProgress
                    ? 'bg-amber-500 text-white border-white dark:border-slate-900 animate-pulse'
                    : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isInProgress ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <Circle className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Node Card */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                  selectedMilestone?.id === m.id
                    ? 'bg-white dark:bg-slate-800 border-teal-500/80 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/20'
                    : 'bg-white/80 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`p-1.5 rounded-lg text-xs ${
                        isCompleted
                          ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                          : isInProgress
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {getMilestoneIcon(m)}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {m.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3" />
                      {m.date}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : isInProgress
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {m.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {m.description}
                </p>

                {/* Additional metrics if logged */}
                {m.recordedSessionsAtMilestone !== undefined && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>{m.recordedSessionsAtMilestone} Sessions Recorded</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Drawer / Footer for Selected Node */}
      {selectedMilestone && (
        <div
          id="milestone-detail-card"
          className="p-5 rounded-2xl bg-gradient-to-r from-teal-500/10 via-teal-500/5 to-slate-50 dark:from-teal-950/40 dark:to-slate-800/40 border border-teal-200/80 dark:border-teal-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
              Selected Milestone Focus
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              {selectedMilestone.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Target / Status: {selectedMilestone.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-teal-700 dark:text-teal-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-teal-200 dark:border-teal-800 shadow-xs">
              {currentStageText}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
