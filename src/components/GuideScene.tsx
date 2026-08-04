import type { SceneVariant } from "@/lib/video-guides";

const BRAND = "#007BFF";
const SOFT = "#E6F0FF";
const INK = "#0B3B77";
const WARN = "#E2574C";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 320 180"
      role="img"
      className="h-full w-full"
      aria-hidden="true"
    >
      <rect width="320" height="180" rx="16" fill={SOFT} />
      {children}
    </svg>
  );
}

function Person({ x = 110, lying = true }: { x?: number; lying?: boolean }) {
  if (!lying) {
    return (
      <g transform={`translate(${x} 60)`}>
        <circle cx="0" cy="0" r="14" fill={INK} />
        <rect x="-12" y="18" width="24" height="46" rx="12" fill={BRAND} />
      </g>
    );
  }
  return (
    <g>
      <rect x={x} y="112" width="96" height="26" rx="13" fill={BRAND} />
      <circle cx={x - 8} cy="125" r="16" fill={INK} />
      <rect x={x + 88} y="118" width="42" height="16" rx="8" fill={BRAND} opacity="0.75" />
    </g>
  );
}

function Ground() {
  return <rect x="24" y="138" width="272" height="6" rx="3" fill="#C7DCFB" />;
}

function Cross({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="guide-pop">
      <circle r="20" fill={WARN} />
      <path d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

export function GuideScene({ variant }: { variant: SceneVariant }) {
  switch (variant) {
    case "clock":
      return (
        <Frame>
          <circle cx="160" cy="86" r="52" fill="#fff" stroke={BRAND} strokeWidth="6" />
          <line x1="160" y1="86" x2="160" y2="52" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <line
            x1="160"
            y1="86"
            x2="160"
            y2="46"
            stroke={BRAND}
            strokeWidth="3"
            strokeLinecap="round"
            className="guide-spin"
            style={{ transformOrigin: "160px 86px" }}
          />
          <circle cx="160" cy="86" r="5" fill={INK} />
          <text x="160" y="160" textAnchor="middle" fill={INK} fontSize="16" fontWeight="700">
            5 minutos = emergencia
          </text>
        </Frame>
      );
    case "clear":
      return (
        <Frame>
          <Ground />
          <Person />
          <g className="guide-slide-out">
            <rect x="228" y="96" width="40" height="40" rx="6" fill="#9DBEEA" />
          </g>
          <g className="guide-slide-out" style={{ animationDelay: "0.4s" }}>
            <circle cx="60" cy="120" r="16" fill="#9DBEEA" />
          </g>
        </Frame>
      );
    case "cushion":
      return (
        <Frame>
          <Ground />
          <rect x="76" y="118" width="46" height="20" rx="10" fill="#9DBEEA" className="guide-breathe" />
          <Person />
        </Frame>
      );
    case "side":
      return (
        <Frame>
          <Ground />
          <g className="guide-roll" style={{ transformOrigin: "160px 125px" }}>
            <Person />
          </g>
          <path
            d="M104 92 q28 -22 56 0"
            stroke={BRAND}
            strokeWidth="4"
            fill="none"
            markerEnd=""
            strokeLinecap="round"
          />
        </Frame>
      );
    case "no-restrain":
      return (
        <Frame>
          <Ground />
          <Person />
          <g className="guide-shake">
            <rect x="126" y="78" width="16" height="34" rx="8" fill="#9DBEEA" />
            <rect x="182" y="78" width="16" height="34" rx="8" fill="#9DBEEA" />
          </g>
          <Cross x={262} y={44} />
        </Frame>
      );
    case "no-mouth":
      return (
        <Frame>
          <Ground />
          <Person />
          <rect x="70" y="86" width="52" height="10" rx="5" fill="#9DBEEA" className="guide-shake" />
          <Cross x={262} y={44} />
        </Frame>
      );
    case "call":
      return (
        <Frame>
          <rect x="126" y="34" width="68" height="112" rx="14" fill="#fff" stroke={BRAND} strokeWidth="5" />
          <rect x="140" y="52" width="40" height="18" rx="4" fill={SOFT} />
          <text x="160" y="104" textAnchor="middle" fill={INK} fontSize="26" fontWeight="800">
            123
          </text>
          <circle cx="160" cy="130" r="8" fill={WARN} className="guide-pulse" />
        </Frame>
      );
    case "street":
      return (
        <Frame>
          <rect x="0" y="96" width="320" height="84" fill="#D9E7FA" />
          <g className="guide-dash">
            <rect x="10" y="134" width="30" height="5" rx="2" fill="#fff" />
            <rect x="70" y="134" width="30" height="5" rx="2" fill="#fff" />
            <rect x="130" y="134" width="30" height="5" rx="2" fill="#fff" />
            <rect x="190" y="134" width="30" height="5" rx="2" fill="#fff" />
            <rect x="250" y="134" width="30" height="5" rx="2" fill="#fff" />
          </g>
          <Person x={120} />
          <Person x={30} lying={false} />
          <g className="guide-pulse">
            <circle cx="272" cy="52" r="16" fill={WARN} />
          </g>
        </Frame>
      );
    case "fever":
      return (
        <Frame>
          <rect x="146" y="30" width="18" height="106" rx="9" fill="#fff" stroke={BRAND} strokeWidth="5" />
          <rect x="151" y="70" width="8" height="60" rx="4" fill={WARN} className="guide-rise" />
          <circle cx="155" cy="140" r="16" fill={WARN} />
          <path
            d="M212 60 q16 20 0 40 q-16 -20 0 -40"
            fill={BRAND}
            opacity="0.4"
            className="guide-breathe"
          />
        </Frame>
      );
    case "recovery":
      return (
        <Frame>
          <Ground />
          <Person x={92} />
          <Person x={250} lying={false} />
          <g className="guide-breathe">
            <rect x="196" y="34" width="88" height="34" rx="14" fill="#fff" />
            <circle cx="220" cy="51" r="4" fill={BRAND} />
            <circle cx="240" cy="51" r="4" fill={BRAND} />
            <circle cx="260" cy="51" r="4" fill={BRAND} />
          </g>
        </Frame>
      );
    case "notes":
      return (
        <Frame>
          <rect x="96" y="26" width="128" height="128" rx="12" fill="#fff" stroke={BRAND} strokeWidth="5" />
          <rect x="116" y="54" width="88" height="8" rx="4" fill="#C7DCFB" />
          <rect x="116" y="78" width="72" height="8" rx="4" fill="#C7DCFB" />
          <rect x="116" y="102" width="88" height="8" rx="4" fill="#C7DCFB" />
          <rect x="116" y="126" width="52" height="8" rx="4" fill={BRAND} className="guide-write" />
        </Frame>
      );
    default:
      return <Frame>{null}</Frame>;
  }
}
