// features/LeaguesLinks.tsx
import React, { ReactNode } from "react";
import {
  Image,
  View,
  Text,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import { Divider } from "@/components/ui/divider";

type Props = {
  cityName: string;
};

export type LeaguesEntry = {
  id: string;
  title: string;
  content: ReactNode;
  cityName: string;
  image?: ImageSourcePropType;
};

const items: LeaguesEntry[] = [
  {
    id: "1",
    title: "Премьер-лига",
    content: "В разработке...",
    cityName: "Астана",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: "2",
    title: "Супер-лига",
    content: "В разработке...",
    cityName: "Астана",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: "3",
    title: "Мастер лига",
    content: "В разработке...",
    cityName: "Астана",
    image: require("@/assets/images/cities/astana.png"),
  },
];

export default function LeaguesLinks({ cityName = "" }: Props) {
  const { colors } = useAppTheme();

  return (
    <>
      {items.map((it, index) => (
        <Pressable
          key={it.id}
          accessibilityRole="button"
          accessibilityLabel={it.title}
          style={{
            backgroundColor: colors.bg,
          }}
        >
          <View
            className="px-4 py-3"
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: colors.bg,
            }}
          >
            <Image source={it.image as any} style={{ width: 24, height: 24 }} />
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text,
                  fontWeight: 600,
                }}
              >
                {it.title}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: colors.textLight,
                }}
              >
                {cityName}
              </Text>
            </View>
          </View>
          {index < items.length - 1 && (
            <Divider style={{ backgroundColor: colors.border }} />
          )}
        </Pressable>
      ))}
    </>
  );
}
