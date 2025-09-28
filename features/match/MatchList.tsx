// shared/ui/MatchList.tsx
import { View } from "react-native";
import MatchItem, { MatchItemProps } from "./MatchItem";

export default function MatchList({ items }: { items: MatchItemProps[] }) {
  return (
    <View style={{ backgroundColor: "transparent" }}>
      {items.map((m) => (
        <View
          key={m.id}
          style={{ borderBottomWidth: 1, borderBottomColor: "#ECEDEF" }}
        >
          <MatchItem {...m} />
        </View>
      ))}
    </View>
  );
}
