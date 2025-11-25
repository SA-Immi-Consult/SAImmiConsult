// src/app/[locale]/login/page.tsx

'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from '../auth.module.css';
import { siteConfig } from '@/config/siteConfig';

export default function LoginPage() {
  const t = useTranslations('Login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Hook into backend auth when ready
  };

  return (
    <div className={styles.authPage}>
      <main className={styles.authCard}>
        <header className={styles.authHeader}>
          <h1 className={styles.authTitle}>{t('heading')}</h1>
          <p className={styles.authSubtitle}>{t('subheading')}</p>
        </header>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>{t('fieldsSectionTitle')}</h2>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="login-email">
                  {t('fields.email.label')}
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={styles.fieldInput}
                  placeholder={t('fields.email.placeholder')}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="login-password">
                  {t('fields.password.label')}
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className={styles.fieldInput}
                  placeholder={t('fields.password.placeholder')}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldInline}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className={styles.checkboxInput}
                  />
                  <span className={styles.fieldLabel}>
                    {t('fields.rememberMe.label')}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.authActions}>
            <button type="submit" className={styles.authPrimaryButton}>
              {t('actions.submit')}
            </button>

            <p className={styles.authSecondaryText}>
              {t('footer.noAccount')}{' '}
              <Link href="/signup" className={styles.authLink}>
                {t('footer.signupLink')}
              </Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
