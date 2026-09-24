import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  Save, 
  ExternalLink, 
  Check, 
  Mail, 
  Building2, 
  Info,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const PolicySettings: React.FC = () => {
  const { legalConfig, updateLegalConfig } = useData();

  const storedAdminEmail = typeof window !== 'undefined'
    ? (localStorage.getItem('kathavichar_support_email') || localStorage.getItem('kathavichar_logged_admin_email') || '')
    : '';

  const [siteName, setSiteName] = useState(legalConfig?.siteName || 'KathaVichar (कथाविचार)');
  const [publisherName, setPublisherName] = useState(legalConfig?.publisherName || 'KathaVichar Editorial Team');
  const [contactEmail, setContactEmail] = useState(
    legalConfig?.contactEmail && legalConfig.contactEmail !== 'contact@kathavichar.com'
      ? legalConfig.contactEmail
      : (storedAdminEmail || legalConfig?.contactEmail || '')
  );
  const [customPrivacyPolicy, setCustomPrivacyPolicy] = useState(
    legalConfig?.customPrivacyPolicy || 
    'KathaVichar is dedicated to upholding the highest safety standards for young readers, parents, and teachers.'
  );
  const [customTerms, setCustomTerms] = useState(
    legalConfig?.customTerms || 
    'All stories, artwork, and educational material on KathaVichar are protected under copyright and fair use guidelines.'
  );
  const [customDisclaimer, setCustomDisclaimer] = useState(
    legalConfig?.customDisclaimer || 
    'All stories published on KathaVichar are intended for educational and entertainment purposes. Moral lessons are inspired by ancient folktales, Panchatantra, and classic bedtime lore.'
  );
  const [aboutText, setAboutText] = useState(
    legalConfig?.aboutText || 
    'KathaVichar (कथाविचार) is an inspiring digital sanctuary celebrating the magic of stories for kids in both Hindi and English. We believe that stories with morals shape compassionate, creative, and resilient minds.'
  );

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateLegalConfig({
        siteName,
        publisherName,
        contactEmail,
        customPrivacyPolicy,
        customTerms,
        customDisclaimer,
        aboutText
      });
      if (contactEmail) {
        localStorage.setItem('kathavichar_support_email', contactEmail);
        window.dispatchEvent(new CustomEvent('kathavichar_admin_email_updated', { detail: contactEmail }));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">
            Policies & Legal Management
          </h1>
          <p className="text-xs text-slate-500">
            Configure contact details, publisher credentials, AdSense policies, and legal statements for your site.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200">
            <Check className="w-4 h-4" />
            <span>Policies saved successfully!</span>
          </div>
        )}
      </div>

      {/* Quick Links to View Public Legal Pages */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <a
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-white">Privacy Policy</p>
              <p className="text-[10px] text-slate-400">View public page</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>

        <a
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-indigo-500" />
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-white">Terms of Service</p>
              <p className="text-[10px] text-slate-400">View public page</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>

        <a
          href="/disclaimer"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-white">Disclaimer & Ads</p>
              <p className="text-[10px] text-slate-400">View public page</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>

        <a
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs hover:border-amber-400 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-white">About Us</p>
              <p className="text-[10px] text-slate-400">View public page</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Site & Contact Details */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
          <h2 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-500" />
            Organization & Contact Information
          </h2>
          <p className="text-xs text-slate-500">
            These credentials appear across all public legal policies and help verify Google AdSense compliance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Site / Platform Name
              </label>
              <input
                type="text"
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Publisher / Team Name
              </label>
              <input
                type="text"
                value={publisherName}
                onChange={e => setPublisherName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                required
                placeholder="contact@kathavichar.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-medium focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Custom Policy Clauses */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-5">
          <h2 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Custom Policy Statements
          </h2>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Privacy Policy Highlight Note
            </label>
            <textarea
              rows={3}
              value={customPrivacyPolicy}
              onChange={e => setCustomPrivacyPolicy(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Displayed prominently on /privacy-policy highlighting child protection and cookie transparency.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Terms of Service Highlight Note
            </label>
            <textarea
              rows={3}
              value={customTerms}
              onChange={e => setCustomTerms(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Disclaimer & Google AdSense Compliance Statement
            </label>
            <textarea
              rows={3}
              value={customDisclaimer}
              onChange={e => setCustomDisclaimer(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              About Us / Mission Statement
            </label>
            <textarea
              rows={4}
              value={aboutText}
              onChange={e => setAboutText(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <p className="mt-1 text-[11px] text-slate-400">
              Appears on the public /about page to introduce readers and parents to the platform's vision.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 disabled:opacity-50 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Changes...' : 'Save Policies & Legal Info'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
