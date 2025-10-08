import HelpFaqAccordion from "@/features/help/HelpFaqAccordion";
import HelpFeedbackForm from "@/features/help/HelpFeedbackForm";
import { faqItems } from "@/features/help/mocks";
import { ScrollView, View } from "react-native";

export default function TabHelpScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <HelpFeedbackForm />
        <HelpFaqAccordion items={faqItems} />
      </ScrollView>
    </View>
  );
}
