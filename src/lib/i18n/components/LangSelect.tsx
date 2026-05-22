import { useHotkey } from '@tanstack/react-hotkeys';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import type { Locale } from '@/lib/i18n';
import { LOCALES, useLang, useTranslation } from '@/lib/i18n';

export const LangSelect = () => {
  const t = useTranslation();
  const { lang, setLang } = useLang();

  useHotkey('L', (e) => {
    e.preventDefault();
    setLang(lang === 'fr' ? 'en' : 'fr');
  });

  return (
    <Select value={lang} onValueChange={(value) => void setLang(value as Locale)}>
      <SelectTrigger>
        <SelectValue placeholder={t('lang')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {LOCALES.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {t(`lang.${locale}`)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
