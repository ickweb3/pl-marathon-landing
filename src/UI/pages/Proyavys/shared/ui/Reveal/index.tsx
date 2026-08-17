import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

/**
 * Scroll entrance: fade plus a 16px rise, once per element.
 *
 * Three guards, because a hidden element that never reveals is a blank page:
 *   1. Anything already inside (or near) the viewport on mount shows at once.
 *   2. The observer pre-fires 200px before the element reaches the viewport.
 *   3. A 1.5s timer shows the element whatever happened.
 *
 * `prefers-reduced-motion` is handled in the theme, which collapses the
 * transition and leaves the element visible.
 */
export const Reveal: FC<{
  children: ReactNode;
  delay?: number;
  sx?: SxProps<Theme>;
}> = ({ children, delay = 0, sx }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setShown(true);
    };

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
      show();
      return;
    }

    const timer = window.setTimeout(show, 1500);

    if (typeof IntersectionObserver === "undefined") {
      show();
      return () => window.clearTimeout(timer);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px 200px 0px", threshold: 0 },
    );
    io.observe(node);

    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(16px)",
        transition:
          "opacity .6s ease, transform .6s cubic-bezier(0.23, 1, 0.32, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
