// src/app/[locale]/signup/page.tsx

'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import styles from '../auth.module.css';
import { siteConfig } from '@/config/siteConfig';

export default function SignupPage() {
  const t = useTranslations('Signup');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send data to backend when ready (normalize here)
  };

  return (
    <div className={styles.authPage}>
      <main className={styles.authCard}>
        <header className={styles.authHeader}>
          <h1 className={styles.authTitle}>{t('heading')}</h1>
          <p className={styles.authSubtitle}>{t('subheading')}</p>
        </header>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          {/* Personal details */}
          <section className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>
              {t('sections.personal.title')}
            </h2>
            <p className={styles.formSectionSubtitle}>
              {t('sections.personal.subtitle')}
            </p>

            <div className={`${styles.formRow} ${styles.multiple ?? ''}`}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="fullName">
                  {t('fields.fullName.label')}
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={styles.fieldInput}
                  placeholder={t('fields.fullName.placeholder')}
                  required
                />
                <p className={styles.fieldHint}>
                  {t('fields.fullName.hint')}
                </p>
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="citizenship">
                  {t('fields.citizenship.label')}
                </label>
                <input
                  id="citizenship"
                  name="citizenship"
                  type="text"
                  className={styles.fieldInput}
                  placeholder={t('fields.citizenship.placeholder')}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="age">
                  {t('fields.age.label')}
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min={0}
                  className={styles.fieldInput}
                  placeholder={t('fields.age.placeholder')}
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="maritalStatus">
                  {t('fields.maritalStatus.label')}
                </label>
                <select
                  id="maritalStatus"
                  name="maritalStatus"
                  className={styles.fieldSelect}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t('fields.maritalStatus.placeholder')}
                  </option>
                  <option value="single">
                    {t('fields.maritalStatus.options.single')}
                  </option>
                  <option value="married">
                    {t('fields.maritalStatus.options.married')}
                  </option>
                  <option value="divorced">
                    {t('fields.maritalStatus.options.divorced')}
                  </option>
                  <option value="widowed">
                    {t('fields.maritalStatus.options.widowed')}
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* Contact & residence */}
          <section className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>
              {t('sections.residence.title')}
            </h2>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="cityCountry">
                  {t('fields.cityCountry.label')}
                </label>
                <input
                  id="cityCountry"
                  name="cityCountry"
                  type="text"
                  className={styles.fieldInput}
                  placeholder={t('fields.cityCountry.placeholder')}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="phone">
                  {t('fields.phone.label')}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={styles.fieldInput}
                  placeholder={t('fields.phone.placeholder')}
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="email">
                  {t('fields.email.label')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={styles.fieldInput}
                  placeholder={t('fields.email.placeholder')}
                  required
                />
              </div>
            </div>
          </section>

          {/* Family & finances */}
          <section className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>
              {t('sections.familyFinances.title')}
            </h2>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="familyComposition">
                  {t('fields.familyComposition.label')}
                </label>
                <textarea
                  id="familyComposition"
                  name="familyComposition"
                  className={styles.fieldTextarea}
                  placeholder={t('fields.familyComposition.placeholder')}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="income2000plus">
                  {t('fields.income2000plus.label')}
                </label>
                <select
                  id="income2000plus"
                  name="income2000plus"
                  className={styles.fieldSelect}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t('fields.income2000plus.placeholder')}
                  </option>
                  <option value="yes">
                    {t('fields.income2000plus.options.yes')}
                  </option>
                  <option value="no">
                    {t('fields.income2000plus.options.no')}
                  </option>
                </select>
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="incomeSource">
                  {t('fields.incomeSource.label')}
                </label>
                <input
                  id="incomeSource"
                  name="incomeSource"
                  type="text"
                  className={styles.fieldInput}
                  placeholder={t('fields.incomeSource.placeholder')}
                />
                <p className={styles.fieldHint}>
                  {t('fields.incomeSource.hint')}
                </p>
              </div>
            </div>
          </section>

          {/* Travel & visa history */}
          <section className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>
              {t('sections.travelHistory.title')}
            </h2>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="beenToSa">
                  {t('fields.beenToSa.label')}
                </label>
                <select
                  id="beenToSa"
                  name="beenToSa"
                  className={styles.fieldSelect}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t('fields.beenToSa.placeholder')}
                  </option>
                  <option value="yes">
                    {t('fields.beenToSa.options.yes')}
                  </option>
                  <option value="no">
                    {t('fields.beenToSa.options.no')}
                  </option>
                </select>
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="firstEntrySa">
                  {t('fields.firstEntrySa.label')}
                </label>
                <input
                  id="firstEntrySa"
                  name="firstEntrySa"
                  type="text"
                  className={styles.fieldInput}
                  placeholder={t('fields.firstEntrySa.placeholder')}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="currentLocation">
                  {t('fields.currentLocation.label')}
                </label>
                <input
                  id="currentLocation"
                  name="currentLocation"
                  type="text"
                  className={styles.fieldInput}
                  placeholder={t('fields.currentLocation.placeholder')}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="currentVisa">
                  {t('fields.currentVisa.label')}
                </label>
                <textarea
                  id="currentVisa"
                  name="currentVisa"
                  className={styles.fieldTextarea}
                  placeholder={t('fields.currentVisa.placeholder')}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="visaRefusals">
                  {t('fields.visaRefusals.label')}
                </label>
                <select
                  id="visaRefusals"
                  name="visaRefusals"
                  className={styles.fieldSelect}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t('fields.visaRefusals.placeholder')}
                  </option>
                  <option value="yes">
                    {t('fields.visaRefusals.options.yes')}
                  </option>
                  <option value="no">
                    {t('fields.visaRefusals.options.no')}
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* Passport & plans */}
          <section className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>
              {t('sections.passportPlans.title')}
            </h2>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="passportExpiry">
                  {t('fields.passportExpiry.label')}
                </label>
                <input
                  id="passportExpiry"
                  name="passportExpiry"
                  type="date"
                  className={styles.fieldInput}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="visitPurpose">
                  {t('fields.visitPurpose.label')}
                </label>
                <textarea
                  id="visitPurpose"
                  name="visitPurpose"
                  className={styles.fieldTextarea}
                  placeholder={t('fields.visitPurpose.placeholder')}
                />
              </div>
            </div>
          </section>

          {/* Language */}
          <section className={styles.formSection}>
            <h2 className={styles.formSectionTitle}>
              {t('sections.language.title')}
            </h2>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="englishLevel">
                  {t('fields.englishLevel.label')}
                </label>
                <select
                  id="englishLevel"
                  name="englishLevel"
                  className={styles.fieldSelect}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t('fields.englishLevel.placeholder')}
                  </option>
                  <option value="basic">
                    {t('fields.englishLevel.options.basic')}
                  </option>
                  <option value="intermediate">
                    {t('fields.englishLevel.options.intermediate')}
                  </option>
                  <option value="fluent">
                    {t('fields.englishLevel.options.fluent')}
                  </option>
                </select>
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel} htmlFor="needLanguageSchool">
                  {t('fields.needLanguageSchool.label')}
                </label>
                <select
                  id="needLanguageSchool"
                  name="needLanguageSchool"
                  className={styles.fieldSelect}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t('fields.needLanguageSchool.placeholder')}
                  </option>
                  <option value="yes">
                    {t('fields.needLanguageSchool.options.yes')}
                  </option>
                  <option value="no">
                    {t('fields.needLanguageSchool.options.no')}
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* Submit + link back to login */}
          <div className={styles.authActions}>
            <button type="submit" className={styles.authPrimaryButton}>
              {t('actions.submit')}
            </button>

            <p className={styles.authSecondaryText}>
              {t('footer.haveAccount')}{' '}
              <Link href="/login" className={styles.authLink}>
                {t('footer.loginLink')}
              </Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
