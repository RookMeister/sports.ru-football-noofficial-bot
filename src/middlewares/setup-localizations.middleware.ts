import { I18n, I18nContext } from '@edjopato/telegraf-i18n';
import path from 'path';

declare module 'telegraf' {
  interface Context {
    i18n: I18nContext;
  }
}

export const setupLocalizationsMiddleware = () =>
  new I18n({
    directory: path.resolve(__dirname, '..', '..', 'locales'),
    defaultLanguage: 'en',
    defaultLanguageOnMissing: true,
    useSession: true,
    allowMissing: false,
  }).middleware();
