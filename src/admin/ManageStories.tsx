import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Trash2, 
  ExternalLink, 
  Star, 
  PlusCircle, 
  Eye, 
  Edit3, 
  X, 
  Save, 
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Story, ThemeType, LanguageType } from '../types';
import { getThemeStyles } from '../utils/themeStyles';
import { StoryHtmlEditor } from './StoryHtmlEditor';
import { stripHtmlTags, getReadingTimeFromHtml } from '../utils/htmlStoryUtils';

export const ManageStories: React.FC = () => {
  const { stories, categories, deleteStory, updateStory } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  // Edit Story State
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategorySlug, setEditCategorySlug] = useState('');
  const [editTheme, setEditTheme] = useState<ThemeType>('Moral');
  const [editLanguage, setEditLanguage] = useState<LanguageType>('Hindi');
  const [editBannerUrl, setEditBannerUrl] = useState('');
  const [editThumbnailUrl, setEditThumbnailUrl] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editMoral, setEditMoral] = useState('');
  const [editIsFeatured, setEditIsFeatured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const filteredStories = stories.filter(story => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      if (!story.title.toLowerCase().includes(term) && !story.slug.toLowerCase().includes(term)) {
        return false;
      }
    }
    if (selectedCategory !== 'All' && story.categorySlug !== selectedCategory) return false;
    if (selectedLanguage !== 'All' && story.language !== selectedLanguage) return false;
    return true;
  });

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteStory(id);
    }
  };

  const toggleFeatured = async (id: string, current: boolean = false) => {
    await updateStory(id, { isFeatured: !current });
  };

  const handleOpenEdit = (story: Story) => {
    setEditingStory(story);
    setEditTitle(story.title);
    setEditCategorySlug(story.categorySlug);
    setEditTheme(story.theme);
    setEditLanguage(story.language);
    setEditBannerUrl(story.bannerUrl);
    setEditThumbnailUrl(story.thumbnailUrl);
    setEditContent(story.content);
    setEditMoral(story.moral || '');
    setEditIsFeatured(story.isFeatured || false);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory) return;

    setIsSaving(true);
    try {
      const plainText = stripHtmlTags(editContent);
      const readingTime = getReadingTimeFromHtml(editContent);

      await updateStory(editingStory.id, {
        title: editTitle,
        categorySlug: editCategorySlug,
        theme: editTheme,
        language: editLanguage,
        bannerUrl: editBannerUrl,
        thumbnailUrl: editThumbnailUrl,
        content: editContent,
        moral: editMoral,
        readingTime,
        isFeatured: editIsFeatured,
        metaDescription: plainText.slice(0, 150) + '...'
      });

      setEditingStory(null);
    } catch (err) {
      console.error(err);
      alert('Failed to update story');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">
            Manage Stories ({stories.length})
          </h1>
          <p className="text-xs text-slate-500">
            View, search, edit in HTML with live preview, toggle featured status, and delete published stories.
          </p>
        </div>

        <Link
          to="/admin/add-story"
          className="flex items-center gap-1.5 self-start sm:self-center rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Story</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search stories by title or slug..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={selectedLanguage}
          onChange={e => setSelectedLanguage(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="All">All Languages</option>
          <option value="Hindi">🇮🇳 हिंदी (Hindi)</option>
          <option value="English">🇬🇧 English</option>
        </select>
      </div>

      {/* Stories Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-3.5 font-bold">Story</th>
                <th className="p-3.5 font-bold">Category</th>
                <th className="p-3.5 font-bold">Theme</th>
                <th className="p-3.5 font-bold">Language</th>
                <th className="p-3.5 font-bold">Views</th>
                <th className="p-3.5 font-bold text-center">Featured</th>
                <th className="p-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {filteredStories.map(story => {
                const themeStyle = getThemeStyles(story.theme);
                return (
                  <tr key={story.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30">
                    <td className="p-3.5 flex items-center gap-3">
                      <img
                        src={story.thumbnailUrl || '/images/default-og.jpg'}
                        alt={story.title}
                        className="h-11 w-11 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 max-w-xs">
                        <p className="truncate font-bold text-slate-900 dark:text-white">
                          {story.title}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono truncate">
                          /story/{story.slug}
                        </p>
                      </div>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-slate-600 dark:text-slate-300">
                        {story.categorySlug}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${themeStyle.badgeClass}`}>
                        {story.theme}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold dark:bg-slate-800">
                        {story.language}
                      </span>
                    </td>

                    <td className="p-3.5 whitespace-nowrap font-semibold">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        {story.views}
                      </span>
                    </td>

                    <td className="p-3.5 text-center whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(story.id, story.isFeatured)}
                        className={`rounded-full p-1.5 transition-colors cursor-pointer ${
                          story.isFeatured
                            ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                            : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={story.isFeatured ? 'Featured on Homepage' : 'Not Featured'}
                      >
                        <Star className={`w-4 h-4 ${story.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </td>

                    <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleOpenEdit(story)}
                        className="inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300 transition-colors cursor-pointer"
                        title="Edit HTML Story"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit HTML</span>
                      </button>

                      <Link
                        to={`/story/${story.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition-colors"
                        title="View Live"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View</span>
                      </Link>

                      <button
                        onClick={() => handleDelete(story.id, story.title)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/40 dark:text-red-400 transition-colors cursor-pointer"
                        title="Delete Story"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Story Modal with StoryHtmlEditor */}
      {editingStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white font-bold">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    Edit HTML Story: {editingStory.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    /story/{editingStory.slug}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingStory(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveEdit} className="p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Story Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Language (भाषा) *
                  </label>
                  <select
                    value={editLanguage}
                    onChange={e => setEditLanguage(e.target.value as LanguageType)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
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
                    value={editCategorySlug}
                    onChange={e => {
                      setEditCategorySlug(e.target.value);
                      const cat = categories.find(c => c.slug === e.target.value);
                      if (cat) setEditTheme(cat.theme);
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
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
                    Story Theme
                  </label>
                  <select
                    value={editTheme}
                    onChange={e => setEditTheme(e.target.value as ThemeType)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <option value="Moral">🌱 Moral (Panchatantra / Values)</option>
                    <option value="Kids">🎈 Kids (Playful / Fantasy)</option>
                    <option value="Royal">👑 Royal (Akbar Birbal / Legends)</option>
                    <option value="Horror">🕯️ Horror / Mystery</option>
                    <option value="Default">✨ Default (Bedtime / Classic)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Banner Image URL
                  </label>
                  <input
                    type="url"
                    value={editBannerUrl}
                    onChange={e => setEditBannerUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    value={editThumbnailUrl}
                    onChange={e => setEditThumbnailUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Story HTML Editor with Live Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Story Content in HTML Format *</span>
                  <span className="text-[11px] text-amber-600 font-semibold">
                    Realtime Live Preview Included
                  </span>
                </label>
                <StoryHtmlEditor
                  value={editContent}
                  onChange={setEditContent}
                  language={editLanguage}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  कहानी की सीख • Moral of the Story
                </label>
                <input
                  type="text"
                  value={editMoral}
                  onChange={e => setEditMoral(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="editFeatured"
                  checked={editIsFeatured}
                  onChange={e => setEditIsFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                />
                <label htmlFor="editFeatured" className="text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
                  Feature on Homepage Slider
                </label>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingStory(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || !editTitle || !editContent}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-amber-600 disabled:opacity-50 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
