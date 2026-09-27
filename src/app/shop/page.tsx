"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { incrementShopClicks } from "@/lib/storage";
import { UserFeedbackForm } from "@/components/UserFeedbackForm";

export default function ShopPage() { useEffect(() => { incrementShopClicks(); trackEvent("shop_clicked"); }, []); return <main className="app-shell flex min-h-screen flex-col"><header className="page-padding flex items-center border-b border-line py-5"><Link href="/match" aria-label="Go back to your recommendation" className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white"><ArrowLeft size={18} /></Link></header><section className="page-padding flex flex-1 flex-col justify-center gap-8 pb-20"><div><p className="eyebrow mb-4">Coming soon</p><h1 className="font-display text-5xl leading-[.95]">Shopping recommendations are coming soon.</h1><p className="mt-6 max-w-sm text-base leading-7 text-ink/60">ShoeMatch will eventually suggest products only when you want alternatives beyond your closet. Until then, the focus stays on what you already own.</p><Link href="/match" className="secondary-button mt-9 w-full">Back to my recommendation <ArrowRight size={16} /></Link></div><UserFeedbackForm /></section></main>; }
