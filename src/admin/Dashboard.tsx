import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Eye, 
  Layers, 
  Clock, 
  PlusCircle, 
  Share2, 
  DollarSign, 
  TrendingUp, 
  CheckCircle,
  ExternalLink,
  Flame,
  Sparkles,
  FileCheck,
  Trash2,
  DownloadCloud,
  Inbox
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { getThemeStyles } from '../utils/themeStyles';

export const Dashboard: React.FC = () => {
  const { 
    stories, 
    categories, 
    resetToInitialSeed, 
    clearAllStoriesAndCategories, 
    loadDemoData 
  } = useData();

  const totalStories = stories.length;
  const hindiStories = stories.filter(s => s.language === 'Hindi').length;
  const englishStories = stories.filter(s => s.language === 'English').length;
  const totalViews = stories.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const activeCategories = categories.filter(c => c.isActive).length;

  const recentStories = [...stories]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">
            Editorial Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Realtime overview of children stories, readers engagement, and dynamic themes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/add-story"
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Story</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Stories
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-800 dark:text-white">
            {totalStories}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            🇮🇳 {hindiStories} Hindi • 🇬🇧 {englishStories} English
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Story Views
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-800 dark:text-white">
            {totalViews.toLocaleString()}
          </p>
          <p className="mt-1 text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Realtime reader engagement
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Categories
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-800 dark:text-white">
            {categories.length}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            {activeCategories} Active • 5 Themed Collections
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Reading Time
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-black text-slate-800 dark:text-white">
            3.6 min
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Average story reading duration
          </p>
        </div>
      </div>

      {/* Quick Action Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Link
          to="/admin/add-story"
          className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-4 text-center hover:border-amber-400 hover:shadow-xs transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <PlusCircle className="w-5 h-5 text-amber-500 mb-1.5" />
          <span className="text-xs font-bold text-slate-800 dark:text-white">Write Story</span>
          <span className="text-[10px] text-slate-400">With live preview</span>
        </Link>

        <Link
          to="/admin/categories"
          className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-4 text-center hover:border-amber-400 hover:shadow-xs transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <Layers className="w-5 h-5 text-indigo-500 mb-1.5" />
          <span className="text-xs font-bold text-slate-800 dark:text-white">Categories</span>
          <span className="text-[10px] text-slate-400">Themes & images</span>
        </Link>

        <Link
          to="/admin/policies"
          className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-4 text-center hover:border-amber-400 hover:shadow-xs transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <FileCheck className="w-5 h-5 text-emerald-500 mb-1.5" />
          <span className="text-xs font-bold text-slate-800 dark:text-white">Policies & Legal</span>
          <span className="text-[10px] text-slate-400">AdSense & rules</span>
        </Link>

        <Link
          to="/admin/homepage"
          className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-4 text-center hover:border-amber-400 hover:shadow-xs transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <Sparkles className="w-5 h-5 text-pink-500 mb-1.5" />
          <span className="text-xs font-bold text-slate-800 dark:text-white">Homepage Hero</span>
          <span className="text-[10px] text-slate-400">Banner & headlines</span>
        </Link>

        <Link
          to="/admin/ads"
          className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-4 text-center hover:border-amber-400 hover:shadow-xs transition-all dark:border-slate-800 dark:bg-slate-900 col-span-2 sm:col-span-1"
        >
          <DollarSign className="w-5 h-5 text-amber-500 mb-1.5" />
          <span className="text-xs font-bold text-slate-800 dark:text-white">Google AdSense</span>
          <span className="text-[10px] text-slate-400">4 banner placements</span>
        </Link>
      </div>

      {/* Recent Stories & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Stories Table */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-slate-800 dark:text-white">
              Recently Added Stories
            </h3>
            {recentStories.length > 0 && (
              <Link
                to="/admin/stories"
                className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400"
              >
                View All &rarr;
              </Link>
            )}
          </div>

          {recentStories.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                <Inbox className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  No stories created yet
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Your platform is currently a clean slate. As administrator, you can start writing your first story whenever you're ready!
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/admin/add-story"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Your First Story</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <th className="py-2.5 font-bold">Story</th>
                    <th className="py-2.5 font-bold">Theme</th>
                    <th className="py-2.5 font-bold">Language</th>
                    <th className="py-2.5 font-bold">Views</th>
                    <th className="py-2.5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                  {recentStories.map(story => {
                    const themeStyle = getThemeStyles(story.theme);
                    return (
                      <tr key={story.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-3 flex items-center gap-2">
                          <img
                            src={story.thumbnailUrl || '/images/default-og.jpg'}
                            alt={story.title}
                            className="h-9 w-9 rounded-lg object-cover"
                          />
                          <div className="min-w-0 max-w-[220px]">
                            <p className="truncate font-bold">{story.title}</p>
                            <p className="text-[10px] text-slate-400">{story.categorySlug}</p>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${themeStyle.badgeClass}`}>
                            {story.theme}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold dark:bg-slate-800">
                            {story.language}
                          </span>
                        </td>
                        <td className="py-3 font-semibold">{story.views}</td>
                        <td className="py-3 text-right">
                          <Link
                            to={`/story/${story.slug}`}
                            target="_blank"
                            className="text-amber-600 hover:underline font-bold"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Category & Theme Status */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 dark:text-white">
              Categories ({categories.length})
            </h3>
            <Link
              to="/admin/categories"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            >
              Manage &rarr;
            </Link>
          </div>

          {categories.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center dark:border-slate-800 space-y-2">
              <Layers className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                No categories created yet
              </p>
              <p className="text-[11px] text-slate-400">
                Categories assign visual themes (Moral, Royal, Kids, Horror) to stories.
              </p>
              <Link
                to="/admin/categories"
                className="mt-2 inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create Category</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {categories.map(cat => {
                const themeStyle = getThemeStyles(cat.theme);
                const count = stories.filter(s => s.categorySlug === cat.slug).length;
                return (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 p-2.5 dark:border-slate-800 text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100">{cat.name}</p>
                      <span className="text-[10px] text-slate-400">{count} stories</span>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${themeStyle.badgeClass}`}>
                      {themeStyle.decorativeEmoji} {cat.theme}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Clean Slate & Demo Tools */}
          <div className="border-t border-slate-100 pt-3 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Admin Data Tools</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if (window.confirm('Clear all stories and categories to a complete clean slate (0 stories, 0 categories)?')) {
                    clearAllStoriesAndCategories();
                  }
                }}
                className="flex items-center justify-center gap-1 rounded-xl border border-red-200 bg-red-50/50 py-2 text-[11px] font-bold text-red-600 hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400 transition-colors"
                title="Wipe everything to 0 stories and 0 categories"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear All (0 Data)</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Load sample starter pack of Hindi and English stories and categories?')) {
                    loadDemoData();
                  }
                }}
                className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 py-2 text-[11px] font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-colors"
                title="Optional sample demo pack for quick testing"
              >
                <DownloadCloud className="w-3 h-3" />
                <span>Load Demo Pack</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
