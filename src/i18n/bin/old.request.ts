// src/i18n/request.ts

import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the [locale] segment, but may be undefined
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? (requested as (typeof routing)['defaultLocale'])
    : routing.defaultLocale;

  // Load the proper JSON dictionary for this locale
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});