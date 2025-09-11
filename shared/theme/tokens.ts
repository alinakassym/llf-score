export interface ThemeBaseColors {
  primary: string;
  secondary: string;
  dark: string;
  gradient: any;
  overlayGradient: any;
  green: string;
  red: string;
  orange: string;
  yellow: string;
  opacity: string;
}

export interface ThemeTokens {
  primary: string;
  secondary: string;
  dark: string;
  gradient: any;
  overlayGradient: any;
  green: string;
  red: string;
  orange: string;
  yellow: string;
  opacity: string;
  bg: string;
  secondaryBg: string;
  text: string;
  textLight: string;
  textMuted: string;
  border: string;
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

export const themeBaseColors = {
  primary: "#5060D8",
  secondary: "#8450D8",
  dark: "#271B38",
  gradient: ["#5060D8", "#8450D8", "#50A4D8"],
  overlayGradient: ["rgba(0,0,0,0)", "rgba(0,0,0,0.45)"],
  green: "#2AD724",
  red: "#F32D2D",
  orange: "#F2AD3D",
  yellow: "#FFED00",
  opacity: "rgba(255,255,255,0.12)",
};

export const colors: Record<"light" | "dark", ThemeTokens> = {
  light: {
    ...themeBaseColors,
    overlayGradient: ["rgba(0,0,0,0)", "rgba(0,0,0,0.45)"],
    bg: "#FFFFFF",
    secondaryBg: "#EAECFA",
    text: "#111111",
    textLight: "#888888",
    textMuted: "#6B7280",
    border: "#EDF2F8",
  },
  dark: {
    ...themeBaseColors,
    gradient: ["#5060D8", "#8450D8"],
    overlayGradient: ["rgba(0,0,0,0)", "rgba(0,0,0,0.45)"],
    bg: "#271B38",
    secondaryBg: "#1D1527",
    text: "#FFFFFF",
    textLight: "#C1C1C1",
    textMuted: "rgba(255,255,255,0.75)",
    border: "#1D1527",
  },
};

export const typography: Typography = {
  text: { fontSize: 11, fontWeight: 400, lineHeight: 12 },
  tableHeaderText: { fontSize: 11, fontWeight: 600, lineHeight: 12 },
  tableText: { fontSize: 11, fontWeight: 400, lineHeight: 12 },
};
