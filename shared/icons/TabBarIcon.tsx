import React from 'react';
import { SvgProps } from 'react-native-svg';

import Home from '@/assets/icons/tabs/home.svg';
import HomeActive from '@/assets/icons/tabs/home-active.svg';
import HomeFlat from "@/assets/icons/tabs/home-flat.svg";
import Leagues from "@/assets/icons/tabs/leagues.svg";
import LeaguesActive from "@/assets/icons/tabs/leagues-active.svg";
import LeaguesFlat from "@/assets/icons/tabs/leagues-flat.svg";
import Rating from "@/assets/icons/tabs/rating.svg";
import RatingActive from "@/assets/icons/tabs/rating-active.svg";
import RatingFlat from "@/assets/icons/tabs/rating-flat.svg";
import Transfers from "@/assets/icons/tabs/transfers.svg";
import TransfersActive from "@/assets/icons/tabs/transfers-active.svg";
import TransfersFlat from "@/assets/icons/tabs/transfers-flat.svg";
import Help from "@/assets/icons/tabs/help.svg";
import HelpActive from "@/assets/icons/tabs/help-active.svg";
import HelpFlat from "@/assets/icons/tabs/help-flat.svg";

type TabName =
  | "home"
  | "home-flat"
  | "leagues"
  | "leagues-flat"
  | "rating"
  | "rating-flat"
  | "transfers"
  | "transfers-flat"
  | "help"
  | "help-flat";

const map: Record<
  TabName,
  { active: React.FC<SvgProps>; inactive: React.FC<SvgProps> }
> = {
  home: { active: HomeActive, inactive: Home },
  "home-flat": { active: HomeFlat, inactive: HomeFlat },
  leagues: { active: LeaguesActive, inactive: Leagues },
  "leagues-flat": { active: LeaguesFlat, inactive: LeaguesFlat },
  rating: { active: RatingActive, inactive: Rating },
  "rating-flat": { active: RatingFlat, inactive: RatingFlat },
  transfers: { active: TransfersActive, inactive: Transfers },
  "transfers-flat": { active: TransfersFlat, inactive: TransfersFlat },
  help: { active: HelpActive, inactive: Help },
  "help-flat": { active: HelpFlat, inactive: HelpFlat },
};

type Props = { name: TabName; focused: boolean; size?: number; color?: string };

export const TabBarIcon: React.FC<Props> = ({ name, focused, size = 22, color }) => {
  const Icon = focused ? map[name].active : map[name].inactive;
  return <Icon width={size} height={size} fill={color} stroke={color} />;
};