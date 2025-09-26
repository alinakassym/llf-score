import { Select } from "@/components/Select";
import {
  fetchCities,
  selectCities,
  selectCitiesStatus,
} from "@/store/cities.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { FC, useEffect } from "react";

type Props = {
  value: number | string;
  onChange?: (id: number | string) => void;
  top?: number;
};

export const CityPicker: FC<Props> = ({ value, onChange, top }) => {
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
    />
  );
};
