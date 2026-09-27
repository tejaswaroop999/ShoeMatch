"use client";

import { useEffect, useState } from "react";
import { ShoeForm } from "@/components/ShoeForm";
import { getShoes } from "@/lib/storage";
import type { Shoe } from "@/lib/types";

export default function EditShoePage({ params }: { params: { id: string } }) {
    const [shoe, setShoe] = useState<Shoe>();
    useEffect(() => setShoe(getShoes().find((item) => item.id === params.id)), [params.id]);
    if (!shoe) return <main className="app-shell flex min-h-screen items-center justify-center p-8 text-center text-sm text-ink/50">That pair could not be found.</main>;
    return <ShoeForm existing={shoe} />;
}
