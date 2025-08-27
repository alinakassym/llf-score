import { FC } from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView
} from "react-native";
import HomeTopBar from "@/features/HomeTopBar";
import MenuGrid from "@/features/MenuGrid";
import Carousel from "@/features/Carousel";
import { VStack } from "@/components/ui/vstack";
import { banners } from "@/shared/mocks/banners";
import HomeAccordionPreview from "@/features/HomeAccordionPreview";
import NewsList from "@/features/NewsList";
import SponsorsRow from "@/features/SponsorsRow";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

const TabHomeScreen: FC = () => {
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
        <VStack className="flex-1 gap-4 pt-4">
          <Carousel items={banners} />
          <MenuGrid />
          <HomeAccordionPreview />
          <NewsList />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TabHomeScreen;
