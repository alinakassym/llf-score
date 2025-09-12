import React from "react";
import { SvgProps } from "react-native-svg";

import home from "@/assets/icons/vuesax/home.svg";
import arrangeSquare from "@/assets/icons/vuesax/arrange-square.svg";
import arrow2 from "@/assets/icons/vuesax/arrow-2.svg";
import cup from "@/assets/icons/vuesax/cup.svg";

type IconName = "home" | "arrange-square" | "arrow-2" | "cup";

const map: Record<IconName, React.FC<SvgProps>> = {
  home,
  "arrange-square": arrangeSquare,
  "arrow-2": arrow2,
  cup,
};

type Props = { name: IconName; size?: number; color?: string };

export const VuesaxIcon: React.FC<Props> = ({ name, size = 22, color }) => {
  const Icon = map[name];
  return <Icon width={size} height={size} fill={color} stroke={color} />;
};
