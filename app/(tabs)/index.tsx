// app/(tabs)/index.tsx
import { Card } from "@/components/Card";
import { Carousel } from "@/features/Carousel";
import { LeagueTable } from "@/features/league/LeagueTable";
import { leagueMock } from "@/features/league/mocks";
import LinksColumn from "@/features/LinksColumn";
import MatchCarousel from "@/features/match/MatchCarousel";
import MenuGrid from "@/features/MenuGrid";
import { mockNews } from "@/features/news/mocks";
import NewsList from "@/features/news/NewsList";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectLeagueId } from "@/store/general.slice";
import {
  fetchLastSeasonByLeagueId,
  selectSeasonByLeague,
  selectSeasonLoadingForLeague,
} from "@/store/seasons.slice";
import { adaptToursMatchesToUI } from "@/utils/matchAdapter";
import { useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function TabOneScreen() {
  const scheme = useThemeMode();
  const dispatch = useAppDispatch();
  const newsItems = mockNews;
  const carouselImages = [
    "https://picsum.photos/400/200?random=1",
    "https://picsum.photos/400/200?random=2",
    "https://picsum.photos/400/200?random=3",
    "https://picsum.photos/400/200?random=4",
  ];

  // Получаем текущий leagueId из Redux store
  const leagueId = useAppSelector(selectLeagueId);

  const season = useAppSelector(selectSeasonByLeague(leagueId));
  const isLoading = useAppSelector(selectSeasonLoadingForLeague(leagueId));

  // Загрузка данных сезона при монтировании или изменении leagueId
  useEffect(() => {
    if (leagueId) {
      dispatch(fetchLastSeasonByLeagueId(leagueId));
    }
  }, [dispatch, leagueId]);

  // Конвертируем матчи из API формата в UI формат
  const matches = useMemo(() => {
    if (!season || !season.tours) return [];
    const res = adaptToursMatchesToUI(season.tours);
    console.log("index res: ", res);
    return res;
  }, [season]);

  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
      <Carousel images={carouselImages} height={150} />

      <MenuGrid />
      <MatchCarousel
        matches={matches}
        onMatchPress={(match) => console.log("Match pressed:", match.id)}
      />
      <View style={{ width: "94%", alignSelf: "center" }}>
        <Card>
          <LeagueTable rows={leagueMock} />
        </Card>
      </View>
      <View style={{ width: "94%", alignSelf: "center" }}>
        <Card>
          <NewsList items={newsItems} />
        </Card>
      </View>

      <View style={{ width: "94%", alignSelf: "center" }}>
        <Card>
          <LinksColumn />
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  scrollViewContent: {
    paddingVertical: 8,
    flexGrow: 1,
    gap: 8,
  },
});
