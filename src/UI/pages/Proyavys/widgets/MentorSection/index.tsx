import { FC } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { IMAGES } from "assets/index";
import { CONFIG } from "../../shared/config";
import { C, G } from "../../providers/ThemeProvider";
import { FixedCanvas } from "../../shared/ui/FixedCanvas";

/**
 * Mentor — Figma node 4882:1024 (desktop), node 19:1111 (phone).
 *
 * Desktop: 1344 x 494, radius 50, overflow clip. The blue card inside is
 * 1344 x 384 at y 110.25, radius 40; the cut-out photo overhangs it top and
 * bottom, which is why the section is composed absolutely rather than laid out.
 *
 * Phone: 390 x 658, one blue card at radius 40, the copy at the top and the
 * same cut-out below it, full width and clipped by the card's bottom edge. The
 * type is its own scale — badge 14, name 28, role 13, body 16/1.34 — and the
 * badge is NOT upper-cased there.
 */

const Copy: FC<{ mobile?: boolean }> = ({ mobile = false }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: mobile ? "16px" : "20px",
    }}
  >
    <Box sx={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {/* Badge — node 4882:1038 desktop, node 19:1125 phone */}
      <Box
        sx={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          px: "16px",
          py: "8px",
          borderRadius: "64px",
          bgcolor: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(3.1px)",
          fontFamily: "Manrope",
          fontWeight: mobile ? 400 : 600,
          fontSize: mobile ? 14 : 16,
          lineHeight: mobile ? 1.24 : 1,
          letterSpacing: mobile ? "-0.28px" : "-0.32px",
          textTransform: mobile ? "none" : "uppercase",
          color: C.textWhite,
          whiteSpace: "nowrap",
        }}
      >
        Менторка марафону
      </Box>

      {/* Name + Instagram — node 4882:1040 desktop, node 19:1127 phone */}
      <Box
        sx={{
          display: "flex",
          gap: "6px",
          alignItems: mobile ? "flex-start" : "center",
        }}
      >
        <Box
          component="h2"
          sx={{
            m: 0,
            fontFamily: "Manrope",
            fontWeight: 700,
            fontSize: mobile ? 28 : 42,
            lineHeight: mobile ? 1.24 : 1.2,
            letterSpacing: mobile ? "-0.56px" : "-0.84px",
            color: mobile ? "#FFFFFF" : C.textWhite,
            whiteSpace: "nowrap",
          }}
        >
          {CONFIG.mentor.name}
        </Box>
        <Box
          component="a"
          href={CONFIG.mentor.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram — ${CONFIG.mentor.name}`}
          sx={{
            width: 36,
            height: 36,
            borderRadius: "8px",
            bgcolor: "rgba(255,255,255,0.24)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={IMAGES.iconInstagram}
            alt=""
            sx={{ width: 18, height: 18, display: "block" }}
          />
        </Box>
      </Box>

      {/* Role — node 4882:1044 desktop, node 19:1131 phone */}
      <Box
        component="p"
        sx={{
          m: 0,
          fontFamily: "Manrope",
          fontWeight: 400,
          fontSize: mobile ? 13 : 20,
          lineHeight: mobile ? 1.34 : "24px",
          letterSpacing: mobile ? "-0.26px" : "-0.2px",
          color: mobile ? "#FFFFFF" : "rgba(255,255,255,0.8)",
          width: mobile ? "100%" : 567,
        }}
      >
        Менторка з проявленості та фотографка
      </Box>
    </Box>

    {/* node 4882:1045 desktop, node 19:1149 phone */}
    <Box
      component="p"
      sx={{
        m: 0,
        fontFamily: "Manrope",
        fontWeight: 400,
        fontSize: mobile ? 16 : 18,
        lineHeight: mobile ? 1.34 : 1.2,
        letterSpacing: mobile ? "-0.32px" : "-0.2px",
        color: mobile ? "#FFFFFF" : C.textWhite,
        width: mobile ? "100%" : 567,
      }}
    >
      Понад 7 років у портретній фотографії. Допомагає жінкам сміливіше
      проявляти себе через творчість, контент і власний досвід.
    </Box>

    {/* node 4882:1046 desktop, node 19:1150 phone */}
    <Box
      component="p"
      sx={{
        m: 0,
        fontFamily: "Manrope",
        fontWeight: 400,
        fontSize: mobile ? 16 : 18,
        lineHeight: mobile ? 1.34 : 1.2,
        letterSpacing: mobile ? "-0.32px" : "-0.2px",
        color: mobile ? "#FFFFFF" : C.textWhite,
        width: mobile ? "100%" : 567,
      }}
    >
      Розвиває особистий бренд і досліджує, як говорити про себе без прагнення
      бути «ідеальною». Поєднує фотографію зі знаннями з mindfulness та основ
      психології.
    </Box>
  </Box>
);

export const MentorSection: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    /**
     * Phone frame 19:1111, 390 x 658, full bleed — the frame IS the screen
     * width, so the card carries no page gutter. Copy on top, the same cut-out
     * below it at the frame's own transform, clipped by the card's bottom edge.
     * The band under the copy is reserved in flow, so a narrower screen that
     * wraps a line pushes the copy down and takes the photograph with it.
     */
    return (
      <Box id="mentor" component="section">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "40px",
            background: G.mentorMob,
          }}
        >
          {/* Glow — node 19:1112 */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: "calc(50% + 10.5px)",
              transform: "translateX(-50%)",
              top: 404,
              width: 1011,
              height: 482,
              pointerEvents: "none",
            }}
          >
            <Box
              component="img"
              src={IMAGES.mentorGlow}
              alt=""
              sx={{
                position: "absolute",
                top: "-82.99%",
                left: "-39.56%",
                width: "179.12%",
                height: "265.98%",
                maxWidth: "none",
                display: "block",
              }}
            />
          </Box>

          {/* Rings — node 19:1113, opacity 12% */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: "calc(50% - 12.4px)",
              transform: "translateX(-50%)",
              top: 294,
              width: 683.235,
              height: 847,
              borderRadius: "31.696px",
              overflow: "hidden",
              opacity: 0.12,
              pointerEvents: "none",
            }}
          >
            <Box
              component="img"
              src={IMAGES.mentorRings}
              alt=""
              sx={{
                position: "absolute",
                left: "calc(50% - 1.1px)",
                transform: "translateX(-50%)",
                top: -171.55,
                width: 1081.487,
                height: 1095.488,
                maxWidth: "none",
                display: "block",
              }}
            />
          </Box>

          {/* Copy — node 19:1122, top 26, 349 wide */}
          <Box sx={{ position: "relative", zIndex: 1, pt: "26px", px: "20px" }}>
            <Box sx={{ maxWidth: 349, mx: "auto" }}>
              <Copy mobile />
            </Box>
          </Box>

          {/* 658 minus the 313 the copy ends at. */}
          <Box aria-hidden sx={{ height: 345 }} />

          {/* Photo — node 19:1147 */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              bottom: -39,
              left: "calc(50% - 15.5px)",
              transform: "translateX(-50%)",
              width: 413,
              height: 385,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <Box
              component="img"
              src={IMAGES.mentor}
              alt={CONFIG.mentor.name}
              loading="lazy"
              sx={{
                position: "absolute",
                height: "248.4%",
                left: "-26.22%",
                top: 0,
                width: "173.66%",
                maxWidth: "none",
                display: "block",
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box id="mentor" component="section" sx={{ px: "48px" }}>
      <FixedCanvas width={1344} height={494}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50px",
            overflow: "hidden",
          }}
        >
          {/* Blue card — node 4882:1025 */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 110.25,
              width: 1344,
              height: 384,
              borderRadius: "40px",
              overflow: "hidden",
              background: G.mentor,
            }}
          >
            {/* Rings — node 4882:1026 */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                left: 50,
                top: -153.25,
                width: 674.399,
                height: 1237,
                opacity: 0.12,
              }}
            >
              <Box
                component="img"
                src={IMAGES.mentorRings}
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

            {/* Copy — node 4882:1035 */}
            <Box sx={{ position: "absolute", left: 684, top: 39.63, width: 566 }}>
              <Copy />
            </Box>

            {/* Glow — node 4882:1047 */}
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                left: "calc(50% - 552.5px)",
                transform: "translateX(-50%)",
                top: 106.75,
                width: 1183,
                height: 871,
                pointerEvents: "none",
              }}
            >
              <Box
                component="img"
                src={IMAGES.mentorGlow}
                alt=""
                sx={{
                  position: "absolute",
                  top: "-45.92%",
                  left: "-33.81%",
                  width: "167.62%",
                  height: "191.84%",
                  maxWidth: "none",
                  display: "block",
                }}
              />
            </Box>
          </Box>

          {/* Photo — node 1:414. The updated frame drops it 10px, so the body
              is no longer cut short at the card's bottom edge. */}
          <Box
            sx={{
              position: "absolute",
              bottom: -9,
              left: "calc(50% - 342px)",
              transform: "translateX(-50%)",
              width: 570,
              height: 531,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <Box
              component="img"
              src={IMAGES.mentor}
              alt={CONFIG.mentor.name}
              sx={{
                position: "absolute",
                height: "248.4%",
                left: "-26.22%",
                top: 0,
                width: "173.66%",
                maxWidth: "none",
                display: "block",
              }}
            />
          </Box>
        </Box>
      </FixedCanvas>
    </Box>
  );
};
