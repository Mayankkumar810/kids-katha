import React, { useEffect, useState } from 'react';
import { ThemeType } from '../../types';
import { getThemeStyles } from '../../utils/themeStyles';

interface ReadingProgressBarProps {
  theme?: ThemeType;
  onProgressUpdate?: (percent: number) => void;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  theme = 'Default',
  onProgressUpdate
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const themeStyle = getThemeStyles(theme);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const percent = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(percent);
      if (onProgressUpdate) {
        onProgressUpdate(percent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onProgressUpdate]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-slate-200/50 backdrop-blur-xs dark:bg-slate-800/50">
      <div
        className={`h-full transition-all duration-150 ${themeStyle.progressBarColor}`}
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};
