import { LinearGradient } from "expo-linear-gradient";
import { View, Image } from "react-native";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export default function SponsorsRow() {
  const { colors } = useAppTheme();
  return (
    <LinearGradient
      style={{}}
      colors={colors.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 56,
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: colors.opacityDark,
        }}
      >
        <Image
          accessible={true}
          source={require("@/assets/images/sponsors/KLLF-logo.png")}
          style={{ height: 60, width: 180 }}
        />
        <Image
          source={require("@/assets/images/sponsors/KMFF-logo.png")}
          style={{ height: 60, width: 60 }}
        />
        <Image
          source={require("@/assets/images/sponsors/WMF-logo.png")}
          style={{ height: 60, width: 57 }}
        />
        <Image
          source={require("@/assets/images/sponsors/EMF-logo.png")}
          style={{ height: 60, width: 66 }}
        />
      </View>
    </LinearGradient>
  );
}
