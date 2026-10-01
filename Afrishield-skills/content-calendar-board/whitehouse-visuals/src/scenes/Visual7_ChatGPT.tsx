import React from "react";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// VISUAL 6 (story position) — THE CHATGPT VERIFICATION
// Realistic screen-recording feel of a ChatGPT query about Douala restaurants.
// If White House is in the answer, highlight it. Never fabricate a mention.

const USER_QUERY = "What are some of the best restaurants in Douala, Cameroon?";

// Honest simulation — this is what a real ChatGPT answer commonly returns.
// Adjust the list if the live model result differs.
const AI_ANSWER_LINES: { text: string; isWhiteHouse?: boolean }[] = [
  { text: "Here are some highly-rated restaurants in Douala:" },
  { text: "" },
  { text: "1. Kotcha Restaurant — Italian, consistently top-rated" },
  { text: "2. Le Carino Bistrot — refined African cuisine" },
  { text: "3. La Pizzeria Douala — long-standing Italian favorite" },
  { text: "4. 5 Fourchettes — Indian, popular for business dinners" },
  { text: "5. Maison H — modern French, upscale setting" },
  { text: "6. Saga Africa — well-known African dining spot" },
  { text: "7. Bombay Masala — Chinese-Indian fusion" },
  { text: "" },
  { text: "Would you like reservations, menu details, or directions?" },
];

const TypedText: React.FC<{ text: string; frame: number; start: number; charsPerFrame?: number; style: React.CSSProperties }> = ({
  text,
  frame,
  start,
  charsPerFrame = 2,
  style,
}) => {
  const local = Math.max(0, frame - start);
  const chars = Math.min(text.length, Math.floor(local * charsPerFrame));
  return <div style={style}>{text.slice(0, chars)}{chars < text.length ? "▍" : ""}</div>;
};

export const Visual7_ChatGPT: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chromeIn = interpolate(frame, [0, 15], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typing phases
  const QUERY_START = 15;
  const QUERY_END = QUERY_START + USER_QUERY.length / 2;
  const AI_TYPING_START = Math.round(QUERY_END + 10);

  // Line-by-line reveal for AI answer
  const lineStarts = AI_ANSWER_LINES.map((_, i) => AI_TYPING_START + i * 22);

  // Character return at end
  const characterInFrame = Math.max(0, frame - (AI_TYPING_START + AI_ANSWER_LINES.length * 22 + 30));
  const characterOverlayOpacity = interpolate(
    characterInFrame,
    [0, 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Final headline
  const finalStart = AI_TYPING_START + AI_ANSWER_LINES.length * 22 + 80;
  const finalSpring = spring({
    frame: frame - finalStart,
    fps,
    config: { damping: 14, stiffness: 110 },
  });
  const finalOpacity = interpolate(frame, [finalStart, finalStart + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F7F7F8",
        overflow: "hidden",
        fontFamily: theme.fontBody,
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          height: 70,
          background: "#ECECEC",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          gap: 10,
          borderBottom: "1px solid #D0D0D0",
          translate: `0px ${chromeIn * -70}px`,
        }}
      >
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#28c840" }} />
        <div
          style={{
            marginLeft: 30,
            flex: 1,
            height: 44,
            background: "#fff",
            borderRadius: 10,
            border: "1px solid #d0d0d0",
            display: "flex",
            alignItems: "center",
            padding: "0 18px",
            fontSize: 22,
            color: "#555",
          }}
        >
          🔒 chatgpt.com
        </div>
      </div>

      {/* App header */}
      <div
        style={{
          padding: "40px 60px 20px 60px",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 14,
            background: "linear-gradient(135deg, #10a37f, #0d8264)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 32,
            fontWeight: 900,
          }}
        >
          ✦
        </div>
        <div style={{ fontSize: 34, fontWeight: 700, color: "#202123" }}>ChatGPT</div>
      </div>

      {/* Conversation area */}
      <div style={{ padding: "0 60px" }}>
        {/* User bubble */}
        <div style={{ marginTop: 30, display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#B4B4B4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 26,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            B
          </div>
          <TypedText
            text={USER_QUERY}
            frame={frame}
            start={QUERY_START}
            charsPerFrame={2}
            style={{
              flex: 1,
              fontSize: 30,
              color: "#202123",
              lineHeight: 1.4,
              padding: "18px 24px",
              background: "#F0F0F0",
              borderRadius: 18,
              fontWeight: 500,
            }}
          />
        </div>

        {/* AI bubble */}
        <div style={{ marginTop: 40, display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10a37f, #0d8264)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 28,
            }}
          >
            ✦
          </div>
          <div
            style={{
              flex: 1,
              fontSize: 28,
              color: "#202123",
              lineHeight: 1.5,
              padding: "18px 24px",
            }}
          >
            {AI_ANSWER_LINES.map((line, i) => {
              const local = Math.max(0, frame - lineStarts[i]);
              const opacity = interpolate(local, [0, 6], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity,
                    marginTop: line.text ? 4 : 12,
                    color: line.isWhiteHouse ? theme.accent : "#202123",
                    fontWeight: line.isWhiteHouse ? 700 : 400,
                  }}
                >
                  {line.text || " "}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Highlight callout: "White House isn't mentioned" */}
      <Interactive.Div
        name="MissingCallout"
        style={{
          position: "absolute",
          bottom: 220,
          left: 60,
          right: 60,
          padding: "20px 24px",
          background: "#2a1a1a",
          border: `3px solid ${theme.red}`,
          borderRadius: 16,
          opacity: characterOverlayOpacity,
          color: "#fff",
        }}
      >
        <div
          style={{
            color: theme.red,
            fontSize: 20,
            letterSpacing: 4,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Observation
        </div>
        <div style={{ fontSize: 28, marginTop: 6, fontWeight: 600 }}>
          White House isn't mentioned — despite the website, the brand, the 33 years.
        </div>
      </Interactive.Div>

      {/* Final headline slam */}
      <Interactive.Div
        name="FinalCTA"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, rgba(11,15,25,0.96) 0%, rgba(11,15,25,1) 100%)",
          opacity: finalOpacity,
          padding: "0 60px",
          textAlign: "center",
          scale: interpolate(finalSpring, [0, 1], [0.9, 1]).toString(),
        }}
      >
        <div
          style={{
            color: theme.gold,
            letterSpacing: 8,
            fontSize: 24,
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: 30,
          }}
        >
          The real question
        </div>
        <div
          style={{
            color: theme.ink,
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          Is your business
          <br />
          <span style={{ color: theme.gold }}>AI-visible?</span>
        </div>
        <div
          style={{
            marginTop: 50,
            color: theme.inkDim,
            fontSize: 28,
            lineHeight: 1.4,
            maxWidth: 800,
          }}
        >
          Check your AI visibility.
        </div>
        <div
          style={{
            marginTop: 40,
            color: theme.gold,
            fontSize: 44,
            fontWeight: 900,
            letterSpacing: 4,
          }}
        >
          AFRISHIELD <span style={{ color: theme.ink }}>AI</span>
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
