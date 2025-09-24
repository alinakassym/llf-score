export type ThemeName = "light" | "dark";

type Palette = {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  card: string;
  border: string;
  muted: string;
  error: string;
  success: string;
  warning: string;
  button: string;
};

const baseColors = {
  primary: "#5060D8",
  secondary: "#8450D8",
};

export const Colors: Record<ThemeName, Palette> = {
  light: {
    ...baseColors,
    background: "#FFFFFF",
    text: "#111111",
    card: "#F8F9FB",
    border: "#E6E8EB",
    muted: "#6B7280",
    error: "#DC2626",
    success: "#16A34A",
    warning: "#D97706",
    button: "#F2F3F5",
  },
  dark: {
    ...baseColors,
    background: "#271B38",
    text: "#FFFFFF",
    card: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.14)",
    muted: "#9CA3AF",
    error: "#F87171",
    success: "#34D399",
    warning: "#FBBF24",
    button: "rgba(255,255,255,0.08)",
  },
};
