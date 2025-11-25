// src/config/siteConfig.ts
export const siteConfig = {
  brandName: 'SA Immi Consult',

  // Contact route for the new Next.js site.
  // If you prefer a different path (e.g. '/contacts'), you can change it here once.

  // Main routes (typed literals)
  homePath: '/' as const,
  aboutPath: '/about' as const,
  servicesPath: '/services' as const,
  newsPath: '/news' as const,
  faqPath: '/faq' as const,
  contactPath: '/contact' as const,
  loginPath: '/login' as const,
  signupPath: '/signup' as const,

  // Service sub-routes
  servicesImmigrationPath: '/services/immigration' as const,
  servicesEmigrationPath: '/services/emigration' as const,
  servicesVisaTypesPath: '/services/visa-types' as const,
  servicesAdditionalSupportPath: '/services/additional-support' as const,

  // WhatsApp number taken from the current site integration (wa.me / api.whatsapp.com).
  // Source: existing "Получить ВИЗУ!" button on saimmiconsult.com/ru.
  whatsappPhone: '+27676688345',
  whatsappUrl: 'https://wa.me/27676688345' as const
} as const;
