import { Video } from "@remotion/media";
import { AbsoluteFill, Easing, Interactive, interpolate, staticFile, useCurrentFrame } from "remotion";
import { theme } from "../theme";

// Floating VO video window — bottom-right by default.
// Fades in on entry, fades out at the end.
export const VOPip: React.FC<{
  src: string;
  label?: string;
  position?: "bottom-right" | "top-center" | "center";
  width?: number;
}> = ({ src, label, position = "bottom-right", width = 520 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const height = Math.round((width * 9) / 16);
  let x = 1080 - width - 40;
  let y = 1920 - height - 100;
  if (position === "top-center") {
    x = (1080 - width) / 2;
    y = 90;
  } else if (position === "center") {
    x = (1080 - width) / 2;
    y = (1920 - height) / 2;
  }
  return (
    <AbsoluteFill>
      <Interactive.Div
        name="VOWindow"
        style={{
          position: "absolute",
          left: x,
          top: y,
          width,
          height,
          borderRadius: 22,
          overflow: "hidden",
          border: `4px solid ${theme.gold}`,
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          opacity,
          background: "#000",
        }}
      >
        <Video
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {label ? (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 14,
              padding: "4px 12px",
              background: "rgba(0,0,0,0.55)",
              color: theme.gold,
              fontSize: 16,
              letterSpacing: 3,
              textTransform: "uppercase",
              borderRadius: 6,
              fontWeight: 700,
            }}
          >
            {label}
          </div>
        ) : null}
      </Interactive.Div>
    </AbsoluteFill>
  );
};
