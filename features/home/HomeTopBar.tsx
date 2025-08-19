import React, { useState } from 'react';
import { View } from 'react-native';
import IconButton from '@/shared/ui/IconButton';
import CityPicker from '@/features/home/CityPicker';
import LeaguePicker from '@/features/home/LeaguePicker';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  setCityId, setLeagueId,
  selectCityId, selectLeagueId,
} from '@/shared/store/general.slice';

export default function HomeTopBar() {
  const dispatch = useAppDispatch();
  const cityId   = useAppSelector(selectCityId);
  const leagueId = useAppSelector(selectLeagueId);

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12, backgroundColor: '#fff', borderBottomColor: '#ECEDEF', borderBottomWidth: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <CityPicker value={cityId} onChange={(id) => dispatch(setCityId(id))}/>
          <LeaguePicker value={leagueId} onChange={(id) => dispatch(setLeagueId(id))} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <IconButton name="search" accessibilityLabel="Поиск" />
          <IconButton name="notifications-outline" dot accessibilityLabel="Уведомления" />
          <IconButton name="person-circle-outline" accessibilityLabel="Профиль" />
        </View>
      </View>
    </View>
  );
}
