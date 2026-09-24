import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layers, BookOpen, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { StoryCard } from '../components/common/StoryCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEO } from '../components/common/SEO';
import { getThemeStyles } from '../utils/themeStyles';
import { AdBanner } from '../components/common/AdBanner';

export const CategoriesPage: React.FC = () => {
  const { categories, stories } = useData();
  const activeCategories = categories.filter(c => c.isActive);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 space-y-6">
      <SEO
        title="Story Categories - Moral, Panchatantra, Royal & Bedtime Tales"
        description="Explore kids stories organized by dynamic themes: Panchatantra moral lessons, Akbar Birbal witty royal tales, magical wonderland, and calming bedtime fables."
        keywords={['story categories', 'panchatantra', 'akbar birbal', 'bedtime stories', 'kids story topics']}
      />

      <Breadcrumbs items={[{ label: 'Categories' }]} />

      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-8 sm:p-12 text-white shadow-lg">
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-md">
          ✨ Themed Collections
        </span>
        <h1 className="mt-2 text-2xl sm:text-4xl font-black">
          All Story Categories
        </h1>
        <p className="mt-2 max-w-xl text-xs sm:text-sm text-white/90">
          Every category has its own distinct theme, visual personality, and moral heartbeat. Pick a world and start reading!
        </p>
      </div>

      <AdBanner position="header" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeCategories.map(cat => {
          const themeStyle = getThemeStyles(cat.theme);
          const count = stories.filter(s => s.categorySlug === cat.slug).length;

          return (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className={`group flex flex-col justify-between overflow-hidden rounded-3xl border ${themeStyle.cardBorder} bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-slate-900`}
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <img
                    src={cat.imageUrl || '/images/default-og.jpg'}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    onError={e => {
                      (e.target as HTMLImageElement).src = '/images/default-og.jpg';
                    }}
                  />
                  <span
                    className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-bold shadow-md ${themeStyle.badgeClass}`}
                  >
                    {themeStyle.decorativeEmoji} {cat.theme}
                  </span>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-black text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
                <span className="font-semibold text-slate-400">
                  {count} {count === 1 ? 'Story' : 'Stories'}
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const CategoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { categories, stories } = useData();

  const category = categories.find(c => c.slug === slug);
  const categoryStories = stories.filter(s => s.categorySlug === slug);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Category Not Found</h2>
        <Link to="/categories" className="mt-4 inline-block text-amber-600 underline text-sm">
          Return to Categories
        </Link>
      </div>
    );
  }

  const themeStyle = getThemeStyles(category.theme);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 space-y-6">
      <SEO
        title={`${category.name} Stories for Kids - KathaVichar`}
        description={category.description || `Read inspiring stories in ${category.name} collection.`}
        keywords={[category.name, category.slug, category.theme, 'kids stories']}
      />

      <Breadcrumbs
        items={[
          { label: 'Categories', url: '/categories' },
          { label: category.name }
        ]}
      />

      {/* Hero Category Banner with dynamic theme */}
      <div
        className={`relative overflow-hidden rounded-3xl border ${themeStyle.cardBorder} bg-gradient-to-r ${themeStyle.gradientBg} p-8 sm:p-12 shadow-md`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${themeStyle.badgeClass}`}>
              {themeStyle.decorativeEmoji} {category.theme} Category
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {category.name}
            </h1>
            <p className="max-w-xl text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {category.description}
            </p>
            <p className="text-xs font-semibold text-slate-500 pt-2">
              Showing {categoryStories.length} stories in this category
            </p>
          </div>

          <div className="md:col-span-4">
            <img
              src={category.imageUrl || '/images/default-og.jpg'}
              alt={category.name}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      <AdBanner position="header" />

      {/* Stories list */}
      {categoryStories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
          <BookOpen className="mx-auto h-10 w-10 text-slate-400" />
          <h3 className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-300">
            No stories in this category yet
          </h3>
          <p className="text-xs text-slate-500 mt-1">Check back soon or explore other categories.</p>
          <Link
            to="/stories"
            className="mt-4 inline-block rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xs"
          >
            Browse All Stories
          </Link>
        </div>
      )}
    </div>
  );
};
