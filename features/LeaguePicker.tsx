import { Option, Select } from "@/components/Select";
import { selectCityId } from "@/store/general.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  League,
  fetchLeaguesByCityId,
  selectLeagues,
  selectLeaguesError,
  selectLeaguesStatus,
} from "@/store/leagues.slice";
import React, { FC, useEffect, useState } from "react";

type Props = {
  value: number | string;
  onChange?: (id: number | string) => void;
  top?: number;
};

export const LeaguePicker: FC<Props> = ({ value, onChange, top }) => {
  const dispatch = useAppDispatch();
  const leagues: League[] = useAppSelector(selectLeagues);
  const status = useAppSelector(selectLeaguesStatus);
  const error = useAppSelector(selectLeaguesError);
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
        id: c.id,
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
    />
  );
};
