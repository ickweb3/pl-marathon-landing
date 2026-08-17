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
 * The frame cuts the four icons out of two sprite sheets. Reproduced verbatim,
 * the crop clips the glyph, so each icon is its own alpha-trimmed file here.
 *
 * **That trim is why the icons have their own height.** The frame's holder is
 * 80 tall, but the glyph inside it is not: it sits in the sheet with air around
 * it. An alpha-trimmed file drawn at `height: 80` therefore renders the glyph
 * 80 tall — between 1.35x and 1.70x the size the design shows, worst on the
 * diamond. Measured 2026-08-17 by rendering holders 19:1032 / 19:1038 /
 * 19:1044 / 19:1050 on their own and taking the ink box of each:
 *
 *   compass   59.3 tall, 9.9 from the top of the 80 band
 *   diamond   47.0 tall, 18.0
 *   key       54.0 tall, 14.0
 *   lightning 55.0 tall, 13.0
 *
 * The band stays 80, so the tile height and the 24 gap under it do not move.
 * The same holders serve the phone frame, so one set of numbers covers both.
 */
type Tile = {
  icon: string;
  title: string;
  text: string;
  /** Glyph height in the frame, and its offset inside the 80px band. */
  iconH: number;
  iconTop: number;
};

const ICON_BAND = 80;

const TILES: Tile[] = [
  {
    icon: IMAGES.icon1,
    iconH: 59.3,
    iconTop: 9.9,
    title: "Побачити себе по-новому",
    text: "Дослідиш свої сильні сторони, цінності та сенси — і помітиш у собі те, чого раніше могла зовсім не бачити.",
  },
  {
    icon: IMAGES.icon2,
    iconH: 47,
    iconTop: 18,
    title: "Зрозуміти, що тебе стримує",
    text: "Розберешся зі страхом бути помітною, внутрішнім критиком, порівнянням з іншими та залежністю від чужої оцінки.",
  },
  {
    icon: IMAGES.icon3,
    iconH: 54,
    iconTop: 14,
    title: "Знайти свій спосіб проявлятися",
    text: "Зрозумієш, що хочеш транслювати через фото та відео, і спробуєш себе перед камерою з порадами щодо зйомки.",
  },
  {
    icon: IMAGES.icon4,
    iconH: 55,
    iconTop: 13,
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
  iconH,
  iconTop,
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
      {/* The band is the frame's 80px holder; the glyph keeps its own size and
          seat inside it. */}
      <Box
        sx={{
          height: ICON_BAND,
          width: "100%",
          flexShrink: 0,
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Box
          component="img"
          src={icon}
          alt=""
          aria-hidden
          loading="lazy"
          sx={{
            height: iconH,
            width: "auto",
            mt: `${iconTop}px`,
            display: "block",
            flexShrink: 0,
          }}
        />
      </Box>

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
