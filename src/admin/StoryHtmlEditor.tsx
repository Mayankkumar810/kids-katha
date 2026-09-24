import React, { useState, useRef } from 'react';
import { 
  Code, 
  Eye, 
  Sun, 
  Moon, 
  Copy, 
  ClipboardPaste, 
  Trash2, 
  Check, 
  FileCode2,
  Columns,
  Maximize2
} from 'lucide-react';
import { stripHtmlTags } from '../utils/htmlStoryUtils';

interface StoryHtmlEditorProps {
  value: string;
  onChange: (val: string) => void;
  language?: 'Hindi' | 'English';
}

export const StoryHtmlEditor: React.FC<StoryHtmlEditorProps> = ({ 
  value, 
  onChange, 
  language = 'Hindi' 
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'split'>('split');
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  const [previewFontSize, setPreviewFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [copied, setCopied] = useState(false);
  const [pastedStatus, setPastedStatus] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Copy HTML to clipboard
  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Clipboard write error:', e);
    }
  };

  // Paste from clipboard (useful for AI generated HTML)
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text);
        setPastedStatus(true);
        setTimeout(() => setPastedStatus(false), 2000);
      }
    } catch {
      // Focus textarea so user can paste manually with Ctrl+V / Cmd+V
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  // Clear Editor
  const handleClear = () => {
    if (!value.trim()) return;
    if (window.confirm('Are you sure you want to clear the HTML content?')) {
      onChange('');
    }
  };

  // Quick wrap in paragraph tag if plain text is entered
  const handleWrapParagraphs = () => {
    if (!value.trim()) return;
    const lines = value.split(/\n\s*\n/).filter(line => line.trim().length > 0);
    const wrapped = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('<p') || trimmed.startsWith('<div') || trimmed.startsWith('<h')) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    }).join('\n\n');
    onChange(wrapped);
  };

  const getFontSizeClass = () => {
    switch (previewFontSize) {
      case 'sm': return 'text-sm leading-relaxed';
      case 'base': return 'text-base leading-loose sm:text-lg sm:leading-8';
      case 'lg': return 'text-lg leading-loose sm:text-xl sm:leading-9';
      case 'xl': return 'text-xl leading-loose sm:text-2xl sm:leading-10';
    }
  };

  const plainText = stripHtmlTags(value).trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs dark:border-slate-800 dark:bg-slate-900 transition-colors">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/90 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
            <FileCode2 className="w-4 h-4 text-amber-500" />
            <span>Story HTML Code</span>
          </div>
          <span className="hidden sm:inline-block text-[11px] text-slate-400">
            Paste or write raw HTML directly (from AI or hand-written)
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 text-xs dark:border-slate-700 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-bold transition-colors cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
            title="HTML Source Code Only"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('split')}
            className={`hidden sm:flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-bold transition-colors cursor-pointer ${
              activeTab === 'split'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
            title="Split Code & Live Preview"
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-bold transition-colors cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
            title="Full Live Preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Editor Utility Actions Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePasteClipboard}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
            title="Paste HTML from clipboard"
          >
            {pastedStatus ? <Check className="w-3 h-3 text-emerald-500" /> : <ClipboardPaste className="w-3 h-3 text-amber-500" />}
            <span>{pastedStatus ? 'Pasted!' : 'Paste HTML'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!value}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
            title="Copy HTML to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-indigo-500" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            type="button"
            onClick={handleWrapParagraphs}
            disabled={!value}
            className="hidden sm:flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
            title="Wrap lines into <p>...</p> tags"
          >
            <span>&lt;p&gt; Wrap Paragraphs</span>
          </button>

          {value.trim() && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50/50 px-2 py-1 text-[11px] font-bold text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 transition-colors cursor-pointer"
              title="Clear editor content"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      {/* Main Content Area: Editor / Split / Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
        {/* HTML Code Editor */}
        {(activeTab === 'editor' || activeTab === 'split') && (
          <div className={`${activeTab === 'editor' ? 'col-span-2' : ''} flex flex-col`}>
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100/70 dark:bg-slate-800/40 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              <span>HTML Source Code (Type or Paste AI HTML)</span>
              <span className="text-slate-400">Ctrl+V / Cmd+V to paste</span>
            </div>
            <textarea
              ref={textareaRef}
              rows={16}
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder={`<p>यहाँ अपनी कहानी का HTML कोड लिखें या AI से जनरेट किया हुआ कोड पेस्ट करें...</p>\n\n<p style="color: #f59e0b; font-size: 1.25rem;">आप अपनी पसंद के कोई भी फॉन्ट, कलर, एनीमेशन या HTML टैग्स इस्तेमाल कर सकते हैं।</p>`}
              className="w-full flex-1 p-4 font-mono text-xs sm:text-sm leading-relaxed text-slate-800 bg-slate-50/60 dark:bg-slate-900 dark:text-slate-200 focus:outline-hidden resize-y min-h-[340px]"
              spellCheck={false}
            />
          </div>
        )}

        {/* Live User Preview Pane */}
        {(activeTab === 'preview' || activeTab === 'split') && (
          <div className={`${activeTab === 'preview' ? 'col-span-2' : ''} flex flex-col bg-white dark:bg-slate-950`}>
            {/* Live Preview Controls Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-200 text-[11px]">
                  Live User Preview
                </span>
                <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Realtime
                </span>
              </div>

              {/* Preview Controls: Font Size and Dark/Light Mode */}
              <div className="flex items-center gap-2">
                {/* Font Size preview */}
                <div className="flex items-center gap-0.5 rounded bg-slate-200/70 p-0.5 text-[10px] font-bold dark:bg-slate-800">
                  {(['sm', 'base', 'lg', 'xl'] as const).map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPreviewFontSize(size)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        previewFontSize === size
                          ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Dark / Light Preview Toggle */}
                <button
                  type="button"
                  onClick={() => setPreviewTheme(prev => prev === 'light' ? 'dark' : 'light')}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:border-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Toggle Preview Light/Dark Mode"
                >
                  {previewTheme === 'dark' ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-slate-500" />}
                  <span>{previewTheme === 'dark' ? 'Dark' : 'Light'}</span>
                </button>
              </div>
            </div>

            {/* Preview Render Area */}
            <div
              className={`p-6 overflow-y-auto min-h-[340px] transition-colors ${
                previewTheme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-800'
              }`}
            >
              {value.trim() ? (
                <div
                  className={`story-rendered-content space-y-4 ${getFontSizeClass()} ${
                    language === 'Hindi' ? 'font-hindi' : 'font-english'
                  }`}
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                  <Eye className="w-8 h-8 stroke-1 mb-2 opacity-60" />
                  <p className="text-xs font-semibold">Your live HTML story preview will appear here.</p>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                    Write or paste your HTML code in the editor to see instant live rendering with custom styles and tags.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
