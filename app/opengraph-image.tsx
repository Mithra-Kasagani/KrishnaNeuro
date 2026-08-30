import { ImageResponse } from "next/og";

export const alt =
  "Krishna Neuro Psychiatric Centre — compassionate psychiatric care in Vijayawada";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 84px",
          background: "#f5f9fc",
          color: "#10243a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            borderRadius: 999,
            background: "#dceeff",
            right: -120,
            top: -180,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: 999,
            background: "#dff3e7",
            right: 80,
            bottom: -240,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "82%",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 27,
              fontWeight: 700,
              color: "#0F4C81",
            }}
          >
            Krishna Neuro Psychiatric Centre
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 50,
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: -3,
              fontWeight: 800,
            }}
          >
            Recovery is possible.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 32,
              lineHeight: 1.35,
              color: "#426078",
            }}
          >
            Compassionate psychiatric care in Vijayawada.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontSize: 24,
              fontWeight: 700,
              color: "#2E8B57",
            }}
          >
            Dr. Pamarthi Krishna Das • MBBS, MD (Psychiatry)
          </div>
        </div>
      </div>
    ),
    size,
  );
}