import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { Link } from "expo-router";
import React, { FC } from "react";
import { StyleProp, Text, ViewStyle } from "react-native";

type Props = {
  href: string;
  title: string;
  style?: StyleProp<ViewStyle>;
  color?: string;
};

export const LinkButton: FC<Props> = ({ href, title, style, color }) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <Link href={href as any} style={style}>
      <Text style={{ color: color || c.secondary }}>{title}</Text>
    </Link>
  );
};

export default LinkButton;
