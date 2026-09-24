import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, BookOpen } from 'lucide-react';
import { useData } from '../context/DataContext';
import { StoryCard } from '../components/common/StoryCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEO } from '../components/common/SEO';

export const BookmarksPage: React.FC = () => {
  const { bookmarks, stories, toggleBookmark } = useData();

  const savedStories = stories.filter(s => bookmarks.includes(s.slug));

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 space-y-6">
      <SEO
        title="My Saved Bookmarks - KathaVichar"
        description="Access all your saved favorite stories and bedtime tales in one safe place on KathaVichar."
      />

      <Breadcrumbs items={[{ label: 'Saved Bookmarks' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-amber-500/10 p-6 sm:p-8 border border-amber-200 dark:border-amber-900/30 dark:bg-amber-950/20">
        <div>
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Bookmark className="w-4 h-4 fill-amber-500 text-amber-500" /> Personal Reading List
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
            Saved Bookmarks ({savedStories.length})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Keep your children's favorite tales handy for storytime every night.
          </p>
        </div>

        {savedStories.length > 0 && (
          <button
            onClick={() => bookmarks.forEach(slug => toggleBookmark(slug))}
            className="flex items-center gap-1.5 self-start sm:self-center rounded-xl border border-red-200 bg-white px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:bg-slate-900 dark:hover:bg-red-950/40 transition-colors shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Bookmarks</span>
          </button>
        )}
      </div>

      {savedStories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
          <Bookmark className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600" />
          <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">
            No bookmarked stories yet
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark ribbon icon on any story to save it here for offline reading or quick bedtime access!
          </p>
          <Link
            to="/stories"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-amber-600"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Stories</span>
          </Link>
        </div>
      )}
    </div>
  );
};
