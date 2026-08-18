"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export function AnalyticsScripts() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {gaId && !gtmId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}
