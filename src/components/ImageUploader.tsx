"use client";

import { ImagePlus, LoaderCircle, RefreshCw, X } from "lucide-react";
import { useRef, useState } from "react";

export async function compressImage(file: File): Promise<string> {
    if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
    if (file.size > 10 * 1024 * 1024) throw new Error("That image is too large. Choose one under 10 MB.");
    const source = await createImageBitmap(file);
    const scale = Math.min(1, 1000 / Math.max(source.width, source.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(source.width * scale); canvas.height = Math.round(source.height * scale);
    canvas.getContext("2d")?.drawImage(source, 0, 0, canvas.width, canvas.height);
    source.close();
    return canvas.toDataURL("image/jpeg", 0.78);
}

export function ImageUploader({ value, onChange, label = "Shoe photo" }: { value: string; onChange: (value: string) => void; label?: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    async function handleChange(file?: File) { if (!file) return; setLoading(true); try { setError(""); onChange(await compressImage(file)); } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to read that image."); } finally { setLoading(false); } }
    return <div><span className="mb-2 block text-sm font-bold">{label}</span><div className="relative"><button type="button" onClick={() => inputRef.current?.click()} disabled={loading} className="relative flex aspect-[1.5] w-full items-center justify-center overflow-hidden rounded-3xl border border-dashed border-ink/25 bg-canvas text-ink/50 transition-colors hover:border-ink/50 disabled:cursor-wait disabled:opacity-70">{loading ? <span className="flex flex-col items-center gap-2"><LoaderCircle size={24} className="animate-spin" /><span className="text-xs font-bold">Preparing preview...</span></span> : value ? <img src={value} alt="Selected preview" className="h-full w-full object-cover" /> : <span className="flex flex-col items-center gap-2"><ImagePlus size={24} /><span className="text-xs font-bold">Add a photo</span></span>}</button>{value && !loading && <div className="absolute right-3 top-3 flex gap-2"><button type="button" onClick={() => onChange("")} aria-label="Remove photo" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-sm"><X size={15} /></button><button type="button" onClick={() => inputRef.current?.click()} aria-label="Change photo" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-sm"><RefreshCw size={15} /></button></div>}</div><input ref={inputRef} className="hidden" type="file" accept="image/*" onChange={(event) => { handleChange(event.target.files?.[0]); event.target.value = ""; }} />{error && <p role="alert" className="mt-2 text-xs font-bold text-coral">{error}</p>}<p className="mt-2 text-xs text-ink/45">Resized on this device before saving.</p></div>;
}
