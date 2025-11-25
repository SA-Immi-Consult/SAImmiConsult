// src/components/Navbar.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/siteConfig';
import styles from './Navbar.module.css';
import LocaleSwitcher from './LocaleSwitcher';

type NavItemKey =
  | 'home'
  | 'about'
  | 'services'
  | 'news'
  | 'faq'
  | 'contact'
  | 'login';

// Let TS infer href union from siteConfig values
const NAV_ITEMS = [
  { key: 'home' as const, href: siteConfig.homePath },
  { key: 'about' as const, href: siteConfig.aboutPath },
  { key: 'services' as const, href: siteConfig.servicesPath },
  { key: 'news' as const, href: siteConfig.newsPath },
  { key: 'faq' as const, href: siteConfig.faqPath },
  { key: 'contact' as const, href: siteConfig.contactPath },
  { key: 'login' as const, href: siteConfig.loginPath }
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations('Navbar');

  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: (typeof NAV_ITEMS)[number]['href']) => {
    if (href === siteConfig.homePath) {
      return pathname === siteConfig.homePath;
    }
    // Mark parent as active for nested routes, e.g. /services/immigration
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleServicesEnter = () => {
    clearCloseTimeout();
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    clearCloseTimeout();
    // small delay so user can move cursor between pill and dropdown
    closeTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 220);
  };

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      {/* Brand / logo */}
      <div className={styles.logo}>{siteConfig.brandName}</div>

      <ul className={styles.navLinks}>
        {NAV_ITEMS.map((item) => {
          if (item.key === 'services') {
            return (
              <li
                key={item.key}
                className={`${styles.navItem} ${styles.navItemWithDropdown}`}
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                {/* Parent Services link */}
                <Link
                  href={item.href}
                  className={`${styles.link} ${
                    isActive(item.href) ? styles.active : ''
                  }`}
                >
                  {t(item.key)}
                </Link>

                {/* Hover drilldown with JS-controlled visibility */}
                <div
                  className={`${styles.servicesDropdown} ${
                    servicesOpen ? styles.servicesDropdownOpen : ''
                  }`}
                >
                  <div className={styles.servicesDropdownInner}>
                    <Link
                      href={siteConfig.servicesImmigrationPath}
                      className={styles.servicesDropdownItem}
                    >
                      <span className={styles.servicesDropdownTitle}>
                        {t('servicesMenu.immigration')}
                      </span>
                      <span className={styles.servicesDropdownDesc}>
                        {t('servicesMenu.immigrationDesc')}
                      </span>
                    </Link>

                    <Link
                      href={siteConfig.servicesEmigrationPath}
                      className={styles.servicesDropdownItem}
                    >
                      <span className={styles.servicesDropdownTitle}>
                        {t('servicesMenu.emigration')}
                      </span>
                      <span className={styles.servicesDropdownDesc}>
                        {t('servicesMenu.emigrationDesc')}
                      </span>
                    </Link>

                    <Link
                      href={siteConfig.servicesVisaTypesPath}
                      className={styles.servicesDropdownItem}
                    >
                      <span className={styles.servicesDropdownTitle}>
                        {t('servicesMenu.visaTypes')}
                      </span>
                      <span className={styles.servicesDropdownDesc}>
                        {t('servicesMenu.visaTypesDesc')}
                      </span>
                    </Link>

                    <Link
                      href={siteConfig.servicesAdditionalSupportPath}
                      className={styles.servicesDropdownItem}
                    >
                      <span className={styles.servicesDropdownTitle}>
                        {t('servicesMenu.additionalSupport')}
                      </span>
                      <span className={styles.servicesDropdownDesc}>
                        {t('servicesMenu.additionalSupportDesc')}
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
            );
          }

          return (
            <li key={item.key} className={styles.navItem}>
              <Link
                href={item.href}
                className={`${styles.link} ${
                  isActive(item.href) ? styles.active : ''
                }`}
              >
                {t(item.key)}
              </Link>
            </li>
          );
        })}
      </ul>

      <LocaleSwitcher />
    </nav>
  );
}