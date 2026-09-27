"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { saveFeedback } from "@/lib/storage";
import { trackEvent } from "@/lib/analytics";
import { updateMatchHistoryFeedback } from "@/lib/storage";
import { getMatchHistory } from "@/lib/storage";
import { FeedbackPrompt } from "@/components/FeedbackPrompt";
import { TrustPrompt } from "@/components/TrustPrompt";
import type { Occasion, OutfitColor } from "@/lib/types";

export function FeedbackButtons({ shoeId, historyId, occasion, outfitColor }: { shoeId: string; historyId?: string; occasion: Occasion; outfitColor: OutfitColor }) {
    const [rating, setRating] = useState<"good" | "not_for_me">();
    function rate(next: "good" | "not_for_me") { saveFeedback({ id: crypto.randomUUID(), shoeId, occasion, outfitColor, rating: next, timestamp: new Date().toISOString() }); if (historyId) updateMatchHistoryFeedback(historyId, next); trackEvent(next === "good" ? "good_pick" : "not_for_me", { shoeId, occasion, outfitColor }); setRating(next); }
    if (rating) return <div className="space-y-4"><p className="rounded-2xl bg-sage/10 px-4 py-3 text-center text-sm font-bold text-sage">Thanks, we’ll remember your feedback.</p><TrustPrompt matchId={historyId ?? "latest"} /><FeedbackPrompt matchCount={getMatchHistory().length} /></div>;
    return <div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => rate("good")} className="secondary-button"><ThumbsUp size={16} /> Good pick</button><button type="button" onClick={() => rate("not_for_me")} className="secondary-button"><ThumbsDown size={16} /> Not for me</button></div>;
}
