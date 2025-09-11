import { FC } from "react";
import { Platform, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import HomeTopBar from "@/features/HomeTopBar";
import CitiesAccordion from "@/features/CitiesAccordion";
import SponsorsRow from "@/features/SponsorsRow";
import Screen from "@/shared/ui/Screen";

const TabLeaguesScreen: FC = () => {
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
        <VStack className="flex-1">
          <CitiesAccordion />
        </VStack>
      </ScrollView>
    </Screen>
  );
};

export default TabLeaguesScreen;
