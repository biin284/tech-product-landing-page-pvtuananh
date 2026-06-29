import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08090b",
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(91,140,255,0.35), transparent 60%)",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#5b8cff",
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, marginTop: 20, textAlign: "center" }}>
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size },
  );
}
