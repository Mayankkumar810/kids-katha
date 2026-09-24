import { ThemeType } from '../types';

export interface ThemeStyles {
  name: ThemeType;
  label: string;
  badgeClass: string;
  gradientBg: string;
  accentText: string;
  accentBg: string;
  cardBorder: string;
  cardShadow: string;
  progressBarColor: string;
  moralBoxClass: string;
  heroBadge: string;
  decorativeEmoji: string;
}

export const THEME_CONFIGS: Record<ThemeType, ThemeStyles> = {
  Default: {
    name: 'Default',
    label: 'Standard Classic',
    badgeClass: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800',
    gradientBg: 'from-indigo-500/10 via-sky-500/5 to-purple-500/10',
    accentText: 'text-indigo-600 dark:text-indigo-400',
    accentBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    cardBorder: 'border-slate-200/80 dark:border-slate-800',
    cardShadow: 'hover:shadow-indigo-500/10',
    progressBarColor: 'bg-gradient-to-r from-indigo-500 to-sky-500',
    moralBoxClass: 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200',
    heroBadge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200',
    decorativeEmoji: '✨'
  },
  Kids: {
    name: 'Kids',
    label: 'Playful Wonderland',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-200 border-amber-300 dark:border-amber-800',
    gradientBg: 'from-amber-100/60 via-pink-100/40 to-sky-100/40 dark:from-amber-950/30 dark:via-pink-950/20 dark:to-sky-950/20',
    accentText: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white',
    cardBorder: 'border-amber-200/90 dark:border-amber-900/50',
    cardShadow: 'hover:shadow-amber-500/15',
    progressBarColor: 'bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400',
    moralBoxClass: 'bg-gradient-to-br from-amber-50 via-pink-50/60 to-purple-50/40 dark:from-amber-950/40 dark:via-pink-950/30 dark:to-purple-950/20 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200',
    heroBadge: 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-100',
    decorativeEmoji: '🎈'
  },
  Horror: {
    name: 'Horror',
    label: 'Mystery & Thrills',
    badgeClass: 'bg-purple-100 text-purple-900 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    gradientBg: 'from-purple-950/10 via-slate-900/10 to-emerald-950/10 dark:from-purple-950/40 dark:via-slate-900/50 dark:to-emerald-950/20',
    accentText: 'text-purple-600 dark:text-purple-400',
    accentBg: 'bg-purple-800 hover:bg-purple-900 text-purple-50',
    cardBorder: 'border-purple-200 dark:border-purple-900/60',
    cardShadow: 'hover:shadow-purple-500/20',
    progressBarColor: 'bg-gradient-to-r from-purple-600 via-slate-800 to-emerald-500',
    moralBoxClass: 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-300 dark:border-purple-700 text-purple-950 dark:text-purple-200',
    heroBadge: 'bg-purple-200 text-purple-950 dark:bg-purple-900 dark:text-purple-100',
    decorativeEmoji: '🕯️'
  },
  Moral: {
    name: 'Moral',
    label: 'Wisdom & Values',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    gradientBg: 'from-emerald-100/50 via-teal-100/30 to-amber-100/20 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-amber-950/10',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    accentBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    cardBorder: 'border-emerald-200 dark:border-emerald-900/50',
    cardShadow: 'hover:shadow-emerald-500/15',
    progressBarColor: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    moralBoxClass: 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200',
    heroBadge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/70 dark:text-emerald-200',
    decorativeEmoji: '🌱'
  },
  Royal: {
    name: 'Royal',
    label: 'Majestic & Historical',
    badgeClass: 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border-amber-300 dark:border-amber-700',
    gradientBg: 'from-amber-100/50 via-rose-100/30 to-amber-100/40 dark:from-amber-950/30 dark:via-rose-950/20 dark:to-amber-950/20',
    accentText: 'text-amber-700 dark:text-amber-400',
    accentBg: 'bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white',
    cardBorder: 'border-amber-300/80 dark:border-amber-800/60',
    cardShadow: 'hover:shadow-amber-600/15',
    progressBarColor: 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600',
    moralBoxClass: 'bg-gradient-to-br from-amber-50 to-rose-50/60 dark:from-amber-950/50 dark:to-rose-950/30 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200',
    heroBadge: 'bg-amber-200 text-amber-950 dark:bg-amber-900/80 dark:text-amber-100',
    decorativeEmoji: '👑'
  }
};

export const getThemeStyles = (theme?: ThemeType): ThemeStyles => {
  if (!theme || !THEME_CONFIGS[theme]) {
    return THEME_CONFIGS.Default;
  }
  return THEME_CONFIGS[theme];
};
