/*
DOC NAME: NewsTicker.tsx
LOCATION: /src/components/ui/NewsTicker/NewsTicker.tsx
SCOPE: Client-side marquee ticker for headlines (pauses off-screen, respects reduced motion). Reusable on Home + News.
STATUS: UNLOCKED (lock after verified)
*/

"use client";

import * as React from "react";

import { Link } from "@/i18n/navigation";

import styles from "./NewsTicker.module.css";

/**
 * IMPORTANT:
 * - This component uses next-intl typed <Link/>.
 * - For dynamic routes, prefer passing the object href form: { pathname, params }.
 * - To avoid "pathname is undefined" class issues, we type href to match <Link />.
 */
type LinkHref = React.ComponentProps<typeof Link>["href"];

export type NewsTickerItem = {
	key: string;
	headline: string;
	href?: LinkHref;
};

type Props = {
	eyebrow: string;
	items: NewsTickerItem[];
};

export default function NewsTicker({ eyebrow, items }: Props) {
	const trackRef = React.useRef<HTMLDivElement | null>(null);
	const setARef = React.useRef<HTMLDivElement | null>(null);
	const wrapRef = React.useRef<HTMLDivElement | null>(null);

	const loopItems = React.useMemo(() => {
		if (!items || items.length === 0) return [];

		// Ensure the ticker never looks "empty" with too-few items (e.g., 1–2 rows).
		// When you add more news, this naturally collapses back to a single pass.
		const MIN_ITEMS = 8;
		const repeats = items.length >= MIN_ITEMS ? 1 : Math.ceil(MIN_ITEMS / items.length);
		const out: NewsTickerItem[] = [];

		for (let i = 0; i < items.length * repeats; i += 1) {
			out.push(items[i % items.length]!);
		}

		return out;
	}, [items]);

	React.useEffect(() => {
		const track = trackRef.current;
		const setA = setARef.current;
		const wrap = wrapRef.current;
		if (!track || !setA || !wrap) return;

		const update = () => {
			const distance = setA.getBoundingClientRect().width;

			// smaller = slower
			const PX_PER_SEC = 55;
			const duration = distance > 0 ? distance / PX_PER_SEC : 40;

			track.style.setProperty("--ticker-distance", `${distance}px`);
			track.style.setProperty("--ticker-duration", `${duration}s`);
		};

		update();

		const ro = new ResizeObserver(update);
		ro.observe(setA);

		const prefersReduced =
			window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;

		let io: IntersectionObserver | null = null;

		if (!prefersReduced) {
			// start paused until in view
			track.style.animationPlayState = "paused";

			io = new IntersectionObserver(
				(entries) => {
					const entry = entries[0];
					if (!entry) return;
					track.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
				},
				{ root: null, rootMargin: "200px 0px 200px 0px", threshold: 0.01 }
			);

			io.observe(wrap);
		}

		return () => {
			if (io) io.disconnect();
			ro.disconnect();
		};
	}, [loopItems.length]);

	if (!loopItems || loopItems.length === 0) return null;

	const renderItem = (item: NewsTickerItem, idx: number) => {
		const inner = (
			<>
				<span className="news-ticker-category">{eyebrow}</span>
				<span className="news-ticker-headline">{item.headline}</span>
				<span className="news-ticker-divider" aria-hidden="true">
					/
				</span>
			</>
		);

		return (
			<div key={`${item.key}__${idx}`} className={styles.item}>
				{item.href ? (
					<Link href={item.href} className={styles.itemLink}>
						{inner}
					</Link>
				) : (
					inner
				)}
			</div>
		);
	};

	return (
		<div ref={wrapRef} className={`${styles.wrapper} news-ticker`} aria-label={eyebrow}>
			<div ref={trackRef} className={styles.track}>
				<div ref={setARef} className={styles.set}>
					{loopItems.map(renderItem)}
				</div>

				<div className={styles.set} aria-hidden="true">
					{loopItems.map(renderItem)}
				</div>
			</div>

			<div className={`${styles.overlayLeft} news-ticker-overlay-left`} aria-hidden="true" />
			<div className={`${styles.overlayRight} news-ticker-overlay-right`} aria-hidden="true" />
		</div>
	);
}
