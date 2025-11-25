// src/components/LocaleSwitcher.tsx
'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { useEffect, useRef, useState } from 'react';
import styles from './LocaleSwitcher.module.css';

// Auto-generate flag + label from locale code
const getLocaleMeta = (locale: string) => {
  switch (locale) {
    case 'en':
      return { flag: '🇬🇧', label: ' EN' };
    case 'ru':
      return { flag: '🇷🇺', label: ' RU' };
    default:
      // fallback for unexpected locales
      return { flag: '🏳️', label: locale.toUpperCase() };
  }
};

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // The correct dynamic locale list
  const supportedLocales = routing.locales;

  const current = getLocaleMeta(currentLocale);

  const switchLocale = (newLocale: string) => {
    if (newLocale !== currentLocale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Toggle button */}
      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.flag}>{current.flag}</span>
        <span className={styles.label}>{current.label}</span>
        <span className={styles.caret} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {supportedLocales.map((locale) => {
            const meta = getLocaleMeta(locale);
            const active = locale === currentLocale;

            return (
              <li key={locale}>
                <button
                  type="button"
                  className={`${styles.option} ${active ? styles.optionActive : ''}`}
                  onClick={() => switchLocale(locale)}
                >
                  <span className={styles.flag}>{meta.flag}</span>
                  <span className={styles.optionLabel}>{meta.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
