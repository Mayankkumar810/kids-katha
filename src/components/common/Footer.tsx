import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Youtube, Instagram, Send, Facebook, Heart } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdBanner } from './AdBanner';

export const Footer: React.FC = () => {
  const { socialMedia, categories } = useData();

  const activeCategories = categories.filter(c => c.isActive).slice(0, 5);

  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white transition-colors dark:border-slate-800 dark:bg-slate-950">
      {/* Optional Footer Ad Placement */}
      <div className="container mx-auto px-4 pt-6">
        <AdBanner position="footer" />
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-pink-500 text-white shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-slate-800 dark:text-white">
                Katha<span className="text-amber-500">Vichar</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              A joyful and safe haven for children and families. Discover inspiring moral stories,
              Panchatantra wisdom, and bedtime fairy tales in Hindi and English.
            </p>

            {/* Social Follow (Dynamic Toggle-Based) */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Follow KathaVichar
              </span>
              <div className="flex items-center gap-2">
                {socialMedia.youtube.enabled && (
                  <a
                    href={socialMedia.youtube.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white dark:bg-red-950/40 dark:text-red-400 transition-colors"
                    title="Subscribe on YouTube"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}

                {socialMedia.instagram.enabled && (
                  <a
                    href={socialMedia.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white dark:bg-pink-950/40 dark:text-pink-400 transition-colors"
                    title="Follow on Instagram"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}

                {socialMedia.telegram.enabled && (
                  <a
                    href={socialMedia.telegram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white dark:bg-sky-950/40 dark:text-sky-400 transition-colors"
                    title="Join Telegram Channel"
                    aria-label="Telegram"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                )}

                {socialMedia.facebook.enabled && (
                  <a
                    href={socialMedia.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white dark:bg-blue-950/40 dark:text-blue-400 transition-colors"
                    title="Follow on Facebook"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Popular Categories
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              {activeCategories.map(cat => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/categories" className="font-bold text-amber-600 dark:text-amber-400">
                  View All Categories &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Story Formats
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/stories?lang=Hindi" className="hover:text-amber-600 dark:hover:text-amber-400 font-hindi">
                  हिंदी नैतिक कहानियाँ
                </Link>
              </li>
              <li>
                <Link to="/stories?lang=English" className="hover:text-amber-600 dark:hover:text-amber-400">
                  English Bedtime Stories
                </Link>
              </li>
              <li>
                <Link to="/stories?theme=Moral" className="hover:text-amber-600 dark:hover:text-amber-400">
                  Panchatantra & Morals
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-amber-600 dark:hover:text-amber-400">
                  Saved Bookmarks
                </Link>
              </li>
              <li>
                <Link to="/sitemap.xml" target="_blank" className="hover:text-amber-600 dark:hover:text-amber-400">
                  XML Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies (Google AdSense Compliant) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Policies & Legal
            </h4>
            <ul className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/privacy-policy" className="hover:text-amber-600 dark:hover:text-amber-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-amber-600 dark:hover:text-amber-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-amber-600 dark:hover:text-amber-400">
                  Disclaimer & Ads Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-600 dark:hover:text-amber-400">
                  About KathaVichar
                </Link>
              </li>
              <li>
                <Link to="/admin" className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Admin Portal Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row dark:border-slate-800">
          <p>© {new Date().getFullYear()} KathaVichar. All rights reserved. Designed for young minds.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> for kids, parents & educators.
          </p>
        </div>
      </div>
    </footer>
  );
};
