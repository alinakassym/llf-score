import DrawerPicker, {
  DrawerItem,
  DrawerPickerSkeleton,
} from "@/shared/ui/DrawerPicker";
import { useEffect, useMemo } from "react";
import { cities as mockCities } from "@/shared/mocks/cities";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import {
  fetchCities,
  selectCities,
  selectCitiesStatus,
} from "@/shared/store/cities.slice";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export default function CityPicker(props: {
  value?: string;
  onChange?: (id: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const { colors } = useAppTheme();
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);
  const status = useAppSelector(selectCitiesStatus);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCities());
  }, [dispatch, status]);

  const items: DrawerItem[] = useMemo(
    () =>
      (cities.length ? cities : mockCities).map((c) => ({
        label: c.name,
        id: c.id,
        icon: c?.icon,
      })),
    [cities],
  );

  if (status === "loading") {
    return (
      <DrawerPickerSkeleton
        label="Город"
        color={colors.text}
        chevronColor={colors.text}
      />
    );
  }

  return (
    <DrawerPicker
      items={items}
      value={props.value}
      onChange={props.onChange}
      open={props.open}
      onOpenChange={props.onOpenChange}
      color={colors.text}
      chevronColor={colors.text}
      backgroundColor={colors.bg}
      marginTop={184}
      showItemIcon
    />
  );
}
