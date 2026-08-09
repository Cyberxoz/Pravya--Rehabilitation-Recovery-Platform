import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface SafetyBannerProps {
  type?: 'subtle' | 'prominent' | 'warning';
  customText?: string;
  className?: string;
}

export const SafetyBanner: React.FC<SafetyBannerProps> = ({
  type = 'subtle',
  customText,
  className = '',
}) => {
  if (type === 'warning') {
    return (
      <div
        id="medical-safety-warning-banner"
        className={`bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-sm ${className}`}
      >
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950 dark:text-amber-100">
            Medical Guidance Notice
          </p>
          <p>
            {customText ||
              'PRAVYA does not diagnose conditions or prescribe exercises. If you experience new, severe, or worsening pain, please contact your qualified healthcare professional immediately.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="medical-safety-info-banner"
      className={`bg-teal-50/70 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/50 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-teal-800 dark:text-teal-300 ${className}`}
    >
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
        <span>
          {customText ||
            "PRAVYA organizes and tracks your healthcare professional's plan. It does not provide medical diagnoses or modify treatment."}
        </span>
      </div>
      <span className="font-medium text-teal-700 dark:text-teal-400 hidden sm:inline">
        Professional Plan Active
      </span>
    </div>
  );
};
