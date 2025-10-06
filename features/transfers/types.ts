export type TransferStatusType = "contract" | "free" | "transfer";
export type TransferRow = {
  id: number;
  player: string;
  age: number;
  team: string;
  position: string;
  league?: string;
  status: TransferStatusType;
  cost: string;
  salary: string;
  image?: any;
};
