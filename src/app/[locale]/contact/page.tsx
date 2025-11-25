// src/app/[locale]/contact/page.tsx
import { useTranslations } from 'next-intl';
import styles from '../home.module.css';

export default function ContactPage() {
  const t = useTranslations('Contact');

  const enquiryTypeOptions = [
    { value: 'general', key: 'fields.enquiryType.options.general' },
    { value: 'saImmigration', key: 'fields.enquiryType.options.saImmigration' },
    { value: 'ukImmigration', key: 'fields.enquiryType.options.ukImmigration' },
    { value: 'corporate', key: 'fields.enquiryType.options.corporate' },
    { value: 'other', key: 'fields.enquiryType.options.other' }
  ];

  const preferredContactOptions = [
    { value: 'email', key: 'fields.preferredContact.options.email' },
    { value: 'phone', key: 'fields.preferredContact.options.phone' }
  ];

  const preferredTimeOptions = [
    { value: 'morning', key: 'fields.preferredTime.options.morning' },
    { value: 'afternoon', key: 'fields.preferredTime.options.afternoon' }
  ];

  return (
    <div className={styles.container}>
      <main className={styles.contactCard}>
        <header className={styles.contactHeader}>
          <h1 className={styles.contactTitle}>{t('heading')}</h1>
          <p className={styles.contactSubtitle}>{t('subheading')}</p>
        </header>

        {/* Skeleton only: backend wiring will be added later */}
        <form className={styles.form} method="post" noValidate>
          {/* Basic details */}
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label htmlFor="fullName">
                {t('fields.fullName.label')}
                <span aria-hidden="true"> *</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                placeholder={t('fields.fullName.placeholder')}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="email">
                {t('fields.email.label')}
                <span aria-hidden="true"> *</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={t('fields.email.placeholder')}
              />
            </div>
          </div>

          {/* Phone + location */}
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label htmlFor="phone">
                {t('fields.phone.label')}
                <span aria-hidden="true"> *</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder={t('fields.phone.placeholder')}
              />
              <p className={styles.fieldHint}>
                {t('fields.phone.hint')}
              </p>
            </div>

            <div className={styles.formField}>
              <label htmlFor="location">
                {t('fields.location.label')}
                <span aria-hidden="true"> *</span>
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                placeholder={t('fields.location.placeholder')}
              />
              <p className={styles.fieldHint}>
                {t('fields.location.hint')}
              </p>
            </div>
          </div>

          {/* Reason for enquiry */}
          <div className={styles.formField}>
            <label htmlFor="enquiryType">
              {t('fields.enquiryType.label')}
              <span aria-hidden="true"> *</span>
            </label>
            <select
              id="enquiryType"
              name="enquiryType"
              required
              defaultValue=""
            >
              <option value="" disabled>
                {t('fields.enquiryType.placeholder')}
              </option>
              {enquiryTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.key)}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred contact method */}
          <fieldset className={styles.fieldset}>
            <legend>
              {t('fields.preferredContact.label')}
              <span aria-hidden="true"> *</span>
            </legend>
            <div className={styles.inlineOptions}>
              {preferredContactOptions.map((option) => (
                <label
                  key={option.value}
                  className={styles.inlineOption}
                >
                  <input
                    type="radio"
                    name="preferredContact"
                    value={option.value}
                    required
                  />
                  <span>{t(option.key)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Preferred time (optional) */}
          <fieldset className={styles.fieldset}>
            <legend>
              {t('fields.preferredTime.label')}
              <span className={styles.optional}>
                {t('labels.optional')}
              </span>
            </legend>
            <div className={styles.inlineOptions}>
              {preferredTimeOptions.map((option) => (
                <label
                  key={option.value}
                  className={styles.inlineOption}
                >
                  <input
                    type="radio"
                    name="preferredTime"
                    value={option.value}
                  />
                  <span>{t(option.key)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Message */}
          <div className={styles.formField}>
            <label htmlFor="message">
              {t('fields.message.label')}
              <span aria-hidden="true"> *</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder={t('fields.message.placeholder')}
            />
          </div>

          {/* Consent */}
          <div className={styles.consentRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="consent"
                required
              />
              <span>{t('fields.consent.label')}</span>
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className={styles.primaryButton}>
            {t('actions.submit')}
          </button>
        </form>
      </main>
    </div>
  );
}
