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
import React, { FC, useEffect, useMemo } from "react";
import { Text } from "react-native";

type Props = {
  value: number | string;
  onChange?: (id: number | string) => void;
  top?: number;
};

export const LeaguePicker: FC<Props> = ({ value, onChange, top }) => {
  console.log("LeaguePicker value: ", value);
  const dispatch = useAppDispatch();
  const leagues: League[] = useAppSelector(selectLeagues);
  const status = useAppSelector(selectLeaguesStatus);
  const error = useAppSelector(selectLeaguesError);
  const cityId: number | string = useAppSelector(selectCityId) ?? "";

  useEffect(() => {
    console.log("LeaguePicker cityId: ", cityId);
    console.log("LeaguePicker status: ", status);
    if (status === "idle") {
      console.log("IFFF LeaguePicker cityId: ", cityId);
      dispatch(fetchLeaguesByCityId(cityId));

      console.log("IFFF LeaguePicker error: ", error);
    }
  }, [dispatch, cityId, status]);

  const items: Option[] = useMemo(
    () =>
      (leagues.length
        ? leagues
        : [{ name: "Test league", id: 0, icon: "" }]
      ).map((c) => ({
        label: c.name,
        id: c.id.toString(),
        icon: undefined,
      })),
    [leagues],
  );
  if (status === "loading") {
    return <Text>Загрузка</Text>;
  }

  return (
    <Select
      value={value}
      onChange={onChange || (() => {})}
      options={items}
      top={top}
    />
  );
};
