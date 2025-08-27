import { FC } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import HomeTopBar from "@/features/HomeTopBar";
import HomeAccordionPreview from "@/features/HomeAccordionPreview";
import { VStack } from "@/components/ui/vstack";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import SponsorsRow from "@/features/SponsorsRow";

const TabLeaguesScreen: FC = () => {
  const { colors } = useAppTheme();
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
          <HomeAccordionPreview />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TabLeaguesScreen;
