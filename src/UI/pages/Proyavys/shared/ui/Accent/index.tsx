import { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import { ACCENT } from "../../../providers/ThemeProvider";

/**
 * The Playfair Display italic accent inside a heading.
 *
 * The frame uses two weights: SemiBold Italic in the hero, the chat bubble and
 * the closing CTA; Bold Italic in every section heading. Sizes differ per
 * place, so the caller passes them — this component never guesses.
 */
export const Accent: FC<{
  children: ReactNode;
  size: number | Record<string, number>;
  lineHeight?: number | string;
  color?: string;
  weight?: 400 | 600 | 700;
  italic?: boolean;
}> = ({
  children,
  size,
  lineHeight,
  color = "#0041F3",
  weight = 700,
  italic = true,
}) => (
  <Box
    component="span"
    sx={{
      fontFamily: ACCENT,
      fontStyle: italic ? "italic" : "normal",
      fontWeight: weight,
      fontSize: typeof size === "number" ? `${size}px` : size,
      lineHeight,
      color,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </Box>
);
