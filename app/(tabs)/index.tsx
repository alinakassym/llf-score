import { Carousel } from "@/components/carousel";
import { Screen } from "@/components/Screen";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { StyleSheet } from "react-native";

export default function TabOneScreen() {
  const scheme = useThemeMode();
  const carouselImages = [
    "https://picsum.photos/400/200?random=1",
    "https://picsum.photos/400/200?random=2",
    "https://picsum.photos/400/200?random=3",
    "https://picsum.photos/400/200?random=4",
  ];
  return (
    <Screen style={styles.container}>
      <Carousel images={carouselImages} height={150} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
