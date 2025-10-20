import { MatchStatus, Match as UIMatch } from "@/features/match/types";
import { Match as APIMatch, Tour } from "@/store/seasons.slice";

const MATCH_DURATION_MS = 2 * 60 * 60 * 1000; // 2 часа (матч + запас)

/**
 * Определяет статус матча на основе времени начала
 */
function getMatchStatus(dateTime: string): {
  status: MatchStatus;
  isLive: boolean;
} {
  const matchTime = new Date(dateTime).getTime();
  const now = Date.now();
  const timeDiff = matchTime - now;

  // Матч идет сейчас (начался и еще не прошло 2 часа)
  if (timeDiff < 0 && Math.abs(timeDiff) < MATCH_DURATION_MS) {
    return { status: "live", isLive: true };
  }

  // Матч еще не начался
  if (timeDiff > 0) {
    return { status: "upcoming", isLive: false };
  }

  // Матч уже завершился
  return { status: "finished", isLive: false };
}

const MONTH_NAMES_SHORT = [
  "янв",
  "фев",
  "мар",
  "апр",
  "май",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

/**
 * Форматирует дату и время для отображения
 * Использует UTC время из API без конвертации в локальное время
 */
function formatMatchTime(
  dateTime: string,
  isLive: boolean,
): { date: string; time: string } {
  const matchDate = new Date(dateTime);
  const now = new Date();

  // Время всегда в формате HH:MM (используем UTC время)
  const hours = matchDate.getUTCHours().toString().padStart(2, "0");
  const minutes = matchDate.getUTCMinutes().toString().padStart(2, "0");
  const timeStr = `${hours}:${minutes}`;

  // Если матч идет сейчас
  if (isLive) {
    return { date: "Сейчас", time: timeStr };
  }

  // Сравниваем даты в UTC
  const matchUTCDate = new Date(
    Date.UTC(
      matchDate.getUTCFullYear(),
      matchDate.getUTCMonth(),
      matchDate.getUTCDate(),
    ),
  );
  const todayUTCDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const tomorrowUTCDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  );

  const isToday = matchUTCDate.getTime() === todayUTCDate.getTime();
  const isTomorrow = matchUTCDate.getTime() === tomorrowUTCDate.getTime();

  // Если сегодня
  if (isToday) {
    return { date: "Сегодня", time: timeStr };
  }

  // Если завтра
  if (isTomorrow) {
    return { date: "Завтра", time: timeStr };
  }

  // Другой день - формат "15 авг"
  const day = matchDate.getUTCDate();
  const month = MONTH_NAMES_SHORT[matchDate.getUTCMonth()];
  const dateStr = `${day} ${month}`;

  return { date: dateStr, time: timeStr };
}

/**
 * Конвертирует матч из API формата в UI формат для компонента MatchCard
 */
export function adaptAPIMatchToUI(apiMatch: APIMatch): UIMatch {
  const { status, isLive } = getMatchStatus(apiMatch.dateTime);
  const { date, time } = formatMatchTime(apiMatch.dateTime, isLive);

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
    status,
    date,
    time,
    dateTime: apiMatch.dateTime,
    tournament: apiMatch.location,
    round: `Тур ${apiMatch.tourId}`,
    isLive,
  };
}

/**
 * Конвертирует все матчи из всех туров сезона в UI формат
 * Возвращает ближайшие 10 матчей, отсортированные по времени
 */
export function adaptToursMatchesToUI(tours: Tour[]): UIMatch[] {
  const allMatches: APIMatch[] = [];

  // Собираем все матчи из всех туров
  tours.forEach((tour) => {
    tour.matches.forEach((match) => {
      allMatches.push(match);
    });
  });

  const now = Date.now();

  // Разделяем матчи на категории
  const liveMatches: APIMatch[] = [];
  const upcomingMatches: APIMatch[] = [];
  const finishedMatches: APIMatch[] = [];

  allMatches.forEach((match) => {
    const matchTime = new Date(match.dateTime).getTime();
    const timeDiff = now - matchTime;

    // Live матчи (начались и идут меньше 2 часов)
    if (timeDiff >= 0 && timeDiff < MATCH_DURATION_MS) {
      liveMatches.push(match);
    }
    // Будущие матчи
    else if (matchTime > now) {
      upcomingMatches.push(match);
    }
    // Завершенные матчи
    else {
      finishedMatches.push(match);
    }
  });

  // Сортируем каждую категорию
  liveMatches.sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
  );
  upcomingMatches.sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
  );
  finishedMatches.sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
  ); // Завершенные - от новых к старым

  // Объединяем: сначала live, потом upcoming, потом finished
  console.log("liveMatches: ", liveMatches);
  console.log("upcomingMatches: ", upcomingMatches);
  console.log("finishedMatches: ", finishedMatches);
  const sortedMatches = [
    ...liveMatches,
    ...upcomingMatches,
    ...finishedMatches,
  ];

  // Берем первые 10 матчей и конвертируем в UI формат
  const sortedResult = sortedMatches.slice(0, 10).map(adaptAPIMatchToUI);
  console.log("sortedResult: ", sortedResult);
  return sortedResult;
}
