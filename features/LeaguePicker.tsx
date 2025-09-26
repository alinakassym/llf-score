import { Option, Select } from "@/components/Select";
import { selectCityId } from "@/store/general.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  League,
  fetchLeaguesByCityId,
  selectLeagues,
  selectLeaguesStatus,
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
  const leagues: League[] = useAppSelector(selectLeagues);
  const status = useAppSelector(selectLeaguesStatus);
  const cityId: number | string = useAppSelector(selectCityId) ?? "";
  const [items, setItems] = useState<Option[]>([]);

  useEffect(() => {
    if (cityId && status === "idle") {
      dispatch(fetchLeaguesByCityId(cityId));
    }
  }, [dispatch, cityId, status]);

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
