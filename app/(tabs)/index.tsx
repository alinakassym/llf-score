import { FC } from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView
} from "react-native";
import HomeTopBar from '@/features/home/HomeTopBar';
import BannerCarousel from '@/features/home/BannerCarousel';
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { banners } from '@/shared/mocks/banners';

const TabHomeScreen: FC = () => {
  return (
    <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <HomeTopBar />
        <BannerCarousel items={banners} />
        <ScrollView
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <VStack className="pt-6 flex-1 gap-6">
            <Text className="text-2xl font-semibold">
              Home
            </Text>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

export default TabHomeScreen;
