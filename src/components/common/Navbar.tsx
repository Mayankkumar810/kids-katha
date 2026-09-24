import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Layers,
  ChevronDown,
  Headphones
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';

export const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { bookmarks, categories } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/stories?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchModal(false);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const activeCategories = categories.filter(c => c.isActive);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-amber-100/60 bg-white/95 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/95">
        {/* Top Mini Banner */}
        <div className="bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 py-1 px-4 text-center text-xs font-bold text-white shadow-xs">
          <div className="container mx-auto flex items-center justify-between text-[11px] md:text-xs">
            <span className="hidden sm:inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Inspiring Moral Tales & Bedtime Stories for Children
            </span>
            <span className="sm:hidden mx-auto">✨ Free Kids Stories in Hindi & English</span>
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/stories?lang=Hindi" className="hover:underline font-hindi font-medium">
                हिंदी कहानियाँ
              </Link>
              <span>|</span>
              <Link to="/stories?lang=English" className="hover:underline font-medium">
                English Tales
              </Link>
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="container mx-auto flex h-16 items-center justify-between px-3 sm:px-6 gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group min-w-0">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 text-white shadow-md shadow-amber-500/20 transition-transform group-hover:scale-105">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-800 dark:text-white flex items-center gap-1 font-english truncate">
                Katha<span className="text-amber-500">Vichar</span>
              </span>
              <span className="hidden xs:block text-[9px] sm:text-[10px] font-semibold text-slate-400 dark:text-slate-400 font-hindi -mt-0.5 sm:-mt-1 truncate">
                कथा विचार • बाल संसार
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Link
              to="/"
              className={`transition-colors hover:text-amber-500 ${
                location.pathname === '/' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''
              }`}
            >
              Home
            </Link>

            <Link
              to="/stories"
              className={`transition-colors hover:text-amber-500 ${
                location.pathname === '/stories' ? 'text-amber-600 dark:text-amber-400 font-bold' : ''
              }`}
            >
              All Stories
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" onMouseLeave={() => setCategoriesDropdownOpen(false)}>
              <button
                onClick={() => setCategoriesDropdownOpen(prev => !prev)}
                onMouseEnter={() => setCategoriesDropdownOpen(true)}
                className="flex items-center gap-1 transition-colors hover:text-amber-500"
              >
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Story Categories
                  </div>
                  <div className="space-y-0.5">
                    {activeCategories.map(cat => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="flex items-center justify-between rounded-xl p-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-amber-400 transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] dark:bg-slate-800 text-slate-500">
                          {cat.theme}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-1 border-t border-slate-100 pt-1 dark:border-slate-800">
                    <Link
                      to="/categories"
                      onClick={() => setCategoriesDropdownOpen(false)}
                      className="block rounded-lg p-2 text-center text-xs font-bold text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-slate-800"
                    >
                      View All Categories &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/stories?lang=Hindi"
              className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 font-hindi"
            >
              🇮🇳 हिंदी कहानियाँ
            </Link>

            <Link
              to="/stories?lang=English"
              className="flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-bold text-sky-800 hover:bg-sky-100 dark:bg-sky-950/60 dark:text-sky-300"
            >
              🇬🇧 English Stories
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 shrink-0">
            {/* Admin Support Trigger (Desktop & Tablet) */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open_admin_support_modal'))}
              className="hidden sm:flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 transition-colors cursor-pointer shrink-0"
              title="Contact Admin Support (सहायता)"
            >
              <Headphones className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden md:inline">Support</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="rounded-full p-1.5 sm:p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Search Stories"
              aria-label="Search Stories"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Bookmarks Page Link */}
            <Link
              to="/bookmarks"
              className="relative rounded-full p-1.5 sm:p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Saved Bookmarks"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] sm:text-[10px] font-bold text-white shadow-xs">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="rounded-full p-1.5 sm:p-2 text-slate-600 hover:bg-slate-100 dark:text-amber-400 dark:hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden rounded-xl p-1.5 sm:p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search kids stories, Akbar Birbal..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm focus:border-amber-400 focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </form>

            <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-slate-800"
              >
                Home
              </Link>
              <Link
                to="/stories"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-slate-800"
              >
                All Stories
              </Link>
              <Link
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-slate-800"
              >
                Categories
              </Link>
              <Link
                to="/stories?lang=Hindi"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-slate-800 font-hindi"
              >
                🇮🇳 हिंदी कहानियाँ
              </Link>
              <Link
                to="/stories?lang=English"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-sky-700 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-slate-800"
              >
                🇬🇧 English Stories
              </Link>
              <Link
                to="/bookmarks"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-2 flex items-center justify-between hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-slate-800"
              >
                <span>Bookmarks</span>
                <span className="rounded-full bg-amber-500 px-2 py-0.5 text-xs text-white">
                  {bookmarks.length}
                </span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open_admin_support_modal'));
                }}
                className="w-full text-left rounded-xl px-3 py-2 flex items-center gap-2 text-amber-700 bg-amber-50/70 hover:bg-amber-100 dark:text-amber-300 dark:bg-amber-950/40 cursor-pointer font-bold"
              >
                <Headphones className="w-4 h-4" />
                <span>Admin Support (सहायता)</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-20 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-500" /> Search Kids Stories
              </h3>
              <button
                onClick={() => setShowSearchModal(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a story title, animal name, or moral (e.g. खरगोश, Birbal, courage)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 pr-12 text-sm text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-hidden dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-600 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold">Popular:</span>
              <button
                onClick={() => { setSearchQuery('चतुर खरगोश'); navigate('/stories?q=खरगोश'); setShowSearchModal(false); }}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-amber-100 dark:bg-slate-800 dark:text-slate-300 font-hindi"
              >
                चतुर खरगोश
              </button>
              <button
                onClick={() => { setSearchQuery('Birbal'); navigate('/stories?q=Birbal'); setShowSearchModal(false); }}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-amber-100 dark:bg-slate-800 dark:text-slate-300"
              >
                Akbar Birbal
              </button>
              <button
                onClick={() => { setSearchQuery('Squirrel'); navigate('/stories?q=Squirrel'); setShowSearchModal(false); }}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-amber-100 dark:bg-slate-800 dark:text-slate-300"
              >
                Little Squirrel
              </button>
              <button
                onClick={() => { setSearchQuery('Panchatantra'); navigate('/stories?q=Panchatantra'); setShowSearchModal(false); }}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-amber-100 dark:bg-slate-800 dark:text-slate-300"
              >
                Panchatantra
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
