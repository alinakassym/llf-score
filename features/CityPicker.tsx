import { Select } from "@/components/Select";
import {
  fetchCities,
  selectCities,
  selectCitiesStatus,
} from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { FC, useEffect } from "react";

type Props = {
  value: string;
  onChange?: (id: string) => void;
  top?: number;
  color?: string;
};

export const CityPicker: FC<Props> = ({
  value,
  onChange,
  top,
  color = "#000",
}) => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectCities);
  const status = useAppSelector(selectCitiesStatus);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCities());
  }, [dispatch, status]);

  return (
    <Select
      value={value}
      onChange={onChange || (() => {})}
      options={cities.map((c) => ({ id: c.id, label: c.name, icon: c.icon }))}
      top={top}
      color={color}
    />
  );
};
