// src/i18n/request.ts

import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import {
  MESSAGE_SECTION_FILES,
  type SectionFile
} from './messagesConfig';

async function loadMessagesForLocale(locale: string) {
  // Load all JSON files for the locale in parallel,
  // based purely on the MESSAGE_SECTION_FILES config
  const modules = await Promise.all(
    MESSAGE_SECTION_FILES.map((file: SectionFile) =>
      import(`../messages/${locale}/${file}.json`).catch(() => ({
        default: {}
      }))
    )
  );

  // Merge all JSON results into one object
  const messages = modules.reduce<Record<string, unknown>>((acc, mod) => {
    return { ...acc, ...mod.default };
  }, {});

  return messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = await loadMessagesForLocale(locale);

  return {
    locale,
    messages
  };
});
