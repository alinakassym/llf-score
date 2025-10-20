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
 */
function formatMatchTime(
  dateTime: string,
  isLive: boolean,
): { date: string; time: string } {
  const matchDate = new Date(dateTime);
  const now = new Date();

  // Время всегда в формате HH:MM
  const timeStr = matchDate.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Если матч идет сейчас
  if (isLive) {
    return { date: "Сейчас", time: timeStr };
  }

  const isToday = matchDate.toDateString() === now.toDateString();
  const isTomorrow =
    matchDate.toDateString() ===
    new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();

  // Если сегодня
  if (isToday) {
    return { date: "Сегодня", time: timeStr };
  }

  // Если завтра
  if (isTomorrow) {
    return { date: "Завтра", time: timeStr };
  }

  // Другой день - формат "15 авг"
  const day = matchDate.getDate();
  const month = MONTH_NAMES_SHORT[matchDate.getMonth()];
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

  // Сортируем матчи: сначала текущие/ближайшие, потом будущие
  const sortedMatches = allMatches.sort((a, b) => {
    const timeA = new Date(a.dateTime).getTime();
    const timeB = new Date(b.dateTime).getTime();

    // Приоритет: матчи которые идут сейчас или скоро начнутся
    // Сортируем по возрастанию времени от текущего момента
    if (timeA >= now && timeB >= now) {
      return timeA - timeB; // Оба в будущем - сортируем по возрастанию
    }

    if (timeA < now && timeB < now) {
      // Оба в прошлом
      // Проверяем, идут ли они сейчас
      const aIsLive = Math.abs(timeA - now) < MATCH_DURATION_MS;
      const bIsLive = Math.abs(timeB - now) < MATCH_DURATION_MS;

      if (aIsLive && !bIsLive) return -1;
      if (!aIsLive && bIsLive) return 1;

      return timeB - timeA; // Оба завершились - новее сначала
    }

    // Один в будущем, другой в прошлом
    if (timeA >= now) {
      // A в будущем, B в прошлом
      const bIsLive = Math.abs(timeB - now) < MATCH_DURATION_MS;
      if (bIsLive) return 1; // Live матч приоритетнее будущего
      return -1; // Будущий матч приоритетнее завершенного
    } else {
      // B в будущем, A в прошлом
      const aIsLive = Math.abs(timeA - now) < MATCH_DURATION_MS;
      if (aIsLive) return -1; // Live матч приоритетнее будущего
      return 1; // Будущий матч приоритетнее завершенного
    }
  });

  // Берем первые 10 матчей и конвертируем в UI формат
  return sortedMatches.slice(0, 10).map(adaptAPIMatchToUI);
}
