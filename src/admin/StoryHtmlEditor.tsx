import React, { useState, useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Sparkles, 
  Palette, 
  Eye, 
  Code, 
  Sun, 
  Moon, 
  Type, 
  MessageSquare, 
  Zap, 
  RotateCcw,
  Smile,
  Highlighter
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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Helper to wrap selected text or insert snippet at cursor
  const insertTag = (openTag: string, closeTag: string, defaultText = 'टेक्स्ट') => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + `${openTag}${defaultText}${closeTag}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const textToWrap = selected || defaultText;
    const replacement = `${openTag}${textToWrap}${closeTag}`;

    const updated = value.substring(0, start) + replacement + value.substring(end);
    onChange(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + openTag.length,
        start + openTag.length + textToWrap.length
      );
    }, 10);
  };

  // Color Palette insert
  const applyColor = (hex: string) => {
    insertTag(`<span style="color: ${hex}; font-weight: bold;">`, '</span>', 'रंगीन शब्द');
  };

  // Animation insert
  const applyAnimation = (animClass: string, label: string) => {
    insertTag(`<span class="${animClass}">`, '</span>', label);
  };

  // Insert pre-built kids story elements
  const insertDialogue = () => {
    insertTag(
      `<div class="story-dialogue">\n  <p><strong>राजा ने कहा:</strong> "`,
      `"</p>\n</div>`,
      `जो इंसान दूसरों की मदद करता है, वही सबसे बड़ा है!`
    );
  };

  const insertMagicBox = () => {
    insertTag(
      `<div class="story-magic-box">\n  <h4 style="color: #db2777; font-weight: 800; margin-bottom: 0.5rem;">✨ जादुई रहस्य</h4>\n  <p>`,
      `</p>\n</div>`,
      `अचानक पेड़ से सुनहरी रोशनी निकलने लगी और एक नन्हीं परी बाहर आई!`
    );
  };

  const insertScrollBox = () => {
    insertTag(
      `<div class="story-scroll-box">\n  <p style="color: #92400e; font-weight: 600;">📜 <strong>प्राचीन संदेश:</strong> `,
      `</p>\n</div>`,
      `जो धैर्य और साहस से काम लेता है, उसकी कभी हार नहीं होती।`
    );
  };

  const insertSfx = (sound: string) => {
    insertTag(`<span class="story-sfx">`, `</span>`, sound);
  };

  // Quick Starter Sample Template with rich animations and colors
  const loadSampleHtml = () => {
    const sample = language === 'Hindi' 
      ? `<p>एक घने और हरे-भरे जंगल में एक <span class="story-bounce font-bold" style="color: #f59e0b;">🐰 नन्हा खरगोश</span> रहता था जिसका नाम चीकू था। वह बहुत चतुर और फुर्तीला था।</p>

<p>एक दिन अचानक जंगल में <span class="story-shake font-extrabold" style="color: #ef4444;">शेर की भयंकर दहाड़</span> गूंज उठी - <span class="story-sfx">दहाड़! 🦁</span> सभी जानवर डर के मारे कांपने लगे।</p>

<div class="story-dialogue">
  <p><strong>चीकू खरगोश ने मुस्कुराते हुए कहा:</strong> "डरने की कोई बात नहीं है दोस्तों! बुद्धि बल से कहीं अधिक शक्तिशाली होती है।"</p>
</div>

<p>चीकू ने अपनी सूझबूझ से शेर को एक गहरे कुएं के पास बुलाया और कहा:</p>

<div class="story-magic-box">
  <h4 style="color: #db2777; font-weight: 800;">✨ चीकू की चतुराई भरी युक्ति</h4>
  <p>उसने कुएं के शांत पानी में शेर को उसका ही प्रतिबिंब दिखाया और कहा कि अंदर दूसरा बलवान शेर बैठा है!</p>
</div>

<p>शेर ने गुस्से में आकर कुएं में छलांग लगा दी - <span class="story-sfx">छपाक! 🌊</span></p>

<div class="story-scroll-box">
  <p style="color: #92400e;">📜 सभी जानवरों ने मिलकर खुशी से नाचते हुए कहा: <span class="story-rainbow font-black">"चीकू हमारा सच्चा हीरो है!"</span></p>
</div>`
      : `<p>Once upon a time in a magical valley, lived a <span class="story-bounce font-bold" style="color: #f59e0b;">🐿️ clever little squirrel</span> named Pippin.</p>

<p>Suddenly, a great gust of wind swept through the tall oak trees - <span class="story-sfx">WHOOSH! 🍃</span></p>

<div class="story-dialogue">
  <p><strong>Pippin smiled and said:</strong> "Do not fear, my forest friends! Kindness and courage always light our way."</p>
</div>

<div class="story-magic-box">
  <h4 style="color: #db2777; font-weight: 800;">✨ The Golden Discovery</h4>
  <p>Underneath the mossy stones, Pippin uncovered a glowing acorn that sparked with <span class="story-rainbow font-extrabold">dazzling rainbow light</span>!</p>
</div>

<p>All the woodland animals cheered: <span class="story-float font-bold" style="color: #10b981;">"Hooray for Pippin!"</span></p>`;

    onChange(sample);
  };

  const getFontSizeClass = () => {
    switch (previewFontSize) {
      case 'sm': return 'text-sm leading-relaxed';
      case 'base': return 'text-base leading-loose sm:text-lg sm:leading-8';
      case 'lg': return 'text-lg leading-loose sm:text-xl sm:leading-9';
      case 'xl': return 'text-xl leading-loose sm:text-2xl sm:leading-10';
    }
  };

  const wordCount = stripHtmlTags(value).trim() ? stripHtmlTags(value).trim().split(/\s+/).length : 0;

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs dark:border-slate-800 dark:bg-slate-900">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/80 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Story HTML Editor</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Supports custom colors, animations, dialogue & tags
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 text-xs dark:border-slate-700 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-colors ${
              activeTab === 'editor'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('split')}
            className={`hidden sm:flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-colors ${
              activeTab === 'split'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
          >
            <span>Split View</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition-colors ${
              activeTab === 'preview'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 bg-white p-2.5 text-xs dark:border-slate-800 dark:bg-slate-900">
        {/* Basic Text Formatting */}
        <div className="flex items-center gap-0.5 border-r border-slate-200 pr-1.5 dark:border-slate-700">
          <button
            type="button"
            onClick={() => insertTag('<b>', '</b>', 'बोल्ड शब्द')}
            className="rounded p-1.5 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            title="Bold <b>"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<i>', '</i>', 'इटैलिक शब्द')}
            className="rounded p-1.5 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            title="Italic <i>"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<u>', '</u>', 'अंडरलाइन शब्द')}
            className="rounded p-1.5 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            title="Underline <u>"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('<mark style="background: #fef08a; padding: 0.1rem 0.35rem; border-radius: 0.25rem;">', '</mark>', 'हाइलाइट')}
            className="rounded p-1.5 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            title="Highlight <mark>"
          >
            <Highlighter className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Font Colors Palette */}
        <div className="flex items-center gap-1 border-r border-slate-200 pr-2 dark:border-slate-700">
          <Palette className="w-3.5 h-3.5 text-slate-400 mr-0.5" />
          <button
            type="button"
            onClick={() => applyColor('#ef4444')}
            className="h-5 w-5 rounded-full bg-red-500 hover:scale-110 transition-transform shadow-xs"
            title="Red Font"
          />
          <button
            type="button"
            onClick={() => applyColor('#3b82f6')}
            className="h-5 w-5 rounded-full bg-blue-500 hover:scale-110 transition-transform shadow-xs"
            title="Blue Font"
          />
          <button
            type="button"
            onClick={() => applyColor('#10b981')}
            className="h-5 w-5 rounded-full bg-emerald-500 hover:scale-110 transition-transform shadow-xs"
            title="Emerald Green Font"
          />
          <button
            type="button"
            onClick={() => applyColor('#f59e0b')}
            className="h-5 w-5 rounded-full bg-amber-500 hover:scale-110 transition-transform shadow-xs"
            title="Amber Gold Font"
          />
          <button
            type="button"
            onClick={() => applyColor('#8b5cf6')}
            className="h-5 w-5 rounded-full bg-purple-500 hover:scale-110 transition-transform shadow-xs"
            title="Purple Font"
          />
          <button
            type="button"
            onClick={() => applyColor('#ec4899')}
            className="h-5 w-5 rounded-full bg-pink-500 hover:scale-110 transition-transform shadow-xs"
            title="Pink Font"
          />
        </div>

        {/* Story Animations */}
        <div className="flex items-center gap-1 border-r border-slate-200 pr-2 dark:border-slate-700">
          <Zap className="w-3.5 h-3.5 text-amber-500 mr-0.5" />
          <button
            type="button"
            onClick={() => applyAnimation('story-bounce', '🎈 उछलती गति')}
            className="rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-800 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300"
            title="Bounce Animation"
          >
            Bounce
          </button>
          <button
            type="button"
            onClick={() => applyAnimation('story-rainbow', '🌈 सतरंगी चमक')}
            className="rounded-lg bg-pink-50 px-2 py-1 text-[11px] font-bold text-pink-800 hover:bg-pink-100 dark:bg-pink-950/50 dark:text-pink-300"
            title="Rainbow Gradient Text"
          >
            Rainbow
          </button>
          <button
            type="button"
            onClick={() => applyAnimation('story-float', '🌊 तैरती लहर')}
            className="rounded-lg bg-sky-50 px-2 py-1 text-[11px] font-bold text-sky-800 hover:bg-sky-100 dark:bg-sky-950/50 dark:text-sky-300"
            title="Float Animation"
          >
            Float
          </button>
          <button
            type="button"
            onClick={() => applyAnimation('story-shake', '⚡ थरथराहट')}
            className="rounded-lg bg-red-50 px-2 py-1 text-[11px] font-bold text-red-800 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-300"
            title="Shake / Tremor"
          >
            Shake
          </button>
        </div>

        {/* Story Elements (Dialogue, Magic, SFX) */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={insertDialogue}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            title="Insert Character Dialogue Bubble"
          >
            <MessageSquare className="w-3 h-3 text-amber-500" />
            <span>Dialogue</span>
          </button>

          <button
            type="button"
            onClick={insertMagicBox}
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            title="Insert Magic Highlight Box"
          >
            <Sparkles className="w-3 h-3 text-pink-500" />
            <span>Magic Box</span>
          </button>

          <button
            type="button"
            onClick={insertScrollBox}
            className="hidden sm:flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            title="Insert Royal Scroll Box"
          >
            <span>📜 Scroll</span>
          </button>

          <button
            type="button"
            onClick={() => insertSfx(language === 'Hindi' ? 'धड़ाम!' : 'BOOM!')}
            className="flex items-center gap-1 rounded-lg bg-red-500 px-2 py-1 text-[11px] font-bold text-white hover:bg-red-600 transition-colors shadow-xs"
            title="Insert Sound Effect Sticker"
          >
            <span>💥 SFX</span>
          </button>
        </div>

        {/* Sample Template Loader */}
        <div className="ml-auto">
          <button
            type="button"
            onClick={loadSampleHtml}
            className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 transition-colors"
            title="Load Animated Sample HTML Story"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Insert Sample Story</span>
          </button>
        </div>
      </div>

      {/* Main Content Area: Editor / Split / Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
        {/* HTML Code Editor */}
        {(activeTab === 'editor' || activeTab === 'split') && (
          <div className={`${activeTab === 'editor' ? 'col-span-2' : ''} flex flex-col`}>
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100/70 dark:bg-slate-800/40 text-[10px] text-slate-400 font-mono">
              <span>HTML Source Code</span>
              <span>{wordCount} words</span>
            </div>
            <textarea
              ref={textareaRef}
              rows={16}
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder={`<p>यहाँ अपनी कहानी लिखें...</p>\n\n<p>उदाहरण: <span class="story-bounce" style="color: #ef4444;">उछलता खरगोश</span></p>`}
              className="w-full flex-1 p-4 font-mono text-xs sm:text-sm leading-relaxed text-slate-800 bg-slate-50/50 dark:bg-slate-900 dark:text-slate-200 focus:outline-hidden resize-y min-h-[300px]"
            />
          </div>
        )}

        {/* Live Preview Pane */}
        {(activeTab === 'preview' || activeTab === 'split') && (
          <div className={`${activeTab === 'preview' ? 'col-span-2' : ''} flex flex-col bg-white dark:bg-slate-950`}>
            {/* Live Preview Controls Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs dark:border-slate-800 dark:bg-slate-800/40">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-600 dark:text-slate-300 text-[11px]">
                  Live User Preview
                </span>
                <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Realtime
                </span>
              </div>

              {/* Preview Theme and Size */}
              <div className="flex items-center gap-2">
                {/* Font Size preview */}
                <div className="flex items-center gap-0.5 rounded bg-slate-200/70 p-0.5 text-[10px] font-bold dark:bg-slate-800">
                  {(['sm', 'base', 'lg', 'xl'] as const).map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPreviewFontSize(size)}
                      className={`px-1.5 py-0.5 rounded ${
                        previewFontSize === size
                          ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                          : 'text-slate-500'
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
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:border-slate-700 dark:text-slate-300"
                  title="Toggle Preview Theme"
                >
                  {previewTheme === 'dark' ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-slate-500" />}
                  <span>{previewTheme === 'dark' ? 'Dark' : 'Light'}</span>
                </button>
              </div>
            </div>

            {/* Preview Render Area */}
            <div
              className={`p-6 overflow-y-auto min-h-[300px] transition-colors ${
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
                  <p className="text-[11px] text-slate-400 mt-1">
                    Try clicking "Insert Sample Story" or use the formatting toolbar above!
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
