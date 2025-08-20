import DrawerPicker from "@/shared/ui/DrawerPicker";
import type { DrawerItem } from "@/shared/ui/DrawerPicker";
import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import {
  fetchCities,
  selectCities,
  selectCitiesStatus,
  selectCitiesError,
} from "@/shared/store/cities.slice";

export default function CityPicker(props: {
  value?: string;
  onChange?: (id: string) => void;
}) {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);
  const status = useAppSelector(selectCitiesStatus);
  const error = useAppSelector(selectCitiesError);
  console.log("CityPicker", { cities, status, error });

  useEffect(() => {
    if (status === "idle") dispatch(fetchCities());
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <View style={{ padding: 16 }}>
        <ActivityIndicator />
        <Text>Загружаем города…</Text>
      </View>
    );
  }

  if (status === "failed") {
    return (
      <View style={{ padding: 16 }}>
        <Text>Ошибка: {error}</Text>
      </View>
    );
  }

  const items: DrawerItem[] = cities.map((c) => ({
    label: c.name,
    id: c.id,
    icon: c.icon,
  }));
  return (
    <DrawerPicker
      items={items}
      value={props.value}
      onChange={props.onChange}
      showItemIcon
    />
  );
}
