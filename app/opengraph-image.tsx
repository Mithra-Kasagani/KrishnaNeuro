import { ImageResponse } from "next/og";

export const alt = "Krishna Neuro Psychiatric Centre — recovery is possible";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#f5f9fc", color: "#10243a", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", width: 560, height: 560, borderRadius: 999, background: "#dceeff", right: -120, top: -180 }} />
      <div style={{ position: "absolute", width: 420, height: 420, borderRadius: 999, background: "#dff3e7", right: 80, bottom: -240 }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "76px 84px", width: "78%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#0F4C81", fontSize: 26, fontWeight: 700 }}>
          <div style={{ width: 58, height: 58, borderRadius: 18, background: "#0F4C81", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>K</div>
          Krishna Neuro Psychiatric Centre
        </div>
        <div style={{ marginTop: 56, fontSize: 72, lineHeight: 1.04, letterSpacing: -3.5, fontWeight: 800 }}>Recovery is possible.</div>
        <div style={{ marginTop: 18, fontSize: 32, lineHeight: 1.35, color: "#426078" }}>Compassionate psychiatric care in Vijayawada.</div>
        <div style={{ marginTop: 46, display: "flex", gap: 14, alignItems: "center", color: "#2E8B57", fontSize: 23, fontWeight: 700 }}>Dr. Pamarthi Krishna Das <span style={{ color: "#8192a1" }}>•</span> MBBS, MD (Psychiatry)</div>
      </div>
    </div>,
    size,
  );
}
