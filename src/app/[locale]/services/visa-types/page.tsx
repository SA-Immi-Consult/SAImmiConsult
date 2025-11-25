// src/app/[locale]/services/visa-types/page.tsx

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from '../services.module.css';

export default function VisaTypesPage() {
  const t = useTranslations('ServicesVisaTypes');

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
            <Link href="/contact" className={styles.pagePrimaryButton}>
              {t('header.primaryCta')}
            </Link>
            <Link href="/faq" className={styles.pageSecondaryButton}>
              {t('header.secondaryCta')}
            </Link>
          </div>
        </header>

        {/* Main card grid of visa categories */}
        <section className={styles.sectionBlock}>
          <div className={styles.cardGrid}>
            {/* Work visas */}
            <article className={styles.card}>
              <h2 className={styles.cardTitle}>
                {t('work.title')}
              </h2>
              <p className={styles.cardText}>{t('work.body')}</p>
              <h3 className={styles.cardSubheading}>
                {t('work.who')}
              </h3>
              <p className={styles.cardText}>{t('work.whoBody')}</p>
              <h3 className={styles.cardSubheading}>
                {t('work.requirements')}
              </h3>
              <ul className={styles.bulletList}>
                <li>{t('work.requirementList.0')}</li>
                <li>{t('work.requirementList.1')}</li>
                <li>{t('work.requirementList.2')}</li>
              </ul>
            </article>

            {/* Study visas */}
            <article className={styles.card}>
              <h2 className={styles.cardTitle}>
                {t('study.title')}
              </h2>
              <p className={styles.cardText}>{t('study.body')}</p>
              <h3 className={styles.cardSubheading}>
                {t('study.who')}
              </h3>
              <p className={styles.cardText}>{t('study.whoBody')}</p>
              <h3 className={styles.cardSubheading}>
                {t('study.requirements')}
              </h3>
              <ul className={styles.bulletList}>
                <li>{t('study.requirementList.0')}</li>
                <li>{t('study.requirementList.1')}</li>
                <li>{t('study.requirementList.2')}</li>
              </ul>
            </article>

            {/* Business / investor / financially independent */}
            <article className={styles.card}>
              <h2 className={styles.cardTitle}>
                {t('business.title')}
              </h2>
              <p className={styles.cardText}>{t('business.body')}</p>
              <h3 className={styles.cardSubheading}>
                {t('business.who')}
              </h3>
              <p className={styles.cardText}>{t('business.whoBody')}</p>
              <h3 className={styles.cardSubheading}>
                {t('business.requirements')}
              </h3>
              <ul className={styles.bulletList}>
                <li>{t('business.requirementList.0')}</li>
                <li>{t('business.requirementList.1')}</li>
                <li>{t('business.requirementList.2')}</li>
              </ul>
            </article>

            {/* Family / retirement / visitor */}
            <article className={styles.card}>
              <h2 className={styles.cardTitle}>
                {t('family.title')}
              </h2>
              <p className={styles.cardText}>{t('family.body')}</p>
              <h3 className={styles.cardSubheading}>
                {t('family.who')}
              </h3>
              <p className={styles.cardText}>{t('family.whoBody')}</p>
              <h3 className={styles.cardSubheading}>
                {t('family.requirements')}
              </h3>
              <ul className={styles.bulletList}>
                <li>{t('family.requirementList.0')}</li>
                <li>{t('family.requirementList.1')}</li>
                <li>{t('family.requirementList.2')}</li>
              </ul>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
