import { Screen } from "@/components/Screen";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { StyleSheet, Text } from "react-native";

export default function TabOneScreen() {
  const scheme = useThemeMode();
  return (
    <Screen style={styles.container}>
      <Text style={[styles.title, { color: Colors[scheme].text }]}>
        Tab One
      </Text>
    </Screen>
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
