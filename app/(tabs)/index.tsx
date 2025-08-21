import { FC } from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView
} from "react-native";
import HomeTopBar from '@/features/home/HomeTopBar';
import MenuGrid from "@/features/home/MenuGrid";
import BannerCarousel from "@/features/home/BannerCarousel";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { banners } from "@/shared/mocks/banners";

const TabHomeScreen: FC = () => {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <HomeTopBar />
      <ScrollView
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <VStack className="flex-1 gap-6">
          <BannerCarousel items={banners} />
          <MenuGrid />
          <Text className="text-2xl font-semibold">Home</Text>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TabHomeScreen;
