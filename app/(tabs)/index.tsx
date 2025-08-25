import { FC } from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView
} from "react-native";
import HomeTopBar from "@/features/HomeTopBar";
import MenuGrid from "@/features/MenuGrid";
import BannerCarousel from "@/features/BannerCarousel";
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
      style={{ backgroundColor: colors.secondaryBg }}
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
          <BannerCarousel items={banners} />
          <MenuGrid />
          <HomeAccordionPreview />
          <NewsList />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TabHomeScreen;
