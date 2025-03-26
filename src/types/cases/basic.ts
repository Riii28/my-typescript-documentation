export type Status = "completed" | "pending" | "canceled";

export interface Transaction {
   id: string;
   product: string;
   quantity: number;
   price: number;
   status: Status;
}
