// src/app/[locale]/page.tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/siteConfig';
import styles from './home.module.css';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className={styles.container}>
      {/* 1) HERO */}
      <section className={styles.hero}>
        {/* Left: text content */}
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{t('hero.eyebrow')}</p>

          <h1 className={styles.heroTitle}>{t('hero.title')}</h1>

          <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>

          <div className={styles.heroActions}>
            <Link
              href={siteConfig.contactPath}
              className={styles.primaryButton}
            >
              {t('hero.primaryCta')}
            </Link>

            <a
              href={siteConfig.whatsappUrl}
              className={styles.secondaryButton}
              target="_blank"
              rel="noreferrer"
            >
              {t('hero.secondaryCta')}
            </a>
          </div>

          <p className={styles.heroReassurance}>{t('hero.reassurance')}</p>

          <div className={styles.heroBadgesRow}>
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeValue}>
                {t('hero.kpi.yearsInSA.value')}
              </span>
              <span className={styles.heroBadgeLabel}>
                {t('hero.kpi.yearsInSA.label')}
              </span>
            </div>

            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeValue}>
                {t('hero.kpi.languages.value')}
              </span>
              <span className={styles.heroBadgeLabel}>
                {t('hero.kpi.languages.label')}
              </span>
            </div>

            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeValue}>
                {t('hero.kpi.globalClients.value')}
              </span>
              <span className={styles.heroBadgeLabel}>
                {t('hero.kpi.globalClients.label')}
              </span>
            </div>
          </div>
        </div>

        {/* Right: text-only contextual card (no image for now) */}
        <div className={styles.heroVisual}>
          <div className={styles.heroCard}>
            <p className={styles.heroCardTitle}>{t('hero.card.title')}</p>
            <p className={styles.heroCardBody}>{t('hero.card.body')}</p>
            <p className={styles.heroCardTagline}>
              {t('hero.card.tagline')}
            </p>
          </div>

          <div className={styles.heroTag}>{t('hero.tag')}</div>
        </div>
      </section>

      {/* 2) SERVICES (overview with links to each service page) */}
      <ServicesOverviewSection />

      {/* 3) WHY SOUTH AFRICA */}
      <WhySouthAfricaSection />

      {/* 4) ABOUT US (BRIEF) */}
      <AboutBriefSection />

      {/* 5) NEWS & COMMUNICATION */}
      <NewsBannerSection />

      {/* 6) FAQS */}
      <FaqSection />

      {/* 7) TESTIMONIALS */}
      <TestimonialsSection />

      {/* 8) CONTACT US (CTA) */}
      <FinalCtaSection />
    </div>
  );
}

/**
 * 3) WHY SOUTH AFRICA SECTION
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
 * 2) SERVICES OVERVIEW SECTION
 * Short descriptions + links to individual service pages.
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
        {/* Immigration to South Africa */}
        <article className={styles.servicesCardPrimary}>
          <h3 className={styles.servicesCardTitle}>
            {t('immigration.title')}
          </h3>
          <p className={styles.servicesCardBody}>
            {t('immigration.body')}
          </p>
          <Link
            href="/services/immigration"
            className={styles.servicesPrimaryCta}
          >
            {t('immigration.cta')}
          </Link>
        </article>

        {/* Emigration from South Africa */}
        <article className={styles.servicesCardSecondary}>
          <h3 className={styles.servicesCardTitle}>
            {t('emigration.title')}
          </h3>
          <p className={styles.servicesCardBody}>
            {t('emigration.body')}
          </p>
          <Link
            href="/services/emigration"
            className={styles.servicesSecondaryCta}
          >
            {t('emigration.cta')}
          </Link>
        </article>

        {/* Visa types */}
        <article className={styles.servicesCardSecondary}>
          <h3 className={styles.servicesCardTitle}>
            {t('visaTypes.title')}
          </h3>
          <p className={styles.servicesCardBody}>
            {t('visaTypes.body')}
          </p>
          <Link
            href="/services/visa-types"
            className={styles.servicesSecondaryCta}
          >
            {t('visaTypes.cta')}
          </Link>
        </article>

        {/* Additional service support */}
        <article className={styles.servicesCardSecondary}>
          <h3 className={styles.servicesCardTitle}>
            {t('additionalSupport.title')}
          </h3>
          <p className={styles.servicesCardBody}>
            {t('additionalSupport.body')}
          </p>
          <Link
            href="/services/additional-support"
            className={styles.servicesSecondaryCta}
          >
            {t('additionalSupport.cta')}
          </Link>
        </article>
      </div>
    </section>
  );
}

/**
 * 4) ABOUT US (BRIEF) SECTION – homepage summary, not full About page.
 */
function AboutBriefSection() {
  const t = useTranslations('Home.aboutBrief');

  return (
    <section className={styles.section}>
      <div className={styles.homeAboutCard}>
        <div className={styles.homeAboutHeader}>
          <p className={styles.sectionEyebrow}>{t('eyebrow')}</p>
          <h2 className={styles.sectionTitle}>{t('title')}</h2>
          <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.homeAboutGrid}>
          <div className={styles.homeAboutMain}>
            <p className={styles.homeAboutBody}>{t('body')}</p>
          </div>
          <div className={styles.homeAboutSide}>
            <ul className={styles.homeAboutList}>
              <li>{t('highlights.0')}</li>
              <li>{t('highlights.1')}</li>
              <li>{t('highlights.2')}</li>
            </ul>
            <Link href="/about" className={styles.homeAboutLink}>
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 5) NEWS & COMMUNICATION SECTION
 */
function NewsBannerSection() {
  const t = useTranslations('Home.news');

  // Single source of truth from translations
  const items = [t('items.0'), t('items.1'), t('items.2')];

  // Duplicate the list once so the ticker can loop smoothly
  const tickerItems = items.concat(items);

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

        {/* Sliding news banner */}
        <div className={styles.newsList}>
          <div className={styles.newsTickerTrack}>
            {tickerItems.map((headline, index) => (
              <div key={index} className={styles.newsItem}>
                <span className={styles.newsBullet} />
                <span className={styles.newsHeadline}>{headline}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/**
 * 6) FAQ SECTION – teaser on homepage, link to full FAQ page.
 */
function FaqSection() {
  const t = useTranslations('Home.faq');

  const questions = [
    {
      q: t('items.0.question'),
      a: t('items.0.answer')
    },
    {
      q: t('items.1.question'),
      a: t('items.1.answer')
    },
    {
      q: t('items.2.question'),
      a: t('items.2.answer')
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.faqCard}>
        <div className={styles.faqHeader}>
          <div>
            <p className={styles.sectionEyebrow}>{t('eyebrow')}</p>
            <h2 className={styles.sectionTitle}>{t('title')}</h2>
            <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
          </div>
          <Link href="/faq" className={styles.faqLink}>
            {t('cta')}
          </Link>
        </div>

        <div className={styles.faqList}>
          {questions.map((item, idx) => (
            <div key={idx} className={styles.faqItem}>
              <p className={styles.faqQuestion}>{item.q}</p>
              <p className={styles.faqAnswer}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 7) TESTIMONIALS SECTION
 */
function TestimonialsSection() {
  const t = useTranslations('Home.testimonials');

  const quotes = [
    {
      name: t('items.0.name'),
      country: t('items.0.country'),
      quote: t('items.0.quote')
    },
    {
      name: t('items.1.name'),
      country: t('items.1.country'),
      quote: t('items.1.quote')
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.testimonialsCard}>
        <div className={styles.testimonialsHeader}>
          <div>
            <p className={styles.sectionEyebrow}>{t('eyebrow')}</p>
            <h2 className={styles.sectionTitle}>{t('title')}</h2>
            <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
          </div>
        </div>

        <div className={styles.testimonialsGrid}>
          {quotes.map((item, idx) => (
            <figure key={idx} className={styles.testimonial}>
              <blockquote className={styles.testimonialQuote}>
                “{item.quote}”
              </blockquote>
              <figcaption className={styles.testimonialMeta}>
                <span className={styles.testimonialName}>{item.name}</span>
                <span className={styles.testimonialCountry}>
                  {item.country}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 8) FINAL CTA SECTION – Contact Us
 */
function FinalCtaSection() {
  const t = useTranslations('Home.finalCta');

  return (
    <section className={styles.finalCtaSection}>
      <div className={styles.finalCtaCard}>
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
