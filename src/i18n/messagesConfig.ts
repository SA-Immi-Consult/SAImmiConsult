// src/i18n/messagesConfig.ts

// This is the single source of truth for which message files exist
export const MESSAGE_SECTION_FILES = [
  'common',
  'navbar',
  'home',
  'about',
  'contact',
  'services',
  'services.immigration',
  'services.emigration',
  'services.visa-types',
  'services.additional',
  'faq',
  'news',
  'login',
  'signup'
] as const;

// Type is derived from the array – no duplicate string literals
export type SectionFile = (typeof MESSAGE_SECTION_FILES)[number];
