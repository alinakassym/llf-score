// features/home/HomeAccordionPreview.tsx
import React, { ReactNode } from "react";
import { Image, View, Text, ImageSourcePropType } from "react-native";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
} from "@/components/ui/accordion";
import LeagueTabs from "@/features/home/LeagueTabs";
import { Divider } from "@/components/ui/divider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export type AccordionEntry = {
  id: string;
  title: ReactNode;
  content: ReactNode;
  image?: ImageSourcePropType;
};

const items: AccordionEntry[] = [
  {
    id: "1",
    title: "Премьер-лига",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: "2",
    title: "Супер-лига",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: "3",
    title: "Мастер лига",
    content: "В разработке...",
    image: require("@/assets/images/cities/astana.png"),
  },
];

export default function HomeAccordionPreview() {
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
            <AccordionContent style={{ paddingLeft: 0, paddingRight: 0 }}>
              {/* {typeof it.content === "string" ? (
                <AccordionContentText style={{ fontSize: 14, opacity: 0.9 }}>
                  {it.content}
                </AccordionContentText>
              ) : (
                it.content
              )} */}
              <LeagueTabs />
            </AccordionContent>
          </AccordionItem>
          {index + 1 < items.length && <Divider />}
        </React.Fragment>
      ))}
    </Accordion>
  );
}
