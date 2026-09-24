import React from 'react';
import { useData } from '../../context/DataContext';

interface AdBannerProps {
  position: 'header' | 'in-content' | 'sidebar' | 'footer';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  const { adsConfig } = useData();

  const getSlotConfig = () => {
    switch (position) {
      case 'header':
        return adsConfig.headerAd;
      case 'in-content':
        return adsConfig.inContentAd;
      case 'sidebar':
        return adsConfig.sidebarAd;
      case 'footer':
        return adsConfig.footerAd;
      default:
        return null;
    }
  };

  const slot = getSlotConfig();

  if (!slot || !slot.enabled) {
    return null;
  }

  // Size details for clean responsive layouts
  const getDimensionClass = () => {
    switch (position) {
      case 'header':
        return 'w-full min-h-[90px] max-w-4xl';
      case 'in-content':
        return 'w-full min-h-[120px] max-w-2xl my-8';
      case 'sidebar':
        return 'w-full min-h-[250px] max-w-[300px]';
      case 'footer':
        return 'w-full min-h-[90px] max-w-4xl my-6';
    }
  };

  return (
    <div
      className={`mx-auto flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300/80 bg-slate-50/80 p-3 text-center transition-all dark:border-slate-800 dark:bg-slate-900/60 ${getDimensionClass()} ${className}`}
    >
      <div className="mb-1.5 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        <span>Advertisement</span>
        <span>•</span>
        <span className="font-hindi">विज्ञापन</span>
      </div>

      {slot.code && slot.code.includes('<ins') ? (
        // Real or injected AdSense code
        <div
          className="w-full flex justify-center items-center overflow-hidden text-xs text-slate-500"
          dangerouslySetInnerHTML={{ __html: slot.code }}
        />
      ) : (
        // Standard compliant AdSense preview slot
        <div className="flex flex-col items-center justify-center p-3 text-slate-400 dark:text-slate-600">
          <div className="flex items-center gap-2">
            <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[9px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Google AdSense
            </span>
            <span className="text-xs">
              {position === 'header' && 'Leaderboard Banner (728x90 / Responsive)'}
              {position === 'in-content' && 'In-Article Native Ad Unit'}
              {position === 'sidebar' && 'Sticky Display Unit (300x250)'}
              {position === 'footer' && 'Footer Responsive Banner'}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Ad slot configured via Admin Panel
          </p>
        </div>
      )}
    </div>
  );
};
