import { FC, MouseEvent, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IMAGES } from "assets/index";
import { CONFIG, NAV_LINKS } from "../../shared/config";
import { C } from "../../providers/ThemeProvider";

/**
 * Header — Figma node 4882:799 / 4882:800-810.
 * Bar 1380 x 78, radius 18, 20 from the top, blur 5.1, fill rgba(0,0,0,0.02),
 * stroke rgba(255,255,255,0.2).
 *
 * One deviation from the frame, and it is deliberate: the frame only ever draws
 * the bar over the blue hero. This page scrolls on past white sections, where
 * white-on-white would be unreadable, so once the hero is behind it the bar
 * takes a solid brand fill. Everything else stays as drawn.
 */
export const Header: FC = () => {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("lg"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // On a phone a permanent 78px bar eats the top of every screen and sits over
  // the copy. It hides as she scrolls down and comes back the moment she
  // scrolls up, which is where she looks for it.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.getElementById("hero");
      const h = hero?.offsetHeight ?? 0;
      setScrolled(y > h - 100);

      if (isCompact) {
        const down = y > last;
        // Ignore the rubber band and the first screen.
        if (y > 160 && Math.abs(y - last) > 6) setHidden(down);
      } else {
        setHidden(false);
      }
      last = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isCompact]);

  const go = (href: string) => {
    setAnchorEl(null);
    const el = document.querySelector(href);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        // 20 from the top of the hero panel, which itself starts 24 down.
        // 20 from the top of the hero panel on desktop. The phone frame 16:750
        // draws the bar 12 into a card that itself starts 12 down the page, so
        // it lands at 24 and its 64 height ends exactly where the hero copy
        // starts at 103.
        top: { xs: 24, md: 44 },
        left: "50%",
        transform: hidden
          ? "translateX(-50%) translateY(calc(-100% - 28px))"
          : "translateX(-50%)",
        transition: "transform .28s cubic-bezier(0.23, 1, 0.32, 1), background-color .3s ease",
        width: { xs: "calc(100% - 32px)", md: "min(1380px, calc(100% - 40px))" },
        height: { xs: 64, md: 78 },
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,0.2)",
        backgroundColor: scrolled ? "rgba(0,65,243,0.92)" : "rgba(0,0,0,0.02)",
        backdropFilter: "blur(5.1px)",
        zIndex: 1200,
      }}
    >
      {/* Logo — node 4882:810 */}
      <Box
        component="a"
        href="#hero"
        aria-label="Перші Леді"
        onClick={(e: MouseEvent) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        sx={{
          position: "absolute",
          left: { xs: 16, md: "1.88%" },
          top: "50%",
          transform: "translateY(-50%)",
          display: "block",
        }}
      >
        <Box
          component="img"
          src={IMAGES.logo}
          alt="Перші Леді"
          sx={{
            height: { xs: 36, md: 50.749 },
            width: "auto",
            display: "block",
          }}
        />
      </Box>

      {/* Nav — node 4882:802 */}
      {!isCompact && (
        <Box
          component="nav"
          sx={{
            position: "absolute",
            left: "calc(50% + 0.5px)",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            gap: "30px",
            whiteSpace: "nowrap",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Box
              key={l.href}
              component="button"
              type="button"
              onClick={() => go(l.href)}
              sx={{
                p: 0,
                border: 0,
                background: "transparent",
                cursor: "pointer",
                fontFamily: "Manrope",
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "20px",
                letterSpacing: "-0.32px",
                color: "#FFFFFF",
                "&:hover": { opacity: 0.85 },
              }}
            >
              {l.label}
            </Box>
          ))}
        </Box>
      )}

      {/* Join pill — node 4882:800 desktop, node I16:750;65:3705 phone. The
          phone frame keeps it: pill and burger 12 apart, 9 from the bar's right
          edge, at their own smaller size. */}
      <Box
        component="button"
        type="button"
        onClick={() => go(CONFIG.headerCtaAnchor)}
        sx={{
          cursor: "pointer",
          position: "absolute",
          right: { xs: 53, sm: 29 },
          top: "50%",
          transform: "translateY(-50%)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: "14px", sm: "20px" },
          py: { xs: "10px", sm: "14px" },
          borderRadius: "90px",
          bgcolor: "rgba(244,250,255,0.1)",
          border: "1px solid rgba(244,250,255,0.48)",
          backdropFilter: "blur(10px)",
          fontFamily: "Manrope",
          fontWeight: 600,
          fontSize: { xs: 14, sm: 16 },
          lineHeight: { xs: "18px", sm: "20px" },
          letterSpacing: { xs: "-0.28px", sm: "-0.32px" },
          color: "#F4FAFF",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        Приєднатись
      </Box>

      {isCompact && (
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-label="Меню"
          sx={{
            position: "absolute",
            right: { xs: 9, sm: 100 },
            top: "50%",
            transform: "translateY(-50%)",
            p: { xs: 0, sm: 1 },
            color: "#FFFFFF",
          }}
        >
          <MenuIcon sx={{ fontSize: { xs: 32, sm: 24 } }} />
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { sx: { borderRadius: "18px", mt: 1, minWidth: 240 } } }}
      >
        {NAV_LINKS.map((l) => (
          <MenuItem
            key={l.href}
            onClick={() => go(l.href)}
            sx={{ fontFamily: "Manrope", fontWeight: 600, fontSize: 16 }}
          >
            {l.label}
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => go(CONFIG.headerCtaAnchor)}
          sx={{ fontFamily: "Manrope", fontWeight: 700, color: C.mainDark }}
        >
          Приєднатись
        </MenuItem>
      </Menu>
    </Box>
  );
};
