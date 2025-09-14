import { FC } from "react";
import { Platform, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import MenuGrid from "@/features/MenuGrid";
import Carousel from "@/features/Carousel";
import MatchCarousel from "@/features/MatchCarousel";
import LeagueTable from "@/features/LeagueTable";
import NewsList from "@/features/NewsList";
import LinksColumn from "@/features/LinksColumn";
import Screen from "@/shared/ui/Screen";
import { banners } from "@/shared/mocks/banners";
import { mockMatches } from "@/shared/mocks/matches";

const TabHomeScreen: FC = () => {
  return (
    <Screen>
      <ScrollView
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 0 }}
      >
        <VStack className="flex-1 gap-2 pt-2 mb-6">
          <Carousel items={banners} />
          <MatchCarousel
            matches={mockMatches}
            onMatchPress={(match) => console.log("Match pressed:", match.id)}
          />
          <MenuGrid />
          <LeagueTable />
          <NewsList />
          <LinksColumn />
        </VStack>
      </ScrollView>
    </Screen>
  );
};

export default TabHomeScreen;
