import { motion } from "framer-motion";
import { useDisplayMode } from "../hooks/useDisplayMode";

interface EmblemProps {
  size?: number;
  pulsing?: boolean;
}

function hexagonPoints(cx: number, cy: number, r: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 90);
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return points.join(" ");
}

function segmentedRingArcs(cx: number, cy: number, r: number, segments: number): string[] {
  const gap = 6;
  const step = 360 / segments;
  const arcs: string[] = [];
  for (let i = 0; i < segments; i++) {
    const start = (i * step + gap / 2) * (Math.PI / 180);
    const end = ((i + 1) * step - gap / 2) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(start - Math.PI / 2);
    const y1 = cy + r * Math.sin(start - Math.PI / 2);
    const x2 = cx + r * Math.cos(end - Math.PI / 2);
    const y2 = cy + r * Math.sin(end - Math.PI / 2);
    const largeArc = end - start > Math.PI ? 1 : 0;
    arcs.push(`M${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2}`);
  }
  return arcs;
}

/** The original concentric-ring emblem: a rotating segmented cyan ring, a gold ring, and a pulsing hex core. */
export function Emblem({ size = 120, pulsing = false }: EmblemProps) {
  const [mode] = useDisplayMode();
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.38;
  const midR = size * 0.27;
  const hexR = size * 0.16;
  const animated = mode === "enhanced";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Profile emblem">
      <motion.g
        animate={animated ? { rotate: 360 } : {}}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {segmentedRingArcs(cx, cy, outerR, 18).map((d, i) => (
          <path key={i} d={d} stroke="#35D6E8" strokeWidth={size * 0.02} fill="none" />
        ))}
      </motion.g>
      <circle cx={cx} cy={cy} r={midR} fill="none" stroke="#C9A54A" strokeWidth={size * 0.012} opacity={0.9} />
      <motion.g
        animate={
          animated
            ? { opacity: pulsing ? [0.75, 1, 0.75] : [0.85, 1, 0.85], scale: pulsing ? [1, 1.08, 1] : 1 }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: pulsing ? 0.8 : 3, ease: "easeInOut", repeat: Infinity }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <polygon points={hexagonPoints(cx, cy, hexR)} fill="#171B21" stroke="#E8CD7E" strokeWidth={size * 0.012} />
        <polygon points={hexagonPoints(cx, cy, hexR * 0.55)} fill="#35D6E8" opacity={0.18} />
        <circle cx={cx} cy={cy} r={size * 0.02} fill="#E8CD7E" />
      </motion.g>
    </svg>
  );
}
