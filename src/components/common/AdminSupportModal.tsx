import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Copy, 
  Check, 
  Headphones, 
  Sparkles, 
  Send,
  MessageSquareHeart,
  ExternalLink
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AdminSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSupportModal: React.FC<AdminSupportModalProps> = ({ isOpen, onClose }) => {
  const { adminSupportEmail, legalConfig } = useData();
  const supportEmail = adminSupportEmail || legalConfig?.contactEmail || 'contact@kathavichar.com';

  const [copied, setCopied] = useState(false);
  const [userName, setUserName] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('कहानी का सुझाव (Story Idea)');

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(supportEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[KathaVichar] ${selectedTopic} - from ${userName || 'Reader'}`);
    const body = encodeURIComponent(
      `नमस्ते एडमिन,\n\n${userMsg}\n\nसादर,\n${userName || 'पाठक'}`
    );
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-amber-500/10 px-6 py-4 dark:border-slate-800 dark:bg-amber-950/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 dark:text-white text-base flex items-center gap-2">
                <span>एडमिन सहायता • Admin Support</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Direct assistance from KathaVichar administrator
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Admin Email Highlight Card */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-1">
              Admin Login & Support Email
            </span>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 font-mono text-sm font-bold text-slate-800 dark:text-slate-100">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="break-all">{supportEmail}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors cursor-pointer shadow-2xs"
                  title="Copy admin email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>

                <a
                  href={`mailto:${supportEmail}?subject=KathaVichar%20Support`}
                  className="flex items-center gap-1 rounded-xl bg-amber-500 px-3 py-1 text-xs font-bold text-white hover:bg-amber-600 transition-colors shadow-2xs"
                >
                  <Send className="w-3 h-3" />
                  <span>Mail</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <form onSubmit={handleSendEmail} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                विषय • Topic
              </label>
              <select
                value={selectedTopic}
                onChange={e => setSelectedTopic(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-hidden"
              >
                <option value="कहानी का सुझाव (Story Idea)">✨ कहानी का सुझाव (Story Idea)</option>
                <option value="फीडबैक और सुधार (Feedback)">💬 फीडबैक और सुधार (Feedback)</option>
                <option value="वेबसाइट सहायता (Technical Issue)">🛠️ वेबसाइट सहायता (Technical Issue)</option>
                <option value="कॉपीराइट या अन्य (General Inquiry)">📜 कॉपीराइट या अन्य प्रश्न (General Inquiry)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                आपका नाम • Your Name (Optional)
              </label>
              <input
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="e.g. राहुल / Priya"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                संदेश • Message for Admin
              </label>
              <textarea
                rows={3}
                required
                value={userMsg}
                onChange={e => setUserMsg(e.target.value)}
                placeholder="एडमिन को अपना सवाल, सुझाव या समस्या यहाँ लिखें..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-hidden resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>एडमिन को ईमेल भेजें (Send to Admin)</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
