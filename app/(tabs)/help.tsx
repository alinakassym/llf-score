import HelpFaqAccordion from "@/features/help/HelpFaqAccordion";
import { faqItems } from "@/features/help/mocks";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { ScrollView, StyleSheet, View } from "react-native";

export default function TabHelpScreen() {
  const scheme = useThemeMode();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <HelpFaqAccordion items={faqItems} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
