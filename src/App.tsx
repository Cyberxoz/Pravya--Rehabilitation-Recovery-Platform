import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { SessionModal } from './components/SessionModal';
import { CheckInModal } from './components/CheckInModal';
import { AIChatDrawer } from './components/AIChatDrawer';

import { DashboardPage } from './pages/DashboardPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { PlanPage } from './pages/PlanPage';
import { TodayPage } from './pages/TodayPage';
import { JourneyPage } from './pages/JourneyPage';
import { SessionsPage } from './pages/SessionsPage';
import { WhatChangedPage } from './pages/WhatChangedPage';
import { WeeklyStoryPage } from './pages/WeeklyStoryPage';
import { ProgressPage } from './pages/ProgressPage';
import { ReportPage } from './pages/ReportPage';
import { AssistantPage } from './pages/AssistantPage';
import { RemindersPage } from './pages/RemindersPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ProfilePage } from './pages/ProfilePage';

import { SessionRecord, DailyCheckIn } from './types';
import { StorageService } from './lib/storage';

const AppContent: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeSession, setActiveSession] = useState<SessionRecord | null>(null);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [checkInSessionId, setCheckInSessionId] = useState<string | undefined>(undefined);

  const profile = StorageService.getProfile();

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleStartSession = (session: SessionRecord) => {
    setActiveSession(session);
  };

  const handleFinishSession = (completedSessionId: string, durationMins: number) => {
    // Record completion in storage
    StorageService.completeSession(completedSessionId, durationMins);
    setActiveSession(null);

    // Prompt Safe Check-in
    setCheckInSessionId(completedSessionId);
    setIsCheckInOpen(true);
  };

  const handleSubmitCheckIn = (checkIn: Omit<DailyCheckIn, 'id' | 'userId'>) => {
    StorageService.addCheckIn(checkIn);
    setIsCheckInOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenAi={() => setIsAiOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={<DashboardPage onStartSession={handleStartSession} />}
            />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route
              path="/today"
              element={<TodayPage onStartSession={handleStartSession} />}
            />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/what-changed" element={<WhatChangedPage />} />
            <Route path="/weekly" element={<WeeklyStoryPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/reminders" element={<RemindersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      <MobileNav onOpenAi={() => setIsAiOpen(true)} />

      {/* Interactive Active Session Modal */}
      {activeSession && (
        <SessionModal
          session={activeSession}
          onClose={() => setActiveSession(null)}
          onFinishSession={handleFinishSession}
        />
      )}

      {/* Safe Check-in Modal */}
      <CheckInModal
        isOpen={isCheckInOpen}
        sessionId={checkInSessionId}
        onClose={() => setIsCheckInOpen(false)}
        onSubmitCheckIn={handleSubmitCheckIn}
      />

      {/* AI Assistant Drawer */}
      <AIChatDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        profile={profile}
      />
    </div>
  );
};

export function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
