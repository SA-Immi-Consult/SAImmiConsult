// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Supported locales
  locales: ['en', 'ru'] as const,

  // Used when no locale matches or when detection fails
  defaultLocale: 'ru',

  // Optional, but nice to keep for future SEO customization
  // For now internal and external pathnames are the same.
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/contact': '/contact',
	'/services': '/services',
    '/services/immigration': '/services/immigration',
    '/services/emigration': '/services/emigration',
    '/services/visa-types': '/services/visa-types',
    '/services/additional-support': '/services/additional-support',
    '/faq': '/faq',
    '/news': '/news',
    '/login': '/login',
    '/signup': '/signup'
  }
});

export type AppLocale = (typeof routing.locales)[number];
