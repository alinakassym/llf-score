import LinkRow from "@/features/LinkRow";
import { View } from "react-native";

export default function LinksColumn() {
  return (
    <View style={{ paddingHorizontal: 0 }}>
      <LinkRow label="План соревнований" href="/competition-plan" />
      <LinkRow label="Регламент" href="/regulations" />
      <LinkRow label="Правила" href="/rules" />
      <LinkRow label="Контакты" href="/contacts" showDivider={false} />
    </View>
  );
}
