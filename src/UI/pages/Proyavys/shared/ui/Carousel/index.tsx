import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { IMAGES } from "assets/index";

/**
 * Horizontal card rail with a prev / next pair — the phone layout the designer
 * drew for the problem cards (node 19:919) and the "7 днів" tiles (node 19:994).
 * Both frames lay the cards out in one row wider than the screen and put the
 * two round buttons under it.
 *
 * Nav pair, node 16:229: two 60 x 48 pills, radius 90, 1px rgba(0,0,0,0.2),
 * 10px apart. One arrow glyph, 19.732 x 11.73; the left button is the same
 * glyph turned 180°, which is how the component is built in the file.
 *
 * The rail also drags and snaps, because a phone user swipes before she looks
 * for a button. The buttons move by one card plus the gap.
 */
export const Carousel: FC<{
  /** Gap between cards, in px — 12 in both frames. */
  gap?: number;
  /**
   * Horizontal padding of the section the rail sits in. The rail cancels it and
   * re-applies it inside, so a card can scroll out under the screen edge
   * instead of stopping short of it.
   */
  bleed?: number;
  "aria-label"?: string;
  children: ReactNode;
}> = ({ gap = 12, bleed = 16, children, ...rest }) => {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    sync();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const move = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + gap : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        ref={railRef}
        onScroll={sync}
        sx={{
          display: "flex",
          gap: `${gap}px`,
          alignItems: "stretch",
          mx: `-${bleed}px`,
          px: `${bleed}px`,
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: `${bleed}px`,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
          "& > *": { flexShrink: 0, scrollSnapAlign: "start" },
        }}
        {...rest}
      >
        {children}
      </Box>

      {/* Nav pair — node 16:229 */}
      <Box sx={{ display: "flex", gap: "10px", alignItems: "center", mt: "20px" }}>
        {(
          [
            { dir: -1 as const, label: "Попередня картка", flip: true, off: atStart },
            { dir: 1 as const, label: "Наступна картка", flip: false, off: atEnd },
          ]
        ).map((b) => (
          <Box
            key={b.label}
            component="button"
            type="button"
            aria-label={b.label}
            disabled={b.off}
            onClick={() => move(b.dir)}
            sx={{
              width: 60,
              height: 48,
              p: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "90px",
              border: "1px solid rgba(0,0,0,0.2)",
              background: "transparent",
              cursor: b.off ? "default" : "pointer",
              // The frame draws one state. A button at the end of the rail does
              // nothing, so it says so rather than looking live and refusing.
              opacity: b.off ? 0.35 : 1,
              transition: "opacity .2s ease",
            }}
          >
            <Box
              component="img"
              src={IMAGES.carouselArrow}
              alt=""
              aria-hidden
              sx={{
                width: 19.732,
                height: 11.73,
                display: "block",
                transform: b.flip ? "rotate(180deg)" : "none",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
