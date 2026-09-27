"use client";

import { Check, Copy, MessageSquare } from "lucide-react";
import { useState } from "react";
import { UserFeedbackForm } from "./UserFeedbackForm";

export function ShareFeedback() {
    const [copied, setCopied] = useState(false);
    async function copyLink() { try { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { setCopied(false); } }
    return <section className="space-y-3 border-t border-line pt-6"><div className="flex items-center gap-2"><MessageSquare size={17} className="text-coral" /><h2 className="font-bold">Help us improve ShoeMatch</h2></div><UserFeedbackForm compact /><button type="button" onClick={copyLink} className="secondary-button w-full">{copied ? <><Check size={16} /> Link copied</> : <><Copy size={16} /> Copy app link</>}</button></section>;
}
