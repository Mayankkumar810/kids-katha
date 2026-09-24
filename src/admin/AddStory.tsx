import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Sparkles, 
  Image as ImageIcon, 
  Check, 
  ArrowRight, 
  AlertCircle,
  HelpCircle,
  Clock,
  Eye,
  FileCode
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ThemeType, LanguageType } from '../types';
import { getThemeStyles } from '../utils/themeStyles';
import { StoryHtmlEditor } from './StoryHtmlEditor';
import { stripHtmlTags, getReadingTimeFromHtml, getWordCountFromHtml } from '../utils/htmlStoryUtils';

export const AddStory: React.FC = () => {
  const { categories, addStory } = useData();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug || '');
  const [theme, setTheme] = useState<ThemeType>(categories[0]?.theme || 'Moral');
  const [language, setLanguage] = useState<LanguageType>('Hindi');

  // Auto-sync category selection when categories change
  React.useEffect(() => {
    if (categories.length > 0 && (!categorySlug || !categories.some(c => c.slug === categorySlug))) {
      setCategorySlug(categories[0].slug);
      setTheme(categories[0].theme);
    }
  }, [categories, categorySlug]);

  const [bannerUrl, setBannerUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [content, setContent] = useState('');
  const [moral, setMoral] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);

  // Helper to slugify string
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setSlug(generatedSlug || 'story-' + Date.now());
    if (!metaTitle) setMetaTitle(val + ' - KathaVichar');
  };

  // When category changes, auto-set theme from category
  const handleCategoryChange = (catSlug: string) => {
    setCategorySlug(catSlug);
    const cat = categories.find(c => c.slug === catSlug);
    if (cat) {
      setTheme(cat.theme);
    }
  };

  // Word count and reading time calculation using HTML-safe utilities
  const wordCount = getWordCountFromHtml(content);
  const readingTime = getReadingTimeFromHtml(content);

  // Sample presets for quick testing
  const applyPresetImage = (type: 'panchatantra' | 'fairy' | 'royal') => {
    if (type === 'panchatantra') {
      setBannerUrl('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80');
      setThumbnailUrl('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80');
    } else if (type === 'fairy') {
      setBannerUrl('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80');
      setThumbnailUrl('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80');
    } else {
      setBannerUrl('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80');
      setThumbnailUrl('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !content) return;

    setIsSubmitting(true);
    try {
      const keywordArr = keywords
        .split(',')
        .map(k => k.trim())
        .filter(Boolean);

      const plainText = stripHtmlTags(content);
      const autoDescription = metaDescription || plainText.slice(0, 150) + '...';

      const finalStory = await addStory({
        title,
        slug: slug.trim(),
        categorySlug,
        theme,
        language,
        bannerUrl: bannerUrl || thumbnailUrl || '/images/default-og.jpg',
        thumbnailUrl: thumbnailUrl || bannerUrl || '/images/default-og.jpg',
        content,
        moral,
        metaTitle: metaTitle || title,
        metaDescription: autoDescription,
        keywords: keywordArr.length > 0 ? keywordArr : ['story', language.toLowerCase()],
        readingTime,
        isFeatured,
        author: 'KathaVichar Editor'
      });

      setPublishedSlug(finalStory.slug);
    } catch (err) {
      console.error(err);
      alert('Failed to publish story');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (publishedSlug) {
    return (
      <div className="max-w-xl mx-auto rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-lg dark:border-emerald-900 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="mt-4 text-2xl font-black text-slate-800 dark:text-white">
          Story Published Successfully!
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          Your new HTML story is live with font colors, custom animations, live theme styling, and audio narration.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={`/story/${publishedSlug}`}
            target="_blank"
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600"
          >
            <span>View Story Live</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => {
              setPublishedSlug(null);
              setTitle('');
              setSlug('');
              setContent('');
              setMoral('');
              setMetaTitle('');
              setMetaDescription('');
            }}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
          >
            Publish Another Story
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">
          Publish New HTML Story
        </h1>
        <p className="text-xs text-slate-500">
          Create rich stories in HTML format with real-time preview, colorful fonts, text animations, and kid-friendly styling.
        </p>
      </div>

      {categories.length === 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/40">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                No Categories Created Yet!
              </p>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-300">
                Stories need to belong to a category. Please create your first category first.
              </p>
            </div>
          </div>
          <Link
            to="/admin/categories"
            className="self-start sm:self-auto shrink-0 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition-colors"
          >
            Create Category Now &rarr;
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Details */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" /> 1. Story Information
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
              Story Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. बुद्धिमान खरगोश और शेर or The Clever Little Squirrel"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                SEO Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={e => setSlug(e.target.value)}
                placeholder="chatur-khargosh-aur-sher"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-mono text-slate-800 focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              />
              <span className="text-[10px] text-slate-400">Target URL: /story/{slug || '...'}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Language (भाषा) *
              </label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as LanguageType)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="Hindi">🇮🇳 हिंदी (Hindi)</option>
                <option value="English">🇬🇧 English</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Category *
              </label>
              <select
                value={categorySlug}
                onChange={e => handleCategoryChange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name} ({cat.theme})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                Story Theme (Auto applied)
              </label>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value as ThemeType)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="Moral">🌱 Moral (Panchatantra / Values)</option>
                <option value="Kids">🎈 Kids (Playful / Fantasy)</option>
                <option value="Royal">👑 Royal (Akbar Birbal / Legends)</option>
                <option value="Horror">🕯️ Horror / Mystery</option>
                <option value="Default">✨ Default (Bedtime / Classic)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 📸 IMAGE SYSTEM */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-pink-500" /> 2. Image System (URL Based with Live Preview)
            </h2>

            {/* Quick preset filler */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">Quick Image:</span>
              <button
                type="button"
                onClick={() => applyPresetImage('panchatantra')}
                className="rounded-lg bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 hover:bg-amber-100 dark:bg-slate-800 dark:text-amber-300"
              >
                Woods
              </button>
              <button
                type="button"
                onClick={() => applyPresetImage('fairy')}
                className="rounded-lg bg-pink-50 px-2 py-0.5 text-[11px] font-bold text-pink-700 hover:bg-pink-100 dark:bg-slate-800 dark:text-pink-300"
              >
                Fairy
              </button>
              <button
                type="button"
                onClick={() => applyPresetImage('royal')}
                className="rounded-lg bg-purple-50 px-2 py-0.5 text-[11px] font-bold text-purple-700 hover:bg-purple-100 dark:bg-slate-800 dark:text-purple-300"
              >
                Royal
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Banner Image */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Banner Image URL (Top Header - 1200x600)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={bannerUrl}
                onChange={e => setBannerUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {bannerUrl && (
                <div className="relative aspect-[16/8] overflow-hidden rounded-xl border border-slate-200 shadow-xs">
                  <img
                    src={bannerUrl}
                    alt="Banner Preview"
                    className="h-full w-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src = '/images/default-og.jpg';
                    }}
                  />
                  <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white">
                    Banner Preview
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Image */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Thumbnail Image URL (Cards - 600x400)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={thumbnailUrl}
                onChange={e => setThumbnailUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {thumbnailUrl && (
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 shadow-xs">
                  <img
                    src={thumbnailUrl}
                    alt="Thumbnail Preview"
                    className="h-full w-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src = '/images/default-og.jpg';
                    }}
                  />
                  <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] text-white">
                    Thumbnail Preview
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 📝 HTML STORY CONTENT WITH LIVE PREVIEW */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-500" /> 3. Story Content in HTML Format (With Live Preview)
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Write story in HTML to animate words (bounce, rainbow, float, shake) and customize font colors.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>{wordCount} words</span>
              <span>•</span>
              <span className="font-bold text-amber-600">{readingTime}</span>
            </div>
          </div>

          {/* Dedicated HTML Editor with Formatting Toolbar & Realtime Live Preview */}
          <StoryHtmlEditor
            value={content}
            onChange={setContent}
            language={language}
          />

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
              कहानी की सीख • Moral of the Story (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. बुद्धि बल से कहीं अधिक शक्तिशाली होती है or Kindness is never wasted."
              value={moral}
              onChange={e => setMoral(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={e => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
            />
            <label htmlFor="isFeatured" className="text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
              Pin as Featured Story on Homepage Slider
            </label>
          </div>
        </div>

        {/* SEO Meta Tags */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" /> 4. Search Engine Optimization (SEO & Meta)
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
              Meta Title
            </label>
            <input
              type="text"
              placeholder="Story Title - KathaVichar"
              value={metaTitle}
              onChange={e => setMetaTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
              Meta Description (Search Snippet)
            </label>
            <textarea
              rows={3}
              placeholder="Brief plain-text summary for Google search and WhatsApp share..."
              value={metaDescription}
              onChange={e => setMetaDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
              Keywords (Comma separated)
            </label>
            <input
              type="text"
              placeholder="panchatantra, hindi stories, kids moral stories, squirrel"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-2">
          <Link
            to="/admin/stories"
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting || !title || !content}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-600 disabled:opacity-50 transition-transform active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isSubmitting ? 'Publishing...' : 'Publish Story'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
