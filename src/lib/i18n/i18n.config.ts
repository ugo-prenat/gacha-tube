import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fr from './fr.json';
import { DEFAULT_LOCALE, LOCALES } from './i18n.types';
import type { Locale } from './i18n.types';

const resources = {
  fr: { translation: fr },
  en: { translation: en }
} satisfies Record<Locale, { translation: Record<string, unknown> }>;

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: [...LOCALES],
  interpolation: { escapeValue: false }
});
