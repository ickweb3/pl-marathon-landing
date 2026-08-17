import { FC } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { IMAGES } from "assets/index";
import {
  CONFIG,
  FOOTER_LEGAL,
  FOOTER_NAV,
  FOOTER_SOCIALS,
} from "../../shared/config";
import { G } from "../../providers/ThemeProvider";
import { FixedCanvas } from "../../shared/ui/FixedCanvas";

/**
 * Footer — Figma node 4903:1202 / 65:3746.
 * Wrapper px 48 / pb 48; card 1344 x 360, radius 38, gradient.
 * Brand column at 48/48 (390 wide), nav at 66.67%+26, socials at 83.33%+7,
 * legal row at y 292 across 1248.
 */
const LINK_SX = {
  fontFamily: "Manrope",
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "20px",
  letterSpacing: "-0.32px",
  color: "#FFFFFF",
  textDecoration: "none",
  background: "transparent",
  border: 0,
  p: 0,
  cursor: "pointer",
  textAlign: "left" as const,
  "&:hover": { opacity: 0.85 },
};

const HEAD_SX = { ...LINK_SX, opacity: 0.44, cursor: "default" };

const goTo = (href: string) => {
  const el = document.querySelector(href);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 110,
    behavior: "smooth",
  });
};

/**
 * An in-page anchor is a button; anything off-site is a real link, so it can be
 * middle-clicked, copied and read by a crawler.
 */
const FooterLink: FC<{ label: string; href: string }> = ({ label, href }) =>
  href.startsWith("#") ? (
    <Box component="button" type="button" onClick={() => goTo(href)} sx={LINK_SX}>
      {label}
    </Box>
  ) : (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={LINK_SX}
    >
      {label}
    </Box>
  );

/** node 4870:9086 / 4870:9091 */
const StoreBadge: FC<{
  icon: string;
  label: string;
  href: string;
  radius: number;
}> = ({ icon, label, href, radius }) => (
  <Box
    component="a"
    href={href || undefined}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      width: 148,
      height: 49,
      px: "12px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      borderRadius: `${radius}px`,
      bgcolor: "#FFFFFF",
      border: "1px solid #BDDFFF",
      backdropFilter: "blur(14px)",
      textDecoration: "none",
      flexShrink: 0,
    }}
  >
    <Box
      component="img"
      src={icon}
      alt=""
      sx={{ width: 24, height: 24, display: "block", flexShrink: 0 }}
    />
    <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Box
        component="span"
        sx={{
          fontFamily: "Manrope",
          fontWeight: 500,
          fontSize: 10,
          lineHeight: "12px",
          color: "rgba(0,0,0,0.6)",
          whiteSpace: "nowrap",
        }}
      >
        Доступно в
      </Box>
      <Box
        component="span"
        sx={{
          fontFamily: "Manrope",
          fontWeight: 700,
          fontSize: 16,
          lineHeight: "16px",
          letterSpacing: "0.15px",
          color: "#000000",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Box>
    </Box>
  </Box>
);

const Brand: FC = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    <Box
      component="img"
      src={IMAGES.logoFooter}
      alt="Перші Леді"
      sx={{ width: 130, height: 65.974, display: "block" }}
    />
    <Box
      component="p"
      sx={{
        m: 0,
        fontFamily: "Manrope",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: "20px",
        letterSpacing: "-0.32px",
        color: "#FFFFFF",
      }}
    >
      Перші Леді — екосистема розвитку
      <Box component="br" sx={{ display: { xs: "none", md: "inline" } }} /> та
      можливостей для українок у світі.
    </Box>
    <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <StoreBadge
        icon={IMAGES.iconAppStore}
        label="App Store"
        href={CONFIG.stores.appStore}
        radius={14}
      />
      <StoreBadge
        icon={IMAGES.iconGooglePlay}
        label="Google Play"
        href={CONFIG.stores.googlePlay}
        radius={12}
      />
    </Box>
  </Box>
);

const Column: FC<{
  title: string;
  items: ReadonlyArray<{ label: string; href: string }>;
  width?: number;
}> = ({ title, items, width }) => (
  <Box
    sx={{ display: "flex", flexDirection: "column", gap: "16px", width }}
  >
    <Box component="span" sx={HEAD_SX}>
      {title}
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {items.map((l) => (
        <FooterLink key={l.label} label={l.label} href={l.href} />
      ))}
    </Box>
  </Box>
);

const LegalRow: FC = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: { xs: "flex-start", md: "center" },
      justifyContent: "space-between",
      gap: { xs: "12px", md: 0 },
      width: "100%",
    }}
  >
    <Box component="span" sx={{ ...LINK_SX, opacity: 0.48, cursor: "default" }}>
      © 2026 Перші Леді. Всі права захищено.
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: "10px", md: "48px" },
        alignItems: { xs: "flex-start", md: "center" },
      }}
    >
      {FOOTER_LEGAL.map((l) => (
        <FooterLink key={l.label} label={l.label} href={l.href} />
      ))}
    </Box>
  </Box>
);

/** node 65:3747-3750 */
const Decor: FC = () => (
  <>
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        bottom: -763.11,
        left: "calc(54.17% - 30.65px)",
        transform: "translateX(-50%)",
        width: 1033.504,
        height: 1033.504,
        mixBlendMode: "screen",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ transform: "rotate(-71.4deg)", flex: "none" }}>
        <Box sx={{ position: "relative", width: 815.85, height: 815.85 }}>
          <Box
            component="img"
            src={IMAGES.footerEllipseA}
            alt=""
            sx={{
              position: "absolute",
              top: "-12.26%",
              left: "-12.26%",
              width: "124.52%",
              height: "124.52%",
              maxWidth: "none",
              display: "block",
            }}
          />
        </Box>
      </Box>
    </Box>

    <Box
      aria-hidden
      sx={{
        position: "absolute",
        left: "calc(4.17% + 21.19px)",
        top: "calc(50% + 835.19px)",
        transform: "translate(-50%, -50%)",
        width: 864.388,
        height: 864.388,
        mixBlendMode: "screen",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ transform: "rotate(46.12deg)", flex: "none" }}>
        <Box sx={{ position: "relative", width: 611.331, height: 611.331 }}>
          <Box
            component="img"
            src={IMAGES.footerEllipseB}
            alt=""
            sx={{
              position: "absolute",
              top: "-16.36%",
              left: "-16.36%",
              width: "132.72%",
              height: "132.72%",
              maxWidth: "none",
              display: "block",
            }}
          />
        </Box>
      </Box>
    </Box>
  </>
);

export const Footer: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <Box component="footer" sx={{ px: "16px", pb: "24px" }}>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "38px",
            background: G.footer,
            // 20, not 28: at 390 the two store badges are 308 wide together and
            // 28 pushes them onto separate rows.
            p: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "26px",
          }}
        >
          <Decor />
          <Box sx={{ position: "relative" }}>
            <Brand />
          </Box>
          <Box sx={{ position: "relative", display: "flex", gap: "32px" }}>
            <Column title="Навігація" items={FOOTER_NAV} />
            <Column title="Ми в соцмережах" items={FOOTER_SOCIALS} />
          </Box>
          <Box sx={{ position: "relative" }}>
            <LegalRow />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box component="footer" sx={{ px: "48px", pb: "48px" }}>
      <FixedCanvas width={1344} height={360}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "38px",
            overflow: "hidden",
            background: G.footer,
          }}
        >
          <Decor />

          <Box sx={{ position: "absolute", left: 48, top: 48, width: 390 }}>
            <Brand />
          </Box>

          <Box sx={{ position: "absolute", left: "calc(66.67% + 26px)", top: 48 }}>
            <Column title="Навігація" items={FOOTER_NAV} width={103} />
          </Box>

          <Box sx={{ position: "absolute", left: "calc(83.33% + 7px)", top: 48 }}>
            <Column title="Ми в соцмережах" items={FOOTER_SOCIALS} />
          </Box>

          <Box sx={{ position: "absolute", left: 48, top: 292, width: 1248 }}>
            <LegalRow />
          </Box>
        </Box>
      </FixedCanvas>
    </Box>
  );
};
