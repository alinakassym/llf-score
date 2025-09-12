import { FC } from "react";
import { Platform, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import CitiesAccordion from "@/features/CitiesAccordion";
import Screen from "@/shared/ui/Screen";

const TabLeaguesScreen: FC = () => {
  return (
    <Screen>
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
