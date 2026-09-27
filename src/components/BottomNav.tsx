import Link from "next/link";
import { House, Plus, Sparkles } from "lucide-react";

export function BottomNav({ active }: { active: "home" | "shoes" | "match" }) {
    const items = [{ href: "/", label: "Home", icon: House, key: "home" }, { href: "/shoes", label: "Closet", icon: Plus, key: "shoes" }, { href: "/match", label: "Match", icon: Sparkles, key: "match" }] as const;
    return <nav className="sticky bottom-0 z-10 mt-auto border-t border-line bg-paper/95 px-5 pb-5 pt-3 backdrop-blur"><div className="flex justify-around">{items.map(({ href, label, icon: Icon, key }) => <Link key={key} href={href} className={`flex min-w-16 flex-col items-center gap-1 text-[11px] font-bold ${active === key ? "text-ink" : "text-ink/40"}`}><Icon size={18} strokeWidth={active === key ? 2.5 : 2} />{label}</Link>)}</div></nav>;
}
