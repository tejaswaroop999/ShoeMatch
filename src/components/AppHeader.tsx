import Link from "next/link";
import { ArrowLeft, Footprints } from "lucide-react";

type AppHeaderProps = { title?: string; back?: string };

export function AppHeader({ title, back }: AppHeaderProps) {
    return (
        <header className="page-padding flex items-center justify-between border-b border-line py-5">
            {back ? <Link href={back} aria-label="Go back" className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white"><ArrowLeft size={18} /></Link> : <Link href="/" className="flex items-center gap-2 text-sm font-bold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper"><Footprints size={16} /></span>ShoeMatch</Link>}
            {title && <p className="text-sm font-bold">{title}</p>}
            <Link href="/" className="eyebrow">ShoeMatch</Link>
        </header>
    );
}
