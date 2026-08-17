import { FC, ReactNode } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { IMAGES } from "assets/index";
import { ACCENT, C, SHADOW } from "../../providers/ThemeProvider";
import { Carousel } from "../../shared/ui/Carousel";
import { Reveal } from "../../shared/ui/Reveal";

/**
 * "7 днів, щоб краще зрозуміти себе" — Figma node 4882:870 (desktop),
 * node 19:994 (phone).
 *
 * Desktop: white, radius 32, px 50, column gap 24. Tile node 4882:878: 317
 * wide, #FBFBFB, 1px rgba(59,160,255,0.4), radius 24, padding 20, inner gap 24,
 * drop-shadow 0 0 4.85 rgba(0,0,0,.14).
 *
 * Phone: the four tiles on one rail, 280 wide, 12 apart, with the frame's
 * prev/next pair under it. The tile keeps every desktop value except its width
 * — the type does not shrink. The footnote moves ABOVE the rail, which is where
 * the phone frame puts it.
 *
 * The frame cuts the four icons out of two sprite sheets, and its crop window is
 * shorter than the glyph — reproduced verbatim the compass loses 7px top and
 * bottom. Each icon is now its own trimmed file, so it renders whole.
 */
type Tile = { icon: string; title: string; text: string };

const TILES: Tile[] = [
  {
    icon: IMAGES.icon1,
    title: "Побачити себе по-новому",
    text: "Дослідиш свої сильні сторони, цінності та сенси — і помітиш у собі те, чого раніше могла зовсім не бачити.",
  },
  {
    icon: IMAGES.icon2,
    title: "Зрозуміти, що тебе стримує",
    text: "Розберешся зі страхом бути помітною, внутрішнім критиком, порівнянням з іншими та залежністю від чужої оцінки.",
  },
  {
    icon: IMAGES.icon3,
    title: "Знайти свій спосіб проявлятися",
    text: "Зрозумієш, що хочеш транслювати через фото та відео, і спробуєш себе перед камерою з порадами щодо зйомки.",
  },
  {
    icon: IMAGES.icon4,
    title: "Перейти від думок до дії",
    text: "Виконуватимеш практичні завдання та поступово підготуєшся до фінального прояву — власного фото, відео або Reels.",
  },
];

const FOOTNOTE =
  "3 ефіри з Вікторією · практичні завдання · робота в парах · додаткові матеріали";

/** See the note in ProblemsSection: no `Reveal` on a rail card. */
const TileShell: FC<{ mobile: boolean; index: number; children: ReactNode }> = ({
  mobile,
  index,
  children,
}) =>
  mobile ? (
    <Box sx={{ width: 280, display: "flex" }}>{children}</Box>
  ) : (
    <Reveal delay={index * 80} sx={{ width: 317, flexShrink: 0 }}>
      {children}
    </Reveal>
  );

const ProgramTile: FC<Tile & { index: number; mobile: boolean }> = ({
  icon,
  title,
  text,
  index,
  mobile,
}) => (
  <TileShell mobile={mobile} index={index}>
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        alignItems: "flex-start",
        bgcolor: C.tileBg,
        border: "1px solid rgba(59,160,255,0.4)",
        borderRadius: "24px",
        p: "20px",
        filter: SHADOW.tile,
      }}
    >
      <Box
        component="img"
        src={icon}
        alt=""
        aria-hidden
        loading="lazy"
        sx={{ height: 80, width: "auto", display: "block", flexShrink: 0 }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        <Box
          component="h3"
          sx={{
            m: 0,
            fontFamily: "Manrope",
            fontWeight: 700,
            fontSize: 28,
            lineHeight: 1.24,
            letterSpacing: "-0.56px",
            color: C.tileTitle,
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
            lineHeight: 1.34,
            letterSpacing: "-0.32px",
            color: C.textGrey,
          }}
        >
          {text}
        </Box>
      </Box>
    </Box>
  </TileShell>
);

export const ProgramSection: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      id="program"
      component="section"
      sx={{
        bgcolor: "#FFFFFF",
        borderRadius: "32px",
        px: { xs: "16px", md: "50px" },
        py: { xs: "28px", md: 0 },
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "stretch", md: "center" },
        gap: { xs: "20px", md: "24px" },
      }}
    >
      {/* Heading — node 4882:871 desktop, node 19:995 phone */}
      <Reveal sx={{ width: "100%" }}>
        {isMobile ? (
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}
          >
            <Box sx={{ display: "flex", gap: "4px", alignItems: "flex-start" }}>
              <Box
                component="span"
                sx={{
                  fontFamily: ACCENT,
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: 38,
                  lineHeight: "38px",
                  color: C.mainDark,
                  whiteSpace: "nowrap",
                }}
              >
                7 днів,
              </Box>
              <Box
                component="span"
                sx={{
                  fontFamily: "Manrope",
                  fontWeight: 700,
                  fontSize: 34,
                  lineHeight: 1.07,
                  letterSpacing: "-0.68px",
                  color: C.textGrey,
                  whiteSpace: "nowrap",
                }}
              >
                щоб краще
              </Box>
            </Box>
            <Box
              component="h2"
              sx={{
                m: 0,
                width: "100%",
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: 34,
                lineHeight: 1.07,
                letterSpacing: "-0.68px",
                color: C.textGrey,
              }}
            >
              зрозуміти себе
              <br />й почати сміливіше проявлятися
            </Box>
          </Box>
        ) : (
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: "3px", width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "18px",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                textAlign: "center",
              }}
            >
              <Box
                component="span"
                sx={{
                  fontFamily: ACCENT,
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: 54,
                  lineHeight: "49.28px",
                  color: C.mainDark,
                  whiteSpace: "nowrap",
                }}
              >
                7 днів
                <Box component="span" sx={{ fontStyle: "normal" }}>
                  ,
                </Box>
              </Box>
              <Box
                component="h2"
                sx={{
                  m: 0,
                  fontFamily: "Manrope",
                  fontWeight: 700,
                  fontSize: 48,
                  lineHeight: 1.2,
                  letterSpacing: "-0.96px",
                  color: C.textBlack,
                }}
              >
                щоб краще зрозуміти себе
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Manrope",
                fontWeight: 800,
                fontSize: 44,
                lineHeight: "50.16px",
                letterSpacing: "-0.88px",
                color: C.textBlack,
                textAlign: "center",
              }}
            >
              й почати сміливіше проявлятися
            </Box>
          </Box>
        )}
      </Reveal>

      {/* Footnote — node 4915:1473 desktop (under the tiles), node 19:1107
          phone (above the rail, left, 16/1.2). */}
      {isMobile && (
        <Box
          component="p"
          sx={{
            m: 0,
            width: "100%",
            fontFamily: "Manrope",
            fontWeight: 500,
            fontSize: 16,
            lineHeight: 1.2,
            letterSpacing: "-0.32px",
            color: C.textBlack,
          }}
        >
          {FOOTNOTE}
        </Box>
      )}

      {isMobile ? (
        <Carousel aria-label="Що дадуть 7 днів">
          {TILES.map((t, i) => (
            <ProgramTile key={t.title} {...t} index={i} mobile />
          ))}
        </Carousel>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
            alignItems: "stretch",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {TILES.map((t, i) => (
            <ProgramTile key={t.title} {...t} index={i} mobile={false} />
          ))}
        </Box>
      )}

      {!isMobile && (
        <Reveal delay={140} sx={{ width: "100%" }}>
          <Box
            component="p"
            sx={{
              m: 0,
              fontFamily: "Manrope",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.2,
              color: C.textGrey,
              textAlign: "center",
            }}
          >
            {FOOTNOTE}
          </Box>
        </Reveal>
      )}
    </Box>
  );
};
