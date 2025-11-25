// src/app/[locale]/services/additional-support/page.tsx

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/siteConfig';
import styles from '../services.module.css';

export default function AdditionalSupportPage() {
  const t = useTranslations('ServicesAdditional');

  return (
    <div className={styles.pageContainer}>
      <main className={styles.pageCard}>
        <header>
          <p className={styles.pageHeaderEyebrow}>
            {t('header.eyebrow')}
          </p>
          <h1 className={styles.pageHeaderTitle}>
            {t('header.title')}
          </h1>
          <p className={styles.pageHeaderSubtitle}>
            {t('header.subtitle')}
          </p>

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

        <section className={styles.sectionGroup}>
          {/* Left: main content blocks */}
          <div className={styles.sectionBlock}>
            {/* Education support */}
            <div>
              <h2 className={styles.sectionTitle}>
                {t('education.title')}
              </h2>
              <p className={styles.sectionText}>
                {t('education.body')}
              </p>
              <ul className={styles.bulletList}>
                <li>{t('education.points.0')}</li>
                <li>{t('education.points.1')}</li>
                <li>{t('education.points.2')}</li>
              </ul>
            </div>

            {/* Real estate */}
            <div>
              <h2 className={styles.sectionTitle}>
                {t('realEstate.title')}
              </h2>
              <p className={styles.sectionText}>
                {t('realEstate.body')}
              </p>
              <ul className={styles.bulletList}>
                <li>{t('realEstate.points.0')}</li>
                <li>{t('realEstate.points.1')}</li>
              </ul>
            </div>

            {/* Banking & admin */}
            <div>
              <h2 className={styles.sectionTitle}>
                {t('banking.title')}
              </h2>
              <p className={styles.sectionText}>
                {t('banking.body')}
              </p>
              <ul className={styles.bulletList}>
                <li>{t('banking.points.0')}</li>
                <li>{t('banking.points.1')}</li>
              </ul>
            </div>
          </div>

          {/* Right: highlight panel with “what we can do” summary */}
          <aside className={styles.highlightPanel}>
            <h3 className={styles.highlightTitle}>
              {t('summary.title')}
            </h3>
            <p className={styles.highlightText}>
              {t('summary.body')}
            </p>
            <ul className={styles.pillList}>
              <li className={styles.pill}>{t('summary.pills.0')}</li>
              <li className={styles.pill}>{t('summary.pills.1')}</li>
              <li className={styles.pill}>{t('summary.pills.2')}</li>
              <li className={styles.pill}>{t('summary.pills.3')}</li>
            </ul>
          </aside>
        </section>
      </main>
    </div>
  );
}
