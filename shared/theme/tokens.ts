export interface ThemeTokens {
    bg: string;
    secondaryBg: string;
    text: string;
    textMuted: string;
    surface: string;
    border: string;
    primary: string;
    primaryText: string;
    tabGradient: readonly [string, string];
    card: string;
  }
  
  export const tokens: Record<"light" | "dark", ThemeTokens> = {
    light: {
      bg: "#FFFFFF",
      secondaryBg: "#F5F5F5",
      text: "#111111",
      textMuted: "#6B7280",
      surface: "#F7F7F8",
      border: "#E6E8EB",
      primary: "#5269D7",
      primaryText: "#FFFFFF",
      tabGradient: ["#5069D8", "#9464AF"],
      card: "rgba(0,0,0,0.02)",
    },
    dark: {
      bg: "#181A20",
      secondaryBg: "#000000",
      text: "#FFFFFF",
      textMuted: "rgba(255,255,255,0.75)",
      surface: "rgba(255,255,255,0.06)",
      border: "rgba(255,255,255,0.14)",
      primary: "#5269D7",
      primaryText: "#FFFFFF",
      tabGradient: ["rgba(80,105,216,0.8)", "#9464AF"],
      card: "rgba(255,255,255,0.06)",
    },
  };
  