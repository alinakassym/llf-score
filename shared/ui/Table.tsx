// shared/ui/Table.tsx
import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import {
  Table as GSTable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/table";

type Row = {
  id: number | string;
  items: number;
  name: string;
  city: string;
  price: string;
  status: "success" | "info" | "warning";
};

const MOCK: Row[] = [
  {
    id: 571,
    items: 3,
    name: "Rajesh Kumar",
    city: "New Jersey",
    price: "$ 200",
    status: "success",
  },
  {
    id: 5231,
    items: 2,
    name: "Priya Sharma",
    city: "Austin",
    price: "$ 150",
    status: "info",
  },
  {
    id: 5771,
    items: 3,
    name: "Ravi Patel",
    city: "Seattle",
    price: "$ 215",
    status: "warning",
  },
  {
    id: 5232,
    items: 4,
    name: "Ananya Gupta",
    city: "California",
    price: "$ 88",
    status: "info",
  },
  {
    id: 5772,
    items: 3,
    name: "Arjun Singh",
    city: "Seattle",
    price: "$ 115",
    status: "info",
  },
  {
    id: 5773,
    items: 3,
    name: "Nisha Verma",
    city: "Austin",
    price: "$ 115",
    status: "success",
  },
];

export default function Table() {
  return (
    <Box className="rounded-lg overflow-hidden">
      <GSTable className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Order id</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Order price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {MOCK.map((r) => (
            <TableRow key={r.id}>
              <TableData>{r.id}</TableData>
              <TableData>{r.items}</TableData>
              <TableData>{r.name}</TableData>
              <TableData>{r.city}</TableData>
              <TableData>{r.price}</TableData>
              <TableData>
                <Badge
                  size="sm"
                  action={r.status}
                  className="w-fit justify-center"
                >
                  <BadgeText>
                    {r.status === "success"
                      ? "Completed"
                      : r.status === "warning"
                        ? "Shipped"
                        : "Processing"}
                  </BadgeText>
                </Badge>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </GSTable>
    </Box>
  );
}
