// src/app/[locale]/page.tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from './home.module.css';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className={styles.container}>
      {/* HERO */}
      <section className={styles.hero}>
        {/* Left side: text */}
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{t('eyebrow')}</p>

          <h1 className={styles.heroTitle}>{t('heroTitle')}</h1>

          <p className={styles.heroSubtitle}>{t('heroSubtitle')}</p>

          <div className={styles.heroActions}>
            <Link href="/contact" className={styles.finalCtaPrimaryButton}>
              {t('primaryCta')}
            </Link>

            <Link href="/about" className={styles.finalCtaSecondaryButton}>
              {t('secondaryCta')}
            </Link>
          </div>

          <p className={styles.heroReassurance}>{t('reassurance')}</p>
        </div>

        {/* Right side: friendly imagery placeholder */}
        <div className={styles.heroMedia}>
          <div className={styles.heroPhoto} aria-hidden="true" />
          <p className={styles.heroMediaCaption}>{t('heroCaption')}</p>
        </div>
      </section>

      {/* WHY SOUTH AFRICA */}
      <WhySouthAfricaSection />

      {/* SERVICES OVERVIEW – Immigration / Emigration */}
      <ServicesOverviewSection />

      {/* NEWS BANNER (simple scrolling list for now) */}
      <NewsBannerSection />

      {/* FINAL CTA */}
      <FinalCtaSection />
    </div>
  );
}

/**
 * WHY SOUTH AFRICA SECTION
 * Calm, explanatory, with SA lifestyle / opportunity reasons.
 */
function WhySouthAfricaSection() {
  const t = useTranslations('Home.whySa');

  return (
    <section className={styles.section}>
      <div className={styles.whyCard}>
        <div className={styles.whyHeader}>
          <div className={styles.whyIntro}>
            <p className={styles.sectionEyebrow}>{t('eyebrow')}</p>
            <h2 className={styles.sectionTitle}>{t('title')}</h2>
            <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
          </div>

          <div className={styles.whyHighlightBox}>
            <p className={styles.whyHighlightTitle}>{t('highlightTitle')}</p>
            <p className={styles.whyHighlightBody}>{t('highlightBody')}</p>
          </div>
        </div>

        {/* Reasons grid */}
        <div className={styles.whyGrid}>
          <WhyReason
            title={t('reasons.lifestyle.title')}
            body={t('reasons.lifestyle.body')}
          />
          <WhyReason
            title={t('reasons.education.title')}
            body={t('reasons.education.body')}
          />
          <WhyReason
            title={t('reasons.opportunity.title')}
            body={t('reasons.opportunity.body')}
          />
          <WhyReason
            title={t('reasons.costOfLiving.title')}
            body={t('reasons.costOfLiving.body')}
          />
        </div>
      </div>
    </section>
  );
}

type WhyReasonProps = {
  title: string;
  body: string;
};

function WhyReason({ title, body }: WhyReasonProps) {
  return (
    <div className={styles.whyReason}>
      <div className={styles.whyReasonIcon}>✓</div>
      <div className={styles.whyReasonContent}>
        <h3 className={styles.whyReasonTitle}>{title}</h3>
        <p className={styles.whyReasonText}>{body}</p>
      </div>
    </div>
  );
}

/**
 * SERVICES OVERVIEW – two primary cards:
 * 1) Immigration to South Africa
 * 2) Emigration from South Africa
 */
function ServicesOverviewSection() {
  const t = useTranslations('Home.services');

  return (
    <section className={styles.section}>
      <header className={styles.servicesHeader}>
        <div className={styles.servicesHeaderText}>
          <p className={styles.sectionEyebrow}>{t('eyebrow')}</p>
          <h2 className={styles.sectionTitle}>{t('title')}</h2>
          <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
        </div>
        <Link href="/services" className={styles.servicesViewAllButton}>
          {t('viewAll')}
        </Link>
      </header>

      <div className={styles.homeServicesGrid}>
        {/* Immigration to SA */}
        <article className={styles.servicesCardPrimary}>
          <h3 className={styles.servicesCardTitle}>
            {t('immigration.title')}
          </h3>
          <p className={styles.servicesCardBody}>
            {t('immigration.body')}
          </p>
          <ul className={styles.servicesItems}>
            <li className={styles.servicesItem}>
              • {t('immigration.items.work')}
            </li>
            <li className={styles.servicesItem}>
              • {t('immigration.items.study')}
            </li>
            <li className={styles.servicesItem}>
              • {t('immigration.items.family')}
            </li>
            <li className={styles.servicesItem}>
              • {t('immigration.items.business')}
            </li>
          </ul>
          <Link
            href="/services/immigration"
            className={styles.servicesPrimaryCta}
          >
            {t('immigration.cta')}
          </Link>
        </article>

        {/* Emigration from SA */}
        <article className={styles.servicesCardSecondary}>
          <h3 className={styles.servicesCardTitle}>
            {t('emigration.title')}
          </h3>
          <p className={styles.servicesCardBody}>
            {t('emigration.body')}
          </p>
          <ul className={styles.servicesItems}>
            <li className={styles.servicesItem}>
              • {t('emigration.items.apostille')}
            </li>
            <li className={styles.servicesItem}>
              • {t('emigration.items.globalVisas')}
            </li>
            <li className={styles.servicesItem}>
              • {t('emigration.items.documents')}
            </li>
          </ul>
          <Link
            href="/services/emigration"
            className={styles.servicesSecondaryCta}
          >
            {t('emigration.cta')}
          </Link>
        </article>
      </div>
    </section>
  );
}

/**
 * NEWS SECTION – banner + list of latest immigration updates.
 * (Behaviour can later be upgraded to a proper carousel.)
 */
function NewsBannerSection() {
  const t = useTranslations('Home.news');

  // For now just a static list – content from translations.
  const items = [t('items.0'), t('items.1'), t('items.2')];

  return (
    <section className={styles.section}>
      <div className={styles.newsCard}>
        <div className={styles.newsHeader}>
          <div className={styles.newsHeaderText}>
            <p className={styles.newsEyebrow}>{t('eyebrow')}</p>
            <h2 className={styles.newsTitle}>{t('title')}</h2>
            <p className={styles.newsSubtitle}>{t('subtitle')}</p>
          </div>
          <Link href="/news" className={styles.newsButton}>
            {t('cta')}
          </Link>
        </div>

        {/* “Rotating” headlines – simple vertical list for now */}
        <div className={styles.newsList}>
          {items.map((headline, index) => (
            <div key={index} className={styles.newsItem}>
              <span className={styles.newsBullet} />
              <span className={styles.newsHeadline}>{headline}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * FINAL CTA – calm, reassuring, SA-flavoured closing.
 */
function FinalCtaSection() {
  const t = useTranslations('Home.finalCta');

  return (
    <section className={styles.finalCtaSection}>
      <div className={styles.finalCtaCard}>
        {/* subtle SA landscape overlay (can later be replaced with SVG/asset) */}
        <div className={styles.finalCtaOverlay} />
        <div className={styles.finalCtaInner}>
          <div className={styles.finalCtaText}>
            <p className={styles.finalCtaEyebrow}>{t('eyebrow')}</p>
            <h2 className={styles.finalCtaTitle}>{t('title')}</h2>
            <p className={styles.finalCtaBody}>{t('body')}</p>
          </div>
          <div className={styles.finalCtaActions}>
            <Link href="/contact" className={styles.finalCtaPrimaryButton}>
              {t('primaryCta')}
            </Link>
            <Link href="/faq" className={styles.finalCtaSecondaryButton}>
              {t('secondaryCta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
