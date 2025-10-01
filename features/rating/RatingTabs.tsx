import Tabs from "@/components/Tabs";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { FC, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { RatingFCTable } from "./RatingFCTable";
import { RatingPlayerTable } from "./RatingPlayerTable";
import { playersRatingRows, teamRatingRows } from "./mocks";

type TabKey = "clubs" | "players";

const TABS: { key: TabKey; label: string }[] = [
  { key: "clubs", label: "Клубы" },
  { key: "players", label: "Игроки" },
];

type Props = {
  defaultTab?: string;
};

export const RatingTabs: FC<Props> = ({ defaultTab = "clubs" }) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const renderContent = () => {
    switch (activeTab) {
      case "clubs":
        return <RatingFCTable rows={teamRatingRows} />;
      case "players":
        return <RatingPlayerTable rows={playersRatingRows} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Tabs
        tabs={TABS}
        value={activeTab}
        onChange={setActiveTab}
        variant="outline"
        stretch
        size={12}
      />
      <ScrollView>{renderContent()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
