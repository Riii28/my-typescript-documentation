import { Transaction } from "../../types/cases/basic";

describe("basic", () => {
   test("latihan 1: filter dan transform data", () => {
      function getCompletedTransactions(
         transactions: Transaction[]
      ): { id: string; total: number }[] {
         return transactions
            .filter(({ status }) => status === "completed")
            .map(({ id, price, quantity }) => ({
               id,
               total: quantity * price,
            }));
      }

      const transactions: Transaction[] = [
         {
            id: "a1",
            product: "Laptop",
            quantity: 2,
            price: 15000000,
            status: "completed",
         },
         {
            id: "a2",
            product: "Mouse",
            quantity: 1,
            price: 300000,
            status: "pending",
         },
         {
            id: "a3",
            product: "Keyboard",
            quantity: 3,
            price: 500000,
            status: "completed",
         },
         {
            id: "a4",
            product: "Monitor",
            quantity: 1,
            price: 2000000,
            status: "canceled",
         },
         {
            id: "a5",
            product: "Headphones",
            quantity: 2,
            price: 750000,
            status: "completed",
         },
      ];

      const result = getCompletedTransactions(transactions);

      expect(result).toEqual([
         { id: "a1", total: 30000000 },
         { id: "a3", total: 1500000 },
         { id: "a5", total: 1500000 },
      ]);
   });

   test("latihan 2: grouping dan aggregation", () => {
      const transactions: Transaction[] = [
         {
            id: "a1",
            product: "Laptop",
            quantity: 2,
            price: 15000000,
            status: "completed",
         },
         {
            id: "a2",
            product: "Mouse",
            quantity: 1,
            price: 300000,
            status: "completed",
         },
         {
            id: "a3",
            product: "Laptop",
            quantity: 1,
            price: 15000000,
            status: "completed",
         },
         {
            id: "a4",
            product: "Mouse",
            quantity: 2,
            price: 300000,
            status: "completed",
         },
         {
            id: "a5",
            product: "Keyboard",
            quantity: 3,
            price: 500000,
            status: "completed",
         },
      ];

      function groupingTransaction(
         transactions: Transaction[]
      ): { product: string; totalSales: number }[] {
         const salesMap = transactions.reduce(
            (acc, { product, price, quantity }) => {
               acc[product] = (acc[product] || 0) + quantity * price;
               return acc;
            },
            {} as Record<string, number>
         );

         return Object.entries(salesMap)
            .map(([product, totalSales]) => ({
               product,
               totalSales,
            }))
            .sort((a, b) => b.totalSales - a.totalSales);
      }
      const result = groupingTransaction(transactions);

      expect(result).toEqual([
         { product: "Laptop", totalSales: 45000000 },
         { product: "Mouse", totalSales: 900000 },
         { product: "Keyboard", totalSales: 1500000 },
      ]);
   });
});
