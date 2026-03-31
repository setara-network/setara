import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Setara Network — India's Sovereign Document Blockchain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a2e",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(232, 97, 60, 0.15)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(232, 97, 60, 0.1)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              padding: "8px 20px",
              fontSize: 18,
              color: "#d1d5db",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#E8613C",
              }}
            />
            Permissionless Document Blockchain
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Setara Network
          </div>
          <div
            style={{
              fontSize: 32,
              background: "linear-gradient(to right, #E8613C, #f09070)",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 700,
            }}
          >
            India&apos;s Sovereign Document Blockchain
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#9ca3af",
              textAlign: "center",
              maxWidth: 600,
              marginTop: 8,
            }}
          >
            Zero tokens. Zero complexity. Just trust.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 40,
            color: "#6b7280",
            fontSize: 16,
          }}
        >
          <span>setara.network</span>
          <span>Cosmos SDK</span>
          <span>Open Source</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
