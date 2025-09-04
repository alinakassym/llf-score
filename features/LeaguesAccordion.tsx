// features/home/HomeAccordionPreview.tsx
import React, { ReactNode } from "react";
import { Image, View, Text, ImageSourcePropType } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import LeagueTabs from "@/features/LeagueTabs";
import { createLeagueTableColumns } from "@/features/ui/leagueTable.columns";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
} from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import Table from "@/shared/ui/Table";
import { leagueRows, OrderRow } from "@/shared/mocks/leagueRows";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Props = {
  showTabs: Boolean;
};

export type AccordionEntry = {
  id: string;
  title: string;
  content: ReactNode;
  cityName: string;
  image?: ImageSourcePropType;
};

const items: AccordionEntry[] = [
  {
    id: "1",
    title: "Премьер-лига",
    content: "В разработке...",
    cityName: "Астана",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: "2",
    title: "Супер-лига",
    content: "В разработке...",
    cityName: "Астана",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    id: "3",
    title: "Мастер лига",
    content: "В разработке...",
    cityName: "Астана",
    image: require("@/assets/images/cities/astana.png"),
  },
];

export default function LeaguesAccordion({ showTabs = false }: Props) {
  const { colors } = useAppTheme();
  const cols = React.useMemo(() => createLeagueTableColumns(colors), [colors]);

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
                              {it.cityName}
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
              {showTabs ? (
                <LeagueTabs />
              ) : (
                <Table<OrderRow>
                  columns={cols}
                  data={leagueRows}
                  keyExtractor={(r) => r.number}
                  backgroundColor={colors.bg}
                  color={colors.text}
                  borderColor={colors.border}
                  hightlightColor={colors.secondaryBg}
                />
              )}
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
