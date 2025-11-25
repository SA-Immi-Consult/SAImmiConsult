// src/app/[locale]/services/page.tsx

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/siteConfig';
import styles from './services.module.css';

const SERVICE_KEYS = ['immigration', 'emigration', 'visaTypes', 'additionalSupport'] as const;

type ServiceKey = (typeof SERVICE_KEYS)[number];

const SERVICE_LINKS: Record<ServiceKey, string> = {
  immigration: siteConfig.servicesImmigrationPath,
  emigration: siteConfig.servicesEmigrationPath,
  visaTypes: siteConfig.servicesVisaTypesPath,
  additionalSupport: siteConfig.servicesAdditionalSupportPath
};

export default function ServicesPage() {
  const t = useTranslations('ServicesOverview');

  return (
    <div className={styles.pageContainer}>
      <main className={styles.pageCard}>
        {/* Header */}
        <header>
          <p className={styles.pageHeaderEyebrow}>{t('header.eyebrow')}</p>
          <h1 className={styles.pageHeaderTitle}>{t('header.title')}</h1>
          <p className={styles.pageHeaderSubtitle}>{t('header.subtitle')}</p>

          <div className={styles.pageCtaRow}>
            <Link
              href={siteConfig.contactPath}
              className={styles.pagePrimaryButton}
            >
              {t('header.primaryCta')}
            </Link>
            <Link
              href={siteConfig.faqPath}
              className={styles.pageSecondaryButton}
            >
              {t('header.secondaryCta')}
            </Link>
          </div>
        </header>

        {/* Services grid */}
        <section className={styles.pageSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('grid.title')}</h2>
            <p className={styles.sectionBody}>{t('grid.subtitle')}</p>
          </div>

          <div className={styles.servicesGrid}>
            {SERVICE_KEYS.map((key) => (
              <article key={key} className={styles.servicesCard}>
                <h3 className={styles.servicesCardTitle}>
                  {t(`cards.${key}.title`)}
                </h3>
                <p className={styles.servicesCardBody}>
                  {t(`cards.${key}.body`)}
                </p>

                <Link
                  href={SERVICE_LINKS[key]}
                  className={styles.servicesCardLink}
                >
                  {t(`cards.${key}.cta`)}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}