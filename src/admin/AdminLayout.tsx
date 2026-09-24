import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  Layers, 
  Share2, 
  Home, 
  DollarSign, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Database,
  Flame,
  HelpCircle,
  FileCheck,
  Copy,
  Check,
  UserCheck,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { currentUser, logout, isFirebaseActive } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = React.useState(false);

  const adminDirectUrl = `${window.location.origin}/admin`;

  const copyAdminUrl = () => {
    navigator.clipboard.writeText(adminDirectUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Add Story', path: '/admin/add-story', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'Manage Stories', path: '/admin/stories', icon: <FileText className="w-4 h-4" /> },
    { label: 'Category Management', path: '/admin/categories', icon: <Layers className="w-4 h-4" /> },
    { label: 'Policies & Legal', path: '/admin/policies', icon: <FileCheck className="w-4 h-4" /> },
    { label: 'Social Media', path: '/admin/social', icon: <Share2 className="w-4 h-4" /> },
    { label: 'Homepage Hero', path: '/admin/homepage', icon: <Home className="w-4 h-4" /> },
    { label: 'Google AdSense', path: '/admin/ads', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Firebase Guide', path: '/admin/firebase-guide', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white font-bold shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-slate-800 dark:text-white text-sm">
                  KathaVichar
                </span>
                <span className="block text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
            </Link>

            <Link
              to="/"
              target="_blank"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="View Public Website"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Connection Status Pill */}
          <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-2 text-[11px] dark:border-slate-800 dark:bg-slate-800/60">
            <div className="flex items-center justify-between font-bold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-500" /> Storage
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                  isFirebaseActive
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {isFirebaseActive ? 'Firebase Live' : 'Placeholder Mode'}
              </span>
            </div>
            <p className="mt-1 text-[10px] text-slate-400">
              {isFirebaseActive
                ? 'Synced with Firebase Realtime Database.'
                : 'Using Local Storage sync with placeholder config.'}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 space-y-1">
            {navItems.map(item => {
              const active =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
                    active
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & Logout */}
        <div className="border-t border-slate-100 pt-4 dark:border-slate-800 mt-6 space-y-3">
          {/* Direct Admin URL box */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-800/80">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-200">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-500" /> Direct Link
              </span>
              <button
                onClick={copyAdminUrl}
                className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold text-amber-600 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-slate-700 transition-colors"
                title="Copy Direct Link"
              >
                {copiedLink ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="mt-1 text-[10px] font-mono text-slate-500 truncate">
              {window.location.host}/admin
            </p>
          </div>

          <div className="px-1">
            <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">
              {currentUser?.email || 'admin@kathavichar.com'}
            </p>
            <p className="text-[10px] text-slate-400">Logged in as Administrator</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2 text-xs font-bold text-red-600 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/40 dark:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Admin Top Header Banner with Direct URL & Login Status */}
        <header className="border-b border-slate-200 bg-white px-4 py-3 sm:px-8 dark:border-slate-800 dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  {currentUser?.email || 'admin@kathavichar.com'}
                </span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Admin Logged In
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Web link direct access active</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800">
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 hidden sm:inline">
                Direct Admin Link:
              </span>
              <code className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                /admin
              </code>
              <button
                onClick={copyAdminUrl}
                className="ml-1 rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 transition-colors"
                title="Copy Direct Admin Access URL"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        <div className="p-4 sm:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
