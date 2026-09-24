import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Eye, 
  Calendar, 
  Bookmark, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Heart,
  BookOpen,
  Share2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { getThemeStyles } from '../utils/themeStyles';
import { ReadingProgressBar } from '../components/story/ReadingProgressBar';
import { FontSizeControl, FontSizeLevel, FontMode } from '../components/story/FontSizeControl';
import { SpeechNarration } from '../components/story/SpeechNarration';
import { ShareModal } from '../components/story/ShareModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdBanner } from '../components/common/AdBanner';
import { SEO } from '../components/common/SEO';
import { StoryCard } from '../components/common/StoryCard';
import { isHtmlContent } from '../utils/htmlStoryUtils';

export const StoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { 
    stories, 
    categories, 
    isBookmarked, 
    toggleBookmark, 
    incrementStoryViews,
    saveReadingProgress 
  } = useData();

  const [fontSize, setFontSize] = useState<FontSizeLevel>('base');
  const [fontMode, setFontMode] = useState<FontMode>('standard');
  const [liked, setLiked] = useState(false);

  const story = stories.find(s => s.slug === slug);

  // Increment views and track reading
  useEffect(() => {
    if (story) {
      incrementStoryViews(story.slug);
      // Auto set font mode if Hindi
      if (story.language === 'Hindi') {
        setFontMode('hindi');
      }
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-slate-800">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="mt-4 text-2xl font-black text-slate-800 dark:text-white">
          Story Not Found
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          The story you are looking for may have flown away or been moved.
        </p>
        <Link
          to="/stories"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600"
        >
          Browse All Stories
        </Link>
      </div>
    );
  }

  const category = categories.find(c => c.slug === story.categorySlug);
  const themeStyle = getThemeStyles(story.theme);
  const bookmarked = isBookmarked(story.slug);

  // Next / Previous Stories
  const currentIndex = stories.findIndex(s => s.id === story.id);
  const prevStory = currentIndex > 0 ? stories[currentIndex - 1] : null;
  const nextStory = currentIndex < stories.length - 1 ? stories[currentIndex + 1] : null;

  // Related stories in same category
  const relatedStories = stories
    .filter(s => s.id !== story.id && (s.categorySlug === story.categorySlug || s.language === story.language))
    .slice(0, 3);

  // Font size classes
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-sm leading-relaxed';
      case 'base':
        return 'text-base leading-loose sm:text-lg sm:leading-8';
      case 'lg':
        return 'text-lg leading-loose sm:text-xl sm:leading-9';
      case 'xl':
        return 'text-xl leading-loose sm:text-2xl sm:leading-10';
    }
  };

  const getFontFamilyClass = () => {
    switch (fontMode) {
      case 'hindi':
        return 'font-hindi';
      case 'story':
        return 'font-english';
      default:
        return 'font-sans';
    }
  };

  // Check if content is written in HTML format
  const isHtml = isHtmlContent(story.content);

  // Split content paragraphs to inject in-content ad
  const paragraphs = isHtml
    ? story.content.split(/<\/p>/i).filter(p => p.trim()).map(p => (p.includes('<p') ? p + '</p>' : `<p>${p}</p>`))
    : story.content.split('\n\n').filter(p => p.trim());
  const middleIndex = Math.floor(paragraphs.length / 2);

  // Handle scroll progress
  const handleProgressUpdate = (percent: number) => {
    saveReadingProgress(story.slug, percent, story.title, story.thumbnailUrl);
  };

  // Structured data for Article & Breadcrumbs
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.metaDescription,
    image: story.bannerUrl || story.thumbnailUrl,
    datePublished: story.createdAt,
    dateModified: story.updatedAt || story.createdAt,
    author: {
      '@type': 'Person',
      name: story.author || 'KathaVichar'
    },
    publisher: {
      '@type': 'Organization',
      name: 'KathaVichar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kathavichar.com/images/default-og.jpg'
      }
    },
    inLanguage: story.language === 'Hindi' ? 'hi' : 'en',
    articleSection: category?.name || story.categorySlug
  };

  return (
    <div className={`min-h-screen pb-16 transition-colors`}>
      {/* Dynamic SEO Meta & Social Cards */}
      <SEO
        title={story.metaTitle || story.title}
        description={story.metaDescription}
        keywords={story.keywords || [story.categorySlug, story.language, 'kids story']}
        ogImage={story.bannerUrl || story.thumbnailUrl}
        ogType="article"
        articleMeta={{
          publishedTime: story.createdAt,
          author: story.author || 'KathaVichar',
          section: category?.name
        }}
        jsonLd={articleJsonLd}
        language={story.language}
      />

      {/* Sticky Reading Progress Bar (Themed) */}
      <ReadingProgressBar theme={story.theme} onProgressUpdate={handleProgressUpdate} />

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 pt-4">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: 'Stories', url: '/stories' },
              { label: category?.name || story.categorySlug, url: `/category/${story.categorySlug}` },
              { label: story.title }
            ]}
          />
        </div>

        {/* Top Header Ad Placement */}
        <div className="mb-6">
          <AdBanner position="header" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Story Column */}
          <article className="lg:col-span-8 space-y-6">
            {/* Story Header */}
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-bold shadow-xs border ${themeStyle.badgeClass}`}>
                  {themeStyle.decorativeEmoji} {story.theme} Story
                </span>

                <Link
                  to={`/category/${story.categorySlug}`}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                >
                  {category?.name || story.categorySlug}
                </Link>

                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {story.language === 'Hindi' ? '🇮🇳 हिंदी कहानी' : '🇬🇧 English Story'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {story.title}
              </h1>

              {/* Meta stats bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-100 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>{story.readingTime}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-amber-500" />
                    <span>{story.views} reads</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>{story.createdAt}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(story.slug)}
                    className={`flex items-center gap-1 rounded-xl px-3 py-1.5 font-bold transition-all active:scale-95 ${
                      bookmarked
                        ? 'bg-amber-500 text-white'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
                    <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
                  </button>

                  <button
                    onClick={() => setLiked(prev => !prev)}
                    className={`flex items-center gap-1 rounded-xl px-3 py-1.5 font-bold transition-all active:scale-95 ${
                      liked
                        ? 'bg-pink-500 text-white'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                    <span>{liked ? 'Liked' : 'Like'}</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Banner Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800">
              <img
                src={story.bannerUrl || story.thumbnailUrl || '/images/default-og.jpg'}
                alt={story.title}
                className="h-full w-full object-cover"
                onError={e => {
                  (e.target as HTMLImageElement).src = '/images/default-og.jpg';
                }}
              />
            </div>

            {/* Reading Settings: Font Size & Mode */}
            <FontSizeControl
              fontSize={fontSize}
              setFontSize={setFontSize}
              fontMode={fontMode}
              setFontMode={setFontMode}
            />

            {/* Text-to-Speech Web Audio Narration */}
            <SpeechNarration content={story.content} language={story.language} />

            {/* Story Content with In-Content Ad */}
            <div
              className={`rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors ${getFontFamilyClass()}`}
            >
              <div className={`space-y-6 text-slate-800 dark:text-slate-200 ${getFontSizeClass()}`}>
                {paragraphs.map((p, idx) => (
                  <React.Fragment key={idx}>
                    {isHtml ? (
                      <div
                        className="story-html-paragraph leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: p }}
                      />
                    ) : (
                      <p className="first-letter:text-2xl first-letter:font-bold first-letter:text-amber-500 leading-relaxed">
                        {p}
                      </p>
                    )}

                    {/* In-Content Native Ad inserted midway */}
                    {idx === middleIndex && (
                      <div className="my-8">
                        <AdBanner position="in-content" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Moral of the Story Highlight Box */}
              {story.moral && (
                <div
                  className={`mt-10 overflow-hidden rounded-2xl border p-5 shadow-xs transition-all ${themeStyle.moralBoxClass}`}
                >
                  <div className="flex items-center gap-2 mb-2 font-black text-sm uppercase tracking-wider">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>कहानी की सीख • Moral of the Story</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold leading-relaxed">
                    "{story.moral}"
                  </p>
                </div>
              )}
            </div>

            {/* Social Share Buttons */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <Share2 className="w-4 h-4 text-amber-500" />
                  <span>Share this story with friends & family:</span>
                </div>
                <ShareModal title={story.title} slug={story.slug} />
              </div>
            </div>

            {/* Next / Previous Story Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {prevStory ? (
                <Link
                  to={`/story/${prevStory.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 hover:border-amber-400 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
                >
                  <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous Story
                  </span>
                  <p className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-1">
                    {prevStory.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {nextStory && (
                <Link
                  to={`/story/${nextStory.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 text-right hover:border-amber-400 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900"
                >
                  <span className="flex items-center justify-end gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    Next Story <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <p className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-1">
                    {nextStory.title}
                  </p>
                </Link>
              )}
            </div>
          </article>

          {/* Right Sidebar Column */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Category Card */}
            {category && (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  About Category
                </span>
                <h3 className="mt-1 text-lg font-black text-slate-800 dark:text-white">
                  {category.name}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {category.description}
                </p>
                <Link
                  to={`/category/${category.slug}`}
                  className="mt-4 block rounded-xl bg-amber-50 py-2 text-center text-xs font-bold text-amber-700 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 transition-colors"
                >
                  View All in this Category &rarr;
                </Link>
              </div>
            )}

            {/* Sidebar Ad Placement */}
            <AdBanner position="sidebar" />

            {/* Related Stories */}
            {relatedStories.length > 0 && (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
                <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                  You Might Also Enjoy
                </h3>
                <div className="mt-4 space-y-3">
                  {relatedStories.map(relStory => (
                    <Link
                      key={relStory.id}
                      to={`/story/${relStory.slug}`}
                      className="group flex items-center gap-3 rounded-xl p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <img
                        src={relStory.thumbnailUrl || '/images/default-og.jpg'}
                        alt={relStory.title}
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                          {relStory.language} • {relStory.readingTime}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                          {relStory.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
