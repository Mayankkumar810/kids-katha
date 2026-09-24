import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, BookOpen, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-lg">
      <SEO
        title="Page Not Found (404) - KathaVichar"
        description="The story page you are looking for has wandered into another realm of imagination."
      />

      <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-amber-100 text-amber-600 shadow-xl dark:bg-amber-950/40 dark:text-amber-400">
        <Compass className="h-14 w-14 animate-spin-slow" />
        <span className="absolute -bottom-2 -right-2 rounded-full bg-pink-500 px-2.5 py-0.5 text-xs font-black text-white shadow-sm">
          404
        </span>
      </div>

      <h1 className="mt-8 text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
        Oops! This Story Has Wandered Away...
      </h1>

      <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        It looks like the magical page you were seeking has floated over the rainbow or was tucked away in a secret drawer.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-2xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 transition-transform active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          to="/stories"
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Browse All Stories</span>
        </Link>
      </div>
    </div>
  );
};
