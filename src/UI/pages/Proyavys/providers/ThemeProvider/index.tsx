import { FC, ReactNode } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

/**
 * Every value here is read from the Figma frame `Landing-courses-PL`
 * (node 4882:772) through `get_design_context`. Nothing is estimated.
 *
 * File shape mirrors pl-fe-cabinet
 * `src/UI/pages/Landing/providers/ThemeProvider/index.tsx`.
 */

/** Figma variable set. */
export const C = {
  milk: "#FFFEFA",
  mainMedium: "#007DF3",
  mainDark: "#0041F3",
  mainLight: "#3BA0FF",
  blueBlock: "#037FF3",
  whiteBlock: "#FEFEFE",
  textWhite: "#FAFAFA",
  textGrey: "#323232",
  textBlack: "#151515",
  textDescription: "#5B5B5B",
  /** Local, non-variable values the frame uses literally. */
  tileBg: "#FBFBFB",
  tileTitle: "#202020",
  chatBg: "#F6F6F6",
  chatAvatarText: "#8A97AB",
  chatName: "#0D1522",
  chatBorder: "#D2E4FF",
  chatDivider: "#EEF2F8",
  chatInputBorder: "#E1E1E1",
  chatPlaceholder: "#737070",
  stepBody: "#505050",
  buttonStroke: "#BDDFFF",
  /** Phone frames 16:740 / 19:1170 — literal values, no variable behind them. */
  heroBodyMob: "#EFEFEF",
  finalBgMob: "#D8DBE0",
  finalBodyMob: "#262626",
} as const;

/** Gradients, verbatim from the frame. */
export const G = {
  hero: "linear-gradient(196.68487485425027deg, rgb(0, 66, 252) 2.4447%, rgb(59, 110, 255) 83.315%, rgb(0, 66, 252) 165.84%)",
  mentor:
    "linear-gradient(189.46102469710712deg, rgb(0, 66, 252) 2.4447%, rgb(59, 110, 255) 83.315%, rgb(0, 66, 252) 165.84%)",
  join: "linear-gradient(75.31043525058021deg, rgb(215, 233, 255) 1.176%, rgb(29, 111, 242) 57.503%)",
  final:
    "linear-gradient(191.55205076007312deg, rgb(0, 66, 252) 2.4447%, rgb(59, 110, 255) 83.315%, rgb(0, 66, 252) 165.84%)",
  /**
   * The frame stores this fill with its handles far outside the box, so the
   * MCP's CSS conversion inverts it — it renders light with a blue wedge, while
   * the design is a blue card with the light tone only at the very bottom edge.
   * The two screen-blend ellipses on top supply the glow.
   */
  footer:
    "linear-gradient(2.589081499947511deg, rgb(215, 233, 255) 0%, rgb(0, 125, 243) 2.2%)",
  ladiesCard:
    "linear-gradient(172.3024521060725deg, rgb(43, 110, 253) 27.664%, rgb(255, 255, 255) 159.66%)",
  finalScrim:
    "linear-gradient(267.6792525360968deg, rgba(255, 255, 255, 0) 20.775%, rgba(255, 255, 255, 0.8) 64.618%)",
  joinButton:
    "linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.12) 100%), linear-gradient(90deg, rgba(92, 175, 255, 0.05) 0%, rgba(92, 175, 255, 0.05) 100%)",

  /**
   * The phone frames carry the same three stops at their own angle — the
   * designer turned each gradient to suit a portrait card. They are separate
   * values, not the desktop ones re-used.
   */
  heroMob:
    "linear-gradient(235.72105122379722deg, rgb(0, 66, 252) 2.4447%, rgb(59, 110, 255) 83.315%, rgb(0, 66, 252) 165.84%)",
  mentorMob:
    "linear-gradient(224.53942001433379deg, rgb(0, 66, 252) 2.4447%, rgb(59, 110, 255) 83.315%, rgb(0, 66, 252) 165.84%)",
  /**
   * Closing CTA, node 19:1207. The frame draws it as a 378 x 554 rect turned
   * 90°, which lands as a vertical wash over the top of the photograph — the
   * card colour holding for 39% of its length and then going clear. It is
   * anchored to the photograph here, so the fade cannot come apart from the
   * edge it hides when the copy above reflows.
   */
  finalScrimMob:
    "linear-gradient(180deg, rgb(217, 221, 225) 0%, rgba(217, 221, 225, 0) 100%)",
} as const;

/** The frame's own shadows. */
export const SHADOW = {
  card: "drop-shadow(0px 1.445px 1.445px rgba(0,0,0,0.08))",
  tile: "drop-shadow(0px 0px 4.85px rgba(0,0,0,0.14))",
  chat: "drop-shadow(0px -1px 7.05px rgba(0,0,0,0.12))",
} as const;

/** Display face of every italic accent. */
export const ACCENT = '"Playfair Display", Georgia, serif';

/** The frame is 1440 wide with a 1344 content band. */
export const CANVAS = 1440;

const theme = createTheme({
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 } },
  palette: {
    primary: { main: C.blueBlock, light: C.mainLight, dark: C.mainDark },
    background: { default: C.milk, paper: C.whiteBlock },
    text: { primary: C.textBlack, secondary: C.textGrey },
  },
  typography: { fontFamily: "Manrope, Arial, sans-serif" },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: "smooth" },
        body: { backgroundColor: C.milk, overflowX: "hidden" },
        "@media (prefers-reduced-motion: reduce)": {
          html: { scrollBehavior: "auto" },
          "*": {
            animationDuration: "0.01ms !important",
            transitionDuration: "0.01ms !important",
          },
        },
      },
    },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <MUIThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MUIThemeProvider>
);
