import { Accordion } from "@/components/Accordion";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { FaqItem } from "./types";

type Props = {
  items: FaqItem[];
};

export const HelpFaqAccordion: FC<Props> = ({ items }) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <View style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 8 }}>
      {items.map((item) => (
        <View
          key={item.id}
          style={[
            styles.accordionContainer,
            { backgroundColor: c.background, borderColor: c.border },
          ]}
        >
          <Accordion
            key={item.id}
            title={
              <View style={styles.titleContainer}>
                <Text style={[styles.name, { color: c.text }]}>
                  {item.question}
                </Text>
              </View>
            }
          >
            <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
              <Text style={{ fontSize: 14, color: c.text, lineHeight: 20 }}>
                {item.answer}
              </Text>
            </View>
          </Accordion>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default HelpFaqAccordion;
