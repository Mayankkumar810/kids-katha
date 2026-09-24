/**
 * Utilities for HTML stories: sanitizing, tag stripping, and helpers
 */

// Strip HTML tags for plain-text representations (word counts, narration, previews, search)
export function stripHtmlTags(html: string): string {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Check if content appears to have HTML tags
export function isHtmlContent(content: string): boolean {
  if (!content) return false;
  return /<[a-z][\s\S]*>/i.test(content);
}

// Convert plain text double-newlines to formatted HTML paragraphs if needed
export function ensureHtmlStory(content: string): string {
  if (!content) return '';
  if (isHtmlContent(content)) {
    return content;
  }
  // Convert plain text paragraphs to <p> tags
  return content
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${p}</p>`)
    .join('\n');
}

// Calculate reading time from HTML content
export function getReadingTimeFromHtml(content: string): string {
  const plainText = stripHtmlTags(content);
  const words = plainText.trim() ? plainText.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 160));
  return `${minutes} min read`;
}

// Word count from HTML content
export function getWordCountFromHtml(content: string): number {
  const plainText = stripHtmlTags(content);
  return plainText.trim() ? plainText.trim().split(/\s+/).length : 0;
}
