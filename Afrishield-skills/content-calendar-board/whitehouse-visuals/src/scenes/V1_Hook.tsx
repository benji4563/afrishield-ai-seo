import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// V1 — HOOK SPLIT-SCREEN
// 9:16 vertical. Top half: cold European fine-dining plate.
// Bottom half: vibrant Cameroonian buffet spread. Divider pulled upward.

const EuropeanPlate: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(180deg, #1a1a24 0%, #2a2438 60%, #1a1a24 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: 520,
        height: 520,
        borderRadius: "50%",
        background: "radial-gradient(circle at 50% 40%, #f8f5ee 0%, #d9d2c1 60%, #a89f88 100%)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 120,
          height: 30,
          background: "#c78f4a",
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      />
    </div>
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 60,
        color: "#8a7f6a",
        letterSpacing: 8,
        fontSize: 26,
        fontWeight: 300,
        textTransform: "uppercase",
      }}
    >
      Fine Dining
    </div>
    <div
      style={{
        position: "absolute",
        top: 100,
        left: 60,
        color: "#5a5142",
        fontSize: 18,
        letterSpacing: 4,
      }}
    >
      Douala · European
    </div>
  </div>
);

const CameroonianBuffet: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const zoom = interpolate(frame, [0, 5 * fps], [1.05, 1.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: "#2a0f08",
      }}
    >
      <Img
        src={staticFile("wh/buffet-african.webp")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: zoom,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(90,26,14,0.15) 0%, rgba(90,26,14,0) 30%, rgba(90,26,14,0) 70%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 90,
          right: 60,
          color: theme.gold,
          letterSpacing: 8,
          fontSize: 36,
          fontWeight: 800,
          textTransform: "uppercase",
          textShadow: "0 4px 20px rgba(0,0,0,0.8)",
        }}
      >
        Buffet
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 60,
          color: "#fff8e8",
          fontSize: 24,
          letterSpacing: 4,
          textShadow: "0 4px 12px rgba(0,0,0,0.8)",
        }}
      >
        Douala · Cameroonian
      </div>
    </div>
  );
};

export const V1_Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const dividerY = interpolate(frame, [0, 4 * fps], [height / 2, 90], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleOpacity = interpolate(frame, [1 * fps, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      <Interactive.Div
        name="EuropeanTop"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: dividerY,
          overflow: "hidden",
        }}
      >
        <EuropeanPlate />
      </Interactive.Div>
      <Interactive.Div
        name="CameroonianBottom"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: dividerY,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <CameroonianBuffet frame={frame} fps={fps} />
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: dividerY - 4,
          height: 8,
          background: theme.gold,
          boxShadow: `0 0 40px ${theme.gold}`,
        }}
      />
      <Interactive.Div
        name="HookTitle"
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          bottom: 180,
          color: theme.ink,
          fontSize: 72,
          lineHeight: 1.05,
          fontWeight: 800,
          letterSpacing: -1,
          opacity: titleOpacity,
          textShadow: "0 6px 30px rgba(0,0,0,0.8)",
        }}
      >
        Douala&rsquo;s best restaurant
        <br />
        isn&rsquo;t the French one.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
