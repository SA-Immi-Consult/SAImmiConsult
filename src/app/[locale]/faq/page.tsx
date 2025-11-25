// src/app/[locale]/faq/page.tsx

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/siteConfig';
import styles from '../services/services.module.css';


const FAQ_ITEM_KEYS = ['0', '1', '2', '3', '4'] as const;

export default function FAQPage() {
  const t = useTranslations('FAQ');

  return (
    <div className={styles.pageContainer}>
      <main className={styles.pageCard}>
        {/* Header */}
        <header>
          <p className={styles.pageHeaderEyebrow}>{t('eyebrow')}</p>
          <h1 className={styles.pageHeaderTitle}>{t('title')}</h1>
          <p className={styles.pageHeaderSubtitle}>{t('subtitle')}</p>
        </header>

        {/* FAQ list */}
        <section className={styles.pageSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('title')}</h2>
          </div>

          <div className={styles.faqList}>
            {FAQ_ITEM_KEYS.map((key) => (
              <article key={key} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>
                  {t(`items.${key}.question`)}
                </h3>
                <p className={styles.faqAnswer}>
                  {t(`items.${key}.answer`)}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA to contact */}
        <section className={styles.pageSection}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionBody}>{t('cta')}</p>
          </div>

          <div className={styles.pageHeaderActions}>
            <Link href={siteConfig.contactPath} className={styles.primaryButton}>
              {/* You can also use common.cta.contact if you prefer */}
              {t('cta')}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
