import { Carousel } from "@/components/InfiniteCarousel";
import MatchCarousel from "@/components/MatchCarousel";
import MenuGrid from "@/components/MenuGrid";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { mockMatches } from "@/mock/matches";
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
