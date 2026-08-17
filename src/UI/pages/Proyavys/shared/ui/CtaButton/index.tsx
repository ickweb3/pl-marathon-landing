import { FC } from "react";
import { Box } from "@mui/material";
import { IMAGES } from "assets/index";
import { C, G } from "../../../providers/ThemeProvider";

/**
 * The frame draws five buttons of the same construction:
 *
 * | variant  | node      | fill                | label   | size    |
 * |----------|-----------|---------------------|---------|---------|
 * | hero     | 4882:791  | white               | #007DF3 | 336x64  |
 * | glass    | 4882:1095 | translucent overlay | #FAFAFA | 416x64  |
 * | solid    | 4905:1267 | #007DF3             | #FAFAFA | 402x64  |
 * | heroMob  | 19:898    | white               | #3BA0FF | 284x54  |
 * | solidMob | 19:1191   | #007DF3             | #FFFFFF | 284x54  |
 *
 * The circle and the arrow are exported SVGs, so they are rendered from the
 * export and never redrawn.
 *
 * The three desktop skins still stretch to the full width below `sm`, because
 * that is where they are used inside stacked sections. The two `Mob` skins keep
 * the phone frame's own 284 x 54 and are never stretched — the frame centres
 * them in the card.
 */
type Variant = "hero" | "glass" | "solid" | "heroMob" | "solidMob";

const SKIN: Record<
  Variant,
  {
    width: number;
    height: number;
    background: string;
    border: string;
    radius: number;
    label: string;
    fontSize: number;
    fontWeight: number;
    circle: string;
    arrow: string;
    circleSize: number;
    circleRight: number;
    arrowSize: number;
    arrowRight: number;
    /** Label offset, exactly as the frame writes it: left calc(50% - Npx). */
    labelOffset: number;
    backdrop?: string;
  }
> = {
  hero: {
    width: 336,
    height: 64,
    background: "#FFFFFF",
    border: "1.03px solid rgba(59,160,255,0.6)",
    radius: 92.687,
    label: C.mainMedium,
    fontSize: 18,
    fontWeight: 500,
    circle: IMAGES.btnCircleWhite,
    arrow: IMAGES.arrowRight,
    circleSize: 52,
    circleRight: 5.67,
    arrowSize: 24.716,
    arrowRight: 19.57,
    labelOffset: 128,
  },
  glass: {
    width: 416,
    height: 64,
    background: G.joinButton,
    border: `1px solid ${C.buttonStroke}`,
    radius: 90,
    label: C.textWhite,
    fontSize: 18,
    fontWeight: 400,
    circle: IMAGES.btnCircleBlue,
    arrow: IMAGES.arrowRightWhite,
    circleSize: 50,
    circleRight: 6,
    arrowSize: 24,
    arrowRight: 19,
    labelOffset: 86,
    backdrop: "blur(14px)",
  },
  solid: {
    width: 402,
    height: 64,
    background: C.mainMedium,
    border: `1px solid ${C.buttonStroke}`,
    radius: 90,
    label: C.textWhite,
    fontSize: 18,
    fontWeight: 400,
    circle: IMAGES.btnCircleFinal,
    arrow: IMAGES.arrowRightFinal,
    circleSize: 50,
    circleRight: 6,
    arrowSize: 24,
    arrowRight: 19,
    labelOffset: 124,
  },
  heroMob: {
    width: 284,
    height: 54,
    background: "#FFFFFF",
    border: `1px solid ${C.buttonStroke}`,
    radius: 90,
    label: C.mainLight,
    fontSize: 16,
    fontWeight: 600,
    circle: IMAGES.btnCircleWhite,
    arrow: IMAGES.arrowRight,
    circleSize: 44,
    circleRight: 3.34,
    arrowSize: 20.854,
    arrowRight: 15.07,
    labelOffset: 97,
  },
  solidMob: {
    width: 284,
    height: 54,
    background: C.mainMedium,
    border: `1px solid ${C.buttonStroke}`,
    radius: 90,
    label: "#FFFFFF",
    fontSize: 16,
    fontWeight: 600,
    circle: IMAGES.btnCircleFinal,
    arrow: IMAGES.arrowRightFinal,
    circleSize: 44,
    circleRight: 3.34,
    arrowSize: 20.854,
    arrowRight: 15.07,
    labelOffset: 87,
  },
};

export const CtaButton: FC<{
  label: string;
  href: string;
  variant: Variant;
}> = ({ label, href, variant }) => {
  const s = SKIN[variant];
  /** A phone skin comes from a phone frame: it keeps its drawn size. */
  const fixed = variant === "heroMob" || variant === "solidMob";

  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        /**
         * Desktop keeps the frame's geometry: the label starts at
         * `50% - labelOffset` and the circle sits `circleRight` from the edge.
         * A flex row with those exact paddings reproduces it at the fixed
         * width, and still behaves when the button goes full width on a phone —
         * which the absolute version did not, the label ran under the arrow.
         */
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        position: "relative",
        height: fixed ? s.height : { xs: 58, md: s.height },
        width: fixed ? s.width : { xs: "100%", sm: s.width },
        maxWidth: fixed ? "100%" : { xs: "none", sm: s.width },
        pl: fixed
          ? `${s.width / 2 - s.labelOffset}px`
          : { xs: "22px", sm: `${s.width / 2 - s.labelOffset}px` },
        pr: fixed ? `${s.circleRight}px` : { xs: "5px", sm: `${s.circleRight}px` },
        borderRadius: `${s.radius}px`,
        background: s.background,
        border: s.border,
        backdropFilter: s.backdrop,
        overflow: "hidden",
        textDecoration: "none",
        transition: "transform .2s ease, filter .2s ease",
        "&:hover": { transform: "translateY(-2px)", filter: "brightness(1.03)" },
        "&:active": { transform: "translateY(0)" },
      }}
    >
      <Box
        component="span"
        sx={{
          fontFamily: "Manrope",
          fontWeight: s.fontWeight,
          fontSize: fixed ? s.fontSize : { xs: 16, md: s.fontSize },
          lineHeight: 1.2,
          letterSpacing: fixed ? "-0.32px" : "-0.36px",
          color: s.label,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Box>

      {/* Circle and arrow are exported artwork; the arrow rides on the circle. */}
      <Box
        sx={{
          position: "relative",
          flexShrink: 0,
          width: fixed ? s.circleSize : { xs: 46, md: s.circleSize },
          height: fixed ? s.circleSize : { xs: 46, md: s.circleSize },
        }}
      >
        <Box
          component="img"
          src={s.circle}
          alt=""
          aria-hidden
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        />
        <Box
          component="img"
          src={s.arrow}
          alt=""
          aria-hidden
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: fixed ? s.arrowSize : { xs: 21, md: s.arrowSize },
            height: fixed ? s.arrowSize : { xs: 21, md: s.arrowSize },
            display: "block",
          }}
        />
      </Box>
    </Box>
  );
};
