// shared/ui/Table.tsx
import { ReactNode, useMemo } from "react";
import { ScrollView } from "react-native"; // ⬅️ add
import { Box } from "@/components/ui/box";
import {
  Table as GSTable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/table";

export type TableColumn<T> = {
  title: string;
  key: string;
  render?: (row: T, rowIndex: number) => ReactNode;
  className?: string;
  width?: number;
  maxWidth?: number;
  textAlign?: "left" | "right" | "center";
  headerTextAlign?: "left" | "right" | "center";
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor?: (row: T, index: number) => string | number;
  emptyText?: string;
  headerClassName?: string;
  rowClassName?: (row: T, index: number) => string | undefined;
  borderColor?: string;
  backgroundColor?: string;
  color?: string;
  hightlightColor?: string;
  scrollX?: boolean; // ⬅️ new
};

export default function Table<T>({
  columns,
  data,
  keyExtractor,
  emptyText = "Нет данных",
  headerClassName,
  rowClassName,
  borderColor = "#ccc",
  color = "#000",
  backgroundColor = "transparent",
  hightlightColor = "transparent",
  scrollX = false, // ⬅️ new
}: TableProps<T>) {
  // суммарная минимальная ширина: ширина колонок + горизонтальные паддинги ячеек (10+10)
  const minWidth = useMemo(
    () =>
      columns.reduce((sum, c) => {
        const w = c?.width ?? 0;
        return sum + w; // + 20; // paddingLeft 10 + paddingRight 10
      }, 0),
    [columns],
  );

  const tableEl = (
    <GSTable className="w-full" style={{ marginHorizontal: 0, minWidth }}>
      {/* ...весь остальной JSX без изменений... */}
      <TableHeader>
        <TableRow className={headerClassName} style={{ borderColor }}>
          {columns.map((c) => (
            <TableHead
              key={c.key}
              className={c.className}
              style={{
                fontSize: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 4,
                paddingBottom: 4,
                minWidth: c?.width,
                maxWidth: c?.maxWidth,
                textAlign: c?.headerTextAlign,
                backgroundColor: hightlightColor,
                color,
              }}
            >
              {c.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            {columns.map((c, idx) => (
              <TableData key={c.key} className={c.className}>
                {idx === 0 ? emptyText : null}
              </TableData>
            ))}
          </TableRow>
        ) : (
          data.map((row, rIdx) => (
            <TableRow
              key={keyExtractor ? keyExtractor(row, rIdx) : rIdx}
              className={rowClassName?.(row, rIdx)}
              style={{ borderColor }}
            >
              {columns.map((c) => (
                <TableData
                  key={c.key}
                  className={c.className}
                  style={{
                    fontSize: 10,
                    paddingLeft: 6,
                    paddingRight: 6,
                    minWidth: c?.width,
                    maxWidth: c?.maxWidth,
                    textAlign: c?.textAlign,
                    backgroundColor:
                      rIdx % 2 === 0 ? backgroundColor : hightlightColor,
                    borderRightColor: "black",
                    borderLeftColor: "black",
                    borderColor,
                    color,
                  }}
                >
                  {c.render ? c.render(row, rIdx) : (row as any)[c.key]}
                </TableData>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </GSTable>
  );

  return (
    <Box className="overflow-hidden" style={{ paddingHorizontal: 0 }}>
      {scrollX ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ minWidth }} // ⬅️ создаёт горизонтальный скролл при нехватке места
        >
          {tableEl}
        </ScrollView>
      ) : (
        tableEl
      )}
    </Box>
  );
}
