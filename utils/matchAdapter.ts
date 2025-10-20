import { Match as UIMatch } from "@/features/match/types";
import { Match as APIMatch, Tour } from "@/store/seasons.slice";

/**
 * Конвертирует матч из API формата в UI формат для компонента MatchCard
 */
export function adaptAPIMatchToUI(apiMatch: APIMatch): UIMatch {
  return {
    id: String(apiMatch.id),
    homeTeam: {
      name: apiMatch.team1Name,
    },
    awayTeam: {
      name: apiMatch.team2Name,
    },
    homeScore: apiMatch.team1Score,
    awayScore: apiMatch.team2Score,
    status: "finished", // По умолчанию finished, можно улучшить логику
    time: new Date(apiMatch.dateTime).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    tournament: apiMatch.location,
    round: `Тур ${apiMatch.tourId}`,
    isLive: false, // Можно добавить логику определения live матчей
  };
}

/**
 * Конвертирует все матчи из всех туров сезона в UI формат
 */
export function adaptToursMatchesToUI(tours: Tour[]): UIMatch[] {
  const allMatches: UIMatch[] = [];

  tours.forEach((tour) => {
    tour.matches.forEach((match) => {
      allMatches.push(adaptAPIMatchToUI(match));
    });
  });

  return allMatches;
}
