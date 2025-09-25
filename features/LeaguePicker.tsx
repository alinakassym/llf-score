import { Option, Select } from "@/components/Select";
import React, { FC } from "react";

const LEAGUES: Option[] = [
  { id: "pl", label: "Премьер лига" },
  { id: "fl", label: "Первая лига" },
  { id: "youth", label: "Юношеская" },
  { id: "leagueA", label: "Лига A" },
  { id: "leagueB", label: "Лига B" },
  { id: "leagueC", label: "Лига C" },
];

type Props = {
  value: number | string;
  onChange: (id: number | string) => void;
  top?: number;
};

export const LeaguePicker: FC<Props> = ({ value, onChange, top }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={LEAGUES}
      top={top}
    />
  );
};