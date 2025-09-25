// components/Table.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { ReactNode } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export type Align = "left" | "center" | "right";

export type Column<T> = {
  /** Уникальный ключ колонки */
  key: string;
  /** Заголовок (опционально) */
  title?: string;
  /** Фиксированная ширина, px; если не указана — работает flex */
  width?: number;
  /** Flex-коэффициент (по умолчанию 1, если нет width) */
  flex?: number;
  /** Выравнивание текста внутри ячейки */
  align?: Align;
  /** Рендер ячейки (если нужен кастом) */
  render?: (item: T, index: number) => ReactNode;
  /** Простой вывод значения (если не нужен кастом). Берёт precedence ниже render */
  accessor?: (item: T) => string | number;
  /** Стиль текста в ячейке (переопределяет базовый) */
  textStyle?: TextStyle;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  headerStyle?: ViewStyle;
  rowStyle?: ViewStyle;
  separator?: boolean; // показывать разделители строк (по умолчанию true)
};

export function Table<T>({
  columns,
  data,
  keyExtractor,
  headerStyle,
  rowStyle,
  separator = true,
}: TableProps<T>) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const renderHeader = () => (
    <View
      style={[
        styles.header,
        { backgroundColor: c.card, borderBottomColor: c.border },
        headerStyle,
      ]}
    >
      {columns.map((col) => (
        <View
          key={`h-${col.key}`}
          style={[styles.cell, cellDim(col), align(col.align)]}
        >
          {col.title ? (
            <Text
              numberOfLines={1}
              style={[styles.headerText, { color: c.muted }]}
            >
              {col.title}
            </Text>
          ) : null}
        </View>
      ))}
    </View>
  );

  const renderRow = ({ item, index }: { item: T; index: number }) => (
    <View
      style={[
        styles.row,
        { borderBottomColor: c.border },
        rowStyle,
        separator && styles.rowWithSeparator,
      ]}
    >
      {columns.map((col) => {
        const content =
          col.render?.(item, index) ??
          (col.accessor ? String(col.accessor(item)) : "");

        return (
          <View
            key={`${keyExtractor(item, index)}-${col.key}`}
            style={[styles.cell, cellDim(col), align(col.align)]}
          >
            {typeof content === "string" || typeof content === "number" ? (
              <Text
                numberOfLines={1}
                style={[styles.cellText, { color: c.text }, col.textStyle]}
              >
                {String(content)}
              </Text>
            ) : (
              content
            )}
          </View>
        );
      })}
    </View>
  );

  return (
    <View
      style={{
        overflow: "hidden",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: c.border,
      }}
    >
      {renderHeader()}
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderRow}
        scrollEnabled={false}
        contentContainerStyle={{ backgroundColor: c.background }}
      />
    </View>
  );
}

const cellDim = (col: Column<any>): ViewStyle =>
  col.width != null ? { width: col.width } : { flex: col.flex ?? 1 };

const align = (value: Align | undefined): ViewStyle => {
  switch (value) {
    case "center":
      return { alignItems: "center" };
    case "right":
      return { alignItems: "flex-end" };
    default:
      return { alignItems: "flex-start" };
  }
};

const styles = StyleSheet.create({
  header: {
    height: 40,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 11,
    textTransform: "uppercase",
  },
  row: {
    minHeight: 56,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowWithSeparator: { borderBottomWidth: 1 },
  cell: { justifyContent: "center" },
  cellText: { fontSize: 11 },
});
