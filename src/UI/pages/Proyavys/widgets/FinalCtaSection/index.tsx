import { FC } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { IMAGES } from "assets/index";
import { CONFIG } from "../../shared/config";
import { ACCENT, C, G } from "../../providers/ThemeProvider";
import { CtaButton } from "../../shared/ui/CtaButton";
import { FixedCanvas } from "../../shared/ui/FixedCanvas";

/**
 * Closing CTA — Figma node 4882:1148 (desktop), node 19:1170 (phone).
 *
 * Desktop: 1344 x 471, radius 40. A photo fills the panel; a white gradient
 * scrim covers the left half so the copy reads. The copy is therefore BLACK
 * here, not white — the accent "Проявись —" is #0041F3.
 *
 * Phone: 390 x 768, radius 34, a #D8DBE0 card. The copy is centred at the top
 * and the photograph sits under it, its top edge washed out by the card colour
 * so it has no cut line. The em dash after «Проявись» is gone and the date is
 * not bold — both are the frame's own calls.
 *
 * The phone frame drops «голос» nowhere here, but it does re-break the heading;
 * it runs as one wrapped block instead of the desktop's two fixed lines.
 */

/** The phone copy column, node 19:1183. */
const CopyMob: FC = () => (
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
        {/* node 19:1188 */}
        <Box
          component="span"
          sx={{
            width: "100%",
            fontFamily: ACCENT,
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 64,
            // 64 leading in a 47-high box, centred — see HeroSection.
            lineHeight: "47px",
            color: C.mainDark,
          }}
        >
          Проявись
        </Box>

        {/* node 19:1189 — Golos Text SemiBold in the frame; see HeroSection. */}
        <Box
          component="h2"
          sx={{
            m: 0,
            width: "100%",
            fontFamily: "Manrope",
            fontWeight: 600,
            fontSize: 28,
            lineHeight: 1.04,
            letterSpacing: "-0.56px",
            color: "#000000",
          }}
        >
          Не чекай моменту, коли перестане бути страшно
        </Box>
      </Box>

      {/* node 19:1190 */}
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
          color: C.finalBodyMob,
        }}
      >
        Старт – {CONFIG.startDateLabel}. Сміливість проявлятися починається з
        маленьких дій. За 7 днів ти краще зрозумієш себе, побачиш свої сильні
        сторони та зробиш власний крок до проявлення.
      </Box>
    </Box>

    <CtaButton
      label="Почати безкоштовно"
      href={CONFIG.ctaUrl}
      variant="solidMob"
    />
  </Box>
);

const Copy: FC<{ compact?: boolean }> = ({ compact = false }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: compact ? "28px" : "42px",
      alignItems: "flex-start",
      width: compact ? "100%" : 791,
    }}
  >
    <Box sx={{ display: "flex", flexDirection: "column", gap: "19px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* node 4903:1197 */}
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
            mb: "-2px",
          }}
        >
          <Box
            component="span"
            sx={{
              fontFamily: ACCENT,
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: compact ? 40 : 64,
              lineHeight: compact ? "42px" : "64px",
              color: C.mainDark,
              whiteSpace: "nowrap",
            }}
          >
            Проявись{" "}
            <Box component="span" sx={{ fontStyle: "normal", fontWeight: 400 }}>
              —
            </Box>
          </Box>
          <Box
            component="span"
            sx={{
              fontFamily: "Manrope",
              fontWeight: 700,
              fontSize: compact ? 28 : 48,
              lineHeight: compact ? "32px" : "53px",
              color: "#000000",
            }}
          >
            Не чекай
          </Box>
        </Box>

        {/* node 4903:1200 */}
        <Box
          component="h2"
          sx={{
            m: 0,
            width: compact ? "100%" : 763,
            fontFamily: "Manrope",
            fontWeight: 700,
            fontSize: compact ? 28 : 48,
            lineHeight: compact ? "32px" : "53px",
            color: "#000000",
          }}
        >
          моменту, коли перестане{compact ? " " : <br />}бути страшно
        </Box>
      </Box>

      {/* node 4882:1155 */}
      <Box
        component="p"
        sx={{
          m: 0,
          width: compact ? "100%" : 709,
          fontFamily: "Manrope",
          fontWeight: 400,
          fontSize: compact ? 16 : 20,
          lineHeight: 1.24,
          letterSpacing: "-0.4px",
          opacity: 0.8,
          color: C.textBlack,
        }}
      >
        <Box component="span" sx={{ fontWeight: 700 }}>
          Старт – {CONFIG.startDateLabel}.{" "}
        </Box>
        Сміливість проявлятися починається з маленьких дій.
        <Box component="br" sx={{ display: { xs: "none", md: "inline" } }} /> За
        7 днів ти краще зрозумієш себе, побачиш свої сильні сторони та зробиш
        власний крок до проявлення.
      </Box>
    </Box>

    <CtaButton
      label="Приєднатися безкоштовно"
      href={CONFIG.ctaUrl}
      variant="solid"
    />
  </Box>
);

export const FinalCtaSection: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    /**
     * Phone frame 19:1170, 390 x 768, full bleed. The photograph is back: the
     * frame gives it its own window, and `final-photo.webp` cannot supply it —
     * that file is a render of the desktop node already clipped to 1344 x 471.
     * `final-photo-mob.webp` is cut from the raw fill to the 390 x 563 this
     * frame shows.
     */
    return (
      <Box id="about" component="section">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "34px",
            bgcolor: C.finalBgMob,
          }}
        >
          {/* Copy — node 19:1183, top 37 */}
          <Box sx={{ position: "relative", zIndex: 2, pt: "37px", px: "16px" }}>
            <CopyMob />
          </Box>

          {/* 768 minus the 316 the copy ends at. */}
          <Box aria-hidden sx={{ height: 452 }} />

          {/* Photo — node 19:1205 */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 563,
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <Box
              component="img"
              src={IMAGES.finalPhotoMob}
              alt=""
              loading="lazy"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Scrim — node 19:1207. Anchored to the photograph, not to the
                card, so the fade cannot come away from the edge it hides. */}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 165,
                background: G.finalScrimMob,
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box id="about" component="section" sx={{ px: "48px" }}>
      <FixedCanvas width={1344} height={471}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "40px",
            overflow: "hidden",
            background: G.final,
          }}
        >
          {/* node 4882:1149 */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: "calc(50% + 1793.37px)",
              transform: "translateX(-50%)",
              top: -638,
              width: 3592.739,
              height: 1834.275,
            }}
          >
            <Box
              component="img"
              src={IMAGES.finalEllipse}
              alt=""
              sx={{
                position: "absolute",
                top: "-21.81%",
                left: "-11.13%",
                width: "122.26%",
                height: "143.62%",
                maxWidth: "none",
                display: "block",
              }}
            />
          </Box>

          {/* node 4882:1150 */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: 213.22,
              top: -824.16,
              width: 3135.834,
              height: 3265.842,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ transform: "rotate(-59.46deg)", flex: "none" }}>
              <Box
                component="img"
                src={IMAGES.finalVector}
                alt=""
                sx={{ width: 2521.454, height: 2153.295, display: "block", maxWidth: "none" }}
              />
            </Box>
          </Box>

          {/* Photo — node 1:509, rendered export. Figma clipped it to the
              panel, so it lands at inset 0. */}
          <Box
            component="img"
            src={IMAGES.finalPhoto}
            alt=""
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              width: 1344,
              height: 471,
              display: "block",
            }}
          />

          {/* White scrim — node 4905:1265 */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: -38,
              top: -16,
              width: 1105,
              height: 554,
              background: G.finalScrim,
            }}
          />

          {/* Copy — node 4882:1152 */}
          <Box
            sx={{
              position: "absolute",
              left: 60,
              top: "calc(50% + 0.9px)",
              transform: "translateY(-50%)",
            }}
          >
            <Copy />
          </Box>
        </Box>
      </FixedCanvas>
    </Box>
  );
};
