"use client";

import { useEffect, useState } from "react";
import { FEEDBACK_PROMPT_SEEN_KEY } from "@/lib/app-config";
import { UserFeedbackForm } from "./UserFeedbackForm";

export function FeedbackPrompt({ matchCount }: { matchCount: number }) {
    const [dismissed, setDismissed] = useState(false);
    const [ready, setReady] = useState(false);
    useEffect(() => { try { setDismissed(window.localStorage.getItem(FEEDBACK_PROMPT_SEEN_KEY) === "true"); } catch { setDismissed(false); } setReady(true); }, []);
    if (matchCount < 2 || dismissed || !ready) return null;
    function later() { try { window.localStorage.setItem(FEEDBACK_PROMPT_SEEN_KEY, "true"); } catch { /* The prompt can reappear if storage is unavailable. */ } setDismissed(true); }
    return <div className="space-y-3"><p className="eyebrow">Quick question</p><UserFeedbackForm onSubmitted={later} /><button type="button" onClick={later} className="mx-auto block text-xs font-bold text-ink/45">Maybe later</button></div>;
}