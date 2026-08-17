import { FC, useState } from "react";
import { Box, Collapse } from "@mui/material";
import { IMAGES } from "assets/index";
import { FAQ } from "../../shared/faq";
import { C } from "../../providers/ThemeProvider";
import { Reveal } from "../../shared/ui/Reveal";

/**
 * "Питання перед стартом" — Figma node 4882:1137.
 * px 164, column gap 24, rows 1112 wide, gap 10.
 *
 * Row, node 4882:1141 open / 4882:1142 closed: radius 28, padding 24,
 * 1px rgba(3,127,243,0.2). Open is #037FF3 with #FAFAFA copy and the arrow
 * turned 180°; closed is #FEFEFE with #151515 copy.
 * Question Manrope SemiBold 28 / 36, -0.56.
 * Answer Manrope Regular 16 / 1.34, -0.16, 90% opacity.
 */
export const FAQSection: FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Box
      id="faq"
      component="section"
      sx={{
        px: { xs: "16px", md: "80px", lg: "164px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: "16px", md: "24px" },
      }}
    >
      <Reveal sx={{ width: "100%" }}>
        <Box
          component="h2"
          sx={{
            m: 0,
            width: "100%",
            textAlign: "center",
            fontFamily: "Manrope",
            fontWeight: 600,
            fontSize: { xs: 28, md: 48 },
            lineHeight: 1,
            letterSpacing: "-0.96px",
            color: C.textBlack,
          }}
        >
          Питання перед стартом
        </Box>
      </Reveal>

      <Reveal delay={80} sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            maxWidth: 1112,
          }}
        >
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            const hasAnswer = item.answer.length > 0;

            return (
              <Box
                key={item.question}
                component="button"
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                sx={{
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: isOpen && hasAnswer ? "flex-start" : "center",
                  justifyContent: "space-between",
                  gap: { xs: "12px", md: "16px" },
                  p: { xs: "18px", md: "24px" },
                  borderRadius: { xs: "22px", md: "28px" },
                  border: "1px solid rgba(3,127,243,0.2)",
                  bgcolor: isOpen ? C.blueBlock : C.whiteBlock,
                  transition: "background-color .28s ease",
                }}
              >
                <Box
                  sx={{
                    flex: "1 0 0",
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontFamily: "Manrope",
                      fontWeight: 600,
                      fontSize: { xs: 17, md: 28 },
                      lineHeight: { xs: "23px", md: "36px" },
                      letterSpacing: { xs: "-0.3px", md: "-0.56px" },
                      color: isOpen ? C.textWhite : C.textBlack,
                    }}
                  >
                    {item.question}
                  </Box>

                  {hasAnswer && (
                    <Collapse in={isOpen} timeout={280} unmountOnExit>
                      <Box
                        component="span"
                        sx={{
                          display: "block",
                          fontFamily: "Manrope",
                          fontWeight: 400,
                          fontSize: 16,
                          lineHeight: 1.34,
                          letterSpacing: "-0.16px",
                          opacity: 0.9,
                          color: C.textWhite,
                        }}
                      >
                        {item.answer}
                      </Box>
                    </Collapse>
                  )}
                </Box>

                <Box
                  component="img"
                  src={isOpen ? IMAGES.faqArrowOpen : IMAGES.faqArrowClosed}
                  alt=""
                  aria-hidden
                  sx={{
                    width: { xs: 28, md: 36 },
                    height: { xs: 28, md: 36 },
                    flexShrink: 0,
                    display: "block",
                    transform: isOpen ? "rotate(180deg)" : "none",
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Reveal>
    </Box>
  );
};
