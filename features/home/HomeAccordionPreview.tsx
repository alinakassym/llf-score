// features/home/HomeAccordionPreview.tsx
import Accordion, { AccordionEntry } from "@/shared/ui/Accordion";
import { View } from "react-native";

const items: AccordionEntry[] = [
  {
    id: "live",
    title: "LIVE трансляции",
    content: "Смотрите текущие матчи в прямом эфире.",
  },
  {
    id: "schedule",
    title: "Расписание",
    content: "Матчи на этой неделе и в следующие даты.",
  },
  {
    id: "results",
    title: "Результаты",
    content: "Итоги последних игр и турнирная таблица.",
  },
];

export default function HomeAccordionPreview() {
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
      <Accordion items={items} defaultOpenIds={["live"]} />
    </View>
  );
}
