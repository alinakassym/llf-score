import { FC } from "react";
import { Platform, ScrollView, Text } from "react-native";
import { VStack } from "@/components/ui/vstack";
import HomeTopBar from "@/features/HomeTopBar";
import SponsorsRow from "@/features/SponsorsRow";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import Screen from "@/shared/ui/Screen";

const TabHelpScreen: FC = () => {
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
        <VStack className="flex-1 gap-4 p-6">
          <Text style={{ color: colors.textLight }}>
            Раздел "Помощь" - в разработке
          </Text>
        </VStack>
      </ScrollView>
    </Screen>
  );
};

export default TabHelpScreen;
