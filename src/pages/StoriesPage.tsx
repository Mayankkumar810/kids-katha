import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, BookOpen, X, RefreshCw } from 'lucide-react';
import { useData } from '../context/DataContext';
import { StoryCard } from '../components/common/StoryCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEO } from '../components/common/SEO';
import { AdBanner } from '../components/common/AdBanner';
import { ThemeType, LanguageType } from '../types';

const ITEMS_PER_PAGE = 6;

export const StoriesPage: React.FC = () => {
  const { stories, categories } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search parameters from URL
  const queryParam = searchParams.get('q') || '';
  const langParam = (searchParams.get('lang') as LanguageType) || '';
  const catParam = searchParams.get('cat') || '';
  const themeParam = (searchParams.get('theme') as ThemeType) || '';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(langParam || 'All');
  const [selectedCategory, setSelectedCategory] = useState<string>(catParam || 'All');
  const [selectedTheme, setSelectedTheme] = useState<string>(themeParam || 'All');
  const [sortBy, setSortBy] = useState<'newest' | 'views' | 'readingTime'>('newest');
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  // Filter stories
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = story.title.toLowerCase().includes(term);
        const matchesContent = story.content.toLowerCase().includes(term);
        const matchesKeywords = story.keywords?.some(k => k.toLowerCase().includes(term));
        const matchesMoral = story.moral?.toLowerCase().includes(term);
        if (!matchesTitle && !matchesContent && !matchesKeywords && !matchesMoral) {
          return false;
        }
      }

      // Language
      if (selectedLanguage !== 'All' && story.language !== selectedLanguage) {
        return false;
      }

      // Category
      if (selectedCategory !== 'All' && story.categorySlug !== selectedCategory) {
        return false;
      }

      // Theme
      if (selectedTheme !== 'All' && story.theme !== selectedTheme) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'views') {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === 'readingTime') {
        const timeA = parseInt(a.readingTime) || 0;
        const timeB = parseInt(b.readingTime) || 0;
        return timeA - timeB;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [stories, searchTerm, selectedLanguage, selectedCategory, selectedTheme, sortBy]);

  const displayedStories = filteredStories.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStories.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('All');
    setSelectedCategory('All');
    setSelectedTheme('All');
    setSortBy('newest');
    setVisibleCount(ITEMS_PER_PAGE);
    setSearchParams({});
  };

  const hasActiveFilters =
    searchTerm ||
    selectedLanguage !== 'All' ||
    selectedCategory !== 'All' ||
    selectedTheme !== 'All' ||
    sortBy !== 'newest';

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 space-y-6">
      <SEO
        title="All Kids Stories in Hindi & English - Moral & Bedtime Library"
        description="Browse our rich library of Hindi and English children stories, Panchatantra classics, Akbar Birbal wit, and bedtime fairy tales."
        keywords={['story library', 'all kids stories', 'hindi panchatantra', 'english bedtime stories', 'search stories']}
      />

      <Breadcrumbs items={[{ label: 'All Stories' }]} />

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-pink-500 to-indigo-600 p-6 sm:p-10 text-white shadow-lg">
        <div className="max-w-2xl space-y-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md">
            📚 Discover & Learn
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Story Library (कहानियों का खजाना)
          </h1>
          <p className="text-xs sm:text-sm text-white/90">
            Filter through moral tales, Panchatantra fables, magical adventures, and bedtime stories
            in both Hindi and English.
          </p>
        </div>
      </div>

      {/* Header Ad Slot */}
      <AdBanner position="header" />

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search stories by title, character (शेर, squirrel, Birbal), or keyword..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Language filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Language (भाषा)
            </label>
            <select
              value={selectedLanguage}
              onChange={e => {
                setSelectedLanguage(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className="w-full rounded-xl border border-slate-200 bg-white p-2 font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="All">All Languages (सभी भाषाएँ)</option>
              <option value="Hindi">🇮🇳 हिंदी (Hindi)</option>
              <option value="English">🇬🇧 English</option>
            </select>
          </div>

          {/* Category filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className="w-full rounded-xl border border-slate-200 bg-white p-2 font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Story Theme
            </label>
            <select
              value={selectedTheme}
              onChange={e => {
                setSelectedTheme(e.target.value);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className="w-full rounded-xl border border-slate-200 bg-white p-2 font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="All">All Themes</option>
              <option value="Kids">🎈 Kids (Playful)</option>
              <option value="Moral">🌱 Moral (Wisdom)</option>
              <option value="Royal">👑 Royal (Akbar Birbal)</option>
              <option value="Horror">🕯️ Horror / Mystery</option>
              <option value="Default">✨ Default (Bedtime)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 bg-white p-2 font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="newest">Newest First</option>
              <option value="views">Most Read (Popularity)</option>
              <option value="readingTime">Quickest Read (Short)</option>
            </select>
          </div>
        </div>

        {/* Results summary and reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800">
          <span>
            Found <strong>{filteredStories.length}</strong> stories matching your filters
          </span>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Stories Grid */}
      {displayedStories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
          <BookOpen className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-white">
            No stories found
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Try adjusting your search keywords or switching filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Infinite Scroll / Load More Pagination */}
      {hasMore && (
        <div className="text-center pt-6">
          <button
            onClick={handleLoadMore}
            className="rounded-2xl border-2 border-amber-500 px-8 py-3 text-xs font-bold text-amber-600 hover:bg-amber-500 hover:text-white transition-all shadow-xs active:scale-95 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-slate-900"
          >
            Load More Stories ({filteredStories.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
};
