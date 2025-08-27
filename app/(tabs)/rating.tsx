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

type TabKey = "teams" | "players";

const TABS: { key: TabKey; label: string }[] = [
  { key: "teams", label: "Клубы" },
  { key: "players", label: "Игроки" },
];

type teamRatingRow = {
  teamName: string;
  cityName: string;
  league: string;
  season1: number;
  season2: number;
  season3: number;
  season4: number;
  total: number;
  image?: any;
};

const cols: TableColumn<teamRatingRow>[] = [
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

const rows: teamRatingRow[] = [
  {
    teamName: "БИИК Шымкент",
    cityName: "Шымкент",
    league: "Мастер-лига",
    season1: 30,
    season2: 31,
    season3: 33,
    season4: 42,
    total: 136,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    teamName: "Актобе",
    cityName: "Актобе",
    league: "Мастер-лига",
    season1: 28,
    season2: 32,
    season3: 34,
    season4: 39,
    total: 133,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    teamName: "Tomiris-Turan",
    cityName: "Туркестан",
    league: "Мастер-лига",
    season1: 27,
    season2: 29,
    season3: 30,
    season4: 35,
    total: 121,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    teamName: "Кайрат",
    cityName: "Алматы",
    league: "Мастер-лига",
    season1: 25,
    season2: 28,
    season3: 29,
    season4: 33,
    total: 115,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    teamName: "Елимай",
    cityName: "Семей",
    league: "Мастер-лига",
    season1: 24,
    season2: 26,
    season3: 28,
    season4: 31,
    total: 109,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    teamName: "Кызылжар",
    cityName: "Петропавловск",
    league: "Мастер-лига",
    season1: 23,
    season2: 24,
    season3: 26,
    season4: 30,
    total: 103,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    teamName: "Улытай",
    cityName: "Жезказган",
    league: "Мастер-лига",
    season1: 22,
    season2: 23,
    season3: 25,
    season4: 28,
    total: 98,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    teamName: "Zhenis Astana",
    cityName: "Астана",
    league: "Мастер-лига",
    season1: 21,
    season2: 22,
    season3: 24,
    season4: 27,
    total: 94,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    teamName: "Тобол",
    cityName: "Костанай",
    league: "Мастер-лига",
    season1: 19,
    season2: 21,
    season3: 22,
    season4: 25,
    total: 87,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    teamName: "Астана",
    cityName: "Астана",
    league: "Мастер-лига",
    season1: 18,
    season2: 20,
    season3: 21,
    season4: 23,
    total: 82,
    image: require("@/assets/images/adaptive-icon.png"),
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
                <Table<teamRatingRow>
                  columns={cols}
                  data={rows}
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
