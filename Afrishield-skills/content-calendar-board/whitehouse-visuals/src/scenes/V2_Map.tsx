import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";

// V2 — LOCATIONS MAP ANIMATION
// Stylized Cameroon outline, 4 pins drop in sequence.

const CAMEROON_PATH =
  "M 300 200 L 380 180 L 460 220 L 520 260 L 560 340 L 600 420 L 620 520 L 640 620 L 620 720 L 560 800 L 480 860 L 400 880 L 340 860 L 280 820 L 240 740 L 220 640 L 220 540 L 240 440 L 260 340 L 280 260 Z";

type PinData = {
  key: string;
  city: string;
  neighborhood: string;
  year: string;
  x: number;
  y: number;
  dropAt: number;
};

const PINS: PinData[] = [
  { key: "akwa", city: "Douala", neighborhood: "Akwa", year: "2005", x: 380, y: 720, dropAt: 8 },
  { key: "bmsdi", city: "Douala", neighborhood: "Bonamoussadi", year: "2008", x: 340, y: 760, dropAt: 22 },
  { key: "bpriso", city: "Douala", neighborhood: "Bonapriso", year: "2012", x: 420, y: 760, dropAt: 36 },
  { key: "yde", city: "Yaoundé", neighborhood: "Dragage", year: "2017", x: 500, y: 620, dropAt: 50 },
];

type PinProps = Omit<PinData, "key"> & { pinKey: string; frame: number };

const Pin: React.FC<PinProps> = ({ x, y, neighborhood, city, year, dropAt, frame }) => {
  const local = frame - dropAt;
  const drop = interpolate(local, [0, 12], [-200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 1.4, 0.5, 1),
  });
  const scale = interpolate(local, [0, 12], [0.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const halo = interpolate(local, [8, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelOpacity = interpolate(local, [10, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <g
      transform={`translate(${x}, ${y + drop}) scale(${scale})`}
      opacity={local < 0 ? 0 : 1}
    >
      <circle r={70} fill={theme.gold} opacity={halo * 0.25} />
      <circle r={40} fill={theme.gold} opacity={halo * 0.4} />
      <path
        d="M0,-50 C-22,-50 -40,-32 -40,-10 C-40,15 -18,35 0,55 C18,35 40,15 40,-10 C40,-32 22,-50 0,-50 Z"
        fill={theme.gold}
        stroke={theme.bg}
        strokeWidth={4}
      />
      <circle cx={0} cy={-12} r={14} fill={theme.bg} />
      <text
        x={0}
        y={90}
        textAnchor="middle"
        fill={theme.ink}
        fontSize={26}
        fontWeight={700}
        opacity={labelOpacity}
      >
        {neighborhood}
      </text>
      <text
        x={0}
        y={118}
        textAnchor="middle"
        fill={theme.goldSoft}
        fontSize={20}
        opacity={labelOpacity}
      >
        {city} · {year}
      </text>
    </g>
  );
};

export const V2_Map: React.FC = () => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const titleOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Interactive.Div
        name="Header"
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          color: theme.inkDim,
          letterSpacing: 8,
          fontSize: 26,
          fontWeight: 500,
          textTransform: "uppercase",
        }}
      >
        White House Restaurant
      </Interactive.Div>
      <svg
        width="900"
        height="1300"
        viewBox="150 100 550 820"
        style={{ overflow: "visible" }}
      >
        <path
          d={CAMEROON_PATH}
          fill={theme.bgSoft}
          stroke={theme.gold}
          strokeWidth={3}
          opacity={0.85}
        />
        {PINS.map((p) => {
          const { key, ...rest } = p;
          return <Pin key={key} {...rest} pinKey={key} frame={frame} />;
        })}
      </svg>
      <Interactive.Div
        name="Footer"
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          textAlign: "center",
          color: theme.gold,
          fontSize: 64,
          fontWeight: 800,
          letterSpacing: -1,
          opacity: titleOpacity,
        }}
      >
        1 brand · 4 locations · 2 cities
      </Interactive.Div>
      <Interactive.Div
        name="Sub"
        style={{
          position: "absolute",
          bottom: 130,
          left: 0,
          right: 0,
          textAlign: "center",
          color: theme.inkDim,
          fontSize: 30,
          opacity: titleOpacity,
        }}
      >
        Founded 1993 · 33 years in business
      </Interactive.Div>
    </AbsoluteFill>
  );
};
