import { TESTER_ID_KEY } from "./app-config";

export function getTesterId(): string {
    if (typeof window === "undefined") return "server";
    const existing = window.localStorage.getItem(TESTER_ID_KEY);
    if (existing) return existing;
    const id = `tester_${crypto.randomUUID().replaceAll("-", "").slice(0, 6)}`;
    try { window.localStorage.setItem(TESTER_ID_KEY, id); } catch { /* Analytics remains anonymous if storage is unavailable. */ }
    return id;
}
