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
import { useAppSelector } from "@/shared/store/hooks";
import { selectCities } from "@/shared/store/cities.slice";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export type AccordionEntry = {
  id: number;
  name: string;
  content: ReactNode;
  image?: ImageSourcePropType;
};

export default function CitiesAccordion() {
  const { colors } = useAppTheme();

  const cities = useAppSelector(selectCities);

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
      {cities.map((it, index) => (
        <React.Fragment key={it.id}>
          <AccordionItem value={String(it.id)}>
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }: { isExpanded: boolean }) => {
                  return (
                    <React.Fragment>
                      <View
                        style={{
                          paddingVertical: 4,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Image
                          source={it.icon as any}
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
                    </React.Fragment>
                  );
                }}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent style={{ paddingLeft: 8, paddingRight: 0 }}>
              <LeaguesLinks cityName={it.name} />
            </AccordionContent>
          </AccordionItem>
          {index + 1 < cities.length && (
            <Divider style={{ backgroundColor: colors.border }} />
          )}
        </React.Fragment>
      ))}
    </Accordion>
  );
}
