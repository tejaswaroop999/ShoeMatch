"use client";

import Link from "next/link";
import { ArrowRight, Clock3, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { getMatchHistory, getShoes, clearMatchHistory } from "@/lib/storage";
import { trackEvent } from "@/lib/analytics";
import type { MatchHistoryItem, Shoe } from "@/lib/types";

function formatDate(value: string): string { return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value)); }

export default function HistoryPage() {
    const [history, setHistory] = useState<MatchHistoryItem[]>([]);
    const [shoes, setShoes] = useState<Shoe[]>([]);
    useEffect(() => { setHistory(getMatchHistory()); setShoes(getShoes()); trackEvent("history_viewed"); }, []);
    function clear() { if (window.confirm("Clear your match history?")) { clearMatchHistory(); setHistory([]); } }
    return <main className="app-shell flex min-h-screen flex-col"><AppHeader title="History" back="/" /><section className="page-padding flex-1 py-8"><div className="mb-8 flex items-end justify-between"><div><p className="eyebrow mb-2">Private on this device</p><h1 className="font-display text-4xl">Your matches</h1></div>{history.length > 0 && <button type="button" onClick={clear} aria-label="Clear match history" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink/50"><Trash2 size={16} /></button>}</div>{history.length ? <div className="space-y-3">{history.map((item) => { const shoe = shoes.find((candidate) => candidate.id === item.bestShoeId); return <article key={item.id} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-3"><div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-canvas">{shoe ? <img src={shoe.image} alt="" className="h-full w-full object-cover" /> : <Clock3 className="m-5 text-sage" size={24} />}</div><div className="min-w-0 flex-1"><p className="text-xs text-ink/45">{formatDate(item.createdAt)} · {item.occasion}</p><h2 className="mt-1 truncate font-bold">{shoe?.name ?? "Pair no longer in closet"}</h2><p className="mt-1 text-xs text-ink/50">{item.outfitColor} outfit{item.feedback ? ` · ${item.feedback === "good" ? "Good pick" : "Not for me"}` : ""}</p></div></article>; })}</div> : <div className="rounded-3xl border border-dashed border-line bg-white/50 px-6 py-12 text-center"><Clock3 className="mx-auto text-sage" size={28} /><h2 className="mt-4 font-display text-3xl">No matches yet</h2><p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-ink/55">Your recent recommendations will appear here after your first match.</p><Link href="/match" className="primary-button mt-6">Match an outfit <ArrowRight size={16} /></Link></div>}</section><BottomNav active="match" /></main>;
}
