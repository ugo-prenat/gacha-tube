import { useLang, useTranslation } from '@/lib/i18n';
import { Kbd } from './ui/kbd';
import { useHotkey, formatForDisplay } from '@tanstack/react-hotkeys';

export const LangSelect = () => {
  const t = useTranslation();
  const { lang, setLang } = useLang();

  useHotkey('Mod+G', (e) => {
    e.preventDefault();
    setLang(lang === 'fr' ? 'en' : 'fr');
  });

  return (
    <div className="text-muted-foreground flex h-7 items-center gap-2 rounded-md border px-2 text-xs font-medium">
      <span>{t(`lang.${lang}`)}</span>
      <Kbd>{formatForDisplay('Mod+G')}</Kbd>
    </div>
  );
};
