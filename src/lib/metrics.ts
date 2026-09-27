import { getFeedback, getMatchHistory, getUserFeedback } from "./storage";
import { getRecommendationTrust, getShopClicks } from "./storage";

export function getLocalMetrics() {
    const feedback = getFeedback();
    const history = getMatchHistory();
    const goodPicks = feedback.filter((item) => item.rating === "good").length;
    const trust = getRecommendationTrust();
    return { shoesAdded: typeof window === "undefined" ? 0 : (() => { try { return JSON.parse(window.localStorage.getItem("shoematch:shoes") ?? "[]").length as number; } catch { return 0; } })(), matchesCompleted: history.length, goodPicks, notForMe: feedback.filter((item) => item.rating === "not_for_me").length, goodPickRate: feedback.length ? goodPicks / feedback.length : 0, averageTrustRating: trust.length ? trust.reduce((sum, item) => sum + item.rating, 0) / trust.length : 0, shopClicks: getShopClicks(), feedbackCount: getUserFeedback().length };
}
