export interface ThemeTokens {
  bg: string;
  secondaryBg: string;
  text: string;
  textLight: string;
  textMuted: string;
  border: string;
  primary: string;
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
    border: "#EDF2F8",
    primary: "#5060D8",
    gradient: ["#5060D8", "#8450D8"],
    overlayGradient: ["rgba(0,0,0,0)", "rgba(0,0,0,0.45)"],
    green: "#2AD724",
    red: "#F32D2D",
    orange: "#F2AD3D",
    yellow: "#FFED00",
  },
  dark: {
    bg: "#271B38",
    secondaryBg: "#1D1527",
    text: "#FFFFFF",
    textLight: "#C1C1C1",
    textMuted: "rgba(255,255,255,0.75)",
    border: "#1D1527",
    primary: "#5060D8",
    gradient: ["#5060D8", "#8450D8"],
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