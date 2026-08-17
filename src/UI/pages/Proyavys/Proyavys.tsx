import { FC } from "react";
import { Box } from "@mui/material";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Header } from "./widgets/Header";
import { HeroSection } from "./widgets/HeroSection";
import { StatsStrip } from "./widgets/StatsStrip";
import { ProblemsSection } from "./widgets/ProblemsSection";
import { CriticSection } from "./widgets/CriticSection";
import { ProgramSection } from "./widgets/ProgramSection";
import { MentorSection } from "./widgets/MentorSection";
import { PrizesSection } from "./widgets/PrizesSection";
import { JoinSection } from "./widgets/JoinSection";
import { FAQSection } from "./widgets/FAQSection";
import { FinalCtaSection } from "./widgets/FinalCtaSection";
import { Footer } from "./widgets/Footer";
import { CANVAS } from "./providers/ThemeProvider";

/**
 * «Проявись» — Figma frame `Landing-courses-PL`, node 4882:772, 1440 x 7679.
 *
 * The frame stacks its sections with a 140px gap; the hero panel and the stats
 * strip sit 60px apart inside their own wrapper. Both numbers are the frame's.
 */
const GAP = { xs: "48px", md: "140px" };

export const Proyavys: FC = () => (
  <ThemeProvider>
    <Header />
    <Box
      sx={{
        width: "100%",
        maxWidth: CANVAS,
        mx: "auto",
        // The frame starts the hero at y 0. On a real page that reads as flush
        // against the browser chrome, so the panel gets the same breathing room
        // the live PL course landings give it.
        pt: { xs: "12px", md: "24px" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* node 4882:773 — hero and stats, 60 apart */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "24px", md: "60px" },
        }}
      >
        <HeroSection />
        <StatsStrip />
      </Box>

      <Box sx={{ mt: GAP }}>
        <ProblemsSection />
      </Box>
      <Box sx={{ mt: GAP }}>
        <CriticSection />
      </Box>
      <Box sx={{ mt: GAP }}>
        <ProgramSection />
      </Box>
      <Box sx={{ mt: GAP }}>
        <MentorSection />
      </Box>
      <Box sx={{ mt: GAP }}>
        <PrizesSection />
      </Box>
      <Box sx={{ mt: GAP }}>
        <JoinSection />
      </Box>
      <Box sx={{ mt: GAP }}>
        <FAQSection />
      </Box>
      <Box sx={{ mt: GAP }}>
        <FinalCtaSection />
      </Box>
      <Box sx={{ mt: GAP }}>
        <Footer />
      </Box>
    </Box>
  </ThemeProvider>
);
