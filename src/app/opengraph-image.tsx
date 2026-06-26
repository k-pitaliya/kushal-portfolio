import { ImageResponse } from "next/og";

/**
 * Dynamically generated Open Graph / share image (1200×630), built at the edge
 * so the link preview matches the Aurora × Silicon site — no stale raster asset.
 */
export const alt = "Kushal Pitaliya — VLSI Design Verification Engineer";
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
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#07060e",
          backgroundImage:
            "radial-gradient(900px circle at 10% 18%, rgba(110,91,255,0.45), transparent 45%), radial-gradient(820px circle at 90% 88%, rgba(47,230,184,0.30), transparent 45%), radial-gradient(680px circle at 78% 12%, rgba(255,95,200,0.22), transparent 45%)",
          color: "#f2f0fa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 5,
            color: "#7c6cff",
            textTransform: "uppercase",
          }}
        >
          Design Verification Engineer
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 700,
            lineHeight: 1.02,
            marginTop: 22,
            letterSpacing: -3,
          }}
        >
          Kushal Pitaliya
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#ada8c7",
            marginTop: 30,
            maxWidth: 920,
          }}
        >
          I find bugs in silicon before silicon finds them in production.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            marginTop: 54,
            fontSize: 24,
          }}
        >
          <span style={{ color: "#756f92" }}>SystemVerilog · UVM 1.2 · SVA</span>
          <span style={{ color: "#36e0b0" }}>41 bugs found &amp; fixed</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
