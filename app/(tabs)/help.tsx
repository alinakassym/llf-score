import { FC } from "react";
import { Platform, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import HomeTopBar from "@/features/HomeTopBar";
import SponsorsRow from "@/features/SponsorsRow";
import FaqAccordion from "@/features/FaqAccordion";
import Screen from "@/shared/ui/Screen";

const TabHelpScreen: FC = () => {
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
          <FaqAccordion />
        </VStack>
      </ScrollView>
    </Screen>
  );
};

export default TabHelpScreen;
