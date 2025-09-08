import { FC } from "react";
import { Platform, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import HomeTopBar from "@/features/HomeTopBar";
import LeaguesLinks from "@/features/LeaguesLinks";
import CitiesAccordion from "@/features/CitiesAccordion";
import SponsorsRow from "@/features/SponsorsRow";
import Screen from "@/shared/ui/Screen";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

const TabLeaguesScreen: FC = () => {
  const { colors } = useAppTheme();
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
