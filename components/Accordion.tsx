import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC, ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  title: string | ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
};

export const Accordion: FC<Props> = ({
  title,
  children,
  defaultOpen = false,
  onToggle,
}) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const contentHeight = useSharedValue(defaultOpen ? 1 : 0);
  const rotateValue = useSharedValue(defaultOpen ? 1 : 0);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);

    // Анимация контента
    contentHeight.value = withTiming(newState ? 1 : 0, {
      duration: 200,
    });

    // Анимация поворота стрелки
    rotateValue.value = withTiming(newState ? 1 : 0, {
      duration: 200,
    });
  };

  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: contentHeight.value,
    transform: [{ scaleY: contentHeight.value }],
  }));

  const animatedChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateValue.value * 180}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleToggle}
        style={({ pressed }) => [
          styles.header,
          {
            backgroundColor: pressed
              ? scheme === "light"
                ? "#F5F5F5"
                : "rgba(255,255,255,0.06)"
              : "transparent",
          },
        ]}
      >
        {typeof title === "string" ? (
          <Text style={[styles.title, { color: c.text }]}>{title}</Text>
        ) : (
          title
        )}
        <Animated.View style={animatedChevronStyle}>
          <Ionicons name="chevron-down" size={20} color={c.text} />
        </Animated.View>
      </Pressable>

      {isOpen && (
        <Animated.View style={[styles.content, animatedContentStyle]}>
          {children}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  content: {
    transformOrigin: "top",
  },
});