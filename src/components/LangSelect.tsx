import { LOCALES, useLang, useTranslation } from '@/lib/i18n';
import { useHotkey } from '@tanstack/react-hotkeys';
import { SelectTrigger, SelectValue } from './ui/select';
import { Select, SelectGroup, SelectItem } from './ui/select';
import { SelectContent } from './ui/select';

export const LangSelect = () => {
  const t = useTranslation();
  const { lang, setLang } = useLang();

  useHotkey('L', (e) => {
    e.preventDefault();
    setLang(lang === 'fr' ? 'en' : 'fr');
  });

  return (
    <Select value={lang}>
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
