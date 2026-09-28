/** An angled-corner rect path, the recurring bevelled-plate motif shared with the README panels. */
export function bevelledRectPath(x: number, y: number, w: number, h: number, cut: number): string {
  return [
    `M${x + cut},${y}`,
    `L${x + w - cut},${y}`,
    `L${x + w},${y + cut}`,
    `L${x + w},${y + h - cut}`,
    `L${x + w - cut},${y + h}`,
    `L${x + cut},${y + h}`,
    `L${x},${y + h - cut}`,
    `L${x},${y + cut}`,
    "Z",
  ].join(" ");
}
