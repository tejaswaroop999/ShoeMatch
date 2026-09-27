"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { EmptyState } from "@/components/EmptyState";
import { ShoeCard } from "@/components/ShoeCard";
import { deleteShoe, getShoes } from "@/lib/storage";
import { trackEvent } from "@/lib/analytics";
import { occasions, shoeStyles, type Occasion, type Shoe, type ShoeStyle } from "@/lib/types";

export default function ShoesPage() {
    const [shoes, setShoes] = useState<Shoe[]>([]);
    const [occasionFilter, setOccasionFilter] = useState<Occasion | "All">("All");
    const [styleFilter, setStyleFilter] = useState<ShoeStyle | "All">("All");
    useEffect(() => { const saved = getShoes(); setShoes(saved); trackEvent("closet_viewed", { closetSize: saved.length }); }, []);
    function remove(id: string) { if (window.confirm("Remove this pair from your closet?")) { setShoes(deleteShoe(id)); trackEvent("shoe_deleted", { shoeId: id }); } }
    const visibleShoes = shoes.filter((shoe) => (occasionFilter === "All" || shoe.occasions.includes(occasionFilter)) && (styleFilter === "All" || shoe.style === styleFilter));
    return <main className="app-shell flex min-h-screen flex-col"><AppHeader title="My closet" /><section className="page-padding flex-1 py-8"><div className="mb-8 flex items-end justify-between"><div><p className="eyebrow mb-2">{shoes.length} {shoes.length === 1 ? "pair" : "pairs"}</p><h1 className="font-display text-4xl">Your shoe closet</h1></div><Link href="/shoes/new" aria-label="Add shoe" className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white"><Plus size={20} /></Link></div>{shoes.length ? <><div className="mb-6 space-y-3"><div className="flex gap-2 overflow-x-auto pb-1"><button type="button" onClick={() => setOccasionFilter("All")} className={`pill shrink-0 ${occasionFilter === "All" ? "pill-selected" : ""}`}>All occasions</button>{occasions.map((item) => <button type="button" key={item} onClick={() => setOccasionFilter(item)} className={`pill shrink-0 ${occasionFilter === item ? "pill-selected" : ""}`}>{item}</button>)}</div><div className="flex gap-2 overflow-x-auto pb-1"><button type="button" onClick={() => setStyleFilter("All")} className={`pill shrink-0 ${styleFilter === "All" ? "pill-selected" : ""}`}>All styles</button>{shoeStyles.map((item) => <button type="button" key={item} onClick={() => setStyleFilter(item)} className={`pill shrink-0 ${styleFilter === item ? "pill-selected" : ""}`}>{item}</button>)}</div></div>{visibleShoes.length ? <div className="grid gap-5">{visibleShoes.map((shoe) => <ShoeCard key={shoe.id} shoe={shoe} onDelete={() => remove(shoe.id)} onEdit={() => window.location.assign(`/shoes/${shoe.id}`)} />)}</div> : <p className="rounded-2xl bg-canvas p-5 text-sm text-ink/60">No pairs match those filters.</p>}</> : <EmptyState title="Build your shoe closet" description="Add a few pairs you wear regularly. ShoeMatch will use them when helping you choose. Three pairs is enough to get started." action={<Link href="/shoes/new" className="primary-button">Add my first pair <Plus size={17} /></Link>} />}</section><BottomNav active="shoes" /></main>;
}
