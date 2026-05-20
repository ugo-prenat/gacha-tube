import { useTranslation as useI18nTranslation } from 'react-i18next';
export * from './i18n.store';
export * from './i18n.types';

export const useTranslation = () => useI18nTranslation().t;
