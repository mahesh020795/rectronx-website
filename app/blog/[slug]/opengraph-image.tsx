import { ImageResponse } from "next/og";
import { getPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  const title = post?.title ?? "Rectronx Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#0F1C2E",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            backgroundColor: "#2B7FD4",
          }}
        />

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "60px",
              fontWeight: "bold",
              lineHeight: 1.2,
              maxWidth: "960px",
              wordBreak: "break-word",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer: Rectronx label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#2B7FD4",
              borderRadius: "6px",
            }}
          />
          <span
            style={{
              color: "#2B7FD4",
              fontSize: "28px",
              fontWeight: "bold",
              letterSpacing: "0.05em",
            }}
          >
            Rectronx
          </span>
        </div>
      </div>
    ),
    { width: size.width, height: size.height }
  );
}
