import React from "react";
import { SvgProps } from "react-native-svg";

import home from "@/assets/icons/vuesax/home.svg";
import home2 from "@/assets/icons/vuesax/home2.svg";
import arrangeSquare from "@/assets/icons/vuesax/arrange-square.svg";
import arrow2 from "@/assets/icons/vuesax/arrow2.svg";
import cup from "@/assets/icons/vuesax/cup.svg";
import ranking from "@/assets/icons/vuesax/ranking.svg";

type IconName =
  | "home"
  | "home2"
  | "arrange-square"
  | "arrow2"
  | "cup"
  | "ranking";

const map: Record<IconName, React.FC<SvgProps>> = {
  home,
  home2,
  "arrange-square": arrangeSquare,
  arrow2,
  cup,
  ranking,
};

type Props = { name: IconName; size?: number; color?: string };

export const VuesaxIcon: React.FC<Props> = ({ name, size = 22, color }) => {
  const Icon = map[name];
  return <Icon width={size} height={size} fill={color} stroke={color} />;
};
