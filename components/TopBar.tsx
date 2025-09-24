import { Option, Select } from "@/components/Select";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const CITIES: Option[] = [
  { id: "astana", label: "Астана" },
  { id: "almaty", label: "Алматы" },
  { id: "karaganda", label: "Караганда" },
];

const LEAGUES: Option[] = [
  { id: "pl", label: "Премьер лига" },
  { id: "fl", label: "Первая лига" },
  { id: "youth", label: "Юношеская" },
  { id: "leagueA", label: "Лига A" },
  { id: "leagueB", label: "Лига B" },
  { id: "leagueC", label: "Лига C" },
];

export const TopBar: React.FC = () => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const [city, setCity] = useState("astana");
  const [league, setLeague] = useState("pl");

  return (
    <View
      style={[styles.container, { backgroundColor: Colors[scheme].background }]}
    >
      <View style={styles.left}>
        <Select value={city} onChange={setCity} options={CITIES} />

        <Select value={league} onChange={setLeague} options={LEAGUES} />
      </View>

      {/* справа пока пусто — добавим иконки позже */}
      <View style={styles.right} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  left: { flexDirection: "row", alignItems: "center" },
  right: { flexDirection: "row", alignItems: "center" },
});
