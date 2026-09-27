"use client";

import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { FeedbackButtons } from "@/components/FeedbackButtons";
import { ImageUploader } from "@/components/ImageUploader";
import { RecommendationCard } from "@/components/RecommendationCard";
import { SelectPill } from "@/components/SelectPill";
import { matchShoes } from "@/lib/matcher";
import { getFeedback, getShoes, saveMatchHistory } from "@/lib/storage";
import { trackEvent } from "@/lib/analytics";
import { occasions, outfitColors, type MatchRequest, type MatchResult, type Occasion, type OutfitColor, type Shoe } from "@/lib/types";

export default function MatchPage() {
    const [shoes, setShoes] = useState<Shoe[]>([]);
    const [outfitImage, setOutfitImage] = useState("");
    const [outfitColor, setOutfitColor] = useState<OutfitColor>("Black");
    const [occasion, setOccasion] = useState<Occasion>("Everyday");
    const [result, setResult] = useState<MatchResult | null>(null);
    const [historyId, setHistoryId] = useState<string>();
    useEffect(() => setShoes(getShoes()), []);
    function findMatch(event: React.FormEvent) { event.preventDefault(); trackEvent("match_started", { occasion, outfitColor, closetSize: shoes.length }); const request: MatchRequest = { outfitImage, outfitColor, occasion }; const match = matchShoes(shoes, request, getFeedback()); if (!match) return; const historyItem = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), outfitColor, occasion, bestShoeId: match.bestMatch.id, alternativeShoeId: match.alternative?.id, bestScore: match.score }; saveMatchHistory(historyItem); setHistoryId(historyItem.id); setResult(match); trackEvent("match_completed", { occasion, score: match.score, closetSize: shoes.length }); }
    function reset() { setResult(null); setOutfitImage(""); }
    if (result) return <main className="app-shell flex min-h-screen flex-col"><AppHeader title="Your match" back="/match" /><section className="page-padding flex-1 space-y-6 py-8"><div><p className="eyebrow mb-2">Best pick</p><h1 className="font-display text-4xl">Start with this pair.</h1></div><RecommendationCard shoe={result.bestMatch} /><p className="text-base leading-7 text-ink/75">{result.reason}</p><div className="rounded-2xl bg-canvas p-4"><p className="eyebrow mb-3">Why it works</p><ul className="space-y-3 text-sm text-ink/75">{result.matchedRules.slice(0, 3).map((rule) => <li key={rule} className="flex gap-2"><span className="text-coral">•</span><span>{rule}</span></li>)}</ul></div><div><p className="mb-3 text-sm font-bold">Was this a good pick?</p><FeedbackButtons shoeId={result.bestMatch.id} historyId={historyId} occasion={occasion} outfitColor={outfitColor} /></div>{result.alternative && <div className="pt-3"><p className="eyebrow mb-3">Alternative</p><RecommendationCard shoe={result.alternative} label="ALTERNATIVE" /></div>}<div className="border-t border-line pt-6 text-center"><p className="text-sm font-bold">Don’t love your options?</p><Link href="/shop" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-coral">Shop a better match <ArrowRight size={15} /></Link><Link href="/history" className="mx-auto mt-5 block text-xs font-bold text-ink/50">View match history</Link><button type="button" onClick={reset} className="mx-auto mt-5 flex items-center gap-2 text-xs font-bold text-ink/50"><RotateCcw size={14} /> Try a different outfit</button></div></section><BottomNav active="match" /></main>;
    return <main className="app-shell flex min-h-screen flex-col"><AppHeader title="Match an outfit" back="/" /><form onSubmit={findMatch} className="page-padding flex-1 space-y-8 py-8"><div><p className="eyebrow mb-2">Your closet, considered</p><h1 className="font-display text-4xl">What are you wearing?</h1><p className="mt-3 text-sm leading-6 text-ink/55">Three quick details, then we’ll find your best available pair.</p></div>{!shoes.length ? <div className="rounded-3xl bg-canvas p-5"><p className="font-bold">Add at least one pair to your closet first.</p><Link href="/shoes/new" className="primary-button mt-5">Add a pair <ArrowRight size={16} /></Link></div> : <><div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold uppercase tracking-widest text-sage"><span className="rounded-xl bg-canvas px-2 py-3">01<br /><strong className="text-ink">Outfit</strong></span><span className="rounded-xl bg-canvas px-2 py-3">02<br /><strong className="text-ink">Color</strong></span><span className="rounded-xl bg-canvas px-2 py-3">03<br /><strong className="text-ink">Occasion</strong></span></div><ImageUploader label="Today&apos;s outfit" value={outfitImage} onChange={setOutfitImage} /><fieldset><legend className="mb-3 text-sm font-bold">What&apos;s the main color?</legend><div className="flex flex-wrap gap-2">{outfitColors.map((item) => <SelectPill key={item} label={item} selected={outfitColor === item} onClick={() => setOutfitColor(item)} />)}</div></fieldset><fieldset><legend className="mb-3 text-sm font-bold">Where are you going?</legend><div className="flex flex-wrap gap-2">{occasions.map((item) => <SelectPill key={item} label={item} selected={occasion === item} onClick={() => setOccasion(item)} />)}</div></fieldset><p className="border-l-2 border-sage pl-3 text-xs leading-5 text-ink/55">ShoeMatch uses rule-based matching in this version. Your photo isn&apos;t automatically analyzed yet.</p><button type="submit" className="primary-button w-full">Find my shoes <ArrowRight size={17} /></button></>}</form><BottomNav active="match" /></main>;
}
