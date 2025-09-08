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
  gradient: readonly [string, string];
  overlayGradient: readonly [string, string];
  green: string;
  red: string;
  orange: string;
  yellow: string;
}

export interface Typography {
  tableHeaderText: {
    fontSize: number;
    fontWeight: number | string;
    lineHeight: number;
  };
  tableText: {
    fontSize: number;
    fontWeight: number | string;
    lineHeight: number;
  };
}

export const colors: Record<"light" | "dark", ThemeTokens> = {
  light: {
    bg: "#FFFFFF",
    secondaryBg: "#EDF2F8",
    text: "#111111",
    textLight: "#888888",
    textMuted: "#6B7280",
    border: "#ECEDEF",
    primary: "#5269D7",
    secondary: "#cfdcff",
    primaryLight: "#EDF2F8",
    gradient: ["#5069D8", "#9464AF"],
    overlayGradient: ["rgba(0,0,0,0)", "rgba(0,0,0,0.45)"],
    green: "#2AD724",
    red: "#F32D2D",
    orange: "#F2AD3D",
    yellow: "#FFED00",
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
    gradient: ["#5069D8", "#9464AF"],
    overlayGradient: ["rgba(0,0,0,0)", "rgba(0,0,0,0.45)"],
    green: "#2AD724",
    red: "#F32D2D",
    orange: "#F2AD3D",
    yellow: "#FFED00",
  },
};

export const typography: Typography = {
  tableHeaderText: { fontSize: 12, fontWeight: 400, lineHeight: 1.2 },
  tableText: { fontSize: 10, fontWeight: 400, lineHeight: 1.2 },
};