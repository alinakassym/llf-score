// shared/mocks/matchRows.ts
export const matchRows = [
  {
    id: "m1",
    homeName: "БИИК Шымкент (Ж)",
    awayName: "Актобе (Ж)",
    homeLogo: require("@/assets/images/adaptive-icon.png"),
    awayLogo: require("@/assets/images/adaptive-icon.png"),
    score: "3:0",
    status: "finished",
  },
  {
    id: "m2",
    homeName: "Tomiris-Turan (Ж)",
    awayName: "Кайрат (Ж)",
    homeLogo: require("@/assets/images/adaptive-icon.png"),
    awayLogo: require("@/assets/images/adaptive-icon.png"),
    status: "live",
    score: "1:0",
  },
  {
    id: "m3",
    homeName: "Елимай (Ж)",
    awayName: "Кызылжар (Ж)",
    homeLogo: require("@/assets/images/adaptive-icon.png"),
    awayLogo: require("@/assets/images/adaptive-icon.png"),
    status: "scheduled",
    dateISO: new Date().toISOString(),
  },
] as const;
