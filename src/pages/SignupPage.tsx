import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div id="pravya-signup-page" className="max-w-md mx-auto py-12 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-extrabold text-2xl mx-auto shadow-md">
          P
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Create PRAVYA Account
        </h1>
        <p className="text-xs text-slate-500">
          Start visualizing your digital rehabilitation recovery journey
        </p>
      </div>

      <form onSubmit={handleSignup} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs shadow-sm">
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          id="signup-submit-btn"
          className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-slate-500 text-[11px] pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};
