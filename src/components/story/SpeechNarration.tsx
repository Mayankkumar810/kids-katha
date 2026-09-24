import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, Square, Sparkles } from 'lucide-react';
import { LanguageType } from '../../types';
import { stripHtmlTags } from '../../utils/htmlStoryUtils';

interface SpeechNarrationProps {
  content: string;
  language: LanguageType;
}

export const SpeechNarration: React.FC<SpeechNarrationProps> = ({ content, language }) => {
  const [supported, setSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(0.95); // gentle pace for kids reading
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanTextForSpeech = (rawText: string) => {
    // Strip HTML tags, markdown formatting, excessive punctuation, and emojis for clean speech
    const cleanText = stripHtmlTags(rawText);
    return cleanText
      .replace(/[*_#`~[\]]/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const startSpeaking = () => {
    if (!supported) return;

    window.speechSynthesis.cancel();

    const plainText = cleanTextForSpeech(content);
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = rate;
    utterance.pitch = 1.05; // slightly higher friendly pitch for kids

    // Pick appropriate voice
    const voices = window.speechSynthesis.getVoices();
    if (language === 'Hindi') {
      utterance.lang = 'hi-IN';
      const hiVoice = voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'));
      if (hiVoice) utterance.voice = hiVoice;
    } else {
      utterance.lang = 'en-US';
      const enVoice = voices.find(v => (v.lang.includes('en') || v.lang.includes('US')) && !v.name.includes('Google'));
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeaking = () => {
    if (!supported) return;
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeaking = () => {
    if (!supported) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeaking = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!supported) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-indigo-500/10 p-3.5 border border-amber-200/80 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
          <Volume2 className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100">
            <span>Listen Aloud (Audio Story)</span>
            <span className="rounded bg-amber-100 px-1.5 py-0.2 text-[10px] font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              {language === 'Hindi' ? 'हिंदी स्वर' : 'English Voice'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isPlaying
              ? isPaused
                ? 'Narration paused.'
                : 'Reading story aloud now...'
              : 'Press play to have the story read out loud.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Speed button */}
        <select
          value={rate}
          onChange={e => setRate(parseFloat(e.target.value))}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:outline-hidden"
          title="Audio speed"
        >
          <option value="0.8">0.8x (Slow)</option>
          <option value="0.95">1.0x (Gentle)</option>
          <option value="1.15">1.2x (Fast)</option>
        </select>

        {/* Play/Pause/Resume/Stop buttons */}
        {!isPlaying ? (
          <button
            onClick={startSpeaking}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-amber-600 transition-transform active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5">
            {isPaused ? (
              <button
                onClick={resumeSpeaking}
                className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Resume
              </button>
            ) : (
              <button
                onClick={pauseSpeaking}
                className="flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-700 transition-colors"
              >
                <Pause className="w-3.5 h-3.5 fill-current" /> Pause
              </button>
            )}
            <button
              onClick={stopSpeaking}
              className="rounded-lg bg-slate-200 p-1.5 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              title="Stop Narration"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
