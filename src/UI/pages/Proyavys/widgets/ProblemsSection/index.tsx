import { FC, ReactNode } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { IMAGES } from "assets/index";
import { ACCENT, C, SHADOW } from "../../providers/ThemeProvider";
import { Carousel } from "../../shared/ui/Carousel";
import { Reveal } from "../../shared/ui/Reveal";

/**
 * "Ти хочеш проявлятися…" — Figma node 4882:860 (desktop), node 19:919 (phone).
 *
 * Desktop: px 50, column gap 24, two rows of three cards, row width 1344,
 * card gap 24. Card node 4882:865: white, 1px rgba(59,160,255,0.4), radius 30,
 * pt 20 / px 20 / pb 24, inner gap 18, drop-shadow 0 1.445 1.445 rgba(0,0,0,.08).
 * Media 200 tall, radius 24. Title Manrope ExtraBold 28/1.24, -0.56.
 * Body Manrope Regular 20/1.24, -0.4. Both #151515.
 *
 * Phone: the same six cards on one rail, 290 wide, 12 apart, with the frame's
 * prev/next pair under it. The card tightens — radius 20, pt 14 / px 14 / pb 24,
 * gap 16, media 158, title Bold 18/1.2 -0.36, body Medium 16/1.2 -0.32.
 *
 * Two of the six images are cropped inside their desktop frame; the percentages
 * come from the frame and are reproduced instead of being replaced by
 * object-fit. The phone media has a different aspect (262 x 158 against
 * 392 x 200), so those percentages do not carry: the frame's own phone crop
 * shows the band from 8% to 56% of the fill, which is `cover` at 32%.
 */
type Crop = { top: number; left: number; width: number; height: number };

type Card = {
  image: string;
  title: string;
  text: string;
  crop?: Crop;
};

const CARDS: Card[] = [
  {
    image: IMAGES.problem1,
    title: "Не подобаєшся собі на фото",
    text: "У дзеркалі все добре, а на фото одразу знаходиш, що «не так» — і з десятків кадрів складно обрати хоча б один.",
    crop: { top: -30.16, left: 0.38, width: 100, height: 244.89 },
  },
  {
    image: IMAGES.problem2,
    title: "Губишся перед камерою",
    text: "Не знаєш, як стати, куди подіти руки та куди дивитися. Щойно вмикається камера – з'являється скутість.",
  },
  {
    image: IMAGES.problem3,
    title: "Боїшся бути помітною",
    text: "Є думки та ідеї, якими хочеться ділитися, але з'являється: «Що подумають?», «Кому це потрібно?», «Може, не зараз».",
  },
  {
    image: IMAGES.problem4,
    title: "Не розумієш, що показувати",
    text: "Хочеться створювати фото, відео чи блог, але складно знайти свої теми, сенси та зрозуміти, що транслювати.",
    crop: { top: -4.11, left: -12.12, width: 126.03, height: 137.87 },
  },
  {
    image: IMAGES.problem5,
    title: "Порівнюєш себе з іншими",
    text: "Дивишся на чужі сторінки – і здається, що інші цікавіші, впевненіші, природніші та вже знайшли свій стиль.",
  },
  {
    image: IMAGES.problem6,
    title: "Чекаєш, коли будеш готова",
    text: "Ще трохи впевненості, кращий момент, красивіший кадр – і тоді почнеш. Але цей момент постійно відкладається.",
  },
];

/**
 * On the rail the cards are NOT wrapped in `Reveal`: a card parked off the
 * right edge of the screen never intersects the viewport, so it would sit at
 * opacity 0 until the 1.5s safety timer caught it — and a card that fades in
 * under the swiping thumb reads as a fault.
 */
const CardShell: FC<{ mobile: boolean; index: number; children: ReactNode }> = ({
  mobile,
  index,
  children,
}) =>
  mobile ? (
    <Box sx={{ width: 290, display: "flex" }}>{children}</Box>
  ) : (
    <Reveal delay={(index % 3) * 90} sx={{ flex: "1 0 0", minWidth: 0 }}>
      {children}
    </Reveal>
  );

const ProblemCard: FC<Card & { index: number; mobile?: boolean }> = ({
  image,
  title,
  text,
  crop,
  index,
  mobile = false,
}) => (
  <CardShell mobile={mobile} index={index}>
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: mobile ? "16px" : "18px",
        alignItems: "flex-start",
        bgcolor: "#FFFFFF",
        border: "1px solid rgba(59,160,255,0.4)",
        borderRadius: mobile ? "20px" : "30px",
        pt: mobile ? "14px" : "20px",
        px: mobile ? "14px" : "20px",
        pb: "24px",
        filter: SHADOW.card,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: mobile ? 158 : 200,
          borderRadius: mobile ? "18px" : "24px",
          overflow: "hidden",
          bgcolor: "#FFFFFF",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          sx={
            crop && !mobile
              ? {
                  position: "absolute",
                  top: `${crop.top}%`,
                  left: `${crop.left}%`,
                  width: `${crop.width}%`,
                  height: `${crop.height}%`,
                  maxWidth: "none",
                  display: "block",
                }
              : {
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: mobile ? "50% 32%" : "50% 50%",
                  display: "block",
                }
          }
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: mobile ? "8px" : "10px",
          width: "100%",
        }}
      >
        <Box
          component="h3"
          sx={{
            m: 0,
            width: "100%",
            fontFamily: "Manrope",
            fontWeight: mobile ? 700 : 800,
            fontSize: mobile ? 18 : 28,
            lineHeight: mobile ? 1.2 : 1.24,
            letterSpacing: mobile ? "-0.36px" : "-0.4px",
            color: C.textBlack,
          }}
        >
          {title}
        </Box>
        <Box
          component="p"
          sx={{
            m: 0,
            width: "100%",
            fontFamily: "Manrope",
            fontWeight: mobile ? 500 : 400,
            fontSize: mobile ? 16 : 20,
            lineHeight: mobile ? 1.2 : 1.24,
            letterSpacing: mobile ? "-0.32px" : "-0.4px",
            color: C.textBlack,
          }}
        >
          {text}
        </Box>
      </Box>
    </Box>
  </CardShell>
);

export const ProblemsSection: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      id="problems"
      component="section"
      sx={{
        px: { xs: "16px", md: "50px" },
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "stretch", md: "center" },
        gap: { xs: "20px", md: "24px" },
      }}
    >
      {/* Heading — node 4891:173 desktop, node 19:920 phone. The phone frame
          sets it left, in two blocks 4 apart, and gives the accent its own
          line. */}
      <Reveal sx={{ width: "100%" }}>
        {isMobile ? (
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}
          >
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
              Ти хочеш проявлятися, але щось постійно
            </Box>
            <Box
              component="span"
              sx={{
                fontFamily: ACCENT,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: 38,
                lineHeight: 1.07,
                color: C.mainDark,
              }}
            >
              зупиняє
            </Box>
          </Box>
        ) : (
          <Box
            component="h2"
            sx={{
              m: 0,
              width: "100%",
              textAlign: "center",
              fontFamily: "Manrope",
              fontWeight: 600,
              fontSize: 48,
              lineHeight: 1.15,
              letterSpacing: "-0.96px",
              color: C.textGrey,
            }}
          >
            Ти хочеш проявлятися, але щось
            <br /> постійно
            <Box
              component="span"
              sx={{
                fontFamily: ACCENT,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: 54,
                lineHeight: "49.28px",
                color: C.mainDark,
                ml: "18px",
                whiteSpace: "nowrap",
              }}
            >
              зупиняє
            </Box>
          </Box>
        )}
      </Reveal>

      {isMobile ? (
        <Carousel aria-label="Що зупиняє">
          {CARDS.map((c, i) => (
            <ProblemCard key={c.title} {...c} index={i} mobile />
          ))}
        </Carousel>
      ) : (
        [CARDS.slice(0, 3), CARDS.slice(3, 6)].map((row, r) => (
          <Box
            key={r}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "24px",
              alignItems: "stretch",
              width: "100%",
              maxWidth: 1344,
            }}
          >
            {row.map((c, i) => (
              <ProblemCard key={c.title} {...c} index={r * 3 + i} />
            ))}
          </Box>
        ))
      )}
    </Box>
  );
};
