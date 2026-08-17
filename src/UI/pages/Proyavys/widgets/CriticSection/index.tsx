import { FC, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { IMAGES } from "assets/index";
import { ACCENT, C, SHADOW } from "../../providers/ThemeProvider";
import { Reveal } from "../../shared/ui/Reveal";

/**
 * "Проявлення починається зсередини" — Figma node 4882:835.
 * px 50, two equal columns, gap 40.
 * Chat card, node 4896:523: 566 x 381, white, 1px #D2E4FF, radius 28,
 * drop-shadow 0 -1px 7.05 rgba(0,0,0,.12).
 */
const LINES = [
  "«Що подумають? Раптом це виглядатиме безглуздо…»",
  "«Кому це потрібно? Таких сторінок і так мільйон.»",
  "«Може, краще не зараз? Почнеш, коли будеш готова.»",
] as const;

/**
 * The critic types, she answers.
 *
 * Requested on the design by the client ("Сделать Анимацию здесь чата"). The
 * three critic lines arrive one at a time, each preceded by a typing bubble,
 * and «Проявись» lands last. It runs once, when the card reaches the viewport.
 *
 * `prefers-reduced-motion` skips straight to the finished conversation — the
 * information is the point, the typing is not.
 */
// The whole exchange has to land inside the few seconds she spends on this
// card while scrolling a phone. Slower than this and she sees an empty chat.
const BEAT = { typing: 620, read: 280 } as const;

const useChatSequence = (steps: number) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setStep(steps);
      return;
    }

    const timers: number[] = [];
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      let t = 300;
      for (let i = 1; i <= steps; i += 1) {
        // Odd step = the typing bubble, even step = the message it becomes.
        t += i % 2 === 1 ? BEAT.read : BEAT.typing;
        timers.push(window.setTimeout(() => setStep(i), t));
      }
    };

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      run();
    } else if (typeof IntersectionObserver !== "undefined") {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            run();
            io.disconnect();
          }
        },
        { rootMargin: "0px 0px -15% 0px", threshold: 0.2 },
      );
      io.observe(node);
      return () => {
        io.disconnect();
        timers.forEach(window.clearTimeout);
      };
    } else {
      run();
    }

    return () => timers.forEach(window.clearTimeout);
  }, [steps]);

  return { ref, step };
};

/**
 * One critic line. The box is always in the flow at its final height, so the
 * card never grows and nothing below it jumps while the critic "types" — the
 * text simply fades in where the dots were.
 */
const CriticBubble: FC<{ text: string; state: "idle" | "typing" | "said" }> = ({
  text,
  state,
}) => (
  <Box
    sx={{
      position: "relative",
      alignSelf: "flex-start",
      maxWidth: "100%",
      bgcolor: C.chatBg,
      px: "16px",
      py: "10px",
      borderRadius: "16px 16px 16px 4px",
      opacity: state === "idle" ? 0 : 1,
      transition: "opacity .28s ease",
    }}
  >
    <Box
      component="span"
      sx={{
        display: "block",
        fontFamily: "Manrope",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 1.4,
        color: C.textDescription,
        opacity: state === "said" ? 1 : 0,
        transition: "opacity .3s ease",
      }}
    >
      {text}
    </Box>

    {/* Dots sit on top of the reserved text, so the height never changes. */}
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        left: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        display: state === "typing" ? "flex" : "none",
        alignItems: "center",
        gap: "5px",
        "& span": {
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: C.chatPlaceholder,
          animation: "plType 1.2s infinite ease-in-out",
        },
        "& span:nth-of-type(2)": { animationDelay: ".15s" },
        "& span:nth-of-type(3)": { animationDelay: ".3s" },
        "@keyframes plType": {
          "0%, 60%, 100%": { opacity: 0.25, transform: "translateY(0)" },
          "30%": { opacity: 1, transform: "translateY(-3px)" },
        },
      }}
    >
      <span />
      <span />
      <span />
    </Box>
  </Box>
);

const ChatCard: FC = () => {
  // 3 messages × (typing, message) + the reply = 7 beats.
  const { ref, step } = useChatSequence(7);
  const shownLines = Math.min(LINES.length, Math.floor(step / 2));
  const isTyping = step % 2 === 1 && step < 7;
  const replyShown = step >= 7;

  return (
  <Box
    ref={ref}
    aria-hidden
    sx={{
      position: "relative",
      width: "100%",
      maxWidth: 566,
      height: { xs: "auto", md: 381 },
      bgcolor: "#FFFFFF",
      border: `1px solid ${C.chatBorder}`,
      borderRadius: "28px",
      filter: SHADOW.chat,
      pb: { xs: "20px", md: 0 },
    }}
  >
    {/* Head + thread — node 4897:1010 */}
    <Box
      sx={{
        position: { xs: "static", md: "absolute" },
        left: 20,
        top: 20,
        width: { xs: "auto", md: 524 },
        m: { xs: "20px", md: 0 },
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "11px",
          alignItems: "center",
          pb: "13px",
          width: "100%",
          borderBottom: `1px solid ${C.chatDivider}`,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "18px",
            bgcolor: C.chatBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Manrope",
            fontWeight: 800,
            fontSize: 14,
            color: C.chatAvatarText,
            flexShrink: 0,
          }}
        >
          ВК
        </Box>
        <Box
          sx={{
            fontFamily: "Manrope",
            fontWeight: 800,
            fontSize: 14,
            color: C.chatName,
          }}
        >
          Внутрішній критик
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: { xs: "100%", md: 401 },
        }}
      >
        {LINES.map((l, i) => (
          <CriticBubble
            key={l}
            text={l}
            state={
              i < shownLines ? "said" : i === shownLines && isTyping ? "typing" : "idle"
            }
          />
        ))}
      </Box>
    </Box>

    {/* "Проявись" — node 4896:536 */}
    <Box
      sx={{
        position: { xs: "static", md: "absolute" },
        right: 20,
        bottom: 94,
        width: { xs: "auto", md: 236.59 },
        mx: { xs: "20px", md: 0 },
        mt: { xs: "12px", md: 0 },
        bgcolor: C.mainDark,
        px: "18px",
        pt: "6px",
        pb: "10px",
        borderRadius: "16px 16px 4px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "flex-end", md: "flex-start" },
        fontFamily: ACCENT,
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 24,
        lineHeight: "99.695%",
        color: "#FFFFFF",
        opacity: replyShown ? 1 : 0,
        transform: replyShown ? "none" : "translateY(8px) scale(0.97)",
        transition:
          "opacity .34s ease, transform .34s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      Проявись
    </Box>

    {/* Input — node 4896:538 */}
    <Box
      sx={{
        position: { xs: "static", md: "absolute" },
        left: 20,
        right: 20,
        bottom: 20,
        m: { xs: "12px 20px 0", md: 0 },
        display: "flex",
        alignItems: "center",
        gap: "10px",
        pl: "18px",
        pr: "8px",
        py: "8px",
        border: `1px solid ${C.chatInputBorder}`,
        borderRadius: "999px",
      }}
    >
      <Box
        sx={{
          flex: "1 0 0",
          minWidth: 0,
          fontFamily: "Manrope",
          fontWeight: 600,
          fontSize: 13,
          color: C.chatPlaceholder,
        }}
      >
        Напиши відповідь…
      </Box>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "18px",
          bgcolor: C.mainDark,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={IMAGES.chatSend}
          alt=""
          sx={{ width: 16, height: 16, display: "block" }}
        />
      </Box>
    </Box>
  </Box>
  );
};

export const CriticSection: FC = () => (
  <Box
    component="section"
    sx={{
      px: { xs: "16px", md: "50px" },
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: { xs: "28px", md: "40px" },
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Copy — node 4915:1471 */}
    <Reveal sx={{ flex: "1 0 0", minWidth: 0, width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "17px" }}>
          <Box
            sx={{
              alignSelf: "flex-start",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              px: "16px",
              py: "6px",
              borderRadius: "46px",
              bgcolor: "rgba(59,160,255,0.05)",
              border: "1px solid rgba(0,66,252,0.31)",
              fontFamily: "Manrope",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.24,
              letterSpacing: "-0.36px",
              color: C.mainDark,
            }}
          >
            Проявлення починається зсередини
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <Box
              component="h2"
              sx={{
                m: 0,
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: { xs: 24, md: 34 },
                lineHeight: 1.07,
                letterSpacing: "-0.68px",
                color: C.textBlack,
              }}
            >
              Можна навчитися позувати. Але як показати себе, якщо ще не
              розумієш,
            </Box>
            <Box
              component="span"
              sx={{
                fontFamily: ACCENT,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: { xs: 24, md: 34 },
                lineHeight: { xs: "26px", md: "33px" },
                color: C.mainDark,
              }}
            >
              що хочеш показати?
            </Box>
          </Box>
        </Box>

        <Box
          component="p"
          sx={{
            m: 0,
            fontFamily: "Manrope",
            fontWeight: 400,
            fontSize: { xs: 16, md: 18 },
            lineHeight: 1.2,
            color: C.textGrey,
          }}
        >
          На марафоні ти підеш глибше: побачиш свої сильні сторони, зрозумієш,
          <Box component="br" sx={{ display: { xs: "none", md: "inline" } }} />{" "}
          що хочеш транслювати, і почнеш сміливіше проявляти це через фото,
          відео та контент.
        </Box>
      </Box>
    </Reveal>

    <Reveal
      delay={120}
      sx={{
        flex: "1 0 0",
        minWidth: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ChatCard />
    </Reveal>
  </Box>
);
