export type Status = "completed" | "pending" | "canceled";

export interface Product {
   name: string
   category: string
}

export interface TransactionWithCategory {
   id: string;
   quantity: number;
   price: number;
   status: Status;
   product: Product
}

export interface Transaction {
   id: string;
   product: string;
   quantity: number;
   price: number;
   status: Status;
}

