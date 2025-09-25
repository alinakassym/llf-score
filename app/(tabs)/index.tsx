// app/(tabs)/index.tsx
import { Carousel } from "@/features/Carousel";
import { LeagueTable } from "@/features/league/LeagueTable";
import { leagueMock } from "@/features/league/mocks";
import MatchCarousel from "@/features/match/MatchCarousel";
import { mockMatches } from "@/features/match/mocks";
import MenuGrid from "@/features/MenuGrid";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { ScrollView, StyleSheet } from "react-native";

export default function TabOneScreen() {
  const scheme = useThemeMode();
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
      <LeagueTable rows={leagueMock} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  scrollViewContent: {
    flexGrow: 1,
    gap: 8,
  },
});
