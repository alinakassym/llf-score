// shared/ui/MatchItem.tsx
import { View, Image, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Badge, BadgeText } from "@/components/ui/badge";

export type MatchStatus = "finished" | "live" | "scheduled";

export type MatchItemProps = {
  id: string;
  homeName: string;
  awayName: string;
  homeLogo: any; // ImageSourcePropType
  awayLogo: any; // ImageSourcePropType
  score?: string; // "2:1" (если finished/live), пусто для scheduled
  dateISO?: string; // для scheduled
  status: MatchStatus;
  onPress?: (id: string) => void;
};

export default function MatchItem({
  id,
  homeName,
  awayName,
  homeLogo,
  awayLogo,
  score,
  dateISO,
  status,
  onPress,
}: MatchItemProps) {
  const rightBadge =
    status === "live" ? (
      <Badge size="sm" action="error" className="w-fit justify-center">
        <BadgeText>LIVE</BadgeText>
      </Badge>
    ) : status === "finished" ? (
      score ? (
        <Badge size="sm" action="success" className="w-fit justify-center">
          <BadgeText>{score}</BadgeText>
        </Badge>
      ) : null
    ) : (
      // scheduled
      <Text style={{ fontSize: 12, opacity: 0.8 }}>
        {dateISO ? new Date(dateISO).toLocaleTimeString().slice(0, 5) : ""}
      </Text>
    );

  return (
    <Pressable
      onPress={() => onPress?.(id)}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
      }}
    >
      {/* Home */}
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}
      >
        <Image
          source={homeLogo}
          style={{ width: 24, height: 24, borderRadius: 4 }}
        />
        <Text numberOfLines={1} style={{ fontWeight: "600" }}>
          {homeName}
        </Text>
      </View>

      {/* Center: vs */}
      <Text style={{ opacity: 0.6 }}>—</Text>

      {/* Away */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Text
          numberOfLines={1}
          style={{ fontWeight: "600", textAlign: "right" }}
        >
          {awayName}
        </Text>
        <Image
          source={awayLogo}
          style={{ width: 24, height: 24, borderRadius: 4 }}
        />
      </View>

      {/* Right badge */}
      <View style={{ width: 56, alignItems: "flex-end" }}>{rightBadge}</View>
    </Pressable>
  );
}
