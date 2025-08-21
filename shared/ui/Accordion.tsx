// shared/ui/Accordion.tsx
import { ReactNode } from "react";
import {
  Accordion as GSAccordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionContent,
  AccordionContentText,
} from "@/components/ui/accordion";
import Ionicons from "@expo/vector-icons/Ionicons";

export type AccordionEntry = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

type Props = {
  items: AccordionEntry[];
  type?: "single" | "multiple";
  variant?: "unfilled" | "filled";
  defaultOpenIds?: string[];
  chevronColor?: string;
};

export default function Accordion({
  items,
  type = "single",
  variant = "unfilled",
  defaultOpenIds = [],
  chevronColor = "#000",
}: Props) {
  return (
    <GSAccordion
      size="md"
      variant={variant}
      type={type}
      isCollapsible={true}
      isDisabled={false}
      defaultValue={defaultOpenIds}
    >
      {items.map((it) => (
        <AccordionItem key={it.id} value={it.id}>
          <AccordionHeader>
            <AccordionTrigger>
              {({ isExpanded }: { isExpanded: boolean }) => {
                return (
                  <>
                    <AccordionTitleText>{it.title}</AccordionTitleText>
                    {isExpanded ? (
                      <Ionicons
                        color={chevronColor}
                        name="chevron-down"
                        size={16}
                      />
                    ) : (
                      <Ionicons
                        color={chevronColor}
                        name="chevron-forward"
                        size={16}
                      />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>

          <AccordionContent
            style={{ paddingHorizontal: 16, paddingBottom: 12 }}
          >
            {typeof it.content === "string" ? (
              <AccordionContentText style={{ fontSize: 14, opacity: 0.9 }}>
                {it.content}
              </AccordionContentText>
            ) : (
              it.content
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </GSAccordion>
  );
}
