// src/app/[locale]/services/emigration/page.tsx

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/siteConfig';
import styles from '../services.module.css';

export default function EmigrationPage() {
  const t = useTranslations('ServicesEmigration');

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

        {/* Main grid */}
        <section className={styles.sectionGroup}>
          <div className={styles.sectionBlock}>
            {/* Emigrate from South Africa */}
            <div>
              <h2 className={styles.sectionTitle}>
                {t('fromSa.title')}
              </h2>
              <p className={styles.sectionText}>
                {t('fromSa.body')}
              </p>
              <ul className={styles.bulletList}>
                <li>{t('fromSa.points.0')}</li>
                <li>{t('fromSa.points.1')}</li>
                <li>{t('fromSa.points.2')}</li>
              </ul>
            </div>

            {/* Work & study visas abroad */}
            <div>
              <h2 className={styles.sectionTitle}>
                {t('workStudy.title')}
              </h2>
              <p className={styles.sectionText}>
                {t('workStudy.body')}
              </p>
              <ul className={styles.bulletList}>
                <li>{t('workStudy.points.0')}</li>
                <li>{t('workStudy.points.1')}</li>
                <li>{t('workStudy.points.2')}</li>
              </ul>
            </div>

            {/* Tourist & training visas (US, Canada, Europe, UK) */}
            <div>
              <h2 className={styles.sectionTitle}>
                {t('touristTraining.title')}
              </h2>
              <p className={styles.sectionText}>
                {t('touristTraining.body')}
              </p>
              <ul className={styles.bulletList}>
                <li>{t('touristTraining.points.0')}</li>
                <li>{t('touristTraining.points.1')}</li>
                <li>{t('touristTraining.points.2')}</li>
              </ul>
            </div>
          </div>

          {/* Side panel: Greece (instead of Moldova) */}
          <aside className={styles.highlightPanel}>
            <h3 className={styles.highlightTitle}>
              {t('greece.title')}
            </h3>
            <p className={styles.highlightText}>
              {t('greece.body')}
            </p>
			<ul className={styles.pillList}>
				<li className={styles.pill}>{t('greece.pills.0')}</li>
				<li className={styles.pill}>{t('greece.pills.1')}</li>
				<li className={styles.pill}>{t('greece.pills.2')}</li>
				<li className={styles.pill}>{t('greece.pills.3')}</li>
			</ul>			
          </aside>
        </section>
      </main>
    </div>
  );
}
