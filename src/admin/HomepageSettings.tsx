import React, { useState } from 'react';
import { Sparkles, Check, Save, Image as ImageIcon } from 'lucide-react';
import { useData } from '../context/DataContext';
import { HomepageConfig } from '../types';

export const HomepageSettings: React.FC = () => {
  const { homepageConfig, updateHomepageConfig } = useData();
  const [formData, setFormData] = useState<HomepageConfig>({ ...homepageConfig });
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHomepageConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">
          Homepage Hero & Banner Settings
        </h1>
        <p className="text-xs text-slate-500">
          Control the primary hero image URL, headlines, and call-to-action on the front page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-6">
        {saved && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Check className="w-4 h-4 shrink-0" />
            <span>Homepage configuration saved successfully!</span>
          </div>
        )}

        {/* 📸 IMAGE SYSTEM (HERO: 1200x500) */}
        <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-amber-500" />
              <span>Hero Background Image URL</span>
            </label>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="rounded bg-amber-100 dark:bg-amber-950/80 px-1.5 py-0.5 font-bold text-amber-800 dark:text-amber-300">
                Recommended: 1200x500
              </span>
              <span>Format: JPG/PNG</span>
              <span>Max: &lt;600KB</span>
            </div>
          </div>

          <input
            type="url"
            required
            value={formData.heroImageUrl}
            onChange={e => setFormData({ ...formData, heroImageUrl: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs focus:border-amber-500 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

          {formData.heroImageUrl && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400">Live Preview:</span>
              <div className="relative aspect-[12/5] w-full overflow-hidden rounded-xl border border-slate-200 shadow-xs">
                <img
                  src={formData.heroImageUrl}
                  alt="Hero Preview"
                  className="h-full w-full object-cover"
                  onError={e => {
                    (e.target as HTMLImageElement).src = '/images/default-og.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center p-4">
                  <div className="text-white">
                    <p className="text-xs font-bold text-amber-300">{formData.heroBadge}</p>
                    <p className="text-base font-black truncate">{formData.heroTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hero Badge */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Top Hero Tag / Badge
          </label>
          <input
            type="text"
            value={formData.heroBadge}
            onChange={e => setFormData({ ...formData, heroBadge: e.target.value })}
            placeholder="✨ Magic of Stories in Hindi & English"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Hero Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Main Hero Headline *
          </label>
          <input
            type="text"
            required
            value={formData.heroTitle}
            onChange={e => setFormData({ ...formData, heroTitle: e.target.value })}
            placeholder="Step Into Worlds of Wonder & Wisdom"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Hero Subtitle */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Hero Subtitle / Description
          </label>
          <textarea
            rows={3}
            value={formData.heroSubtitle}
            onChange={e => setFormData({ ...formData, heroSubtitle: e.target.value })}
            placeholder="Handpicked moral tales, Panchatantra wisdom..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              CTA Button Text
            </label>
            <input
              type="text"
              value={formData.heroButtonText}
              onChange={e => setFormData({ ...formData, heroButtonText: e.target.value })}
              placeholder="Explore All Stories"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              CTA Button Link
            </label>
            <input
              type="text"
              value={formData.heroButtonLink}
              onChange={e => setFormData({ ...formData, heroButtonLink: e.target.value })}
              placeholder="/stories"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Hero Banner</span>
          </button>
        </div>
      </form>
    </div>
  );
};
