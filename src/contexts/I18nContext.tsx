import React, { useMemo, useState } from 'react';
import { dictionary, I18nContext, I18nValue, Lang } from './I18nContextValue';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'zh');
  const value = useMemo<I18nValue>(() => ({
    lang,
    setLang: (l: Lang) => { setLang(l); localStorage.setItem('lang', l); },
    t: (key) => dictionary[key][lang],
  }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

