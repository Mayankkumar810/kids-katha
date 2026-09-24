import React, { useState } from 'react';
import { DollarSign, Check, Save, Info, AlertTriangle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { AdsConfig } from '../types';

export const AdsSettings: React.FC = () => {
  const { adsConfig, updateAdsConfig } = useData();
  const [formData, setFormData] = useState<AdsConfig>({ ...adsConfig });
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAdsConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">
          Google AdSense & Monetization
        </h1>
        <p className="text-xs text-slate-500">
          Configure compliant ad slots for Header, In-Article content, Sidebar, and Footer.
        </p>
      </div>

      {/* AdSense Policy Banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
        <Info className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Google AdSense Policy Compliance:</p>
          <p className="text-[11px] leading-relaxed">
            All ads on KathaVichar are labeled with "Advertisement / विज्ञापन" to ensure zero deceptive click activity.
            Make sure your Google AdSense account has approved this domain before pasting live client tags.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-6">
        {saved && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Check className="w-4 h-4 shrink-0" />
            <span>AdSense configurations saved successfully!</span>
          </div>
        )}

        {/* 1. Header Ad */}
        <div className="space-y-2 border-b border-slate-100 pb-5 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                1. Header Banner Slot (728x90 / Responsive Leaderboard)
              </span>
              <p className="text-[11px] text-slate-400">Renders directly below the navbar on top pages.</p>
            </div>
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={formData.headerAd.enabled}
                onChange={e =>
                  setFormData({
                    ...formData,
                    headerAd: { ...formData.headerAd, enabled: e.target.checked }
                  })
                }
                className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>Enabled</span>
            </label>
          </div>
          <textarea
            rows={3}
            placeholder='<ins class="adsbygoogle" ...></ins>'
            value={formData.headerAd.code}
            onChange={e =>
              setFormData({
                ...formData,
                headerAd: { ...formData.headerAd, code: e.target.value }
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-mono text-[11px] text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>

        {/* 2. In-Content Ad */}
        <div className="space-y-2 border-b border-slate-100 pb-5 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                2. In-Content Native Ad (In-Article Unit)
              </span>
              <p className="text-[11px] text-slate-400">Inserted automatically between story paragraphs.</p>
            </div>
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={formData.inContentAd.enabled}
                onChange={e =>
                  setFormData({
                    ...formData,
                    inContentAd: { ...formData.inContentAd, enabled: e.target.checked }
                  })
                }
                className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>Enabled</span>
            </label>
          </div>
          <textarea
            rows={3}
            placeholder='<ins class="adsbygoogle" ... data-ad-layout="in-article" ...></ins>'
            value={formData.inContentAd.code}
            onChange={e =>
              setFormData({
                ...formData,
                inContentAd: { ...formData.inContentAd, code: e.target.value }
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-mono text-[11px] text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>

        {/* 3. Sidebar Ad */}
        <div className="space-y-2 border-b border-slate-100 pb-5 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                3. Sidebar Sticky Display Ad (300x250 / 300x600)
              </span>
              <p className="text-[11px] text-slate-400">Renders on the right sidebar on desktop views.</p>
            </div>
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={formData.sidebarAd.enabled}
                onChange={e =>
                  setFormData({
                    ...formData,
                    sidebarAd: { ...formData.sidebarAd, enabled: e.target.checked }
                  })
                }
                className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>Enabled</span>
            </label>
          </div>
          <textarea
            rows={3}
            placeholder='<ins class="adsbygoogle" ... width:300px;height:250px ...></ins>'
            value={formData.sidebarAd.code}
            onChange={e =>
              setFormData({
                ...formData,
                sidebarAd: { ...formData.sidebarAd, code: e.target.value }
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-mono text-[11px] text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>

        {/* 4. Footer Ad */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                4. Footer Leaderboard Ad (728x90 / Responsive)
              </span>
              <p className="text-[11px] text-slate-400">Positioned above the website footer credits.</p>
            </div>
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={formData.footerAd.enabled}
                onChange={e =>
                  setFormData({
                    ...formData,
                    footerAd: { ...formData.footerAd, enabled: e.target.checked }
                  })
                }
                className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>Enabled</span>
            </label>
          </div>
          <textarea
            rows={3}
            placeholder='<ins class="adsbygoogle" ...></ins>'
            value={formData.footerAd.code}
            onChange={e =>
              setFormData({
                ...formData,
                footerAd: { ...formData.footerAd, code: e.target.value }
              })
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-mono text-[11px] text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Ad Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
