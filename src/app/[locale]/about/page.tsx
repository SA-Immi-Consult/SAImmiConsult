// src/app/[locale]/about/page.tsx
import { useTranslations } from 'next-intl';
import styles from '../home.module.css';

export default function AboutPage() {
  const t = useTranslations('About');

  const steps = [
    'steps.eligibility',
    'steps.preparation',
    'steps.submission'
  ];

  const advantages = [
    'advantages.localTeam',
    'advantages.languages',
    'advantages.experience',
    'advantages.loyalty',
    'advantages.translation',
    'advantages.tailoredPath'
  ];

  const serviceBlocks = [
    'services.immigration',
    'services.education',
    'services.realEstate',
    'services.internationalVisas'
  ];

  return (
    <div className={styles.container}>
      <section className={styles.aboutCard}>
        {/* Intro */}
        <header className={styles.aboutHeader}>
          <p className={styles.aboutEyebrow}>
            {t('eyebrow')}
          </p>
          <h1 className={styles.aboutTitle}>
            {t('heading')}
          </h1>
          <p className={styles.aboutSubtitle}>
            {t('subheading')}
          </p>
        </header>

        {/* Main 2-column layout */}
        <div className={styles.aboutGrid}>
          {/* Left: story & context */}
          <div className={styles.aboutMain}>
            <section className={styles.aboutSection}>
              <h2 className={styles.aboutSectionTitle}>
                {t('whoWeAre.title')}
              </h2>
              <p className={styles.aboutBody}>
                {t('whoWeAre.body1')}
              </p>
              <p className={styles.aboutBody}>
                {t('whoWeAre.body2')}
              </p>
            </section>

            <section className={styles.aboutSection}>
              <h2 className={styles.aboutSectionTitle}>
                {t('whySouthAfrica.title')}
              </h2>
              <p className={styles.aboutBody}>
                {t('whySouthAfrica.intro')}
              </p>
              <ul className={styles.aboutList}>
                <li>{t('whySouthAfrica.education')}</li>
                <li>{t('whySouthAfrica.visaFree')}</li>
                <li>{t('whySouthAfrica.business')}</li>
                <li>{t('whySouthAfrica.bricks')}</li>
                <li>{t('whySouthAfrica.lifestyle')}</li>
              </ul>
            </section>
          </div>

          {/* Right: 3-step process & advantages */}
          <aside className={styles.aboutSidebar}>
            <section className={styles.aboutPanel}>
              <h3 className={styles.aboutPanelTitle}>
                {t('steps.title')}
              </h3>
              <p className={styles.aboutPanelText}>
                {t('steps.intro')}
              </p>
              <ol className={styles.stepsList}>
                {steps.map((key) => (
                  <li key={key} className={styles.stepItem}>
                    <h4 className={styles.stepTitle}>
                      {t(`${key}.title`)}
                    </h4>
                    <p className={styles.stepText}>
                      {t(`${key}.body`)}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className={styles.aboutPanel}>
              <h3 className={styles.aboutPanelTitle}>
                {t('advantages.title')}
              </h3>
              <ul className={styles.aboutPillList}>
                {advantages.map((key) => (
                  <li key={key} className={styles.aboutPill}>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        {/* Services summary row */}
        <section className={styles.aboutServices}>
          <h2 className={styles.aboutSectionTitle}>
            {t('services.title')}
          </h2>
          <p className={styles.aboutBody}>
            {t('services.intro')}
          </p>

          <div className={styles.servicesGrid}>
            {serviceBlocks.map((base) => (
              <article key={base} className={styles.serviceCard}>
                <h3 className={styles.serviceTitle}>
                  {t(`${base}.title`)}
                </h3>
                <p className={styles.serviceText}>
                  {t(`${base}.body`)}
                </p>
                <ul className={styles.serviceList}>
                  {/* we keep individual bullet points translatable too */}
                  <li>{t(`${base}.items.0`)}</li>
                  <li>{t(`${base}.items.1`)}</li>
                  <li>{t(`${base}.items.2`)}</li>
                  {/* You can extend items.[3], [4] etc. in JSON without touching JSX */}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
