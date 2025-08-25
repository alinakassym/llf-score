import { View, Image } from "react-native";

export default function SponsorsRow() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingTop: 56,
        paddingBottom: 12,
        gap: 12,
        backgroundColor: "#003791",
      }}
    >
      <Image
        accessible={true}
        source={require("@/assets/images/sponsors/KLLF-logo-2.png")}
        style={{ height: 50, width: 150 }}
      />
      <Image
        source={require("@/assets/images/sponsors/KMFF-logo.png")}
        style={{ height: 60, width: 54 }}
      />
      <Image
        source={require("@/assets/images/sponsors/WMF-logo.png")}
        style={{ height: 60, width: 52 }}
      />
      <Image
        source={require("@/assets/images/sponsors/EMF-logo.png")}
        style={{ height: 60, width: 54 }}
      />
    </View>
  );
}
