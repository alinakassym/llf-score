import Tabs, { TabItem } from "@/components/Tabs";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { FC, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { clubRatingMock, playerRatingMock } from "./mocks";
import { ClubRating, PlayerRating, RatingTab } from "./types";

const ratingTabs: TabItem<RatingTab>[] = [
  { key: "clubs", label: "Клубы" },
  { key: "players", label: "Игроки" },
];

type Props = {
  defaultTab?: RatingTab;
};

export const RatingTabs: FC<Props> = ({ defaultTab = "clubs" }) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [activeTab, setActiveTab] = useState<RatingTab>(defaultTab);

  const renderClubItem = (club: ClubRating, index: number) => {
    const changeIcon = club.change === 0 ? "—" : club.change! > 0 ? "↑" : "↓";
    const changeColor =
      club.change === 0 ? c.textMuted : club.change! > 0 ? c.success : c.error;

    return (
      <View
        key={club.id}
        style={[
          styles.ratingItem,
          { backgroundColor: c.card, borderColor: c.border },
          index === 0 && styles.firstItem,
        ]}
      >
        <View style={styles.positionContainer}>
          <Text style={[styles.position, { color: c.text }]}>
            {club.position}
          </Text>
          <Text style={[styles.change, { color: changeColor }]}>
            {changeIcon}
          </Text>
        </View>

        <View style={styles.clubInfo}>
          {club.logo && <Image source={club.logo} style={styles.clubLogo} />}
          <View style={styles.clubDetails}>
            <Text style={[styles.clubName, { color: c.text }]}>
              {club.name}
            </Text>
            <Text style={[styles.clubStats, { color: c.textMuted }]}>
              И:{club.played} В:{club.won} Н:{club.drawn} П:{club.lost}
            </Text>
          </View>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={[styles.points, { color: c.text }]}>{club.points}</Text>
          <Text style={[styles.goalDiff, { color: c.textMuted }]}>
            {club.goalDifference > 0 ? "+" : ""}
            {club.goalDifference}
          </Text>
        </View>
      </View>
    );
  };

  const renderPlayerItem = (player: PlayerRating, index: number) => {
    const changeIcon =
      player.change === 0 ? "—" : player.change! > 0 ? "↑" : "↓";
    const changeColor =
      player.change === 0
        ? c.textMuted
        : player.change! > 0
          ? c.success
          : c.error;

    return (
      <View
        key={player.id}
        style={[
          styles.ratingItem,
          { backgroundColor: c.card, borderColor: c.border },
          index === 0 && styles.firstItem,
        ]}
      >
        <View style={styles.positionContainer}>
          <Text style={[styles.position, { color: c.text }]}>
            {player.position}
          </Text>
          <Text style={[styles.change, { color: changeColor }]}>
            {changeIcon}
          </Text>
        </View>

        <View style={styles.playerInfo}>
          {player.avatar && (
            <Image source={player.avatar} style={styles.playerAvatar} />
          )}
          <View style={styles.playerDetails}>
            <Text style={[styles.playerName, { color: c.text }]}>
              {player.name}
            </Text>
            <View style={styles.clubRow}>
              {player.clubLogo && (
                <Image source={player.clubLogo} style={styles.playerClubLogo} />
              )}
              <Text style={[styles.playerClub, { color: c.textMuted }]}>
                {player.club}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.playerStatsContainer}>
          <Text style={[styles.playerRating, { color: c.text }]}>
            {player.rating}
          </Text>
          <Text style={[styles.playerGoals, { color: c.textMuted }]}>
            Г:{player.goals} А:{player.assists}
          </Text>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "clubs":
        return (
          <View style={styles.content}>
            {clubRatingMock.map((club, index) => renderClubItem(club, index))}
          </View>
        );
      case "players":
        return (
          <View style={styles.content}>
            {playerRatingMock.map((player, index) =>
              renderPlayerItem(player, index),
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Tabs
        tabs={ratingTabs}
        value={activeTab}
        onChange={setActiveTab}
        variant="outline"
        stretch
        size={12}
        style={styles.tabs}
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    minHeight: 60,
  },
  firstItem: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  positionContainer: {
    width: 32,
    alignItems: "center",
    marginRight: 12,
  },
  position: {
    fontSize: 16,
    fontWeight: "600",
  },
  change: {
    fontSize: 10,
    marginTop: 2,
  },
  clubInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  clubLogo: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginRight: 12,
  },
  clubDetails: {
    flex: 1,
  },
  clubName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  clubStats: {
    fontSize: 11,
  },
  scoreContainer: {
    alignItems: "flex-end",
    minWidth: 40,
  },
  points: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  goalDiff: {
    fontSize: 11,
  },
  playerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  playerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  clubRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  playerClubLogo: {
    width: 16,
    height: 16,
    borderRadius: 2,
    marginRight: 4,
  },
  playerClub: {
    fontSize: 11,
  },
  playerStatsContainer: {
    alignItems: "flex-end",
    minWidth: 50,
  },
  playerRating: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  playerGoals: {
    fontSize: 11,
  },
});
