import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Trash2, 
  ExternalLink, 
  Star, 
  PlusCircle, 
  Filter,
  Eye,
  Check
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { getThemeStyles } from '../utils/themeStyles';

export const ManageStories: React.FC = () => {
  const { stories, categories, deleteStory, updateStory } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">
            Manage Stories ({stories.length})
          </h1>
          <p className="text-xs text-slate-500">
            View, search, edit, toggle featured status, and delete published stories.
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
                        className={`rounded-full p-1.5 transition-colors ${
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
                      <Link
                        to={`/story/${story.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        title="View Live"
                      >
                        <ExternalLink className="w-3 h-3" /> View
                      </Link>

                      <button
                        onClick={() => handleDelete(story.id, story.title)}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/40 dark:text-red-400"
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
    </div>
  );
};
