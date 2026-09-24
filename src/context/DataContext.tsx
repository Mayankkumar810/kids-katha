import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ref, onValue, set, update, remove } from 'firebase/database';
import { database, isFirebaseConfigured } from '../firebase/config';
import {
  Story,
  Category,
  SocialMediaConfig,
  HomepageConfig,
  AdsConfig,
  ReadingProgress
} from '../types';
import {
  initialStories,
  initialCategories,
  initialSocialMedia,
  initialHomepageConfig,
  initialAdsConfig
} from '../data/initialData';

interface DataContextType {
  stories: Story[];
  categories: Category[];
  socialMedia: SocialMediaConfig;
  homepageConfig: HomepageConfig;
  adsConfig: AdsConfig;
  bookmarks: string[];
  readingProgress: Record<string, ReadingProgress>;
  loading: boolean;
  addStory: (story: Omit<Story, 'id' | 'views' | 'createdAt'>) => Promise<Story>;
  updateStory: (id: string, updates: Partial<Story>) => Promise<void>;
  deleteStory: (id: string) => Promise<void>;
  incrementStoryViews: (slug: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => Promise<Category>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  updateSocialMedia: (config: SocialMediaConfig) => Promise<void>;
  updateHomepageConfig: (config: HomepageConfig) => Promise<void>;
  updateAdsConfig: (config: AdsConfig) => Promise<void>;
  toggleBookmark: (storySlug: string) => void;
  isBookmarked: (storySlug: string) => boolean;
  saveReadingProgress: (storySlug: string, percent: number, title: string, thumbnailUrl: string) => void;
  resetToInitialSeed: () => void;
}

const DataContext = createContext<DataContextType>({} as DataContextType);

const LS_STORIES = 'kathavichar_stories_v1';
const LS_CATEGORIES = 'kathavichar_categories_v1';
const LS_SOCIAL = 'kathavichar_social_v1';
const LS_HOMEPAGE = 'kathavichar_homepage_v1';
const LS_ADS = 'kathavichar_ads_v1';
const LS_BOOKMARKS = 'kathavichar_bookmarks_v1';
const LS_READING_PROGRESS = 'kathavichar_progress_v1';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isFirebase = isFirebaseConfigured() && database !== null;

  // Local state initialized with LocalStorage or seed data
  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const saved = localStorage.getItem(LS_STORIES);
      return saved ? JSON.parse(saved) : initialStories;
    } catch {
      return initialStories;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(LS_CATEGORIES);
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  const [socialMedia, setSocialMedia] = useState<SocialMediaConfig>(() => {
    try {
      const saved = localStorage.getItem(LS_SOCIAL);
      return saved ? JSON.parse(saved) : initialSocialMedia;
    } catch {
      return initialSocialMedia;
    }
  });

  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(() => {
    try {
      const saved = localStorage.getItem(LS_HOMEPAGE);
      return saved ? JSON.parse(saved) : initialHomepageConfig;
    } catch {
      return initialHomepageConfig;
    }
  });

  const [adsConfig, setAdsConfig] = useState<AdsConfig>(() => {
    try {
      const saved = localStorage.getItem(LS_ADS);
      return saved ? JSON.parse(saved) : initialAdsConfig;
    } catch {
      return initialAdsConfig;
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LS_BOOKMARKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgress>>(() => {
    try {
      const saved = localStorage.getItem(LS_READING_PROGRESS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync to LocalStorage whenever local state changes
  useEffect(() => {
    try {
      localStorage.setItem(LS_STORIES, JSON.stringify(stories));
    } catch (e) { console.warn(e); }
  }, [stories]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_CATEGORIES, JSON.stringify(categories));
    } catch (e) { console.warn(e); }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_SOCIAL, JSON.stringify(socialMedia));
    } catch (e) { console.warn(e); }
  }, [socialMedia]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_HOMEPAGE, JSON.stringify(homepageConfig));
    } catch (e) { console.warn(e); }
  }, [homepageConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_ADS, JSON.stringify(adsConfig));
    } catch (e) { console.warn(e); }
  }, [adsConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) { console.warn(e); }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_READING_PROGRESS, JSON.stringify(readingProgress));
    } catch (e) { console.warn(e); }
  }, [readingProgress]);

  // Firebase Realtime DB listeners if active
  useEffect(() => {
    if (!isFirebase || !database) return;

    const storiesRef = ref(database, 'stories');
    const unsubscribeStories = onValue(storiesRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ ...data[key], id: key }));
        setStories(list);
      }
    });

    const categoriesRef = ref(database, 'categories');
    const unsubscribeCategories = onValue(categoriesRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ ...data[key], id: key }));
        setCategories(list);
      }
    });

    const homepageRef = ref(database, 'homepageConfig');
    const unsubscribeHomepage = onValue(homepageRef, snapshot => {
      const data = snapshot.val();
      if (data) setHomepageConfig(data);
    });

    const socialRef = ref(database, 'socialMediaConfig');
    const unsubscribeSocial = onValue(socialRef, snapshot => {
      const data = snapshot.val();
      if (data) setSocialMedia(data);
    });

    const adsRef = ref(database, 'adsConfig');
    const unsubscribeAds = onValue(adsRef, snapshot => {
      const data = snapshot.val();
      if (data) setAdsConfig(data);
    });

    return () => {
      unsubscribeStories();
      unsubscribeCategories();
      unsubscribeHomepage();
      unsubscribeSocial();
      unsubscribeAds();
    };
  }, [isFirebase]);

  const addStory = async (storyData: Omit<Story, 'id' | 'views' | 'createdAt'>): Promise<Story> => {
    const id = 'story-' + Date.now();
    const newStory: Story = {
      ...storyData,
      id,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (isFirebase && database) {
      const storyRef = ref(database, `stories/${id}`);
      await set(storyRef, newStory);
    } else {
      setStories(prev => [newStory, ...prev]);
    }
    return newStory;
  };

  const updateStory = async (id: string, updates: Partial<Story>): Promise<void> => {
    if (isFirebase && database) {
      const storyRef = ref(database, `stories/${id}`);
      await update(storyRef, updates);
    } else {
      setStories(prev =>
        prev.map(s => (s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : s))
      );
    }
  };

  const deleteStory = async (id: string): Promise<void> => {
    if (isFirebase && database) {
      const storyRef = ref(database, `stories/${id}`);
      await remove(storyRef);
    } else {
      setStories(prev => prev.filter(s => s.id !== id));
    }
  };

  const incrementStoryViews = useCallback((slug: string) => {
    setStories(prev =>
      prev.map(s => {
        if (s.slug === slug) {
          const newViews = (s.views || 0) + 1;
          if (isFirebase && database) {
            update(ref(database, `stories/${s.id}`), { views: newViews }).catch(() => {});
          }
          return { ...s, views: newViews };
        }
        return s;
      })
    );
  }, [isFirebase]);

  const addCategory = async (catData: Omit<Category, 'id'>): Promise<Category> => {
    const id = 'cat-' + Date.now();
    const newCat: Category = {
      ...catData,
      id,
      storyCount: 0
    };

    if (isFirebase && database) {
      const catRef = ref(database, `categories/${id}`);
      await set(catRef, newCat);
    } else {
      setCategories(prev => [...prev, newCat]);
    }
    return newCat;
  };

  const updateCategory = async (id: string, updates: Partial<Category>): Promise<void> => {
    if (isFirebase && database) {
      const catRef = ref(database, `categories/${id}`);
      await update(catRef, updates);
    } else {
      setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
    }
  };

  const deleteCategory = async (id: string): Promise<void> => {
    if (isFirebase && database) {
      const catRef = ref(database, `categories/${id}`);
      await remove(catRef);
    } else {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const updateSocialMedia = async (config: SocialMediaConfig): Promise<void> => {
    if (isFirebase && database) {
      await set(ref(database, 'socialMediaConfig'), config);
    } else {
      setSocialMedia(config);
    }
  };

  const updateHomepageConfig = async (config: HomepageConfig): Promise<void> => {
    if (isFirebase && database) {
      await set(ref(database, 'homepageConfig'), config);
    } else {
      setHomepageConfig(config);
    }
  };

  const updateAdsConfig = async (config: AdsConfig): Promise<void> => {
    if (isFirebase && database) {
      await set(ref(database, 'adsConfig'), config);
    } else {
      setAdsConfig(config);
    }
  };

  const toggleBookmark = (storySlug: string) => {
    setBookmarks(prev => {
      if (prev.includes(storySlug)) {
        return prev.filter(s => s !== storySlug);
      } else {
        return [...prev, storySlug];
      }
    });
  };

  const isBookmarked = (storySlug: string) => bookmarks.includes(storySlug);

  const saveReadingProgress = (
    storySlug: string,
    percent: number,
    title: string,
    thumbnailUrl: string
  ) => {
    setReadingProgress(prev => ({
      ...prev,
      [storySlug]: {
        storySlug,
        progressPercent: Math.round(percent),
        lastReadAt: new Date().toISOString(),
        title,
        thumbnailUrl
      }
    }));
  };

  const resetToInitialSeed = () => {
    setStories(initialStories);
    setCategories(initialCategories);
    setSocialMedia(initialSocialMedia);
    setHomepageConfig(initialHomepageConfig);
    setAdsConfig(initialAdsConfig);
    setBookmarks([]);
    setReadingProgress({});
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        stories,
        categories,
        socialMedia,
        homepageConfig,
        adsConfig,
        bookmarks,
        readingProgress,
        loading,
        addStory,
        updateStory,
        deleteStory,
        incrementStoryViews,
        addCategory,
        updateCategory,
        deleteCategory,
        updateSocialMedia,
        updateHomepageConfig,
        updateAdsConfig,
        toggleBookmark,
        isBookmarked,
        saveReadingProgress,
        resetToInitialSeed
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
