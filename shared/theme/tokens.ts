export interface ThemeTokens {
  bg: string;
  secondaryBg: string;
  text: string;
  textLight: string;
  textMuted: string;
  border: string;
  primary: string;
  secondary: string;
  gradient: readonly [string, string];
  overlayGradient: readonly [string, string];
  green: string;
  red: string;
  orange: string;
  yellow: string;
}

export interface Typography {
  text: {
    fontSize: number;
    fontWeight: number | string;
    lineHeight: number;
  };
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
    secondaryBg: "#EAECFA",
    text: "#111111",
    textLight: "#888888",
    textMuted: "#6B7280",
    border: "#EDF2F8",
    primary: "#5060D8",
    secondary: "#8450D8",
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
    secondary: "#8450D8",
    gradient: ["#5060D8", "#8450D8"],
    overlayGradient: ["rgba(0,0,0,0)", "rgba(0,0,0,0.45)"],
    green: "#2AD724",
    red: "#F32D2D",
    orange: "#F2AD3D",
    yellow: "#FFED00",
  },
};

export const typography: Typography = {
  text: { fontSize: 11, fontWeight: 400, lineHeight: 12 },
  tableHeaderText: { fontSize: 11, fontWeight: 600, lineHeight: 12 },
  tableText: { fontSize: 11, fontWeight: 400, lineHeight: 12 },
};