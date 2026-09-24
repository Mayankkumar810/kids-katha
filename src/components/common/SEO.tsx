import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articleMeta?: {
    publishedTime?: string;
    author?: string;
    section?: string;
  };
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  language?: 'Hindi' | 'English' | 'All';
}

const DEFAULT_TITLE = 'KathaVichar - Kids Stories in Hindi & English (बाल कहानियां व पंचतंत्र)';
const DEFAULT_DESC = 'Explore enchanting Hindi and English moral stories, bedtime adventures, and fairy tales for kids with themes, bookmarks, and font controls.';
const DEFAULT_IMAGE = '/images/default-og.jpg';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESC,
  keywords = ['kids stories', 'hindi kahaniya', 'moral stories', 'panchatantra', 'bedtime stories', 'english fairy tales'],
  canonicalUrl,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  articleMeta,
  jsonLd,
  language = 'All'
}) => {
  useEffect(() => {
    // 1. Page Title
    const fullTitle = title ? `${title} | KathaVichar` : DEFAULT_TITLE;
    document.title = fullTitle;

    // Helper to set meta attributes safely
    const setMetaTag = (attribute: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords.join(', '));
    setMetaTag('name', 'robots', 'index, follow');

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', 'KathaVichar');

    const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://kathavichar.com');
    setMetaTag('property', 'og:url', currentUrl);

    // 4. Twitter Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Article Meta (for story pages)
    if (articleMeta?.publishedTime) {
      setMetaTag('property', 'article:published_time', articleMeta.publishedTime);
    }
    if (articleMeta?.author) {
      setMetaTag('property', 'article:author', articleMeta.author);
    }
    if (articleMeta?.section) {
      setMetaTag('property', 'article:section', articleMeta.section);
    }

    // 6. Canonical link tag
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', currentUrl);

    // 7. hreflang tags for multilingual SEO
    const addHreflang = (lang: string, href: string) => {
      let tag = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement | null;
      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', 'alternate');
        tag.setAttribute('hreflang', lang);
        document.head.appendChild(tag);
      }
      tag.setAttribute('href', href);
    };

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://kathavichar.com';
    addHreflang('x-default', origin);
    addHreflang('hi', `${origin}/?lang=Hindi`);
    addHreflang('en', `${origin}/?lang=English`);

    // 8. JSON-LD structured data
    let jsonLdScript = document.getElementById('seo-json-ld') as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'seo-json-ld';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }

    const defaultJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'KathaVichar',
      url: origin,
      description: DEFAULT_DESC,
      inLanguage: ['hi', 'en'],
      potentialAction: {
        '@type': 'SearchAction',
        target: `${origin}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };

    jsonLdScript.textContent = JSON.stringify(jsonLd || defaultJsonLd);

    return () => {
      // Optional cleanup on unmount
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, articleMeta, jsonLd, language]);

  return null;
};
