// features/match/mocks.ts
import { Match } from "@/features/match/types";

export const mockMatches: Match[] = [
  {
    id: "1",
    homeTeam: {
      name: "ФК АВАНГАРД",
      city: "АЛМАТЫ",
    },
    awayTeam: {
      name: "ШИЕЛИ",
      city: "ҚЫЗЫЛОРДА ОБЛ",
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
    },
    awayTeam: {
      name: "АКТОБЕ",
      city: "АКТОБЕ",
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
    },
    awayTeam: {
      name: "ТОБОЛ",
      city: "КОСТАНАЙ",
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
    },
    awayTeam: {
      name: "КЫЗЫЛЖАР",
      city: "ПЕТРОПАВЛ",
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
    },
    awayTeam: {
      name: "АТЫРАУ",
      city: "АТЫРАУ",
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
    },
    awayTeam: {
      name: "АТЫРАУ test",
      city: "АТЫРАУ test",
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
