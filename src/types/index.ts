export type ThemeType = 'Default' | 'Kids' | 'Horror' | 'Moral' | 'Royal';

export type LanguageType = 'Hindi' | 'English';

export interface Category {
  id: string;
  name: string;
  slug: string;
  theme: ThemeType;
  imageUrl: string;
  isActive: boolean;
  description?: string;
  storyCount?: number;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  categorySlug: string;
  theme: ThemeType;
  language: LanguageType;
  bannerUrl: string;
  thumbnailUrl: string;
  content: string; // Markdown or formatted text with paragraphs
  moral?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  readingTime: string; // e.g. "4 min"
  views: number;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt?: string;
  author?: string;
}

export interface SocialMediaConfig {
  youtube: { url: string; enabled: boolean };
  instagram: { url: string; enabled: boolean };
  telegram: { url: string; enabled: boolean };
  facebook: { url: string; enabled: boolean };
}

export interface HomepageConfig {
  heroImageUrl: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonLink: string;
}

export interface AdsConfig {
  headerAd: { code: string; enabled: boolean };
  inContentAd: { code: string; enabled: boolean };
  sidebarAd: { code: string; enabled: boolean };
  footerAd: { code: string; enabled: boolean };
}

export interface ReadingProgress {
  storySlug: string;
  progressPercent: number;
  lastReadAt: string;
  title: string;
  thumbnailUrl: string;
}

export interface LegalConfig {
  contactEmail: string;
  publisherName: string;
  siteName: string;
  customPrivacyPolicy?: string;
  customTerms?: string;
  customDisclaimer?: string;
  aboutText?: string;
}

export interface AdminUser {
  email: string;
  uid: string;
}
