import { Option, Select } from "@/components/Select";
import { selectCityId } from "@/store/general.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  League,
  fetchLeaguesByCityId,
  selectLeaguesByCity,
  selectLeaguesLoadingForCity,
} from "@/store/leagues.slice";
import React, { FC, useEffect, useState } from "react";

type Props = {
  value: string;
  onChange?: (id: string) => void;
  top?: number;
  color?: string;
};

export const LeaguePicker: FC<Props> = ({
  value,
  onChange,
  top,
  color = "#000",
}) => {
  const dispatch = useAppDispatch();
  const cityId: number | string = useAppSelector(selectCityId) ?? "";
  const leagues: League[] = useAppSelector(selectLeaguesByCity(String(cityId)));
  const isLoading = useAppSelector(selectLeaguesLoadingForCity(String(cityId)));
  const [items, setItems] = useState<Option[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (cityId && !hasLoaded && !isLoading && leagues.length === 0) {
      dispatch(fetchLeaguesByCityId(String(cityId)));
      setHasLoaded(true);
    }
  }, [dispatch, cityId, hasLoaded, isLoading, leagues.length]);

  useEffect(() => {
    if (leagues.length) {
      const mappedItems = leagues.map((c) => ({
        label: c.name,
        id: String(c.id),
        icon: undefined,
      }));
      setItems(mappedItems);
    }
  }, [leagues]);

  return (
    <Select
      value={value}
      onChange={onChange || (() => {})}
      options={items}
      top={top}
      color={color}
    />
  );
};
