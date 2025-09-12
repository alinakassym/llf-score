import { FC, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import RatingTable from "@/features/rating/RatingTable";
import PlayersTable from "@/features/rating/PlayersTable";
import { VStack } from "@/components/ui/vstack";
import Screen from "@/shared/ui/Screen";
import Tabs from "@/shared/ui/Tabs";

type TabKey = "teams" | "players";

const TABS: { key: TabKey; label: string }[] = [
  { key: "teams", label: "Клубы" },
  { key: "players", label: "Игроки" },
];

const TabRaitingScreen: FC = () => {
  const [active, setActive] = useState<TabKey>("teams");
  return (
    <Screen>
      <ScrollView
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 0 }}
      >
        <VStack className="flex-1 gap-4">
          <View>
            <Tabs
              tabs={TABS}
              value={active}
              onChange={setActive}
              variant="outline"
              stretch
              size={12}
              style={{ marginBottom: 0 }}
            />

            {/* Контент вкладок */}
            <View style={{ paddingLeft: 0 }}>
              {active === "teams" && <RatingTable />}
              {active === "players" && <PlayersTable />}
            </View>
          </View>
        </VStack>
      </ScrollView>
    </Screen>
  );
};

export default TabRaitingScreen;
