import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PanelProps {
  label: string;
  children: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/** A HUD-style panel: dark card, thin gold top rule, corner brackets, uppercase label. */
export function Panel({ label, children, className = "", onMouseEnter, onMouseLeave }: PanelProps) {
  const glow = "hover:shadow-[0_0_24px_-8px_rgba(53,214,232,0.35)]";

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative rounded border border-line-subtle bg-bg-panel/80 backdrop-blur-sm transition-shadow dark:border-line-subtle dark:bg-bg-panel/80 ${glow} ${className}`}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gold" />
      <CornerBrackets />
      <div className="px-4 pb-4 pt-5 sm:px-5">
        <h3 className="mb-3 font-display text-xs uppercase tracking-[0.15em] text-gold">{label}</h3>
        {children}
      </div>
    </motion.section>
  );
}

function CornerBrackets() {
  const style = "absolute h-3 w-3 border-gold";
  return (
    <>
      <span className={`${style} left-0 top-0 border-l border-t`} />
      <span className={`${style} right-0 top-0 border-r border-t`} />
      <span className={`${style} bottom-0 left-0 border-b border-l`} />
      <span className={`${style} bottom-0 right-0 border-b border-r`} />
    </>
  );
}
