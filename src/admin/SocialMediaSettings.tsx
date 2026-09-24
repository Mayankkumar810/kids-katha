import React, { useState } from 'react';
import { Share2, Youtube, Instagram, Send, Facebook, Check, Save } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SocialMediaConfig } from '../types';

export const SocialMediaSettings: React.FC = () => {
  const { socialMedia, updateSocialMedia } = useData();
  const [formData, setFormData] = useState<SocialMediaConfig>({ ...socialMedia });
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSocialMedia(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">
          Social Media Settings
        </h1>
        <p className="text-xs text-slate-500">
          Configure channel URLs and toggle whether they are visible to kids and families on the website.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-6">
        {saved && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Check className="w-4 h-4 shrink-0" />
            <span>Social media links updated successfully!</span>
          </div>
        )}

        {/* YouTube */}
        <div className="space-y-2 border-b border-slate-100 pb-5 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                <Youtube className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-white">YouTube Channel</span>
            </div>
            <label className="flex items-center gap-2 text-xs cursor-pointer font-bold text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={formData.youtube.enabled}
                onChange={e =>
                  setFormData({
                    ...formData,
                    youtube: { ...formData.youtube, enabled: e.target.checked }
                  })
                }
                className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>Enabled</span>
            </label>
          </div>
          <input
            type="url"
            placeholder="https://youtube.com/@kathavichar"
            value={formData.youtube.url}
            onChange={e =>
              setFormData({
                ...formData,
                youtube: { ...formData.youtube, url: e.target.value }
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Instagram */}
        <div className="space-y-2 border-b border-slate-100 pb-5 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-950/50 dark:text-pink-400">
                <Instagram className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-white">Instagram Profile</span>
            </div>
            <label className="flex items-center gap-2 text-xs cursor-pointer font-bold text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={formData.instagram.enabled}
                onChange={e =>
                  setFormData({
                    ...formData,
                    instagram: { ...formData.instagram, enabled: e.target.checked }
                  })
                }
                className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>Enabled</span>
            </label>
          </div>
          <input
            type="url"
            placeholder="https://instagram.com/kathavichar.stories"
            value={formData.instagram.url}
            onChange={e =>
              setFormData({
                ...formData,
                instagram: { ...formData.instagram, url: e.target.value }
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Telegram */}
        <div className="space-y-2 border-b border-slate-100 pb-5 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400">
                <Send className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-white">Telegram Community</span>
            </div>
            <label className="flex items-center gap-2 text-xs cursor-pointer font-bold text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={formData.telegram.enabled}
                onChange={e =>
                  setFormData({
                    ...formData,
                    telegram: { ...formData.telegram, enabled: e.target.checked }
                  })
                }
                className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>Enabled</span>
            </label>
          </div>
          <input
            type="url"
            placeholder="https://t.me/kathavicharkids"
            value={formData.telegram.url}
            onChange={e =>
              setFormData({
                ...formData,
                telegram: { ...formData.telegram, url: e.target.value }
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Facebook */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                <Facebook className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-white">Facebook Page</span>
            </div>
            <label className="flex items-center gap-2 text-xs cursor-pointer font-bold text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={formData.facebook.enabled}
                onChange={e =>
                  setFormData({
                    ...formData,
                    facebook: { ...formData.facebook, enabled: e.target.checked }
                  })
                }
                className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>Enabled</span>
            </label>
          </div>
          <input
            type="url"
            placeholder="https://facebook.com/kathavichar"
            value={formData.facebook.url}
            onChange={e =>
              setFormData({
                ...formData,
                facebook: { ...formData.facebook, url: e.target.value }
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Social Links</span>
          </button>
        </div>
      </form>
    </div>
  );
};
