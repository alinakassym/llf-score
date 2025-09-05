import { FC } from "react";
import { Platform, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import HomeTopBar from "@/features/HomeTopBar";
import MenuGrid from "@/features/MenuGrid";
import Carousel from "@/features/Carousel";
import LeaguesAccordion from "@/features/LeaguesAccordion";
import NewsList from "@/features/NewsList";
import SponsorsRow from "@/features/SponsorsRow";
import LinksColumn from "@/features/LinksColumn";
import Screen from "@/shared/ui/Screen";
import { banners } from "@/shared/mocks/banners";

const TabHomeScreen: FC = () => {
  return (
    <Screen>
      <SponsorsRow />
      <HomeTopBar />
      <ScrollView
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 0 }}
      >
        <VStack className="flex-1 gap-4 pt-4 mb-6">
          <Carousel items={banners} />
          <MenuGrid />
          <LeaguesAccordion showTabs={true} />
          <NewsList />
          <LinksColumn />
        </VStack>
      </ScrollView>
    </Screen>
  );
};

export default TabHomeScreen;
