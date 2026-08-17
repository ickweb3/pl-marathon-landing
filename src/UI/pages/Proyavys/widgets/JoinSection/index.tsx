import { FC, ReactNode } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { IMAGES } from "assets/index";
import { CONFIG } from "../../shared/config";
import { ACCENT, C, G } from "../../providers/ThemeProvider";
import { CtaButton } from "../../shared/ui/CtaButton";
import { FixedCanvas } from "../../shared/ui/FixedCanvas";

/**
 * "Стартуємо 22 серпня" — Figma node 4882:1062, 1344 x 730, radius 53.
 * Content band 1248 wide, three 400 x 440 cards, gap 24, then the glass button.
 * Each card carries an artwork that bleeds past its padding box, so the cards
 * are composed absolutely exactly as the frame does.
 */

const CardText: FC<{ title: ReactNode; body: string }> = ({ title, body }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      width: "100%",
      position: "relative",
      zIndex: 2,
    }}
  >
    <Box
      component="h3"
      sx={{
        m: 0,
        fontFamily: "Manrope",
        fontWeight: 700,
        fontSize: 20,
        lineHeight: 1.2,
        letterSpacing: "-0.4px",
        color: "#000000",
      }}
    >
      {title}
    </Box>
    <Box
      component="p"
      sx={{
        m: 0,
        fontFamily: "Manrope",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.24,
        letterSpacing: "-0.32px",
        color: C.stepBody,
      }}
    >
      {body}
    </Box>
  </Box>
);

const CARD_SX = {
  position: "relative" as const,
  width: 400,
  height: 440,
  borderRadius: "32px",
  border: "1px solid #FFFFFF",
  bgcolor: "#FFFFFF",
  overflow: "hidden",
  pt: "24px",
  px: "24px",
  pb: "320px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "12px",
  alignItems: "flex-start",
  flexShrink: 0,
};

/**
 * `zoom` frames a window on the artwork instead of fitting the whole of it.
 * Step 2 is a desktop UI capture: shown whole at 280px nothing in it is
 * legible, so the card leans into the part that carries the meaning.
 */
const STEPS_MOBILE = [
  {
    num: IMAGES.num01,
    art: IMAGES.step1,
    title: "Зареєструйся на платформі «Перші Леді»",
    body: "Хвилина на створення акаунта на pershiledy.com — безкоштовно і з телефона.",
  },
  {
    num: IMAGES.num02,
    art: IMAGES.step2Profile,
    zoom: { ratio: "16 / 10", position: "8% 12%", scale: 1.75 },
    title: "Ком'юніті → Клуби → «Проявись»",
    body: "Одразу після реєстрації знайдеш клуб марафону в розділі Ком'юніті.",
  },
  {
    num: IMAGES.num03,
    art: IMAGES.step3,
    title: "Приєднайся і стартуй",
    body: `Натисни «Приєднатися» в клубі — і ${CONFIG.startDateLabel} отримаєш перше завдання.`,
  },
] as const;

export const JoinSection: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const heading = (
    <>
      <Box
        component="span"
        sx={{
          fontFamily: "Manrope",
          fontWeight: 600,
          fontSize: { xs: 26, md: 48 },
          lineHeight: 1,
          letterSpacing: "-0.96px",
          color: "#FFFFFF",
        }}
      >
        Стартуємо
      </Box>
      <Box
        component="span"
        sx={{
          fontFamily: ACCENT,
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: { xs: 30, md: 48 },
          lineHeight: { xs: "32px", md: "49.28px" },
          color: C.textWhite,
        }}
      >
        {CONFIG.startDateLabel}
      </Box>
    </>
  );

  if (isMobile) {
    return (
      <Box id="join" component="section" sx={{ px: { xs: "16px", md: "48px" } }}>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "40px",
            background: G.join,
            px: "20px",
            py: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {heading}
          </Box>

          {STEPS_MOBILE.map((s) => (
            <Box
              key={s.title}
              sx={{
                width: "100%",
                bgcolor: "#FFFFFF",
                borderRadius: "32px",
                p: "24px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <CardText title={s.title} body={s.body} />
              {"zoom" in s && s.zoom ? (
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    mt: "16px",
                    aspectRatio: s.zoom.ratio,
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={s.art}
                    alt=""
                    loading="lazy"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: s.zoom.position,
                      transform: `scale(${s.zoom.scale})`,
                      transformOrigin: s.zoom.position,
                      display: "block",
                    }}
                  />
                </Box>
              ) : (
                <Box
                  component="img"
                  src={s.art}
                  alt=""
                  loading="lazy"
                  sx={{
                    display: "block",
                    width: "100%",
                    mt: "16px",
                    borderRadius: "16px",
                  }}
                />
              )}
              <Box
                component="img"
                src={s.num}
                alt=""
                aria-hidden
                sx={{
                  position: "absolute",
                  left: 20,
                  bottom: 12,
                  height: 70,
                  opacity: 0.9,
                }}
              />
            </Box>
          ))}

          <CtaButton
            label="Почати безкоштовно"
            href={CONFIG.ctaUrl}
            variant="glass"
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box id="join" component="section" sx={{ px: "48px" }}>
      <FixedCanvas width={1344} height={730}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "53px",
            overflow: "hidden",
            background: G.join,
          }}
        >
          {/* Decoration — nodes 4882:1064 … 4882:1069 */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              bottom: 151.29,
              left: "calc(4.17% + 23.36px)",
              transform: "translateX(-50%)",
              width: 1106.712,
              height: 1106.712,
              mixBlendMode: "screen",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ transform: "rotate(-150deg)", flex: "none" }}>
              <Box sx={{ position: "relative", width: 810.169, height: 810.169 }}>
                <Box
                  component="img"
                  src={IMAGES.joinEllipseA}
                  alt=""
                  sx={{
                    position: "absolute",
                    top: "-12.34%",
                    left: "-12.34%",
                    width: "124.68%",
                    height: "124.68%",
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
              bottom: -83.59,
              left: "calc(100% - 0.64px)",
              transform: "translateX(-50%)",
              width: 1106.712,
              height: 1106.712,
              mixBlendMode: "screen",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ transform: "rotate(-150deg)", flex: "none" }}>
              <Box sx={{ position: "relative", width: 810.169, height: 810.169 }}>
                <Box
                  component="img"
                  src={IMAGES.joinEllipseA}
                  alt=""
                  sx={{
                    position: "absolute",
                    top: "-12.34%",
                    left: "-12.34%",
                    width: "124.68%",
                    height: "124.68%",
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
              left: 40.19,
              top: "calc(50% + 634.19px)",
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
                  src={IMAGES.joinEllipseB}
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

          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: "calc(50% - 2px)",
              top: 645,
              width: 24,
              height: 24,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={IMAGES.cursor}
              alt=""
              sx={{
                position: "absolute",
                left: "calc(50% + 0.71px)",
                top: "calc(50% - 0.21px)",
                transform: "translate(-50%, -50%)",
                width: 11.414,
                height: 17.578,
                display: "block",
              }}
            />
          </Box>

          {/* Content — node 4882:1070 */}
          <Box
            sx={{
              position: "absolute",
              left: 50,
              top: "calc(50% - 0.13px)",
              transform: "translateY(-50%)",
              width: 1248,
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "24px",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {heading}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "50px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", gap: "24px", alignItems: "center" }}>
                {/* Step 1 — node 4882:1074 */}
                <Box sx={CARD_SX}>
                  <Box
                    aria-hidden
                    sx={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "32px" }}
                  >
                    <Box
                      component="img"
                      src={IMAGES.step1}
                      alt=""
                      loading="lazy"
                      sx={{
                        position: "absolute",
                        height: "79.09%",
                        left: "-14.84%",
                        top: "20.91%",
                        width: "129.68%",
                        maxWidth: "none",
                        display: "block",
                      }}
                    />
                  </Box>
                  <CardText
                    title={
                      <>
                        Зареєструйся на платформі
                        <br />
                        «Перші Леді»
                      </>
                    }
                    body="Хвилина на створення акаунта на pershiledy.com — безкоштовно і з телефона."
                  />
                  <Box
                    component="img"
                    src={IMAGES.num01}
                    alt=""
                    aria-hidden
                    sx={{
                      position: "absolute",
                      left: 23,
                      top: 260.5,
                      width: 175.328,
                      height: 154.048,
                      display: "block",
                    }}
                  />
                </Box>

                {/* Step 2 — node 4882:1079 */}
                <Box sx={CARD_SX}>
                  <CardText
                    title="Ком'юніті → Клуби → «Проявись»"
                    body="Одразу після реєстрації знайдеш клуб марафону в розділі Ком'юніті."
                  />
                  <Box
                    aria-hidden
                    sx={{
                      position: "absolute",
                      aspectRatio: "799 / 454",
                      bottom: "3.82%",
                      left: "calc(50% + 155.04px)",
                      transform: "translateX(-50%)",
                      top: "33.41%",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={IMAGES.step2Macbook}
                      alt=""
                      loading="lazy"
                      sx={{
                        position: "absolute",
                        height: "172.75%",
                        left: "-24.16%",
                        top: "-36.82%",
                        width: "149.19%",
                        maxWidth: "none",
                        display: "block",
                      }}
                    />
                  </Box>
                  <Box
                    aria-hidden
                    sx={{
                      position: "absolute",
                      left: 188.85,
                      top: 162.51,
                      width: 337.758,
                      height: 219.969,
                      borderTopLeftRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={IMAGES.step2Profile}
                      alt=""
                      loading="lazy"
                      sx={{
                        position: "absolute",
                        height: "151.47%",
                        left: 0,
                        top: "-0.83%",
                        width: "100%",
                        maxWidth: "none",
                        display: "block",
                      }}
                    />
                  </Box>
                  <Box
                    component="img"
                    src={IMAGES.num02}
                    alt=""
                    aria-hidden
                    sx={{
                      position: "absolute",
                      left: 23,
                      top: 260.03,
                      width: 211.272,
                      height: 154.048,
                      display: "block",
                    }}
                  />
                  <Box
                    aria-hidden
                    sx={{
                      position: "absolute",
                      left: 312,
                      top: 304,
                      width: 45.311,
                      height: 45.311,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ transform: "rotate(-14.87deg)", flex: "none" }}>
                      <Box
                        component="img"
                        src={IMAGES.cursorLg}
                        alt=""
                        sx={{ width: 17.619, height: 27.134, display: "block" }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Step 3 — node 4882:1088 */}
                <Box sx={CARD_SX}>
                  <CardText
                    title="Приєднайся і стартуй"
                    body={`Натисни «Приєднатися» в клубі — і ${CONFIG.startDateLabel} отримаєш перше завдання.`}
                  />
                  <Box
                    aria-hidden
                    sx={{
                      position: "absolute",
                      left: 102,
                      top: 90.12,
                      width: 348.576,
                      height: 348.576,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={IMAGES.step3}
                      alt=""
                      loading="lazy"
                      sx={{
                        position: "absolute",
                        left: "-1.32%",
                        top: "1.68%",
                        width: "100.01%",
                        height: "100.01%",
                        maxWidth: "none",
                        display: "block",
                      }}
                    />
                  </Box>
                  <Box
                    component="img"
                    src={IMAGES.num03}
                    alt=""
                    aria-hidden
                    sx={{
                      position: "absolute",
                      right: 168.86,
                      top: 260.03,
                      width: 206.137,
                      height: 154.048,
                      display: "block",
                    }}
                  />
                </Box>
              </Box>

              <CtaButton
                label="Почати безкоштовно"
                href={CONFIG.ctaUrl}
                variant="glass"
              />
            </Box>
          </Box>
        </Box>
      </FixedCanvas>
    </Box>
  );
};
