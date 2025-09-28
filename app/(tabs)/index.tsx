// app/(tabs)/index.tsx
import { Card } from "@/components/Card";
import { Carousel } from "@/features/Carousel";
import { LeagueTable } from "@/features/league/LeagueTable";
import { leagueMock } from "@/features/league/mocks";
import LinksColumn from "@/features/LinksColumn";
import MatchCarousel from "@/features/match/MatchCarousel";
import { mockMatches } from "@/features/match/mocks";
import MenuGrid from "@/features/MenuGrid";
import { mockNews } from "@/features/news/mocks";
import NewsList from "@/features/news/NewsList";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { ScrollView, StyleSheet, View } from "react-native";

export default function TabOneScreen() {
  const scheme = useThemeMode();
  const newsItems = mockNews;
  const carouselImages = [
    "https://picsum.photos/400/200?random=1",
    "https://picsum.photos/400/200?random=2",
    "https://picsum.photos/400/200?random=3",
    "https://picsum.photos/400/200?random=4",
  ];
  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
      <Carousel images={carouselImages} height={150} />

      <MenuGrid />
      <MatchCarousel
        matches={mockMatches}
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
