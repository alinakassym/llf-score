import { CityAccordionList } from "@/features/CityAccordionList";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { ScrollView, StyleSheet } from "react-native";

export default function TabLeaguesScreen() {
  const scheme = useThemeMode();
  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent]}>
      <CityAccordionList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingVertical: 8,
    flexGrow: 1,
    gap: 8,
  },
});
