export interface ThemeTokens {
  bg: string;
  secondaryBg: string;
  text: string;
  textLight: string;
  textMuted: string;
  border: string;
  primary: string;
  secondary: string;
  primaryLight: string;
  primaryText: string;
  gradient: readonly [string, string];
  green: string;
  red: string;
}

export const tokens: Record<"light" | "dark", ThemeTokens> = {
  light: {
    bg: "#FFFFFF",
    secondaryBg: "#F5F5F5",
    text: "#111111",
    textLight: "#888888",
    textMuted: "#6B7280",
    border: "#ECEDEF",
    primary: "#5269D7",
    secondary: "#cfdcff",
    primaryLight: "#EAEDFA",
    primaryText: "#FFFFFF",
    gradient: ["#5069D8", "#9464AF"],
    green: "#2AD724",
    red: "#F32D2D",
  },
  dark: {
    bg: "#181A20",
    secondaryBg: "#000000",
    text: "#FFFFFF",
    textMuted: "rgba(255,255,255,0.75)",
    textLight: "#C1C1C1",
    border: "#35383F",
    primary: "#5269D7",
    secondary: "#cfdcff",
    primaryLight: "#181A20",
    primaryText: "#FFFFFF",
    gradient: ["#5069D8", "#9464AF"],
    green: "#2AD724",
    red: "#F32D2D",
  },
};
  