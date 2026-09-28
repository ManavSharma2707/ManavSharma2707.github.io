import { useEffect, useRef, useState } from "react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { Panel } from "./layout/Panel";
import type { Metrics } from "../types/metrics";

interface NetworkGraphProps {
  login: string;
  projects: Metrics["projects"];
}

interface Node extends SimulationNodeDatum {
  id: string;
  label: string;
  isCenter?: boolean;
  isOwner?: boolean;
}

type Link = SimulationLinkDatum<Node>;

const WIDTH = 360;
const HEIGHT = 220;

export function NetworkGraph({ login, projects }: NetworkGraphProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const dragId = useRef<string | null>(null);

  useEffect(() => {
    const owners = [...new Set(projects.map((p) => p.owner).filter((o) => o !== login))];
    const nodeData: Node[] = [
      { id: login, label: login, isCenter: true, x: WIDTH / 2, y: HEIGHT / 2 },
      ...projects.map((p, i) => ({
        id: p.name,
        label: p.name,
        x: WIDTH / 2 + Math.cos(i) * 60,
        y: HEIGHT / 2 + Math.sin(i) * 60,
      })),
      ...owners.map((o, i) => ({
        id: o,
        label: o,
        isOwner: true,
        x: WIDTH / 2 + 40 * (i + 1),
        y: HEIGHT / 2 - 40,
      })),
    ];
    const linkData: Link[] = [
      ...projects.map((p) => ({ source: login, target: p.name })),
      ...projects.filter((p) => p.owner !== login).map((p) => ({ source: p.owner, target: p.name })),
    ];

    const sim = forceSimulation(nodeData)
      .force("charge", forceManyBody().strength(-220))
      .force(
        "link",
        forceLink<Node, Link>(linkData)
          .id((d) => d.id)
          .distance(100),
      )
      .force("center", forceCenter(WIDTH / 2, HEIGHT / 2))
      .force("collide", forceCollide(48))
      .stop();

    for (let i = 0; i < 300; i++) sim.tick();

    // keep room for each node's label, which sits above it
    const margin = 30;
    for (const n of nodeData) {
      n.x = Math.min(WIDTH - margin, Math.max(margin, n.x ?? WIDTH / 2));
      n.y = Math.min(HEIGHT - margin, Math.max(margin + 14, n.y ?? HEIGHT / 2));
    }

    setNodes([...nodeData]);
    setLinks([...linkData]);
  }, [login, projects]);

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragId.current) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const y = ((e.clientY - rect.top) / rect.height) * HEIGHT;
    setNodes((prev) => prev.map((n) => (n.id === dragId.current ? { ...n, x, y } : n)));
  };

  return (
    <Panel label="Collaboration Network">
      <svg
        className="mx-auto block max-w-xl"
        width="100%"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Collaboration network graph, nodes can be dragged"
        onPointerMove={handlePointerMove}
        onPointerUp={() => (dragId.current = null)}
        onPointerLeave={() => (dragId.current = null)}
      >
        {links.map((link, i) => {
          // after dragging, source/target here are the pre-simulation refs; look up live positions by id instead
          const sourceId = typeof link.source === "object" ? link.source.id : link.source;
          const targetId = typeof link.target === "object" ? link.target.id : link.target;
          const source = nodes.find((n) => n.id === sourceId);
          const target = nodes.find((n) => n.id === targetId);
          if (!source || !target) return null;
          return (
            <line
              key={i}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke="#35D6E8"
              strokeWidth={0.75}
              opacity={0.4}
            />
          );
        })}
        {nodes.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x},${node.y})`}
            onPointerDown={() => (dragId.current = node.id)}
            className="cursor-grab active:cursor-grabbing"
          >
            <circle
              r={node.isCenter ? 8 : node.isOwner ? 6 : 5}
              fill={node.isCenter ? "#C9A54A" : node.isOwner ? "#E8CD7E" : "#35D6E8"}
              opacity={0.9}
            />
            <text
              y={node.isCenter ? -14 : -10}
              textAnchor="middle"
              className="select-none fill-ink-muted font-mono text-[9px]"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </Panel>
  );
}
