/*
DOC NAME: PageShell.tsx
LOCATION: /src/components/ui/layout/PageShell.tsx
SCOPE: PageShell — global layout primitive wrapper (layout only).
STATUS: LOCKED
APPLIES TO: All pages using <PageShell>
NOTES:
- Must apply base page wrapper class to ensure min-height/background consistency.
- No UI strings, no page-specific styling here.
CONTENT:
*/

import type React from "react";
import styles from "./layout.module.css";

type Props = {
	children: React.ReactNode;
};

export function PageShell({ children }: Props) {
	return <div className={`${styles.page} ${styles.shell}`}>{children}</div>;
}
