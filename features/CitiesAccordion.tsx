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
  id: string;
  title: string;
  content: ReactNode;
  image?: ImageSourcePropType;
};

const items: AccordionEntry[] = [
  {
    id: "astana",
    title: "Астана",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: "almaty",
    title: "Алматы",
    content: "В разработке...",
    image: require("@/assets/images/cities/almaty.png"),
  },
  {
    id: "shymkent",
    title: "Шымкент",
    content: "В разработке...",
    image: require("@/assets/images/cities/shymkent.png"),
  },
  {
    id: "atyrau",
    title: "Атырау",
    content: "В разработке...",
    image: require("@/assets/images/cities/atyrau.gif"),
  },
  {
    id: "kostanai",
    title: "Костанай",
    content: "В разработке...",
    image: require("@/assets/images/cities/kostanai.png"),
  },
  {
    id: "pavlodar",
    title: "Павлодар",
    content: "В разработке...",
    image: require("@/assets/images/cities/pavlodar.png"),
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
          <AccordionItem value={it.id}>
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
                              {it.title}
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
              <LeaguesLinks cityName={it.title} />
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
