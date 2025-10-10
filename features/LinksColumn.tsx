import LinkRow from "@/features/LinkRow";
import { View } from "react-native";

export default function LinksColumn() {
  return (
    <View style={{ paddingHorizontal: 0 }}>
      <LinkRow label="План соревнований" />
      <LinkRow label="Регламент" href="/regulations" />
      <LinkRow label="Правила" />
      <LinkRow label="Контакты" showDivider={false} />
    </View>
  );
}
