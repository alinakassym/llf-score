import { Select } from "@/components/Select";
import { selectCities } from "@/store/cities.slice";
import { useAppSelector } from "@/store/hooks";
import React, { FC } from "react";

type Props = {
  value: string;
  onChange: (id: string) => void;
  top?: number;
};

export const CityPicker: FC<Props> = ({ value, onChange, top }) => {
  const cities = useAppSelector(selectCities);

  return (
    <Select
      value={value}
      onChange={onChange}
      options={cities.map((c) => ({ id: c.id, label: c.name, icon: c.icon }))}
      top={top}
    />
  );
};
