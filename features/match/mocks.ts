// features/match/mocks.ts
import { Match } from "@/features/match/types";

export const mockMatches: Match[] = [
  {
    id: "1",
    homeTeam: {
      name: "ФК АВАНГАРД",
      city: "АЛМАТЫ",
      color1: "#FF0000", // Красный
      color2: "#FFFFFF", // Белый (красно-белая полоса)
    },
    awayTeam: {
      name: "ШИЕЛИ",
      city: "ҚЫЗЫЛОРДА ОБЛ",
      color1: "#FFD700", // Золотой
      color2: "#FFD700", // Золотой (однотонная)
    },
    homeScore: 11,
    awayScore: 0,
    status: "live",
    time: "Сейчас",
    tournament: "40+ жас санатындағы IX чемпионаты",
    round: "Группа A, 1 - тур",
    isLive: true,
  },
  {
    id: "2",
    homeTeam: {
      name: "КАЙРАТ",
      city: "АЛМАТЫ",
      color1: "#FFD700", // Золотой
      color2: "#000000", // Черный (золото-черная полоса)
    },
    awayTeam: {
      name: "АКТОБЕ",
      city: "АКТОБЕ",
      color1: "#00A651", // Зеленый
      color2: "#00A651", // Зеленый (однотонная)
    },
    status: "upcoming",
    time: "18:30",
    tournament: "Премьер лига Казахстана",
    round: "15 тур",
    isLive: false,
  },
  {
    id: "3",
    homeTeam: {
      name: "АСТАНА",
      city: "НУР-СУЛТАН",
      color1: "#FFD700", // Золотой
      color2: "#0057A6", // Синий (золото-синяя полоса)
    },
    awayTeam: {
      name: "ТОБОЛ",
      city: "КОСТАНАЙ",
      color1: "#FFD700", // Золотой
      color2: "#FFD700", // Золотой (однотонная)
    },
    homeScore: 2,
    awayScore: 1,
    status: "live",
    time: "Сейчас",
    tournament: "Кубок Казахстана",
    round: "1/4 финала",
    isLive: true,
  },
  {
    id: "4",
    homeTeam: {
      name: "ЖЕТЫСУ",
      city: "ТАЛДЫКОРГАН",
      color1: "#00A651", // Зеленый
      color2: "#FFFFFF", // Белый (зелено-белая полоса)
    },
    awayTeam: {
      name: "КЫЗЫЛЖАР",
      city: "ПЕТРОПАВЛ",
      color1: "#DC143C", // Красный
      color2: "#DC143C", // Красный (однотонная)
    },
    status: "upcoming",
    time: "20:00",
    tournament: "Первая лига",
    round: "22 тур",
    isLive: false,
  },
  {
    id: "5",
    homeTeam: {
      name: "ОРДАБАСЫ",
      city: "ШЫМКЕНТ",
      color1: "#00A651", // Зеленый
      color2: "#00A651", // Зеленый (однотонная)
    },
    awayTeam: {
      name: "АТЫРАУ",
      city: "АТЫРАУ",
      color1: "#0057A6", // Синий
      color2: "#FFFFFF", // Белый (сине-белая полоса)
    },
    homeScore: 3,
    awayScore: 2,
    status: "live",
    time: "Сейчас",
    tournament: "Премьер лига Казахстана",
    round: "16 тур",
    isLive: true,
  },

  {
    id: "51",
    homeTeam: {
      name: "ОРДАБАСЫ test",
      city: "ШЫМКЕНТ test",
      color1: "#1E90FF", // Голубой
      color2: "#FFFFFF", // Белый (голубо-белая полоса)
    },
    awayTeam: {
      name: "АТЫРАУ test",
      city: "АТЫРАУ test",
      color1: "#FFA500", // Оранжевый
      color2: "#000000", // Черный (оранжево-черная полоса)
    },
    homeScore: 3,
    awayScore: 2,
    status: "live",
    time: "Сейчас",
    tournament: "Премьер лига Казахстана test",
    round: "16 тур test",
    isLive: true,
  },
];
