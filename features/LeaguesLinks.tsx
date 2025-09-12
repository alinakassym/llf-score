// features/LeaguesLinks.tsx
import React, { useEffect, useMemo } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { Divider } from "@/components/ui/divider";
import { leagues as mockLeagues } from "@/shared/mocks/leagues";
import { useAppSelector, useAppDispatch } from "@/shared/store/hooks";
import {
  League,
  fetchLeaguesByCityId,
  selectLeagues,
  selectLeaguesStatus,
} from "@/shared/store/leagues.slice";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Props = {
  cityId: string;
  cityName: string;
};

export default function LeaguesLinks({ cityId, cityName }: Props) {
  const { colors } = useAppTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const leagues: League[] = useAppSelector(selectLeagues);
  const status = useAppSelector(selectLeaguesStatus);

  useEffect(() => {
    if (status === "idle") dispatch(fetchLeaguesByCityId(cityId));
  }, [dispatch, status]);

  const items: League[] = useMemo(
    () => (leagues.length ? leagues : mockLeagues),
    [leagues],
  );

  if (status === "loading") {
    <View
      style={{
        padding: 16,
        backgroundColor: colors.bg,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: colors.textLight,
        }}
      >
        Загрузка...
      </Text>
    </View>;
  }

  if (items.length === 0) {
    return (
      <View
        style={{
          padding: 16,
          backgroundColor: colors.bg,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: colors.textLight,
          }}
        >
          Лиги не найдены
        </Text>
      </View>
    );
  }

  return (
    <>
      {items.map((it, index) => (
        <Pressable
          key={it.id}
          accessibilityRole="button"
          accessibilityLabel={it.name}
          style={{
            backgroundColor: colors.bg,
          }}
          onPress={() =>
            router.push({
              pathname: "/league",
              params: { leagueId: String(it.id) },
            })
          }
        >
          <View
            className="px-4 py-3"
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: colors.bg,
            }}
          >
            <Image source={it.icon as any} style={{ width: 24, height: 24 }} />
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text,
                  fontWeight: 600,
                }}
              >
                {it.name} ({it.leagueGroupName})
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: colors.textLight,
                }}
              >
                {cityName}
              </Text>
            </View>
          </View>
          {index < items.length - 1 && (
            <Divider style={{ backgroundColor: colors.border }} />
          )}
        </Pressable>
      ))}
    </>
  );
}
