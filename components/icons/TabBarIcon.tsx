import React from 'react';
import { SvgProps } from 'react-native-svg';

import Home from '../../assets/icons/tabs/home.svg';
import HomeActive from '../../assets/icons/tabs/home-active.svg';
import Leagues from '../../assets/icons/tabs/leagues.svg';
import LeaguesActive from '../../assets/icons/tabs/leagues-active.svg';

type TabName = 'home' | 'leagues';

const map: Record<TabName, { active: React.FC<SvgProps>; inactive: React.FC<SvgProps> }> = {
  home: { active: HomeActive, inactive: Home },
  leagues: { active: LeaguesActive, inactive: Leagues },
};

type Props = { name: TabName; focused: boolean; size?: number; color?: string };

export const TabBarIcon: React.FC<Props> = ({ name, focused, size = 22, color }) => {
  const Icon = focused ? map[name].active : map[name].inactive;
  return <Icon width={size} height={size} color={color} />;
};