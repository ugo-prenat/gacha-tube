import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import i18next from 'i18next';
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, LOCALES } from './i18n.types';
import type { Locale } from './i18n.types';

type LangStore = {
  lang: Locale;
  setLang: (lang: Locale) => Promise<void>;
  syncLang: (lang?: string) => void;
};

const syncDocumentLang = (lang: Locale) => {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
};

const isLang = (value: string): value is Locale =>
  LOCALES.includes(value as Locale);

export const useLang = create<LangStore>()(
  persist(
    (set, get) => ({
      lang: DEFAULT_LOCALE,
      setLang: (lang) =>
        i18next.changeLanguage(lang).then(() => {
          set({ lang });
          syncDocumentLang(lang);
        }),
      syncLang: (value = get().lang) => {
        const lang = isLang(value) ? value : DEFAULT_LOCALE;
        set({ lang });
        void i18next.changeLanguage(lang);
        syncDocumentLang(lang);
      }
    }),
    {
      name: LOCALE_STORAGE_KEY,
      storage:
        typeof window === 'undefined'
          ? undefined
          : createJSONStorage(() => window.localStorage),
      partialize: ({ lang }) => ({ lang }),
      onRehydrateStorage: () => (state) => state?.syncLang()
    }
  )
);
