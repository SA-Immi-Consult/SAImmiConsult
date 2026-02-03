"use client";

import React, { useEffect, useRef } from "react";
import { PageShell } from "@/components/ui/layout/PageShell";
import { MainColumn } from "@/components/ui/layout/MainColumn";
import styles from "./PageWithStickyHero.module.css";
import type { CSSProperties } from "react";

type PageWithStickyHeroProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  imageSrc: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  heroClassName?: string;
  heroInnerClassName?: string;
  descriptionOnImageRole?: boolean;
  style?: CSSProperties;
  overlap?: boolean;
};

export function PageWithStickyHero({
  title,
  subtitle,
  description,
  imageSrc,
  actions,
  children,
  heroClassName,
  heroInnerClassName,
  descriptionOnImageRole = true,
  style,
  overlap = true,
}: PageWithStickyHeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const root = document.documentElement;

    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = heroEl.getBoundingClientRect();

        // Clip rect in viewport coordinates
        root.style.setProperty("--pwh-clip-top", `${Math.max(0, r.top)}px`);
        root.style.setProperty("--pwh-clip-left", `${Math.max(0, r.left)}px`);
        root.style.setProperty("--pwh-clip-right", `${Math.max(0, window.innerWidth - r.right)}px`);
        root.style.setProperty("--pwh-clip-bottom", `${Math.max(0, window.innerHeight - r.bottom)}px`);
      });
    };

    update();

    const onScroll = () => update();
    const onResize = () => update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(update);
    ro.observe(heroEl);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  const heroShellClasses = ["hero-shell", styles.heroShellWithImage];
  if (heroClassName) heroShellClasses.push(heroClassName);

  const heroInnerClasses = ["hero-inner", styles.heroInnerOnImage];
  if (heroInnerClassName) heroInnerClasses.push(heroInnerClassName);

  const descClasses = ["hero-desc"];
  if (descriptionOnImageRole) descClasses.push("hero-desc--onImage");

  return (
    <PageShell>
      {/* Global fixed layer (Home-style), clipped to hero via CSS vars */}
      <div
        className={styles.globalFixedHero}
        aria-hidden="true"
        style={
          {
            ...(style ?? {}),
            ["--sticky-hero-image" as any]: `url("${imageSrc}")`,
          } as CSSProperties
        }
      />

      <header
        ref={heroRef as any}
        className={heroShellClasses.join(" ")}
        style={
          {
            ...(style ?? {}),
          } as CSSProperties
        }
      >
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={heroInnerClasses.join(" ")}>
			<div className="fx-heroScrim">
				<h1 className="hero-title fx-textGlow">{title}</h1>
			
				{subtitle ? (
				<p className="hero-subtitle fx-textStroke fx-textGlowStrong">{subtitle}</p>
				) : null}
			
				{description ? (
				<p className={descClasses.join(" ")}>{description}</p>
				) : null}
			
				{actions ? <div className="hero-actions">{actions}</div> : null}
			</div>
		</div>
      </header>

      <MainColumn className={overlap ? styles.mainOverlap : styles.mainAbove}>
        {children}
      </MainColumn>
    </PageShell>
  );
}
