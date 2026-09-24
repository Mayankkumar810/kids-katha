import React from 'react';

export const StoryCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 animate-pulse dark:border-slate-800 dark:bg-slate-900">
      <div className="aspect-[16/10] w-full bg-slate-200 dark:bg-slate-800" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-4/6 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="border-t border-slate-100 p-3 dark:border-slate-800 flex justify-between">
        <div className="h-3 w-14 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
};

export const StoryDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse space-y-6">
      <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-8 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="aspect-[16/9] w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-3 pt-4">
        <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
};
