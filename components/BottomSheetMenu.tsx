import { TabIcon } from "@/components/icons";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { FC, useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type MenuOption = {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  options: MenuOption[];
};

export const BottomSheetMenu: FC<Props> = ({ visible, onClose, options }) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const translateY = useSharedValue(300);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withTiming(300, { duration: 250 });
      opacity.value = withTiming(0, { duration: 250 });
    }
  }, [visible]);

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} style={{ flex: 1 }}>
        <Animated.View style={[styles.backdrop, animatedBackdropStyle]} />
      </Pressable>

      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: c.background,
            borderTopColor: c.border,
          },
          animatedSheetStyle,
        ]}
      >
        <View style={[styles.handle, { backgroundColor: c.textMuted }]} />

        {options.map((option, index) => (
          <React.Fragment key={option.id}>
            <Pressable
              onPress={() => {
                option.onPress();
                onClose();
              }}
              style={({ pressed }) => [
                styles.option,
                {
                  backgroundColor: pressed
                    ? scheme === "light"
                      ? "#F5F5F5"
                      : "rgba(255,255,255,0.06)"
                    : "transparent",
                },
              ]}
            >
              <TabIcon name={option.icon} size={24} color={c.text} />
              <Text style={[styles.optionText, { color: c.text }]}>
                {option.label}
              </Text>
            </Pressable>
            {index < options.length - 1 && (
              <View style={[styles.separator, { backgroundColor: c.border }]} />
            )}
          </React.Fragment>
        ))}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    paddingBottom: 34,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
    opacity: 0.3,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  separator: {
    height: 1,
    marginHorizontal: 20,
    opacity: 0.3,
  },
});
