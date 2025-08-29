import { FC } from "react";
import { Platform, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import HomeTopBar from "@/features/HomeTopBar";
import SponsorsRow from "@/features/SponsorsRow";
import FaqAccordion from "@/features/FaqAccordion";
import FeedbackForm from "@/features/FeedbackForm";
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
        <VStack className="flex-1 gap-4">
          <FaqAccordion />
          <FeedbackForm
            onSubmit={(text) => {
              // TODO: сюда позже подключим отправку на бекенд/почту/телеграм
              console.log("feedback:", text);
            }}
          />
        </VStack>
      </ScrollView>
    </Screen>
  );
};

export default TabHelpScreen;
