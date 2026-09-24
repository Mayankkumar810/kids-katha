import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Headphones } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AdminSupportModal } from './AdminSupportModal';

export const PublicLayout: React.FC = () => {
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setSupportModalOpen(true);
    window.addEventListener('open_admin_support_modal', handleOpenModal);
    return () => window.removeEventListener('open_admin_support_modal', handleOpenModal);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors relative overflow-x-hidden w-full max-w-full">
      <Navbar />
      <main className="flex-1 w-full max-w-full min-w-0">
        <Outlet />
      </main>
      <Footer />

      {/* Floating Admin Support Trigger for Users */}
      <button
        type="button"
        onClick={() => setSupportModalOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300/40 dark:border-amber-600/40"
        title="Contact Admin Support (एडमिन सहायता)"
      >
        <Headphones className="w-4 h-4" />
        <span className="hidden sm:inline">Admin Support</span>
        <span className="sm:hidden">सहायता</span>
      </button>

      {/* Admin Support Modal */}
      <AdminSupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </div>
  );
};
