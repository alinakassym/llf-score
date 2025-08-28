import { FC, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Pressable,
  Text,
  ImageSourcePropType,
} from "react-native";
import HomeTopBar from "@/features/HomeTopBar";
import SponsorsRow from "@/features/SponsorsRow";
import PlayerCell from "@/features/PlayerCell";
import Table, { TableColumn } from "@/shared/ui/Table";
import { VStack } from "@/components/ui/vstack";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import { teamRatingRows, TeamRatingRow } from "@/shared/mocks/teamRatingRows";

type TabKey = "teams" | "players";

const TABS: { key: TabKey; label: string }[] = [
  { key: "teams", label: "Клубы" },
  { key: "players", label: "Игроки" },
];

const cols: TableColumn<TeamRatingRow>[] = [
  {
    key: "teamName",
    title: "Клубы",
    width: 180,
    maxWidth: 180,
    render: (r) => (
      <PlayerCell
        name={r.teamName}
        subtext={`${r.cityName},  ${r.league}`}
        avatar={r.image}
      />
    ),
  },
  {
    key: "season1",
    title: "Сезон 1",
    width: 70,
    maxWidth: 70,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "season2",
    title: "Сезон 2",
    width: 70,
    maxWidth: 70,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "season3",
    title: "Сезон 3",
    width: 70,
    maxWidth: 70,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "season4",
    title: "Сезон 4",
    width: 70,
    maxWidth: 70,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "total",
    title: "Очки",
    width: 70,
    maxWidth: 70,
    textAlign: "center",
    headerTextAlign: "center",
  },
];

const TabRaitingScreen: FC = () => {
  const { colors } = useAppTheme();
  const [active, setActive] = useState<TabKey>("teams");
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={{ paddingBottom: 65, backgroundColor: colors.secondaryBg }}
    >
      <SponsorsRow />
      <HomeTopBar />
      <ScrollView
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 0 }}
      >
        <VStack className="flex-1 gap-4">
          <View>
            {/* Верхняя панель табов */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                borderBottomWidth: 1,
                borderColor: colors.border,
              }}
            >
              {TABS.map((t) => {
                const isActive = active === t.key;
                return (
                  <Pressable
                    key={t.key}
                    onPress={() => setActive(t.key)}
                    style={{
                      paddingVertical: 10,
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: isActive
                        ? colors.primary
                        : colors.primaryLight,
                    }}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isActive }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        textTransform: "uppercase",
                        color: isActive ? "#FFF" : colors.primary,
                      }}
                    >
                      {t.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Контент вкладок */}
            <View style={{ paddingLeft: 0 }}>
              {active === "teams" && (
                <Table<TeamRatingRow>
                  columns={cols}
                  data={teamRatingRows}
                  keyExtractor={(r, i) => r.teamName + i}
                  backgroundColor={colors.bg}
                  color={colors.text}
                  borderColor={colors.border}
                  hightlightColor={colors.secondaryBg}
                  scrollX={true}
                />
              )}

              {active === "players" && (
                <Text
                  style={{
                    paddingTop: 16,
                    paddingHorizontal: 16,
                    color: colors.textLight,
                  }}
                >
                  Здесь будет таблица игроков.
                </Text>
              )}
            </View>
          </View>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TabRaitingScreen;
