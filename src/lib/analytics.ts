export type AnalyticsEvent =
    | "app_opened"
    | "shoe_added"
    | "shoe_updated"
    | "shoe_deleted"
    | "match_started"
    | "match_completed"
    | "good_pick"
    | "not_for_me"
    | "shop_clicked"
    | "history_viewed"
    | "feedback_submitted"
    | "closet_viewed";

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number | undefined>): void {
    let testerId: string | undefined;
    try { testerId = typeof window === "undefined" ? undefined : window.localStorage.getItem("shoematch:tester-id") ?? undefined; } catch { testerId = undefined; }
    if (process.env.NODE_ENV === "development") console.info(`[analytics] ${event}`, { ...properties, testerId });
}