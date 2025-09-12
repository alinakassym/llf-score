import React, { useEffect, useMemo } from "react";
import DrawerPicker, {
  DrawerItem,
  DrawerPickerSkeleton,
} from "@/shared/ui/DrawerPicker";
import { leagues as mockLeagues } from "@/shared/mocks/leagues";
import { useAppSelector, useAppDispatch } from "@/shared/store/hooks";
import {
  League,
  fetchLeaguesByCityId,
  selectLeagues,
  selectLeaguesStatus,
  selectCurrentCityId,
} from "@/shared/store/leagues.slice";

export default function LeaguePicker(props: {
  value?: string;
  onChange?: (id: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const leagues: League[] = useAppSelector(selectLeagues);
  const status = useAppSelector(selectLeaguesStatus);
  const cityId: string = useAppSelector(selectCurrentCityId) ?? "";

  useEffect(() => {
    if (cityId !== "" && status === "idle")
      dispatch(fetchLeaguesByCityId(cityId));
  }, [dispatch, status, cityId]);

  const items: DrawerItem[] = useMemo(
    () =>
      (leagues.length ? leagues : mockLeagues).map((c) => ({
        label: c.name,
        id: c.id.toString(),
        icon: c?.icon,
      })),
    [leagues],
  );

  if (status === "loading") {
    return <DrawerPickerSkeleton label="Город" />;
  }

  return (
    <DrawerPicker
      items={items}
      value={props.value}
      onChange={props.onChange}
      showItemIcon={false}
      marginTop={184}
      open={props.open}
      onOpenChange={props.onOpenChange}
    />
  );
}
