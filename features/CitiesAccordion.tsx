// features/home/HomeAccordionPreview.tsx
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
import LeaguesAccordion from "@/features/LeaguesAccordion";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export type AccordionEntry = {
  id: string;
  title: ReactNode;
  content: ReactNode;
  image?: ImageSourcePropType;
};

const items: AccordionEntry[] = [
  {
    id: "2",
    title: "Алматы",
    content: "В разработке...",
    image: require("@/assets/images/cities/almaty.png"),
  },
  {
    id: "3",
    title: "Шымкент",
    content: "В разработке...",
    image: require("@/assets/images/cities/shymkent.png"),
  },
  {
    id: "3",
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
      isCollapsible={true}
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
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: 400,
                                color: colors.textLight,
                              }}
                            >
                              🇰🇿 Казахстан
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
              <LeaguesAccordion />
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
