"use client";

import { useState } from "react";
import { saveRecommendationTrust } from "@/lib/storage";
import type { RecommendationTrust } from "@/lib/types";

export function TrustPrompt({ matchId }: { matchId: string }) {
    const [sent, setSent] = useState(false);
    function rate(rating: RecommendationTrust["rating"]) { saveRecommendationTrust({ id: crypto.randomUUID(), matchId, rating, timestamp: new Date().toISOString() }); setSent(true); }
    if (sent) return <p className="rounded-2xl bg-sage/10 p-4 text-center text-sm font-bold text-sage">Thanks. Your trust rating was saved locally.</p>;
    return <div className="rounded-3xl border border-line bg-white p-5"><p className="text-sm font-bold">How much did you trust this recommendation?</p><div className="mt-4 grid grid-cols-5 gap-2">{([1, 2, 3, 4, 5] as const).map((rating) => <button type="button" key={rating} onClick={() => rate(rating)} className="flex h-10 items-center justify-center rounded-xl border border-line text-sm font-bold hover:border-ink">{rating}</button>)}</div></div>;
}