"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { getTesterId } from "@/lib/tester";

export function AnalyticsBootstrap() {
    useEffect(() => { trackEvent("app_opened", { testerId: getTesterId() }); }, []);
    return null;
}
