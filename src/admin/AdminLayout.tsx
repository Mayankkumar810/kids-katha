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
  FileCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const adminEmail = currentUser?.email || 
    (typeof window !== 'undefined' ? localStorage.getItem('kathavichar_logged_admin_email') : '') || 
    'Admin';

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Add Story (HTML)', path: '/admin/add-story', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'Manage Stories', path: '/admin/stories', icon: <FileText className="w-4 h-4" /> },
    { label: 'Category Management', path: '/admin/categories', icon: <Layers className="w-4 h-4" /> },
    { label: 'Policies & Legal', path: '/admin/policies', icon: <FileCheck className="w-4 h-4" /> },
    { label: 'Social Media', path: '/admin/social', icon: <Share2 className="w-4 h-4" /> },
    { label: 'Homepage Hero', path: '/admin/homepage', icon: <Home className="w-4 h-4" /> },
    { label: 'Google AdSense', path: '/admin/ads', icon: <DollarSign className="w-4 h-4" /> },
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
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="View Public Website"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
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
          <div className="px-1">
            <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate" title={adminEmail}>
              {adminEmail}
            </p>
            <p className="text-[10px] text-slate-400">Administrator</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2 text-xs font-bold text-red-600 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/40 dark:text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Admin Top Header Banner */}
        <header className="border-b border-slate-200 bg-white px-4 py-3 sm:px-8 dark:border-slate-800 dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {adminEmail}
              </span>
              <p className="text-[10px] text-slate-400">Management & Editorial Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
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
