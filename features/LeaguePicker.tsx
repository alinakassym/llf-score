import { Select } from "@/components/Select";
import { useAppSelector } from "@/store/hooks";
import { selectLeagues } from "@/store/leagues.slice";
import React, { FC } from "react";
import { Text, View } from "react-native";

type Props = {
  value: number | string;
  onChange: (id: number | string) => void;
  top?: number;
};

export const LeaguePicker: FC<Props> = ({ value, onChange, top }) => {
  const leagues = useAppSelector(selectLeagues) ?? [];
  const mappedItems =
    leagues.length > 0 ? leagues.map((l) => ({ id: l.id, label: l.name })) : [];

  if (mappedItems.length === 0) {
    return (
      <View>
        <Text>Загрузка</Text>
      </View>
    );
  }

  return (
    <Select value={value} onChange={onChange} options={mappedItems} top={top} />
  );
};
