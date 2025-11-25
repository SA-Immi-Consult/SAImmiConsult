// src/app/[locale]/news/page.tsx

import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/siteConfig';
import styles from '../services/services.module.css';

const NEWS_ITEM_KEYS = ['0', '1', '2'] as const;

export default function NewsPage() {
  const t = useTranslations('News');

  return (
    <div className={styles.pageContainer}>
      <main className={styles.pageCard}>
        {/* Header */}
        <header>
          <p className={styles.pageHeaderEyebrow}>{t('eyebrow')}</p>
          <h1 className={styles.pageHeaderTitle}>{t('title')}</h1>
          <p className={styles.pageHeaderSubtitle}>{t('subtitle')}</p>
        </header>

        {/* News list */}
        <section className={styles.pageSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('title')}</h2>
          </div>

          <div className={styles.newsList}>
            {NEWS_ITEM_KEYS.map((key) => (
              <article key={key} className={styles.newsItem}>
                <header className={styles.newsItemHeader}>
                  <h3 className={styles.newsItemTitle}>
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className={styles.newsItemMeta}>
                    {t(`items.${key}.date`)}
                  </p>
                </header>

                <p className={styles.newsItemSummary}>
                  {t(`items.${key}.summary`)}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
