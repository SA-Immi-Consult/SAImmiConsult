/*
DOC NAME: page.tsx
LOCATION: /src/app/[locale]/(client)/client/dashboard/page.tsx
SCOPE: Client dashboard (status truth + quick actions). Server-only.
STATUS: UNLOCKED (lock after verified)
NOTES:
- No hardcoded English UI strings; all user-facing copy via i18n.
- Status “source of truth”:
  1) Profile incomplete overrides everything.
  2) Otherwise, use the MOST RECENTLY UPDATED between:
     - latest case (any status)
     - latest activated application (via latest case with status=application_activated)
  3) If the most recently updated is a non-activated case → show CASE status.
  4) If the most recently updated is the activated application → show APPLICATION status.
- Timeline:
  - If a case is still active → render the case timeline.
  - If the application is active → append the application timeline to the case timeline.
  - Only render the timeline card if the user has an active case or application.
*/

import "server-only";

import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";

import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { siteConfig } from "@/config/siteConfig";
import { Link } from "@/i18n/navigation";

import { PageShell } from "@/components/ui/layout/PageShell";
import { MainColumn } from "@/components/ui/layout/MainColumn";

import Timeline from "@/components/ui/timeline/Timeline";
import { normalizeTimelineEvents } from "@/lib/timeline/normalizeTimelineEvents";

import {
	CASE_STATUS,
	type ApplicationStatusId,
	getApplicationStatusMeta,
	getCaseStatusMeta,
} from "@/config/statuses";

import { isProfileIncomplete, type ClientProfileLike } from "@/lib/profileCompleteness";

import styles from "./dashboard.module.css";

type ClientProfileRow = ClientProfileLike & {
	first_name: string | null;
	last_name: string | null;
};

type ClientCaseRow = {
	id: string;
	user_id: string;
	status: string;
	application_id: string | null;
	timeline: any;
	created_at: string;
	updated_at: string | null;
};

type ClientApplicationRow = {
	id: string;
	user_id: string;
	application_status: ApplicationStatusId;
	timeline: any;
	created_at: string;
	updated_at: string | null;
};

type DashboardState =
	| { kind: "profile_incomplete" }
	| { kind: "no_case" }
	| { kind: "case_in_progress"; case: ClientCaseRow }
	| { kind: "has_application"; app: ClientApplicationRow };

function buildDisplayName(
	profile: ClientProfileRow | null,
	email: string | null | undefined,
	fallbackLabel: string,
): string {
	const first = profile?.first_name?.trim();
	const last = profile?.last_name?.trim();

	if (first) return `${first} ${last ?? ""}`.trim();
	if (email) return email.split("@")[0] || fallbackLabel;
	return fallbackLabel;
}

function pickFirstParam(v: string | string[] | undefined): string | undefined {
	if (Array.isArray(v)) return v[0];
	return v;
}

function safeTime(value: string | null | undefined): number {
	if (!value) return 0;
	const d = new Date(value);
	const t = d.getTime();
	return Number.isNaN(t) ? 0 : t;
}

export default async function ClientDashboardPage({
	searchParams,
}: {
	searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
	noStore();

	const t = await getTranslations("ClientDashboard");
	const tGlobal = await getTranslations("GlobalForm");
	const locale = await getLocale();

	const resolvedSearchParams = searchParams ? await searchParams : undefined;
	const caseSubmittedParam = pickFirstParam(resolvedSearchParams?.case_submitted);
	const showCaseSubmitted = caseSubmittedParam === "1";

	const supabase = await createServerSupabaseClient();

	// Auth (server-verified)
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect(siteConfig.loginPath);

	const userId = user.id;

	// Profile
	const { data: profile } = await supabase
		.from("client_profiles")
		.select(
			"first_name, last_name, citizenship_country, date_of_birth, contact_email, telegram_username, whatsapp_e164, passport_expiry",
		)
		.eq("user_id", userId)
		.maybeSingle<ClientProfileRow>();

	const displayName = buildDisplayName(profile ?? null, user.email, t("common.clientFallback"));
	const profileIncomplete = isProfileIncomplete(profile ?? null);

	// Latest case (by UPDATED)
	const { data: caseRows } = await supabase
		.from("client_cases")
		.select("id, user_id, status, application_id, timeline, created_at, updated_at")
		.eq("user_id", userId)
		.order("updated_at", { ascending: false, nullsFirst: false })
		.order("created_at", { ascending: false })
		.limit(1);

	const latestCase: ClientCaseRow | null =
		caseRows && caseRows.length > 0 ? (caseRows[0] as ClientCaseRow) : null;

	// Latest application (by UPDATED)
	const { data: appRows } = await supabase
		.from("client_applications")
		.select("id, user_id, application_status, timeline, created_at, updated_at")
		.eq("user_id", userId)
		.order("updated_at", { ascending: false, nullsFirst: false })
		.order("created_at", { ascending: false })
		.limit(1);

	const latestApp: ClientApplicationRow | null =
		appRows && appRows.length > 0 ? (appRows[0] as ClientApplicationRow) : null;

	// State machine (Profile → Most-recent truth between Case/Application)
	let state: DashboardState;

	if (profileIncomplete) {
		state = { kind: "profile_incomplete" };
	} else if (!latestCase && !latestApp) {
		state = { kind: "no_case" };
	} else {
		const caseUpdated = latestCase
			? Math.max(safeTime(latestCase.updated_at), safeTime(latestCase.created_at))
			: 0;

		const appUpdated = latestApp
			? Math.max(safeTime(latestApp.updated_at), safeTime(latestApp.created_at))
			: 0;

		const caseIsActivated =
			!!latestCase &&
			(latestCase.status === CASE_STATUS.APPLICATION_ACTIVATED || !!latestCase.application_id);

		if (caseIsActivated && latestApp) {
			state = { kind: "has_application", app: latestApp };
		} else if (latestCase && caseUpdated >= appUpdated) {
			state = { kind: "case_in_progress", case: latestCase };
		} else if (latestCase && !caseIsActivated) {
			state = { kind: "case_in_progress", case: latestCase };
		} else if (latestApp) {
			state = { kind: "has_application", app: latestApp };
		} else {
			state = { kind: "no_case" };
		}
	}

	// Timeline card should only render when the user has an active case or application
	const shouldRenderTimeline = state.kind === "case_in_progress" || state.kind === "has_application";

	// If application is active, we want the timeline of the latest *activated* case (to prepend),
	// then append the application's timeline.
	let activatedCaseForTimeline: ClientCaseRow | null = null;

	if (state.kind === "has_application") {
		const { data: activatedCaseRows } = await supabase
			.from("client_cases")
			.select("id, user_id, status, application_id, timeline, created_at, updated_at")
			.eq("user_id", userId)
			.or(`status.eq.${CASE_STATUS.APPLICATION_ACTIVATED},application_id.not.is.null`)
			.order("updated_at", { ascending: false, nullsFirst: false })
			.order("created_at", { ascending: false })
			.limit(1);

		activatedCaseForTimeline =
			activatedCaseRows && activatedCaseRows.length > 0
				? (activatedCaseRows[0] as ClientCaseRow)
				: null;
	}

	// Build timeline events according to journey:
	// - Active case: case timeline only.
	// - Active application: case timeline + application timeline (appended).
	let timelineEvents: any[] = [];

	if (shouldRenderTimeline) {
		if (state.kind === "case_in_progress") {
			const caseEvents = normalizeTimelineEvents(state.case.timeline);
			timelineEvents = [...caseEvents];
		} else if (state.kind === "has_application") {
			const caseEvents = normalizeTimelineEvents(activatedCaseForTimeline?.timeline ?? null);
			const appEvents = normalizeTimelineEvents(state.app.timeline);

			// Append app timeline to case timeline, then sort newest-first for rendering.
			timelineEvents = [...caseEvents, ...appEvents].sort(
				(a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime(),
			);
		}
	}

	// Resolve UI (badge + copy + CTA)
	let badgeText = "";
	let badgeClass = "";
	let bodyText = "";
	
	type DashboardCtaHref =
		| typeof siteConfig.clientAccountHref
		| typeof siteConfig.clientNewCaseHref
		| ReturnType<typeof siteConfig.clientCaseDetailsHref>
		| ReturnType<typeof siteConfig.clientApplicationDetailsHref>;
	
	let ctaHref: DashboardCtaHref | null = null;
	let ctaLabel: string | null = null;

	if (state.kind === "profile_incomplete") {
		badgeText = t("states.profileIncomplete.badge");
		badgeClass = "badge badge-action";
	
		bodyText = t("states.profileIncomplete.body");
	
		ctaHref = siteConfig.clientAccountHref;
		ctaLabel = t("states.profileIncomplete.cta");
	} else if (state.kind === "no_case") {
		badgeText = t("states.noCase.badge");
		badgeClass = "badge badge-action";
	
		bodyText = t("states.noCase.body");
	
		ctaHref = siteConfig.clientNewCaseHref;
		ctaLabel = t("states.noCase.cta");
	} else if (state.kind === "case_in_progress") {
		const caseMeta = getCaseStatusMeta(state.case.status);
	
		badgeText = tGlobal(`Statuses.cases.${caseMeta.labelKey}`);
		badgeClass = `badge ${caseMeta.badgeTone}`;
	
		bodyText = tGlobal(`Statuses.casesDescriptions.${caseMeta.descriptionKey}`);
	
		ctaHref = siteConfig.clientCaseDetailsHref(state.case.id);
		ctaLabel = t("states.caseInProgress.cta");
	} else if (state.kind === "has_application") {
		const appMeta = getApplicationStatusMeta(state.app.application_status);
	
		badgeText = tGlobal(`Statuses.applications.${appMeta.labelKey}`);
		badgeClass = `badge ${appMeta.badgeTone}`;
	
		bodyText = tGlobal(`Statuses.applicationsDescriptions.${appMeta.descriptionKey}`);
	
		ctaHref = siteConfig.clientApplicationDetailsHref(state.app.id);
		ctaLabel = t("states.cta.viewApplication");
	}

	const statusCardInner = (
		<>
			<div className={styles.cardHeader}>
				<h2 className="panel-title">{t("status.title")}</h2>
				<span className={badgeClass}>{badgeText}</span>
			</div>

			<p className="text-sm text-muted">{bodyText}</p>

			{ctaLabel ? (
				<p className={styles.cardHint}>
					<span>{ctaLabel}</span>
					<span className={styles.cardHintArrow} aria-hidden="true">
						{tGlobal("Common.symbols.arrowRight")}
					</span>
				</p>
			) : null}
		</>
	);

	return (
		<PageShell>
			<header className="hero-shell">
				<div className="hero-inner">
					<p className="hero-title">{t("welcome.eyebrow")}</p>
					<h1 className="hero-subtitle">{t("welcome.title", { name: displayName })}</h1>
					<p className="hero-desc">{t("welcome.subtitle")}</p>
				</div>
			</header>

			<MainColumn>
					<article className={styles.card}>
						<h2 className="panel-title">{t("quickActions.title")}</h2>

						<div className={styles.actionsGrid}>
							<a
								href={siteConfig.whatsappUrl}
								target="_blank"
								rel="noreferrer"
								className={`button button-primary ${styles.actionButton}`}
							>
								{t("quickActions.whatsapp")}
							</a>

							<a
								href={siteConfig.telegramPhoneUrl}
								target="_blank"
								rel="noreferrer"
								className={`button button-secondary ${styles.actionButton}`}
							>
								{t("quickActions.telegram")}
							</a>
						</div>
					</article>
			
				{showCaseSubmitted ? (
					<article className={styles.card} role="status" aria-live="polite">
						<div className={styles.cardHeader}>
							<h2 className="panel-title">{t("banners.caseSubmitted.title")}</h2>
							<span className="badge badge-neutral">{t("banners.caseSubmitted.badge")}</span>
						</div>

						<p className="text-sm text-muted">{t("banners.caseSubmitted.body")}</p>
					</article>
				) : null}

				<div className={styles.cardsGrid}>
					{ctaHref ? (
						<Link href={ctaHref} className={`${styles.card} ${styles.cardLink}`}>
							{statusCardInner}
						</Link>
					) : (
						<article className={styles.card}>{statusCardInner}</article>
					)}

					
					
					{/* Timeline (only when user has an active case or application) */}
					{shouldRenderTimeline ? (
						<article className={styles.card}>
							<div className={styles.cardHeader}>
								<h2 className="panel-title">{tGlobal("Timeline.title")}</h2>
							</div>
	
							<Timeline
								locale={locale}
								dateNaLabel={tGlobal("Common.dates.na")}
								events={timelineEvents}
								translate={tGlobal}
							/>
						</article>
					) : null}



				</div>
			</MainColumn>
		</PageShell>
	);
}
