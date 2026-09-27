"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { getLocalMetrics } from "@/lib/metrics";
import { APP_VERSION } from "@/lib/app-config";

export default function DebugPage() {
    const [metrics, setMetrics] = useState<ReturnType<typeof getLocalMetrics> | null>(null);
    useEffect(() => setMetrics(getLocalMetrics()), []);
    if (process.env.NODE_ENV !== "development") return null;
    return <main className="app-shell min-h-screen"><AppHeader title="Debug" back="/" /><section className="page-padding py-8"><p className="eyebrow">Local testing only</p><h1 className="mt-2 font-display text-4xl">MVP metrics</h1><p className="mt-3 text-sm text-ink/55">Version {APP_VERSION}. No data leaves this device.</p><pre className="mt-6 overflow-x-auto rounded-2xl bg-ink p-5 text-xs leading-6 text-paper">{JSON.stringify(metrics, null, 2)}</pre></section></main>;
}
