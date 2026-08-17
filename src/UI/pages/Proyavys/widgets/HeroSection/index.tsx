import { FC } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { IMAGES } from "assets/index";
import { CONFIG } from "../../shared/config";
import { ACCENT, C, G } from "../../providers/ThemeProvider";
import { CtaButton } from "../../shared/ui/CtaButton";
import { FixedCanvas } from "../../shared/ui/FixedCanvas";

/**
 * Hero — Figma node 4882:775, 1440 x 740, radius 34.
 * Every offset below is the frame's own value.
 */

/** Like counter, node 4882:815 / 816 / 817. */
const LikeChip: FC<{
  value: string;
  left: number;
  top: number;
  wide?: boolean;
}> = ({ value, left, top, wide = false }) => (
  <Box
    aria-hidden
    sx={{ position: "absolute", left, top, width: wide ? 81 : 73, height: 57 }}
  >
    <Box
      component="img"
      src={wide ? IMAGES.likeBubbleLg : IMAGES.likeBubbleSm}
      alt=""
      sx={{
        position: "absolute",
        inset: 0,
        bottom: wide ? "1.9%" : "2.38%",
        width: "100%",
        display: "block",
      }}
    />
    <Box
      component="img"
      src={IMAGES.heart}
      alt=""
      sx={{
        position: "absolute",
        left: wide ? 50 : 36,
        top: 9,
        width: 27,
        height: 27,
        display: "block",
      }}
    />
    <Box
      component="p"
      sx={{
        position: "absolute",
        left: wide ? 4 : 10,
        top: 12,
        m: 0,
        fontFamily: "Manrope",
        fontWeight: 400,
        fontSize: 17,
        lineHeight: 1.24,
        letterSpacing: "-0.34px",
        color: "#FFFFFF",
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </Box>
  </Box>
);

/**
 * The phone copy column, node 16:866 — 358 wide, centred, its own type scale.
 * It is not the desktop column at a smaller size: the frame drops the full stop
 * after «Проявись», drops «голос» from the paragraph, centres every line and
 * labels the button «Почати безкоштовно».
 */
const HeroCopyMob: FC = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      alignItems: "center",
      width: "100%",
      maxWidth: 358,
      mx: "auto",
      textAlign: "center",
    }}
  >
    {/* Badge — node 16:867 */}
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        px: "16px",
        py: "6px",
        borderRadius: "46px",
        bgcolor: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.35)",
        fontFamily: "Manrope",
        fontWeight: 400,
        fontSize: 13,
        color: C.milk,
      }}
    >
      Безкоштовний онлайн-марафон · старт {CONFIG.startDateLabel}
    </Box>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* node 16:873 */}
        <Box
          component="h1"
          sx={{
            m: 0,
            width: "100%",
            fontFamily: ACCENT,
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 64,
            // The frame sets 64 leading inside a 47-high box, centred — which
            // is a 47px line, not a 64px one. At 64 the gap to the line below
            // comes out 17px wider than drawn.
            lineHeight: "47px",
            color: "#FFFFFF",
          }}
        >
          Проявись
        </Box>

        {/*
         * node 16:871. The frame sets this one line in Golos Text SemiBold —
         * the only place in the file that leaves Manrope, and the variable set
         * names no second family. Manrope SemiBold carries it at the frame's
         * own size, spacing and leading rather than pulling a whole extra
         * webfont onto the critical path for a single line.
         */}
        <Box
          component="p"
          sx={{
            m: 0,
            width: "100%",
            fontFamily: "Manrope",
            fontWeight: 600,
            fontSize: 28,
            lineHeight: 1.04,
            letterSpacing: "-0.56px",
            color: "#FFFFFF",
          }}
        >
          Від страху бути помітною&nbsp;– до сміливості бути собою
        </Box>
      </Box>

      {/* node 16:874 */}
      <Box
        component="p"
        sx={{
          m: 0,
          width: "100%",
          fontFamily: "Manrope",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.34,
          letterSpacing: "-0.28px",
          color: C.heroBodyMob,
        }}
      >
        7 днів практик, щоб краще зрозуміти та побачити себе, пройти через страх
        проявлення та почати сміливіше показувати себе через фото, відео і
        власні сенси.
      </Box>
    </Box>

    <CtaButton
      label="Почати безкоштовно"
      href={CONFIG.ctaUrl}
      variant="heroMob"
    />
  </Box>
);

/** The copy column, node 4882:785. Desktop only. */
const HeroCopy: FC<{ compact?: boolean }> = ({ compact = false }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: compact ? "28px" : "42px",
      alignItems: "flex-start",
      width: compact ? "100%" : 659,
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      {/* Badge — node 4884:1427 */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          px: "16px",
          py: "6px",
          borderRadius: "46px",
          bgcolor: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.35)",
          fontFamily: "Manrope",
          fontWeight: 400,
          fontSize: 13,
          color: C.milk,
          whiteSpace: compact ? "normal" : "nowrap",
        }}
      >
        Безкоштовний онлайн-марафон · старт {CONFIG.startDateLabel}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* "Проявись." — node 4884:1339 */}
        <Box
          component="h1"
          sx={{
            m: 0,
            fontFamily: ACCENT,
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: compact ? 40 : 64,
            lineHeight: compact ? "42px" : "64px",
            color: "#FFFFFF",
            whiteSpace: "nowrap",
          }}
        >
          Проявись.
        </Box>

        {/* node 4882:788 */}
        <Box
          component="p"
          sx={{
            m: 0,
            fontFamily: "Manrope",
            fontWeight: 700,
            fontSize: compact ? 27 : 48,
            lineHeight: compact ? "31px" : "53px",
            letterSpacing: compact ? "-0.5px" : undefined,
            color: "#FFFFFF",
          }}
        >
          Від страху бути помітною&nbsp;–{compact ? " " : <br />}
          до сміливості бути собою
        </Box>
      </Box>

      {/* node 4882:789 */}
      <Box
        component="p"
        sx={{
          m: 0,
          fontFamily: "Manrope",
          fontWeight: 400,
          fontSize: compact ? 16 : 20,
          lineHeight: 1.24,
          letterSpacing: "-0.4px",
          opacity: 0.8,
          color: C.milk,
          width: compact ? "100%" : 661,
        }}
      >
        7 днів практик, щоб краще зрозуміти та побачити себе, пройти через страх
        проявлення та почати сміливіше показувати себе через фото, відео, голос
        і власні сенси.
      </Box>
    </Box>

    <CtaButton
      label="Приєднатися безкоштовно"
      href={CONFIG.ctaUrl}
      variant="hero"
    />
  </Box>
);

export const HeroSection: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    /**
     * Phone frame 16:740, 390 x 981. The frame is absolutely composed, so every
     * decoration below carries its own offset. Each one is anchored to the
     * card's centre rather than its left edge, because a phone is not 390 wide
     * — centre-anchored, the composition holds at 360 and at 430; left-anchored
     * it slides.
     *
     * Type is at the frame's own size and does NOT scale with the viewport: 64
     * is what the designer wants on a phone, not "64 at 390 and 70 at 430".
     * The card is therefore a flow layout with a reserved band for the
     * photograph, not a scaled canvas.
     */
    return (
      <Box
        id="hero"
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "34px",
          background: G.heroMob,
          color: "#FFFFFF",
        }}
      >
        {/* Rings — node 16:849, opacity 12% */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: "calc(50% + 79.2px)",
            transform: "translateX(-50%)",
            top: 511,
            width: 674.399,
            height: 1237,
            opacity: 0.12,
            pointerEvents: "none",
          }}
        >
          <Box
            component="img"
            src={IMAGES.rings}
            alt=""
            sx={{
              position: "absolute",
              left: "calc(50% - 1.65px)",
              transform: "translateX(-50%)",
              top: -246.95,
              width: 1556.8,
              height: 1576.954,
              maxWidth: "none",
              display: "block",
            }}
          />
        </Box>

        {/* Soft arc — node 16:861 */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: "calc(50% + 91.71px)",
            transform: "translateX(-50%)",
            top: 211,
            width: 1155.421,
            height: 1093.774,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Box sx={{ transform: "rotate(-39.21deg)", flex: "none" }}>
            <Box sx={{ position: "relative", width: 1015.279, height: 583.302 }}>
              <Box
                component="img"
                src={IMAGES.heroEllipse}
                alt=""
                sx={{
                  position: "absolute",
                  top: "-41.25%",
                  left: "-23.7%",
                  width: "147.4%",
                  height: "182.5%",
                  maxWidth: "none",
                  display: "block",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Copy — node 16:866, top 103. The bar the fixed header draws sits at
            12..76 of this card, which is exactly what 103 clears. */}
        <Box sx={{ position: "relative", zIndex: 1, pt: "103px", px: "16px" }}>
          <HeroCopyMob />
        </Box>

        {/* The band the portrait occupies: 981 minus the 440 the copy ends at.
            Reserving it in flow keeps the photograph anchored to the bottom
            when a narrower screen wraps a line and pushes the copy down. */}
        <Box aria-hidden sx={{ height: 541 }} />

        {/* Portrait — node 16:865 */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            bottom: -68.79,
            left: "calc(50% + 2.1px)",
            transform: "translateX(-50%)",
            width: 616.192,
            height: 590.79,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Box sx={{ flex: "none", transform: "scaleY(-1) rotate(-179.84deg)" }}>
            <Box
              sx={{
                position: "relative",
                width: 614.596,
                height: 589.125,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={IMAGES.heroPortrait}
                alt=""
                loading="eager"
                sx={{
                  position: "absolute",
                  height: "122.05%",
                  left: "6.13%",
                  top: "-6.57%",
                  width: "87.74%",
                  maxWidth: "none",
                  display: "block",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box id="hero" component="section">
      <FixedCanvas width={1440} height={740}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "34px",
            overflow: "hidden",
            background: G.hero,
          }}
        >
          {/* Concentric rings — node 4882:776, opacity 12% */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: 774,
              top: 68,
              width: 674.399,
              height: 1237,
              opacity: 0.12,
            }}
          >
            <Box
              component="img"
              src={IMAGES.rings}
              alt=""
              sx={{
                position: "absolute",
                left: "calc(50% - 1.65px)",
                transform: "translateX(-50%)",
                top: -246.95,
                width: 1556.8,
                height: 1576.954,
                maxWidth: "none",
                display: "block",
              }}
            />
          </Box>

          {/* Copy — node 4882:785 */}
          <Box
            sx={{
              position: "absolute",
              left: 50,
              top: "calc(50% + 47.5px)",
              transform: "translateY(-50%)",
            }}
          >
            <HeroCopy />
          </Box>

          {/* Soft arc — node 4882:813 */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: "calc(50% + 429.66px)",
              top: -39.14,
              transform: "translateX(-50%)",
              width: 1687.9,
              height: 1597.843,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Box sx={{ transform: "rotate(-39.21deg)", flex: "none" }}>
              <Box sx={{ position: "relative", width: 1483.174, height: 852.118 }}>
                <Box
                  component="img"
                  src={IMAGES.heroEllipse}
                  alt=""
                  sx={{
                    position: "absolute",
                    top: "-28.24%",
                    bottom: "-28.24%",
                    left: "-16.22%",
                    right: "-16.22%",
                    width: "132.44%",
                    height: "156.48%",
                    maxWidth: "none",
                    display: "block",
                  }}
                />
              </Box>
            </Box>
          </Box>

          <LikeChip value="123" left={853} top={180} />

          {/* Portrait — node 1:288 */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: 650,
              top: 101,
              width: 861.21,
              height: 825.707,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Box sx={{ flex: "none", transform: "scaleY(-1) rotate(-179.84deg)" }}>
              <Box
                sx={{
                  position: "relative",
                  width: 858.98,
                  height: 823.381,
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={IMAGES.heroPortrait}
                  alt=""
                  loading="eager"
                  sx={{
                    position: "absolute",
                    height: "122.05%",
                    left: "6.13%",
                    top: "-6.57%",
                    width: "87.74%",
                    maxWidth: "none",
                    display: "block",
                  }}
                />
              </Box>
            </Box>
          </Box>

          <LikeChip value="11 200" left={828} top={637} wide />
          <LikeChip value="100" left={1292} top={584} />
        </Box>
      </FixedCanvas>
    </Box>
  );
};
