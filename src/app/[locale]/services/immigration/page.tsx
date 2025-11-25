// src/app/[locale]/services/immigration/page.tsx

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from '../services.module.css';

export default function ImmigrationPage() {
  const t = useTranslations('ServicesImmigration');

  return (
    <div className={styles.pageContainer}>
      <main className={styles.pageCard}>
        {/* Header */}
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
            <Link href="/contact" className={styles.pagePrimaryButton}>
              {t('header.primaryCta')}
            </Link>
            <Link href="/faq" className={styles.pageSecondaryButton}>
              {t('header.secondaryCta')}
            </Link>
          </div>
        </header>

        {/* Main content: To South Africa + BRICS / why SA */}
        <section className={styles.sectionGroup}>
          <div className={styles.sectionBlock}>
            {/* To South Africa */}
            <div>
              <h2 className={styles.sectionTitle}>
                {t('toSa.title')}
              </h2>
              <p className={styles.sectionText}>
                {t('toSa.body')}
              </p>
              <ul className={styles.bulletList}>
                <li>{t('toSa.points.0')}</li>
                <li>{t('toSa.points.1')}</li>
                <li>{t('toSa.points.2')}</li>
                <li>{t('toSa.points.3')}</li>
                <li>{t('toSa.points.4')}</li>
              </ul>
            </div>

            {/* Why people immigrate to SA */}
            <div>
              <h2 className={styles.sectionTitle}>
                {t('whySa.title')}
              </h2>
              <p className={styles.sectionText}>
                {t('whySa.body')}
              </p>
              <ul className={styles.bulletList}>
                <li>{t('whySa.points.0')}</li>
                <li>{t('whySa.points.1')}</li>
                <li>{t('whySa.points.2')}</li>
                <li>{t('whySa.points.3')}</li>
              </ul>
            </div>
          </div>

          {/* Side panel: BRICS & key advantages */}
          <aside className={styles.highlightPanel}>
            <h3 className={styles.highlightTitle}>
              {t('brics.title')}
            </h3>
            <p className={styles.highlightText}>
              {t('brics.body')}
            </p>
            <ul className={styles.pillList}>
              <li className={styles.pill}>{t('brics.pills.0')}</li>
              <li className={styles.pill}>{t('brics.pills.1')}</li>
              <li className={styles.pill}>{t('brics.pills.2')}</li>
              <li className={styles.pill}>{t('brics.pills.3')}</li>
            </ul>
          </aside>
        </section>
      </main>
    </div>
  );
}
