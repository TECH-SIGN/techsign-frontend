import * as React from "react";
import { cn } from "@techsign/shared";

export interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  strength?: number; // px translate at the edges
  friction?: number; // interpolation factor 0..1
}

// Magnetic: subtle Cuberto-like magnetic hover wrapper.
// Moves its children slightly toward the cursor on hover and smoothly returns on leave.
const Magnetic: React.FC<MagneticProps> = ({
  strength = 18,
  friction = 0.18,
  className,
  children,
  ...props
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const target = React.useRef<HTMLDivElement | null>(null);
  const anim = React.useRef<number>(0);
  const state = React.useRef({ x: 0, y: 0, tx: 0, ty: 0, hovering: false });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    state.current.tx = Math.max(-1, Math.min(1, dx)) * strength;
    state.current.ty = Math.max(-1, Math.min(1, dy)) * strength;
  };

  const onEnter = () => {
    state.current.hovering = true;
    loop();
  };

  const onLeave = () => {
    state.current.hovering = false;
  };

  const loop = () => {
    const child = target.current;
    if (!child) return;
    const s = state.current;
    // ease toward target
    s.x += (s.tx - s.x) * friction;
    s.y += (s.ty - s.y) * friction;
    child.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;

    // continue until close to 0 when not hovering
    const moving = Math.abs(s.x) + Math.abs(s.y) > 0.1 || s.hovering;
    if (moving) anim.current = requestAnimationFrame(loop);
    else {
      child.style.transform = "translate3d(0,0,0)";
      cancelAnimationFrame(anim.current);
    }
  };

  return (
    <div
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-cursor="hover"
      {...props}
    >
      <div ref={target} className="inline-block will-change-transform">
        {children}
      </div>
    </div>
  );
};

export default Magnetic;
