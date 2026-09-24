import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, BookOpen, ShieldCheck, Mail, ArrowRight, Award, Compass } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEO } from '../components/common/SEO';
import { useData } from '../context/DataContext';

export const AboutPage: React.FC = () => {
  const { legalConfig } = useData();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 max-w-4xl space-y-8">
      <SEO
        title="About Us - KathaVichar Kids Story Platform"
        description="Learn about KathaVichar's mission to ignite imagination, foster moral values, and inspire children with safe stories in Hindi and English."
      />

      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-8 sm:p-12 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            Our Heart & Mission
          </span>
          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            About {legalConfig?.siteName || 'KathaVichar (कथाविचार)'}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            {legalConfig?.aboutText ||
              'A digital storytelling haven dedicated to nurturing young minds with wisdom, playful adventures, and timeless moral values in both Hindi and English.'}
          </p>
        </div>
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Key Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white">
            Moral Wisdom
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Every story concludes with a heartwarming moral lesson inspired by ancient fables, helping children build empathy and character.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white">
            Bilingual Joy
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Rich Hindi devanagari tales and fluent English narrations expand linguistic skills and preserve cultural roots for the new generation.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white">
            Child-Safe Environment
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            No intrusive trackers, COPPA-conscious guidelines, and family-appropriate clean advertising policies.
          </p>
        </div>
      </div>

      {/* Editorial and Contact Info */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
        <h2 className="text-base font-black text-slate-800 dark:text-white">
          Editorial Standards & Publishing
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Stories on {legalConfig?.siteName || 'KathaVichar'} are curated and reviewed by {legalConfig?.publisherName || 'KathaVichar Editorial Team'}. We strictly adhere to child-friendly storytelling principles, avoiding violence, sensationalism, or misleading clickbait.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Mail className="w-4 h-4 text-amber-500" />
            <span>Questions or suggestions: <strong>{legalConfig?.contactEmail || 'contact@kathavichar.com'}</strong></span>
          </div>
        </div>
      </div>

      {/* Explore Link */}
      <div className="text-center pt-4">
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all hover:scale-105 active:scale-95"
        >
          <span>Explore All Stories</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
