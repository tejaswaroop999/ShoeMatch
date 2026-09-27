import type { Shoe } from "@/lib/types";

export function RecommendationCard({ shoe, label = "BEST PICK" }: { shoe: Shoe; label?: string }) { return <article className="overflow-hidden rounded-[2rem] border border-line bg-white"><div className="aspect-[1.25] bg-canvas"><img src={shoe.image} alt={shoe.name} className="h-full w-full object-cover" /></div><div className="p-5"><p className="eyebrow">{label}</p><h2 className="mt-2 font-display text-3xl">{shoe.name}</h2><p className="mt-2 text-sm text-ink/55">{shoe.color} · {shoe.style}</p></div></article>; }
