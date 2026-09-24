import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  Compass, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  ArrowRight, 
  Bookmark, 
  PlayCircle,
  RotateCcw,
  CheckCircle2,
  Youtube,
  Instagram,
  Send,
  Facebook
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { StoryCard } from '../components/common/StoryCard';
import { AdBanner } from '../components/common/AdBanner';
import { SEO } from '../components/common/SEO';
import { getThemeStyles } from '../utils/themeStyles';
import { stripHtmlTags } from '../utils/htmlStoryUtils';

export const HomePage: React.FC = () => {
  const { 
    stories, 
    categories, 
    homepageConfig, 
    socialMedia, 
    readingProgress 
  } = useData();

  const [activeLangFilter, setActiveLangFilter] = useState<'All' | 'Hindi' | 'English'>('All');
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const activeCategories = categories.filter(c => c.isActive);

  // Filter stories
  const filteredStories = stories.filter(s => {
    if (activeLangFilter === 'All') return true;
    return s.language === activeLangFilter;
  });

  const featuredStories = stories.filter(s => s.isFeatured);
  const trendingStories = [...stories].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);
  const recentStories = [...filteredStories].slice(0, 6);
  const suggestedStories = [...stories]
    .filter(s => !s.isFeatured)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  // Continue reading history
  const continueReadingList = Object.values(readingProgress)
    .filter(p => p.progressPercent > 5 && p.progressPercent < 95)
    .slice(0, 3);

  // Auto advance featured slider every 6 seconds
  useEffect(() => {
    if (featuredStories.length <= 1) return;
    const timer = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % featuredStories.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredStories.length]);

  const currentFeatured = featuredStories[featuredIndex] || stories[0];
  const featuredTheme = currentFeatured ? getThemeStyles(currentFeatured.theme) : getThemeStyles('Default');

  return (
    <div className="space-y-12">
      <SEO
        title="Enchanting Kids Stories in Hindi & English (बाल कहानियां)"
        description="Read top moral tales, Akbar Birbal wit, Panchatantra classics, and soothing bedtime stories for kids in Hindi and English. Safe, educational, and fun!"
        keywords={['kids stories', 'hindi kahani', 'panchatantra', 'akbar birbal', 'bedtime stories', 'moral stories for children']}
      />

      {/* Header Ad Slot */}
      <div className="container mx-auto px-4 pt-2">
        <AdBanner position="header" />
      </div>

      {/* 1. HERO BANNER (Admin Controlled Image URL & Content) */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
          {/* Background Hero Image with Dark Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={homepageConfig.heroImageUrl || '/images/default-og.jpg'}
              alt={homepageConfig.heroTitle}
              className="h-full w-full object-cover object-center opacity-40 filter saturate-125 scale-105 transition-transform duration-1000"
              onError={e => {
                (e.target as HTMLImageElement).src = '/images/default-og.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />
          </div>

          <div className="relative z-10 max-w-2xl px-5 py-12 sm:px-12 sm:py-24">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-bold text-amber-300 backdrop-blur-md border border-amber-300/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{homepageConfig.heroBadge || 'Magic of Stories in Hindi & English'}</span>
            </div>

            <h1 className="mt-4 text-2xl sm:text-5xl font-black tracking-tight font-english leading-tight text-white drop-shadow-md break-words">
              {homepageConfig.heroTitle || 'Step Into Worlds of Wonder & Wisdom'}
            </h1>

            <p className="mt-3 text-xs sm:text-base leading-relaxed text-slate-300 break-words">
              {homepageConfig.heroSubtitle ||
                'Handpicked moral tales, Panchatantra wisdom, and bedtime adventures created lovingly for young dreamers and mindful parents.'}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                to={homepageConfig.heroButtonLink || '/stories'}
                className="flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-amber-500/30 hover:bg-amber-600 transition-all hover:scale-105 active:scale-95"
              >
                <span>{homepageConfig.heroButtonText || 'Explore All Stories'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/stories?lang=Hindi"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 font-hindi"
              >
                <span>🇮🇳 हिंदी कहानियाँ</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTINUE READING SECTION (If any active stories) */}
      {continueReadingList.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                <RotateCcw className="w-4 h-4 text-amber-600" /> Continue Reading
              </h3>
              <span className="text-[11px] text-amber-700 dark:text-amber-300">
                Pick up right where you left off
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {continueReadingList.map(item => (
                <Link
                  key={item.storySlug}
                  to={`/story/${item.storySlug}`}
                  className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-xs hover:shadow-md transition-all dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                >
                  <img
                    src={item.thumbnailUrl || '/images/default-og.jpg'}
                    alt={item.title}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                      {item.title}
                    </p>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{item.progressPercent}% finished</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. FEATURED STORIES SLIDER / CAROUSEL */}
      {featuredStories.length > 0 && currentFeatured && (
        <section className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" /> Handpicked Specials
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
                Featured Stories
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setFeaturedIndex(prev =>
                    prev === 0 ? featuredStories.length - 1 : prev - 1
                  )
                }
                className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                title="Previous Story"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setFeaturedIndex(prev => (prev + 1) % featuredStories.length)
                }
                className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                title="Next Story"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className={`relative overflow-hidden rounded-3xl border ${featuredTheme.cardBorder} bg-gradient-to-br ${featuredTheme.gradientBg} p-6 sm:p-8 transition-all duration-500 shadow-md`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image banner */}
              <div className="lg:col-span-7">
                <Link to={`/story/${currentFeatured.slug}`} className="block group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={currentFeatured.bannerUrl || currentFeatured.thumbnailUrl || '/images/default-og.jpg'}
                      alt={currentFeatured.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={e => {
                        (e.target as HTMLImageElement).src = '/images/default-og.jpg';
                      }}
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold shadow-md ${featuredTheme.badgeClass}`}>
                        {featuredTheme.decorativeEmoji} {currentFeatured.theme} Theme
                      </span>
                      <span className="rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-white">
                        {currentFeatured.language === 'Hindi' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Text content */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentFeatured.readingTime}</span>
                  <span>•</span>
                  <span>{currentFeatured.views} views</span>
                </div>

                <Link to={`/story/${currentFeatured.slug}`}>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    {currentFeatured.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                  {stripHtmlTags(currentFeatured.metaDescription)}
                </p>

                {currentFeatured.moral && (
                  <div className={`rounded-xl p-3 text-xs ${featuredTheme.moralBoxClass}`}>
                    <span className="font-bold">Moral: </span>
                    <span>{currentFeatured.moral}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    to={`/story/${currentFeatured.slug}`}
                    className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold shadow-md ${featuredTheme.accentBg} transition-transform active:scale-95`}
                  >
                    <span>Read Full Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Bullet indicators */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    {featuredStories.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFeaturedIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === featuredIndex ? 'w-6 bg-amber-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
                        }`}
                        title={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. CATEGORIES WITH IMAGES */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Explore Worlds
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
              Story Categories
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 flex items-center gap-1"
          >
            All Categories &rarr;
          </Link>
        </div>

        {activeCategories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 p-8 text-center dark:border-slate-800">
            <Compass className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Curating New Story Categories
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Exciting collections and moral folklore categories are being prepared for young readers.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {activeCategories.map(cat => {
              const count = stories.filter(s => s.categorySlug === cat.slug).length;
              const themeStyle = getThemeStyles(cat.theme);
              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                    <img
                      src={cat.imageUrl || '/images/default-og.jpg'}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                      onError={e => {
                        (e.target as HTMLImageElement).src = '/images/default-og.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span
                      className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-bold shadow-xs ${themeStyle.badgeClass}`}
                    >
                      {cat.theme}
                    </span>
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <p className="truncate text-xs font-bold">{cat.name}</p>
                      <p className="text-[10px] text-slate-200">{count} {count === 1 ? 'Story' : 'Stories'}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* In-Between Ad */}
      <div className="container mx-auto px-4">
        <AdBanner position="in-content" />
      </div>

      {/* 5. RECENT STORIES WITH LANGUAGE FILTER */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Fresh Releases
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
              Recent Stories
            </h2>
          </div>

          {/* Language filter pills */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900 overflow-x-auto max-w-full no-scrollbar">
            <button
              onClick={() => setActiveLangFilter('All')}
              className={`rounded-xl px-3 py-1 text-xs font-bold transition-colors shrink-0 ${
                activeLangFilter === 'All'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
              }`}
            >
              All Languages
            </button>
            <button
              onClick={() => setActiveLangFilter('Hindi')}
              className={`rounded-xl px-3 py-1 text-xs font-bold transition-colors font-hindi shrink-0 ${
                activeLangFilter === 'Hindi'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
              }`}
            >
              🇮🇳 हिंदी (Hindi)
            </button>
            <button
              onClick={() => setActiveLangFilter('English')}
              className={`rounded-xl px-3 py-1 text-xs font-bold transition-colors shrink-0 ${
                activeLangFilter === 'English'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {recentStories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 p-10 text-center dark:border-slate-800">
            <BookOpen className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
              New Stories Arriving Soon
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Our writers and illustrators are weaving captivating tales with morals and adventures. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}

        {stories.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-amber-500 px-6 py-3 text-xs font-bold text-amber-600 hover:bg-amber-500 hover:text-white dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-slate-900 transition-all active:scale-95"
            >
              <span>Browse Complete Story Library ({stories.length} Stories)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* 6. TRENDING STORIES (VIEWS BASED) + SUGGESTED STORIES SPLIT */}
      {stories.length > 0 && (
      <section className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Trending Stories (Views Based) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-500">
                  <Flame className="w-4 h-4 fill-rose-500 text-rose-500" /> Readers' Favorites
                </span>
                <h2 className="text-xl font-black text-slate-800 dark:text-white">
                  Trending Stories
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {trendingStories.map(story => (
                <StoryCard key={story.id} story={story} layout="horizontal" />
              ))}
            </div>
          </div>

          {/* Suggested Stories + Sidebar Ad */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-500">
                <Compass className="w-4 h-4" /> Curious Reads
              </span>
              <h2 className="text-xl font-black text-slate-800 dark:text-white">
                Suggested for You
              </h2>
            </div>

            <div className="space-y-3">
              {suggestedStories.map(story => (
                <Link
                  key={story.id}
                  to={`/story/${story.slug}`}
                  className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-3 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
                >
                  <img
                    src={story.thumbnailUrl || '/images/default-og.jpg'}
                    alt={story.title}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      {story.theme} • {story.language}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                      {story.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {story.metaDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Sidebar Ad Placement */}
            <div className="pt-2">
              <AdBanner position="sidebar" />
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 7. SOCIAL FOLLOW SECTION (TOGGLE BASED) */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-pink-500 to-indigo-600 p-8 sm:p-12 text-center text-white shadow-xl">
          <div className="mx-auto max-w-xl space-y-4">
            <span className="inline-block rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold backdrop-blur-md">
              ❤️ Join Our Storytelling Community
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Never Miss a New Bedtime Adventure!
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              We share brand-new illustrated audio stories, Panchatantra lessons, and coloring printables
              every week. Follow us on your favorite channel:
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              {socialMedia.youtube.enabled && (
                <a
                  href={socialMedia.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-xs font-bold text-red-600 shadow-md hover:bg-slate-50 transition-transform active:scale-95"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>Subscribe on YouTube</span>
                </a>
              )}

              {socialMedia.instagram.enabled && (
                <a
                  href={socialMedia.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-xs font-bold text-pink-600 shadow-md hover:bg-slate-50 transition-transform active:scale-95"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Follow Instagram</span>
                </a>
              )}

              {socialMedia.telegram.enabled && (
                <a
                  href={socialMedia.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-xs font-bold text-sky-600 shadow-md hover:bg-slate-50 transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Join Telegram</span>
                </a>
              )}

              {socialMedia.facebook.enabled && (
                <a
                  href={socialMedia.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-xs font-bold text-blue-600 shadow-md hover:bg-slate-50 transition-transform active:scale-95"
                >
                  <Facebook className="w-4 h-4 fill-current" />
                  <span>Follow Facebook</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
