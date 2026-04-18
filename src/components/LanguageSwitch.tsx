import React from 'react';
import { useI18n } from '@/contexts/useI18n';

export default function LanguageSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div
      role="group"
      aria-label={lang === 'zh' ? '语言切换' : 'Language switch'}
      className="flex items-center gap-1 rounded-full border border-slate-300/60 bg-white/18 p-1 shadow-sm dark:border-white/10 dark:bg-slate-950/50"
    >
      <button
        type="button"
        aria-pressed={lang === 'zh'}
        aria-label="切换到中文"
        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
          lang==='zh'
            ? 'bg-slate-950 text-white shadow-glow'
            : 'text-slate-600 dark:text-slate-300'
        }`}
        onClick={() => setLang('zh')}
      >中文</button>
      <button
        type="button"
        aria-pressed={lang === 'en'}
        aria-label="Switch to English"
        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
          lang==='en'
            ? 'bg-slate-950 text-white shadow-glow'
            : 'text-slate-600 dark:text-slate-300'
        }`}
        onClick={() => setLang('en')}
      >EN</button>
    </div>
  );
}

