// features/CitiesAccordion.tsx
import React, { ReactNode } from "react";
import { Image, View, Text, ImageSourcePropType } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
} from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import LeaguesLinks from "@/features/LeaguesLinks";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export type AccordionEntry = {
  id: number;
  name: string;
  content: ReactNode;
  image?: ImageSourcePropType;
};

const items: AccordionEntry[] = [
  {
    id: 1,
    name: "Астана",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 2,
    name: "Алматы",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 3,
    name: "Шымкент",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 4,
    name: "Актобе",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 5,
    name: "Караганда",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 6,
    name: "Усть-Каменогорск",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 7,
    name: "Уральск",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 8,
    name: "Петропавловск",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 9,
    name: "Кызылорда",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 10,
    name: "Туркестан",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 11,
    name: "Кокшетау",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 12,
    name: "Талдыкорган",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 13,
    name: "Жезказган",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 14,
    name: "Сарыагаш",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 15,
    name: "Щучинск",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: 16,
    name: "Кульсары",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
];

export default function CitiesAccordion() {
  const { colors } = useAppTheme();
  return (
    <Accordion
      size="sm"
      variant="unfilled"
      type="single"
      isCollapsible={false}
      isDisabled={false}
      defaultValue={[]}
      style={{ backgroundColor: colors.bg }}
    >
      {items.map((it, index) => (
        <React.Fragment key={it.id}>
          <AccordionItem value={String(it.id)}>
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }: { isExpanded: boolean }) => {
                  return (
                    <>
                      <AccordionTitleText>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Image
                            source={it.image as any}
                            style={{ width: 24, height: 24 }}
                          />
                          <View>
                            <Text
                              style={{
                                fontSize: 14,
                                color: colors.text,
                                fontWeight: 600,
                              }}
                            >
                              {it.name}
                            </Text>
                          </View>
                        </View>
                      </AccordionTitleText>
                      {isExpanded ? (
                        <Ionicons
                          color={colors.primary}
                          name="chevron-down"
                          size={16}
                        />
                      ) : (
                        <Ionicons
                          color={colors.primary}
                          name="chevron-forward"
                          size={16}
                        />
                      )}
                    </>
                  );
                }}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent style={{ paddingLeft: 8, paddingRight: 0 }}>
              <LeaguesLinks cityName={it.name} />
            </AccordionContent>
          </AccordionItem>
          {index + 1 < items.length && (
            <Divider style={{ backgroundColor: colors.border }} />
          )}
        </React.Fragment>
      ))}
    </Accordion>
  );
}
