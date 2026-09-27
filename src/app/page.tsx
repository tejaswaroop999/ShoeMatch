"use client";

import Link from "next/link";
import { ArrowUpRight, Footprints } from "lucide-react";
import { useEffect, useState } from "react";
import { getShoes } from "@/lib/storage";

export default function HomePage() {
    const [shoeCount, setShoeCount] = useState(0);
    useEffect(() => setShoeCount(getShoes().length), []);

    return (
        <main className="app-shell flex min-h-screen flex-col">
            <header className="page-padding flex items-center justify-between py-6">
                <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper"><Footprints size={16} /></span>
                    ShoeMatch
                </Link>
                <span className="eyebrow">Your closet, considered</span>
            </header>
            <section className="page-padding flex flex-1 flex-col justify-center pb-16 pt-10">
                <div className="mb-10 max-w-sm">
                    <p className="eyebrow mb-5">A little clarity, one pair at a time</p>
                    <h1 className="font-display text-[clamp(3.2rem,15vw,5.2rem)] leading-[.92] tracking-[-0.04em]">Find the right shoes for your outfit.</h1>
                    <p className="mt-6 max-w-xs text-base leading-7 text-ink/60">Choose from the pairs you already own.</p>
                </div>
                <div className="space-y-3">
                    <Link href="/match" className="primary-button w-full">Match an outfit <ArrowUpRight size={18} /></Link>
                    <Link href="/shoes" className="secondary-button w-full">My shoe closet</Link>
                </div>
                <div className="mt-16 border-t border-line pt-5 text-sm leading-6 text-ink/55">
                    {shoeCount > 0 && <p className="mb-3 font-bold text-coral">{shoeCount} {shoeCount === 1 ? "pair" : "pairs"} in your closet</p>}
                    <p className="font-bold text-ink">Wear what you already own before buying something new.</p>
                    <p className="mt-2">Your closet and photos stay on this device in this version.</p>
                </div>
            </section>
        </main>
    );
}
