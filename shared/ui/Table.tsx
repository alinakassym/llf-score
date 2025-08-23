// shared/ui/Table.tsx
import { ReactNode } from "react";
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
};

export type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor?: (row: T, index: number) => string | number;
  emptyText?: string;
  headerClassName?: string;
  rowClassName?: (row: T, index: number) => string | undefined;
};

export default function Table<T>({
  columns,
  data,
  keyExtractor,
  emptyText = "Нет данных",
  headerClassName,
  rowClassName,
}: TableProps<T>) {
  return (
    <Box className="overflow-hidden" style={{ paddingHorizontal: 0 }}>
      <GSTable className="w-full" style={{ marginHorizontal: 0 }}>
        <TableHeader>
          <TableRow className={headerClassName}>
            {columns.map((c) => (
              <TableHead
                key={c.key}
                className={c.className}
                style={{
                  fontSize: 12,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 4,
                  paddingBottom: 4,
                  minWidth: c?.width,
                  maxWidth: c?.maxWidth,
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
              >
                {columns.map((c) => (
                  <TableData
                    key={c.key}
                    className={c.className}
                    style={{
                      fontSize: 12,
                      paddingLeft: 10,
                      paddingRight: 10,
                      minWidth: c?.width,
                      maxWidth: c?.maxWidth,
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
    </Box>
  );
}
