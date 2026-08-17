import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

/**
 * Four sections of the frame are absolutely composed, not auto-layout: the
 * hero, the mentor panel, the join panel and the closing CTA. Their fidelity
 * depends on exact pixel offsets, so they are drawn at the Figma width and
 * scaled to whatever the viewport gives.
 *
 * The result is 1:1 with the design at every width above the mobile
 * breakpoint — the same picture, smaller — instead of an approximation that
 * drifts as the browser reflows it.
 *
 * Below `md` the caller renders a stacked layout instead; the frame has no
 * mobile artboard, so there is nothing to be 1:1 with there.
 */
export const FixedCanvas: FC<{
  width: number;
  height: number;
  children: ReactNode;
  /** Never scale above 1 — the design is the maximum size. */
  maxScale?: number;
}> = ({ width, height, children, maxScale = 1 }) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const measure = () => {
      const w = host.clientWidth;
      if (w > 0) setScale(Math.min(maxScale, w / width));
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => ro.disconnect();
  }, [width, maxScale]);

  return (
    <Box
      ref={hostRef}
      sx={{ width: "100%", height: height * scale, overflow: "hidden" }}
    >
      <Box
        sx={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
