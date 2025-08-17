import React from 'react';
import { SvgProps } from 'react-native-svg';

import Home from '@/assets/icons/tabs/home.svg';
import HomeActive from '@/assets/icons/tabs/home-active.svg';
import Leagues from '@/assets/icons/tabs/leagues.svg';
import LeaguesActive from '@/assets/icons/tabs/leagues-active.svg';
import Rating from '@/assets/icons/tabs/rating.svg';
import RatingActive from '@/assets/icons/tabs/rating-active.svg';
import Transfers from '@/assets/icons/tabs/transfers.svg';
import TransfersActive from '@/assets/icons/tabs/transfers-active.svg';
import Help from '@/assets/icons/tabs/help.svg';
import HelpActive from '@/assets/icons/tabs/help-active.svg';

type TabName = 'home' | 'leagues' | 'rating' | 'transfers' | 'help';

const map: Record<TabName, { active: React.FC<SvgProps>; inactive: React.FC<SvgProps> }> = {
  home: { active: HomeActive, inactive: Home },
  leagues: { active: LeaguesActive, inactive: Leagues },
  rating: { active: RatingActive, inactive: Rating },
  transfers: { active: TransfersActive, inactive: Transfers },
  help: { active: HelpActive, inactive: Help },
};

type Props = { name: TabName; focused: boolean; size?: number; color?: string };

export const TabBarIcon: React.FC<Props> = ({ name, focused, size = 22, color }) => {
  const Icon = focused ? map[name].active : map[name].inactive;
  return <Icon width={size} height={size} color={color} />;
};