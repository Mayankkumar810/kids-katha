import React, { useState } from 'react';
import { Layers, Plus, Trash2, Edit2, Check, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Category, ThemeType } from '../types';
import { getThemeStyles } from '../utils/themeStyles';

export const CategoryManagement: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [theme, setTheme] = useState<ThemeType>('Moral');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setIsEditing(null);
    setName('');
    setSlug('');
    setTheme('Moral');
    setImageUrl('');
    setDescription('');
    setIsActive(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setSlug(generated);
    }
  };

  const handleEditClick = (cat: Category) => {
    setIsEditing(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setTheme(cat.theme);
    setImageUrl(cat.imageUrl);
    setDescription(cat.description || '');
    setIsActive(cat.isActive);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    if (isEditing) {
      await updateCategory(isEditing, {
        name,
        slug,
        theme,
        imageUrl: imageUrl || '/images/default-og.jpg',
        description,
        isActive
      });
    } else {
      await addCategory({
        name,
        slug,
        theme,
        imageUrl: imageUrl || '/images/default-og.jpg',
        description,
        isActive
      });
    }
    resetForm();
  };

  const handleDelete = async (id: string, catName: string) => {
    if (window.confirm(`Delete category "${catName}"?`)) {
      await deleteCategory(id);
    }
  };

  const toggleStatus = async (cat: Category) => {
    await updateCategory(cat.id, { isActive: !cat.isActive });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">
          Category Management
        </h1>
        <p className="text-xs text-slate-500">
          Configure categories, link them with dynamic themes (Kids, Moral, Royal, Horror, Default),
          and customize images.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Category Creation / Edit Form */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
          <h2 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{isEditing ? 'Edit Category' : 'Create New Category'}</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Panchatantra Tales or Akbar Birbal"
                value={name}
                onChange={e => handleNameChange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category Slug *
              </label>
              <input
                type="text"
                required
                placeholder="panchatantra-tales"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-mono focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category Dynamic Theme *
              </label>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value as ThemeType)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="Kids">🎈 Kids (Playful, Rainbow & Yellow)</option>
                <option value="Moral">🌱 Moral (Wisdom, Forest & Gold)</option>
                <option value="Royal">👑 Royal (Majestic, Crimson & Amber)</option>
                <option value="Horror">🕯️ Horror (Mystery, Deep Violet & Midnight)</option>
                <option value="Default">✨ Default (Classic Indigo & Bedtime)</option>
              </select>
              <p className="mt-1 text-[11px] text-slate-400">
                Stories under this category will automatically inherit this theme's UI colors and badges.
              </p>
            </div>

            {/* 📸 IMAGE SYSTEM (CATEGORY: 800x600) */}
            <div className="space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Category Image URL
                </label>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="rounded bg-slate-100 px-1 py-0.2 font-bold dark:bg-slate-800">
                    800x600
                  </span>
                  <span>JPG/PNG</span>
                  <span>&lt;300KB</span>
                </div>
              </div>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              {imageUrl && (
                <div className="relative aspect-[4/3] w-full max-w-[200px] overflow-hidden rounded-xl border border-slate-200 shadow-xs">
                  <img
                    src={imageUrl}
                    alt="Category Preview"
                    className="h-full w-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src = '/images/default-og.jpg';
                    }}
                  />
                  <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.2 text-[9px] text-white">
                    Live 800x600 Preview
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                placeholder="Brief summary of stories in this category..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="statusToggle"
                checked={isActive}
                onChange={e => setIsActive(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-amber-500"
              />
              <label htmlFor="statusToggle" className="font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
                Category Status: Active (visible in public menu)
              </label>
            </div>

            <div className="flex gap-2 pt-3">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="flex-1 rounded-xl bg-amber-500 py-2.5 font-bold text-white shadow-xs hover:bg-amber-600 transition-colors"
              >
                {isEditing ? 'Save Changes' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Categories Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-black text-slate-800 dark:text-white">
                Existing Categories ({categories.length})
              </h3>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {categories.map(cat => {
                const themeStyle = getThemeStyles(cat.theme);
                return (
                  <div
                    key={cat.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={cat.imageUrl || '/images/default-og.jpg'}
                        alt={cat.name}
                        className="h-12 w-14 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                            {cat.name}
                          </h4>
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${themeStyle.badgeClass}`}>
                            {themeStyle.decorativeEmoji} {cat.theme}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono">/category/{cat.slug}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => toggleStatus(cat)}
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-colors ${
                          cat.isActive
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {cat.isActive ? 'Active' : 'Disabled'}
                      </button>

                      <button
                        onClick={() => handleEditClick(cat)}
                        className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="Edit Category"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
