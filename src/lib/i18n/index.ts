import { useTranslation as useI18nTranslation } from 'react-i18next';

export * from './i18n.provider';
export * from './i18n.types';
export * from './components/LangSelect';

export const useTranslation = () => useI18nTranslation().t;
