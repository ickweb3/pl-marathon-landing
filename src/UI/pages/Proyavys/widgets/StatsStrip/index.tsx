import { FC } from "react";
import { Box } from "@mui/material";
import { ACCENT, C } from "../../providers/ThemeProvider";
import { Reveal } from "../../shared/ui/Reveal";

/**
 * Stats strip — Figma node 4882:818.
 * px 50, py 32, four 335-wide cells, inner gap 14.
 * Value: Playfair Display SemiBold Italic 38 / 1.2, #0041F3.
 * Label: Manrope Regular 16 / 1.2, rgba(0,0,0,0.8), centred.
 */
const STATS = [
  { value: "7 днів", label: "практики та проявлення" },
  { value: "3 ефіри", label: "з менторкою марафону" },
  { value: "подарунки", label: "фотосесія, б'юті-бокси і 50 LADIES" },
  { value: "безкоштовно", label: "за підтримки Перші Леді" },
] as const;

export const StatsStrip: FC = () => (
  <Box
    component="section"
    sx={{
      px: { xs: "16px", md: "50px" },
      py: { xs: "24px", md: "32px" },
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 335px)" },
        columnGap: 0,
        rowGap: "28px",
        width: "100%",
        maxWidth: 1340,
      }}
    >
      {STATS.map((s, i) => (
        <Reveal key={s.value} delay={i * 70}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <Box
              component="p"
              sx={{
                m: 0,
                fontFamily: ACCENT,
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: { xs: 28, md: 38 },
                lineHeight: 1.2,
                color: C.mainDark,
                whiteSpace: "nowrap",
              }}
            >
              {s.value}
            </Box>
            <Box
              component="p"
              sx={{
                m: 0,
                fontFamily: "Manrope",
                fontWeight: 400,
                fontSize: { xs: 14, md: 16 },
                lineHeight: 1.25,
                color: "rgba(0,0,0,0.8)",
                textAlign: "center",
                width: "100%",
                px: { xs: "6px", md: 0 },
              }}
            >
              {s.label}
            </Box>
          </Box>
        </Reveal>
      ))}
    </Box>
  </Box>
);
