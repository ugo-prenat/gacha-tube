import i18next from 'i18next';
import { createContext, useContext, useEffect, useState } from 'react';

import { DEFAULT_LOCALE, LOCALES, LOCALE_STORAGE_KEY } from './i18n.types';
import type { PropsWithChildren } from 'react';
import type { Locale } from './i18n.types';

type LangProviderState = {
  lang: Locale;
  setLang: (lang: Locale) => Promise<void>;
};

const LangProviderContext = createContext<LangProviderState>({
  lang: DEFAULT_LOCALE,
  setLang: () => Promise.resolve(),
});

const syncDocumentLang = (lang: Locale) => {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
};

const isLang = (value: string | null): value is Locale =>
  value !== null && LOCALES.includes(value as Locale);

export const LangProvider = ({ children }: PropsWithChildren) => {
  const [lang, setLangState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    const next = isLang(stored) ? stored : DEFAULT_LOCALE;

    setLangState(next);
    i18next.changeLanguage(next);
    syncDocumentLang(next);
  }, []);

  const setLang = (next: Locale) =>
    i18next.changeLanguage(next).then(() => {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
      setLangState(next);
      syncDocumentLang(next);
    });

  return (
    <LangProviderContext value={{ lang, setLang }}>
      {children}
    </LangProviderContext>
  );
};

export const useLang = () => useContext(LangProviderContext);
