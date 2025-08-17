import { FC } from "react";
import {
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

const TabLeaguesScreen: FC = () => {
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <VStack className="flex-1 px-6 py-8 gap-6">
          <Text className="text-2xl font-semibold">
            Leagues
          </Text>
        </VStack>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default TabLeaguesScreen;
