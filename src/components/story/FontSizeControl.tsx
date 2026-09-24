import React from 'react';
import { Type, Minus, Plus, AlignLeft } from 'lucide-react';

export type FontSizeLevel = 'sm' | 'base' | 'lg' | 'xl';
export type FontMode = 'standard' | 'story' | 'hindi';

interface FontSizeControlProps {
  fontSize: FontSizeLevel;
  setFontSize: (size: FontSizeLevel) => void;
  fontMode: FontMode;
  setFontMode: (mode: FontMode) => void;
}

export const FontSizeControl: React.FC<FontSizeControlProps> = ({
  fontSize,
  setFontSize,
  fontMode,
  setFontMode
}) => {
  const sizes: FontSizeLevel[] = ['sm', 'base', 'lg', 'xl'];

  const increase = () => {
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1]);
    }
  };

  const decrease = () => {
    const currentIndex = sizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1]);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white/90 p-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <Type className="w-4 h-4 text-amber-500" />
        <span>Reading Controls:</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Font Size decrease / increase */}
        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-0.5 dark:border-slate-700 dark:bg-slate-800">
          <button
            onClick={decrease}
            disabled={fontSize === 'sm'}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-white disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
            title="Decrease font size"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">
            {fontSize}
          </span>
          <button
            onClick={increase}
            disabled={fontSize === 'xl'}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-white disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
            title="Increase font size"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Font Family switch */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setFontMode('standard')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              fontMode === 'standard'
                ? 'bg-amber-500 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            Poppins
          </button>
          <button
            onClick={() => setFontMode('story')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              fontMode === 'story'
                ? 'bg-amber-500 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            Nunito
          </button>
          <button
            onClick={() => setFontMode('hindi')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors font-hindi ${
              fontMode === 'hindi'
                ? 'bg-amber-500 text-white font-bold'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            देवनागरी
          </button>
        </div>
      </div>
    </div>
  );
};
