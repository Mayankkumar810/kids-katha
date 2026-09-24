import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Twitter, Facebook, Send } from 'lucide-react';

interface ShareModalProps {
  title: string;
  slug: string;
  className?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ title, slug, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/story/${slug}`;
    }
    return `https://kathavichar.com/story/${slug}`;
  };

  const url = getFullUrl();
  const shareText = `Read this wonderful story "${title}" on KathaVichar: ${url}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Read "${title}" on KathaVichar`,
          url
        });
      } catch {
        // User dismissed
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* WhatsApp Share */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 transition-transform active:scale-95"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 fill-current" />
        <span>WhatsApp</span>
      </a>

      {/* Twitter / X Share */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-black transition-transform active:scale-95 dark:bg-slate-800 dark:hover:bg-slate-700"
        title="Share on X (Twitter)"
      >
        <Twitter className="w-3.5 h-3.5 fill-current" />
        <span>X / Twitter</span>
      </a>

      {/* Facebook Share */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-transform active:scale-95"
        title="Share on Facebook"
      >
        <Facebook className="w-3.5 h-3.5 fill-current" />
        <span>Facebook</span>
      </a>

      {/* Telegram Share */}
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 rounded-xl bg-sky-500 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-sky-600 transition-transform active:scale-95"
        title="Share on Telegram"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Telegram</span>
      </a>

      {/* Copy Link Button */}
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        title="Copy link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Native Web Share API if supported */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-amber-600 active:scale-95 transition-transform"
          title="More share options"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>More</span>
        </button>
      )}
    </div>
  );
};
