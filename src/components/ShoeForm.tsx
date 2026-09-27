"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { ImageUploader } from "@/components/ImageUploader";
import { SelectPill } from "@/components/SelectPill";
import { getLastStorageError, saveShoe, updateShoe } from "@/lib/storage";
import { trackEvent } from "@/lib/analytics";
import { occasions, shoeColors, shoeStyles, type Occasion, type Shoe, type ShoeColor, type ShoeStyle } from "@/lib/types";

export function ShoeForm({ existing }: { existing?: Shoe }) {
    const router = useRouter();
    const [image, setImage] = useState(existing?.image ?? "");
    const [name, setName] = useState(existing?.name ?? "");
    const [color, setColor] = useState<ShoeColor>(existing?.color ?? "White");
    const [style, setStyle] = useState<ShoeStyle>(existing?.style ?? "Sneakers");
    const [selectedOccasions, setSelectedOccasions] = useState<Occasion[]>(existing?.occasions ?? ["Everyday"]);
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    function toggleOccasion(occasion: Occasion) { setSelectedOccasions((current) => current.includes(occasion) ? current.filter((item) => item !== occasion) : [...current, occasion]); }
    function submit(event: React.FormEvent) { event.preventDefault(); if (!image || !name.trim() || !selectedOccasions.length) { setError("Add a photo, name, and at least one occasion."); return; } setIsSaving(true); const shoe: Shoe = { id: existing?.id ?? crypto.randomUUID(), image, name: name.trim(), color, style, occasions: selectedOccasions, createdAt: existing?.createdAt ?? new Date().toISOString() }; if (existing) { updateShoe(shoe); trackEvent("shoe_updated", { style, color }); } else { saveShoe(shoe); trackEvent("shoe_added", { style, color }); } const storageError = getLastStorageError(); if (storageError) { setError(storageError); setIsSaving(false); return; } router.push("/shoes"); }
    return <main className="app-shell flex min-h-screen flex-col"><AppHeader title={existing ? "Edit pair" : "Add a pair"} back="/shoes" /><form onSubmit={submit} className="page-padding flex-1 space-y-7 py-8"><div><p className="eyebrow mb-2">{existing ? "Keep it current" : "Start with one pair"}</p><h1 className="font-display text-4xl">{existing ? "Edit your pair" : "Add to your closet"}</h1></div><ImageUploader value={image} onChange={setImage} /><label className="block"><span className="mb-2 block text-sm font-bold">Shoe name</span><input required maxLength={60} value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. White Air Force 1" className="h-12 w-full rounded-2xl border border-line bg-white px-4 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-coral/30" /></label><fieldset><legend className="mb-3 text-sm font-bold">Color</legend><div className="flex flex-wrap gap-2">{shoeColors.map((item) => <SelectPill key={item} label={item} selected={color === item} onClick={() => setColor(item)} />)}</div></fieldset><fieldset><legend className="mb-3 text-sm font-bold">Style</legend><div className="flex flex-wrap gap-2">{shoeStyles.map((item) => <SelectPill key={item} label={item} selected={style === item} onClick={() => setStyle(item)} />)}</div></fieldset><fieldset><legend className="mb-3 text-sm font-bold">When do you wear them?</legend><div className="flex flex-wrap gap-2">{occasions.map((item) => <SelectPill key={item} label={item} selected={selectedOccasions.includes(item)} onClick={() => toggleOccasion(item)} />)}</div></fieldset>{error && <p role="alert" className="field-error">{error}</p>}<button className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={isSaving || !image || !name.trim() || !selectedOccasions.length}>{isSaving ? "Saving..." : existing ? "Save changes" : "Save to my closet"}</button><p className="text-center text-xs leading-5 text-ink/45">Your closet and photos stay on this device.</p></form><BottomNav active="shoes" /></main>;
}
