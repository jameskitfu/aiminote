import React from 'react';
import { useI18n } from '@/contexts/I18nContext';

export default function LanguageSwitch() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center gap-2">
      <button
        className={`px-3 py-1 rounded-md text-sm ${lang==='zh' ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}
        onClick={() => setLang('zh')}
      >中文</button>
      <button
        className={`px-3 py-1 rounded-md text-sm ${lang==='en' ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}
        onClick={() => setLang('en')}
      >EN</button>
    </div>
  );
}

