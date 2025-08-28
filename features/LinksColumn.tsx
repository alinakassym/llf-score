import LinkRow from "@/shared/ui/LinkRow";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";

export default function LinksColumn() {
  return (
    <View style={{ paddingHorizontal: 0 }}>
      <LinkRow label="План соревнований" />
      <LinkRow label="Регламент" />
      <LinkRow label="Правила" />
      <LinkRow label="Контакты" showDivider={false} />
    </View>
  );
}
