"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { saveUserFeedback } from "@/lib/storage";
import { trackEvent } from "@/lib/analytics";

export function UserFeedbackForm({ compact = false, onSubmitted }: { compact?: boolean; onSubmitted?: () => void }) {
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);
    function submit(event: React.FormEvent) { event.preventDefault(); if (!message.trim()) return; saveUserFeedback({ id: crypto.randomUUID(), message: message.trim(), createdAt: new Date().toISOString() }); trackEvent("feedback_submitted"); onSubmitted?.(); setMessage(""); setSent(true); }
    if (sent) return <p className="rounded-2xl bg-sage/10 p-4 text-center text-sm font-bold text-sage">Thanks. That helps us shape what comes next.</p>;
    return <form onSubmit={submit} className={`rounded-3xl bg-canvas p-5 ${compact ? "" : ""}`}><p className="font-bold">What would make ShoeMatch better?</p><label className="sr-only" htmlFor="product-feedback">Your feedback</label><textarea id="product-feedback" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={400} rows={3} placeholder="Tell us what would make choosing easier..." className="mt-4 w-full resize-none rounded-2xl border border-line bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-coral/30" /><button type="submit" disabled={!message.trim()} className="primary-button mt-3 w-full disabled:cursor-not-allowed disabled:opacity-50">Send feedback <Send size={15} /></button></form>;
}
