import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const { login, isFirebaseActive } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err?.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@kathavichar.com');
    setPassword('admin123456');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">
            Admin Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to manage stories, themes, categories, and AdSense
          </p>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-600 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-900">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@kathavichar.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-amber-600 disabled:opacity-50 transition-all active:scale-95"
          >
            {loading ? 'Authenticating...' : 'Sign In as Admin'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/30 text-center">
            <span className="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Testing Admin Demo?
            </span>
            <p className="mt-1 text-[11px] text-amber-900/80 dark:text-amber-400">
              Click below to autofill admin credentials and test the full management panel.
            </p>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="mt-2.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition-colors"
            >
              Fill Demo Credentials
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-500 hover:text-amber-600 dark:hover:text-amber-400"
          >
            &larr; Return to Reader Website
          </Link>
        </div>
      </div>
    </div>
  );
};
