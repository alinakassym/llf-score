// features/MatchCard.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import { Match } from "@/shared/types/match";

type Props = {
  match: Match;
  onPress?: (match: Match) => void;
};

export default function MatchCard({ match, onPress }: Props) {
  const { colors } = useAppTheme();

  const handlePress = () => {
    onPress?.(match);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: colors.bg,
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* Tournament and time header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.red,
            }}
          />
          <Text
            style={{
              color: colors.textMuted,
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            {match.tournament}
          </Text>
        </View>
        <Text
          style={{
            color: colors.textMuted,
            fontSize: 12,
            fontWeight: "500",
          }}
        >
          {match.time}
        </Text>
      </View>

      {/* Teams and score */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Home team */}
        <View style={{ alignItems: "center", flex: 1 }}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: colors.primary,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: colors.secondary,
                borderRadius: 4,
              }}
            />
          </View>
          <Text
            style={{
              color: colors.text,
              fontSize: 14,
              fontWeight: "700",
              textAlign: "center",
            }}
            numberOfLines={1}
          >
            {match.homeTeam.name}
          </Text>
          {match.homeTeam.city && (
            <Text
              style={{
                color: colors.textMuted,
                fontSize: 11,
                textAlign: "center",
                marginTop: 2,
              }}
            >
              {match.homeTeam.city}
            </Text>
          )}
        </View>

        {/* Score */}
        <View style={{ alignItems: "center", minWidth: 80 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 28,
                fontWeight: "700",
              }}
            >
              {match.homeScore ?? "—"}
            </Text>
            <Text
              style={{
                color: colors.textMuted,
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              -
            </Text>
            <Text
              style={{
                color: colors.text,
                fontSize: 28,
                fontWeight: "700",
              }}
            >
              {match.awayScore ?? "—"}
            </Text>
          </View>
          {match.isLive && (
            <View
              style={{
                backgroundColor: colors.red,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: "700",
                }}
              >
                Live
              </Text>
            </View>
          )}
        </View>

        {/* Away team */}
        <View style={{ alignItems: "center", flex: 1 }}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: colors.primary,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: colors.secondary,
                borderRadius: 4,
              }}
            />
          </View>
          <Text
            style={{
              color: colors.text,
              fontSize: 14,
              fontWeight: "700",
              textAlign: "center",
            }}
            numberOfLines={1}
          >
            {match.awayTeam.name}
          </Text>
          {match.awayTeam.city && (
            <Text
              style={{
                color: colors.textMuted,
                fontSize: 11,
                textAlign: "center",
                marginTop: 2,
              }}
            >
              {match.awayTeam.city}
            </Text>
          )}
        </View>
      </View>

      {/* Match details */}
      {match.round && (
        <View
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.textMuted,
              fontSize: 12,
              textAlign: "center",
            }}
          >
            {match.round}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}