import type { Feedback, MatchHistoryItem, RecommendationTrust, Shoe, UserFeedback } from "./types";

const SHOES_KEY = "shoematch:shoes";
const FEEDBACK_KEY = "shoematch:feedback";
const HISTORY_KEY = "shoematch:history";
const USER_FEEDBACK_KEY = "shoematch:user-feedback";
const TRUST_KEY = "shoematch:trust";
const SHOP_CLICKS_KEY = "shoematch:shop-clicks";
const MAX_HISTORY = 75;
let lastStorageError = "";

function read<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
        const value = window.localStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : fallback;
    } catch {
        return fallback;
    }
}

function write<T>(key: string, value: T): boolean {
    if (typeof window === "undefined") return false;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
        lastStorageError = "";
        return true;
    } catch {
        lastStorageError = "Your browser could not save this change. Storage may be disabled or full.";
        return false;
    }
}

export function getLastStorageError(): string { return lastStorageError; }

export function getShoes(): Shoe[] { return read<Shoe[]>(SHOES_KEY, []); }
export function saveShoe(shoe: Shoe): Shoe[] { const shoes = [...getShoes(), shoe]; write(SHOES_KEY, shoes); return shoes; }
export function updateShoe(shoe: Shoe): Shoe[] { const shoes = getShoes().map((item) => item.id === shoe.id ? shoe : item); write(SHOES_KEY, shoes); return shoes; }
export function deleteShoe(id: string): Shoe[] { const shoes = getShoes().filter((item) => item.id !== id); write(SHOES_KEY, shoes); return shoes; }
export function getFeedback(): Feedback[] { return read<Feedback[]>(FEEDBACK_KEY, []); }
export function saveFeedback(feedback: Feedback): Feedback[] { const items = [...getFeedback(), feedback]; write(FEEDBACK_KEY, items); return items; }
export function getMatchHistory(): MatchHistoryItem[] { return read<MatchHistoryItem[]>(HISTORY_KEY, []); }
export function saveMatchHistory(item: MatchHistoryItem): MatchHistoryItem[] { const items = [item, ...getMatchHistory()].slice(0, MAX_HISTORY); write(HISTORY_KEY, items); return items; }
export function updateMatchHistoryFeedback(id: string, feedback: MatchHistoryItem["feedback"]): MatchHistoryItem[] { const items = getMatchHistory().map((item) => item.id === id ? { ...item, feedback } : item); write(HISTORY_KEY, items); return items; }
export function clearMatchHistory(): void { write(HISTORY_KEY, []); }
export function getUserFeedback(): UserFeedback[] { return read<UserFeedback[]>(USER_FEEDBACK_KEY, []); }
export function saveUserFeedback(item: UserFeedback): UserFeedback[] { const items = [...getUserFeedback(), item]; write(USER_FEEDBACK_KEY, items); return items; }
export function getRecommendationTrust(): RecommendationTrust[] { return read<RecommendationTrust[]>(TRUST_KEY, []); }
export function saveRecommendationTrust(item: RecommendationTrust): RecommendationTrust[] { const items = [...getRecommendationTrust(), item]; write(TRUST_KEY, items); return items; }
export function incrementShopClicks(): number { const count = read<number>(SHOP_CLICKS_KEY, 0) + 1; write(SHOP_CLICKS_KEY, count); return count; }
export function getShopClicks(): number { return read<number>(SHOP_CLICKS_KEY, 0); }
