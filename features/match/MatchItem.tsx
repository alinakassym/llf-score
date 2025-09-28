// shared/ui/MatchItem.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { Image, Pressable, Text, View } from "react-native";
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
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const rightBadge =
    status === "live" ? (
      <Text>LIVE</Text>
    ) : status === "finished" ? (
      score ? (
        <Text>{score}</Text>
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
        <Text style={{ fontSize: 12, fontWeight: "600", color: c.textMuted }}>
          {homeName}
        </Text>
      </View>

      {/* Center: vs */}
      <Text style={{ color: c.textMuted, opacity: 0.6 }}>—</Text>

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
          style={{
            fontSize: 12,
            fontWeight: "600",
            textAlign: "right",
            color: c.textMuted,
          }}
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
