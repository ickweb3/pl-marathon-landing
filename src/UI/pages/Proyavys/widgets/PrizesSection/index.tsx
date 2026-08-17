import { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import { IMAGES } from "assets/index";
import { ACCENT, C, G, SHADOW } from "../../providers/ThemeProvider";
import { Reveal } from "../../shared/ui/Reveal";

/**
 * "Проявляйся та вигравай" — Figma node 4905:1436.
 * Section: white, radius 32, px 50, column gap 24.
 * Card, node 4905:1443: same construction as the problems card — white,
 * 1px rgba(59,160,255,0.4), radius 30, pt 20 / px 20 / pb 24, gap 18.
 *
 * The third card is not a photo. It is a composed illustration: a blue gradient
 * plate, the ring set at 12%, and the LADIES coin at three sizes and angles.
 * It is rebuilt from its parts rather than flattened to one image.
 */

const CardShell: FC<{
  media: ReactNode;
  chip: string;
  chipWidth: number;
  title: string;
  text: ReactNode;
  delay: number;
}> = ({ media, chip, chipWidth, title, text, delay }) => (
  <Reveal delay={delay} sx={{ flex: "1 0 0", minWidth: 0 }}>
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: { xs: "12px", md: "18px" },
        alignItems: "flex-start",
        bgcolor: "#FFFFFF",
        border: "1px solid rgba(59,160,255,0.4)",
        borderRadius: { xs: "24px", md: "30px" },
        pt: { xs: "14px", md: "20px" },
        px: { xs: "14px", md: "20px" },
        pb: { xs: "18px", md: "24px" },
        filter: SHADOW.card,
      }}
    >
      {media}

      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "auto", md: chipWidth },
          px: "16px",
          py: "6px",
          borderRadius: "46px",
          bgcolor: "rgba(59,160,255,0.05)",
          border: "1px solid rgba(0,66,252,0.31)",
          fontFamily: "Manrope",
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 1.24,
          letterSpacing: "-0.32px",
          color: C.mainMedium,
          whiteSpace: "nowrap",
        }}
      >
        {chip}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
        <Box
          component="h3"
          sx={{
            m: 0,
            fontFamily: "Manrope",
            fontWeight: 800,
            fontSize: { xs: 20, md: 28 },
            lineHeight: 1.24,
            letterSpacing: "-0.4px",
            color: C.textBlack,
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
            fontSize: { xs: 15, md: 20 },
            lineHeight: 1.24,
            letterSpacing: "-0.4px",
            color: C.textBlack,
          }}
        >
          {text}
        </Box>
      </Box>
    </Box>
  </Reveal>
);

/** node 4905:1454 — the LADIES plate. */
const LadiesPlate: FC = () => (
  <Box
    aria-hidden
    sx={{
      position: "relative",
      width: "100%",
      height: 217.5,
      borderRadius: "22px",
      overflow: "hidden",
      background: G.ladiesCard,
      flexShrink: 0,
    }}
  >
    <Box
      sx={{
        position: "absolute",
        left: 30.45,
        top: 55,
        width: 306.545,
        height: 562.273,
        opacity: 0.12,
      }}
    >
      <Box
        component="img"
        src={IMAGES.prizeRings}
        alt=""
        sx={{
          position: "absolute",
          left: "calc(50% - 0.75px)",
          transform: "translateX(-50%)",
          top: -112.25,
          width: 707.636,
          height: 716.798,
          maxWidth: "none",
          display: "block",
        }}
      />
      <Box
        component="img"
        src={IMAGES.ladiesCoin}
        alt=""
        sx={{
          position: "absolute",
          left: 216.55,
          top: 93,
          width: 117,
          height: 117,
          display: "block",
        }}
      />
    </Box>

    <Box
      sx={{
        position: "absolute",
        left: -47,
        top: -49,
        width: 131.691,
        height: 131.691,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ transform: "rotate(25.15deg)", flex: "none" }}>
        <Box
          component="img"
          src={IMAGES.ladiesCoin}
          alt=""
          sx={{ width: 99, height: 99, display: "block" }}
        />
      </Box>
    </Box>

    <Box
      component="img"
      src={IMAGES.ladiesCoin}
      alt=""
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: 25,
        width: 172,
        height: 172,
        display: "block",
      }}
    />
  </Box>
);

export const PrizesSection: FC = () => (
  <Box
    id="prizes"
    component="section"
    sx={{
      bgcolor: "#FFFFFF",
      borderRadius: "32px",
      px: { xs: "16px", md: "50px" },
      py: { xs: "28px", md: 0 },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: { xs: "16px", md: "24px" },
    }}
  >
    {/* Heading — node 4905:1437 */}
    <Reveal sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          gap: "18px",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <Box
          component="span"
          sx={{
            fontFamily: ACCENT,
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: { xs: 30, md: 54 },
            lineHeight: { xs: 1, md: "49.28px" },
            color: C.mainDark,
            whiteSpace: "nowrap",
          }}
        >
          Проявляйся
        </Box>
        <Box
          component="h2"
          sx={{
            m: 0,
            fontFamily: "Manrope",
            fontWeight: 700,
            fontSize: { xs: 26, md: 48 },
            lineHeight: { xs: 1.1, md: 0.92 },
            letterSpacing: "-0.96px",
            color: C.textBlack,
          }}
        >
          та вигравай
        </Box>
      </Box>
    </Reveal>

    {/* Sub — node 4905:1441 */}
    <Reveal delay={60} sx={{ width: "100%" }}>
      <Box
        component="p"
        sx={{
          m: 0,
          mx: "auto",
          maxWidth: 1030,
          fontFamily: "Manrope",
          fontWeight: 400,
          fontSize: 18,
          lineHeight: 1.2,
          color: C.textGrey,
          textAlign: "center",
        }}
      >
        Найактивніші учасниці, які пройдуть шлях марафону, потраплять у лідерборд
        <Box component="br" sx={{ display: { xs: "none", md: "inline" } }} /> і
        отримають додаткові бонуси.
      </Box>
    </Reveal>

    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: "14px", md: "24px" },
        alignItems: "stretch",
        width: "100%",
        maxWidth: 1344,
      }}
    >
      <CardShell
        delay={0}
        chip="1 Місце"
        chipWidth={88}
        title="Консультація або фотосесія"
        text="Переможниця обирає один із двох варіантів — онлайн консультацію з Вікторією або фотосесію у Варшаві."
        media={
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 217.5,
              borderRadius: "20px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={IMAGES.prize1}
              alt=""
              loading="lazy"
              sx={{
                position: "absolute",
                height: "265.82%",
                left: "-0.6%",
                top: "-92.15%",
                width: "103.99%",
                maxWidth: "none",
                display: "block",
              }}
            />
          </Box>
        }
      />

      <CardShell
        delay={90}
        chip="2–4 місця"
        chipWidth={106}
        title="Б'юті-бокси"
        text="Три однакові бокси з доглядовою косметикою — для найактивніших у лідерборді."
        media={
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "620 / 344",
              borderRadius: "20px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={IMAGES.prize2Back}
              alt=""
              loading="lazy"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "bottom",
                opacity: 0.65,
                display: "block",
              }}
            />
            <Box
              component="img"
              src={IMAGES.prize2Front}
              alt=""
              loading="lazy"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "bottom",
                display: "block",
              }}
            />
          </Box>
        }
      />

      <CardShell
        delay={180}
        chip="Усі учасниці"
        chipWidth={124}
        title="50 LADIES"
        text={
          <>
            Кожна, хто пройде марафон і виконає хоча б одне завдання, отримає 50
            LADIES
            <Box component="br" sx={{ display: { xs: "none", md: "inline" } }} />{" "}
            (1 LADIES = 1 гривня)
          </>
        }
        media={<LadiesPlate />}
      />
    </Box>
  </Box>
);
