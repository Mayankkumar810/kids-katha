import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Clock, Eye, Sparkles } from 'lucide-react';
import { Story } from '../../types';
import { getThemeStyles } from '../../utils/themeStyles';
import { useData } from '../../context/DataContext';
import { stripHtmlTags } from '../../utils/htmlStoryUtils';

interface StoryCardProps {
  story: Story;
  layout?: 'grid' | 'horizontal';
  priority?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, layout = 'grid' }) => {
  const { isBookmarked, toggleBookmark, categories } = useData();
  const themeStyle = getThemeStyles(story.theme);
  const bookmarked = isBookmarked(story.slug);

  const category = categories.find(c => c.slug === story.categorySlug);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(story.slug);
  };

  if (layout === 'horizontal') {
    return (
      <div
        className={`group relative flex flex-col sm:flex-row gap-4 overflow-hidden rounded-2xl border ${themeStyle.cardBorder} bg-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${themeStyle.cardShadow} dark:bg-slate-900`}
      >
        <Link to={`/story/${story.slug}`} className="sm:w-44 shrink-0 overflow-hidden rounded-xl">
          <div className="relative aspect-[16/10] sm:h-full w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={story.thumbnailUrl || '/images/default-og.jpg'}
              alt={story.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/default-og.jpg';
              }}
            />
            <span
              className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[11px] font-bold shadow-xs backdrop-blur-md ${themeStyle.badgeClass}`}
            >
              {story.theme}
            </span>
          </div>
        </Link>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                {category?.name || story.categorySlug}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {story.language === 'Hindi' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
              </span>
            </div>

            <Link to={`/story/${story.slug}`} className="mt-1.5 block">
              <h3 className="text-base font-bold text-slate-800 transition-colors group-hover:text-amber-600 dark:text-slate-100 dark:group-hover:text-amber-400">
                {story.title}
              </h3>
            </Link>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {stripHtmlTags(story.metaDescription)}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-400 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {story.readingTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {story.views}
              </span>
            </div>

            <button
              onClick={handleBookmarkClick}
              title={bookmarked ? 'Remove bookmark' : 'Bookmark story'}
              className={`rounded-full p-1.5 transition-colors ${
                bookmarked
                  ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout default
  return (
    <article
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border ${themeStyle.cardBorder} bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${themeStyle.cardShadow} dark:bg-slate-900`}
    >
      <div>
        {/* Thumbnail + Overlays */}
        <Link to={`/story/${story.slug}`} className="block overflow-hidden">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={story.thumbnailUrl || '/images/default-og.jpg'}
              alt={story.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/default-og.jpg';
              }}
            />

            {/* Gradient bottom overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

            {/* Theme badge top-left */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span
                className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold shadow-xs backdrop-blur-md border ${themeStyle.badgeClass}`}
              >
                <span>{themeStyle.decorativeEmoji}</span>
                <span>{story.theme}</span>
              </span>
            </div>

            {/* Bookmark button top-right */}
            <button
              onClick={handleBookmarkClick}
              title={bookmarked ? 'Remove bookmark' : 'Bookmark story'}
              className={`absolute top-2.5 right-2.5 rounded-full p-2 backdrop-blur-md shadow-sm transition-transform active:scale-95 ${
                bookmarked
                  ? 'bg-amber-500 text-white'
                  : 'bg-white/90 text-slate-700 hover:bg-white dark:bg-slate-900/90 dark:text-slate-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Language badge bottom-left */}
            <div className="absolute bottom-2 left-2.5">
              <span className="rounded-md bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-medium text-white">
                {story.language === 'Hindi' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
              </span>
            </div>
          </div>
        </Link>

        {/* Content Body */}
        <div className="p-4">
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link
              to={`/category/${story.categorySlug}`}
              className="font-semibold text-amber-600 hover:underline dark:text-amber-400"
            >
              {category?.name || story.categorySlug}
            </Link>
            <span className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-slate-400" />
              {story.readingTime}
            </span>
          </div>

          <Link to={`/story/${story.slug}`} className="mt-2 block">
            <h3 className="text-base font-bold tracking-tight text-slate-800 transition-colors group-hover:text-amber-600 dark:text-slate-100 dark:group-hover:text-amber-400 line-clamp-2">
              {story.title}
            </h3>
          </Link>

          <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
            {stripHtmlTags(story.metaDescription)}
          </p>

          {story.moral && (
            <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 p-2 text-[11px] text-amber-900 dark:text-amber-300">
              <Sparkles className="w-3 h-3 shrink-0 text-amber-500 mt-0.5" />
              <span className="line-clamp-1 italic font-medium">
                <span className="font-semibold">Moral:</span> {story.moral}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5 text-xs text-slate-400 dark:border-slate-800">
        <span className="flex items-center gap-1 text-[11px]">
          <Eye className="w-3.5 h-3.5" />
          <span>{story.views} views</span>
        </span>

        <Link
          to={`/story/${story.slug}`}
          className="font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 text-xs flex items-center gap-1"
        >
          Read Story &rarr;
        </Link>
      </div>
    </article>
  );
};
