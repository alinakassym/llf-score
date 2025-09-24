import { Carousel } from "@/components/InfiniteCarousel";
import { Colors } from "@/constants/theme";
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
    <ScrollView
      contentContainerStyle={[
        styles.scrollViewContent,
        { backgroundColor: Colors[scheme].background },
      ]}
    >
      <Carousel images={carouselImages} height={150} />
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
