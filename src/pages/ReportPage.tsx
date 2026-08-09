import React from 'react';
import { FileText, Printer, Download, ShieldCheck, Stethoscope, Award, CheckCircle2 } from 'lucide-react';
import { StorageService } from '../lib/storage';

export const ReportPage: React.FC = () => {
  const profile = StorageService.getProfile();
  const plan = StorageService.getPlan();
  const sessions = StorageService.getSessions();
  const checkIns = StorageService.getCheckIns();
  const milestones = StorageService.getMilestones();

  const completedSessions = sessions.filter((s) => s.status === 'COMPLETED');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="pravya-report-page" className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Action Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs print:hidden">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            PRAVYA Progress Report
          </h1>
          <p className="text-xs text-slate-500">
            Exportable summary for your healthcare professional or therapist
          </p>
        </div>

        <button
          id="print-report-btn"
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* PRINTABLE REPORT DOCUMENT */}
      <div className="bg-white text-slate-900 p-8 rounded-2xl border border-slate-200 shadow-lg space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Header Branding */}
        <div className="flex items-start justify-between border-b-2 border-teal-600 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-lg">
                P
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                PRAVYA
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium italic mt-1">
              Digital Rehabilitation & Recovery Companion
            </p>
          </div>

          <div className="text-right text-xs text-slate-600 space-y-0.5">
            <p className="font-bold text-slate-900">REHABILITATION PROGRESS REPORT</p>
            <p>Generated Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Mandatory Disclaimer Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 font-semibold text-center">
          Progress and activity report — not a medical diagnosis or medical clearance.
        </div>

        {/* Patient & Provider Info */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs border border-slate-200">
          <div>
            <p className="text-slate-500 font-bold uppercase text-[10px]">Recovery Profile</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{profile.conditionName}</p>
            <p className="text-slate-600">Category: {profile.category}</p>
            <p className="text-slate-600">Plan Start Date: {profile.startDate}</p>
          </div>

          <div className="text-right">
            <p className="text-slate-500 font-bold uppercase text-[10px]">Prescribing Healthcare Provider</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{profile.providerName}</p>
            <p className="text-slate-600">Current Stage: {profile.currentStage}</p>
            <p className="text-slate-600">Adherence Streak: {profile.adherenceStreak} Days</p>
          </div>
        </div>

        {/* Summary Statistics Table */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Adherence & Session Statistics</span>
          </h3>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border">
              <p className="font-bold text-xl text-slate-900">{sessions.length}</p>
              <p className="text-[10px] text-slate-500">Planned Sessions</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border">
              <p className="font-bold text-xl text-teal-600">{completedSessions.length}</p>
              <p className="text-[10px] text-slate-500">Recorded Completed</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border">
              <p className="font-bold text-xl text-slate-900">{milestones.filter(m=>m.status==='COMPLETED').length}</p>
              <p className="text-[10px] text-slate-500">Milestones Reached</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border">
              <p className="font-bold text-xl text-teal-600">{checkIns.length}</p>
              <p className="text-[10px] text-slate-500">Check-ins Logged</p>
            </div>
          </div>
        </div>

        {/* Prescribed Plan Activities */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-slate-900">
            Prescribed Plan Activities
          </h3>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5">Activity</th>
                  <th className="p-2.5">Sets / Reps</th>
                  <th className="p-2.5">Duration</th>
                  <th className="p-2.5">Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {plan.activities.map((act) => (
                  <tr key={act.id}>
                    <td className="p-2.5 font-bold text-slate-900">{act.name}</td>
                    <td className="p-2.5">{act.sets} Sets × {act.reps} Reps</td>
                    <td className="p-2.5">{act.durationMins} mins</td>
                    <td className="p-2.5 text-slate-600">{act.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Safe Check-in Observations */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-slate-900">
            Recent Patient Check-in Observations
          </h3>

          <div className="space-y-1 text-xs">
            {checkIns.slice(0, 4).map((c) => (
              <div key={c.id} className="p-2.5 bg-slate-50 rounded-lg border flex justify-between">
                <div>
                  <span className="font-bold text-slate-900">{c.date}: </span>
                  <span className="text-slate-700">{c.notes || 'Routine session completed.'}</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Difficulty: {c.difficulty}/5 | Comfort: {c.comfort}/5
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Signature line */}
        <div className="pt-8 border-t border-slate-200 flex justify-between text-xs text-slate-500">
          <div>
            <p className="font-bold text-slate-800">Patient Confirmation:</p>
            <p className="mt-6 border-t border-slate-300 pt-1 w-48 text-[10px]">Signature & Date</p>
          </div>
          <div>
            <p className="font-bold text-slate-800">Provider Review:</p>
            <p className="mt-6 border-t border-slate-300 pt-1 w-48 text-[10px]">Signature & Date</p>
          </div>
        </div>
      </div>
    </div>
  );
};
