import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// V4 — TRIPADVISOR RANKING ZOOM
// Stylized restaurant list scrolling, highlight lands on #28 White House.

type Row = {
  rank: number;
  name: string;
  cuisine: string;
  rating: number;
  euro?: boolean;
  target?: boolean;
};

const ROWS: Row[] = [
  { rank: 1, name: "Kotcha Restaurant", cuisine: "Italian", rating: 4.8, euro: true },
  { rank: 2, name: "Le Carino Bistrot", cuisine: "African", rating: 4.5 },
  { rank: 3, name: "La Pizzeria Douala", cuisine: "Italian", rating: 4.4, euro: true },
  { rank: 4, name: "5 Fourchettes", cuisine: "Indian", rating: 4.4, euro: true },
  { rank: 5, name: "Maison H", cuisine: "French", rating: 4.3, euro: true },
  { rank: 6, name: "Bombay Masala", cuisine: "Indian", rating: 4.3, euro: true },
  { rank: 7, name: "L'Italien Piccola Venezia", cuisine: "Italian", rating: 4.3, euro: true },
  { rank: 8, name: "Le Bistro Latin", cuisine: "French", rating: 4.2, euro: true },
  { rank: 9, name: "Saga Africa", cuisine: "African", rating: 4.0 },
  { rank: 10, name: "LE BOJ", cuisine: "French", rating: 3.9, euro: true },
  { rank: 11, name: "Le Steack House", cuisine: "French", rating: 3.9, euro: true },
  { rank: 12, name: "La Fourchette", cuisine: "French", rating: 3.9, euro: true },
  { rank: 13, name: "L'Escale", cuisine: "Lebanese", rating: 3.9, euro: true },
  { rank: 14, name: "Beirut Café", cuisine: "Lebanese", rating: 3.8, euro: true },
  { rank: 15, name: "Chez Wou", cuisine: "Chinese", rating: 3.8, euro: true },
  { rank: 16, name: "Sushi Sen", cuisine: "Japanese", rating: 3.8, euro: true },
  { rank: 17, name: "La Villa", cuisine: "French", rating: 3.8, euro: true },
  { rank: 18, name: "Bistro Parisien", cuisine: "French", rating: 3.8, euro: true },
  { rank: 19, name: "Chez Antonio", cuisine: "Italian", rating: 3.7, euro: true },
  { rank: 20, name: "La Casa", cuisine: "Spanish", rating: 3.7, euro: true },
  { rank: 21, name: "Deli Rome", cuisine: "Italian", rating: 3.7, euro: true },
  { rank: 22, name: "Le Bistrot", cuisine: "French", rating: 3.7, euro: true },
  { rank: 23, name: "Palm House", cuisine: "African", rating: 3.7 },
  { rank: 24, name: "Marmara", cuisine: "Turkish", rating: 3.7, euro: true },
  { rank: 25, name: "La Belle Vue", cuisine: "French", rating: 3.7, euro: true },
  { rank: 26, name: "Mount Cameroon Grill", cuisine: "African", rating: 3.7 },
  { rank: 27, name: "Osteria", cuisine: "Italian", rating: 3.7, euro: true },
  { rank: 28, name: "White House", cuisine: "African", rating: 3.7, target: true },
  { rank: 29, name: "Le Grand Café", cuisine: "French", rating: 3.6, euro: true },
  { rank: 30, name: "La Table", cuisine: "French", rating: 3.6, euro: true },
];

const ROW_HEIGHT = 96;

const RowView: React.FC<{ row: Row; frame: number; targetY: number }> = ({ row }) => {
  const bg = row.target ? theme.gold : theme.bgSoft;
  const fg = row.target ? theme.bg : theme.ink;
  const sub = row.target ? theme.bg : theme.inkDim;
  return (
    <div
      style={{
        height: ROW_HEIGHT,
        margin: "0 60px 12px 60px",
        borderRadius: 16,
        background: bg,
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        border: row.target ? `4px solid ${theme.goldSoft}` : "none",
        boxShadow: row.target
          ? `0 20px 60px ${theme.gold}55`
          : "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          fontSize: 40,
          fontWeight: 800,
          color: fg,
          width: 90,
        }}
      >
        #{row.rank}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: fg }}>{row.name}</div>
        <div style={{ fontSize: 22, color: sub, marginTop: 4 }}>
          {row.cuisine} · {row.euro ? "European-cuisine brand" : "African-cuisine brand"}
        </div>
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: row.target ? theme.bg : theme.gold,
        }}
      >
        ★ {row.rating.toFixed(1)}
      </div>
    </div>
  );
};

export const V4_TripAdvisor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const targetIndex = ROWS.findIndex((r) => r.target);
  const scrollTarget = targetIndex * (ROW_HEIGHT + 12) - height / 2 + ROW_HEIGHT / 2 + 240;
  const scroll = interpolate(frame, [0, 5 * fps], [-100, scrollTarget], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });

  const bannerOpacity = interpolate(frame, [5 * fps, 6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          right: 60,
          zIndex: 3,
          background: theme.bgSoft,
          borderRadius: 20,
          padding: "24px 32px",
          border: `2px solid ${theme.gold}44`,
        }}
      >
        <div
          style={{
            color: theme.gold,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          TripAdvisor · Douala
        </div>
        <div style={{ color: theme.ink, fontSize: 44, fontWeight: 800, marginTop: 8 }}>
          Top restaurants in Douala
        </div>
        <div style={{ color: theme.inkDim, fontSize: 24, marginTop: 6 }}>
          208 restaurants ranked
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <div style={{ translate: `0px ${-scroll}px` }}>
          {ROWS.map((row) => (
            <RowView key={row.rank} row={row} frame={frame} targetY={0} />
          ))}
        </div>
      </div>
      <Interactive.Div
        name="Banner"
        style={{
          position: "absolute",
          bottom: 80,
          left: 60,
          right: 60,
          background: theme.gold,
          color: theme.bg,
          borderRadius: 20,
          padding: "36px 40px",
          opacity: bannerOpacity,
          boxShadow: `0 20px 60px ${theme.gold}88`,
          fontSize: 40,
          fontWeight: 800,
          lineHeight: 1.15,
        }}
      >
        The only 4-location African-cuisine brand in the top 30.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
