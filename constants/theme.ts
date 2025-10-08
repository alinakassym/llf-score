export type ThemeName = "light" | "dark";

type Palette = {
  primary: string;
  secondary: string;
  tertiary: string;
  gradient: any;
  lightOpacity: string;
  darkOpacity: string;
  white: string;
  green: string;
  red: string;
  orange: string;
  dark: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  card: string;
  border: string;
  muted: string;
  error: string;
  success: string;
  warning: string;
  button: string;
  opacity: string;
  bgOpacity: string;
};

const baseColors = {
  primary: "#5060D8",
  secondary: "#8450D8",
  tertiary: "#50A4D8",
  gradient: ["#5060D8", "#5060D8", "#8450D8", "#50A4D8"],
  lightOpacity: "rgba(255, 255, 255, 0.4)",
  darkOpacity: "rgba(0, 0, 0, 0.2)",
  white: "#FFFFFF",
  green: "#2A7948",
  red: "#DC2626",
  orange: "#D76C1F",
  dark: "#271B38",
};

export const Colors: Record<ThemeName, Palette> = {
  light: {
    ...baseColors,
    background: "#F9FAFE",
    surface: "#EAECFA",
    text: "#111111",
    textMuted: "#666666",
    card: "#F8F9FB",
    border: "#EDF2F8",
    muted: "#6B7280",
    error: "#DC2626",
    success: "#16A34A",
    warning: "#D97706",
    button: "#F2F3F5",
    opacity: "rgba(0, 0, 0, 0.2)",
    bgOpacity: "rgba(255, 255, 255, 0.4)",
  },
  dark: {
    ...baseColors,
    background: "rgba(39, 27, 56, 1)",
    surface: "#1D1527",
    text: "#FFFFFF",
    textMuted: "#C1C1C1",
    card: "rgba(255,255,255,0.06)",
    border: "#1D1527",
    muted: "#9CA3AF",
    error: "#DC2626",
    success: "#34D399",
    warning: "#FBBF24",
    button: "rgba(255,255,255,0.08)",
    opacity: "rgba(255, 255, 255, 0.2)",
    bgOpacity: "rgba(39, 27, 56, 0.4)",
  },
};
