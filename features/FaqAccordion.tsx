import React from "react";
import { View, Text } from "react-native";
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
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import { faqItems } from "@/shared/mocks/faq";

export default function FaqAccordion() {
  const { colors } = useAppTheme();

  return (
    <Accordion
      size="sm"
      variant="unfilled"
      type="single"
      isCollapsible
      isDisabled={false}
      defaultValue={[]}
      style={{ backgroundColor: colors.bg }}
    >
      {faqItems.map((it, index) => (
        <React.Fragment key={it.id}>
          <AccordionItem value={it.id}>
            <AccordionHeader>
              <AccordionTrigger>
                {({ isExpanded }: { isExpanded: boolean }) => (
                  <>
                    <AccordionTitleText>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            color: colors.text,
                            fontWeight: 600,
                          }}
                        >
                          {it.question}
                        </Text>
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
                )}
              </AccordionTrigger>
            </AccordionHeader>

            <AccordionContent style={{ paddingLeft: 16, paddingRight: 16 }}>
              <Text style={{ fontSize: 14, color: colors.text }}>
                {it.answer}
              </Text>
            </AccordionContent>
          </AccordionItem>

          {index + 1 < faqItems.length && (
            <Divider style={{ backgroundColor: colors.border }} />
          )}
        </React.Fragment>
      ))}
    </Accordion>
  );
}
