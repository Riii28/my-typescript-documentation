import { Transaction, TransactionWithCategory } from "../../types/cases/basic";
import fetcher from "./fetcher";

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
         { product: "Keyboard", totalSales: 1500000 },
         { product: "Mouse", totalSales: 900000 },
      ]);
   });

   test("latihan 3: grouping dan aggregation dengan status", () => {
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
         {
            id: "a6",
            product: "Monitor",
            quantity: 1,
            price: 2000000,
            status: "canceled",
         },
         {
            id: "a7",
            product: "Headphones",
            quantity: 2,
            price: 750000,
            status: "completed",
         },
      ];

      function groupingTransaction(transactions: Transaction[]): {
         product: string;
         totalSales: number;
      }[] {
         const salesMap = transactions
            .filter((transaction) => transaction.status === "completed")
            .reduce((acc, { product, price, quantity }) => {
               acc[product] = (acc[product] || 0) + quantity * price;
               return acc;
            }, {} as Record<string, number>);

         return Object.entries(salesMap)
            .map(([product, totalSales]) => ({ product, totalSales }))
            .sort((a, b) => b.totalSales - a.totalSales);
      }

      const result = groupingTransaction(transactions);

      expect(result).toEqual([
         { product: "Laptop", totalSales: 45000000 },
         { product: "Keyboard", totalSales: 1500000 },
         { product: "Headphones", totalSales: 1500000 },
         { product: "Mouse", totalSales: 600000 },
      ]);
   });

   test("latihan 4: normalisasi data", () => {
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
            product: "laptop",
            quantity: 1,
            price: 15000000,
            status: "completed",
         },
         {
            id: "a3",
            product: "Mouse",
            quantity: 2,
            price: 300000,
            status: "completed",
         },
         {
            id: "a4",
            product: "MOUSE",
            quantity: 1,
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

      function normalizeTransaction(
         transactions: Transaction[]
      ): { product: string; totalSales: number }[] {
         const products = transactions.reduce(
            (acc, { product, price, quantity }) => {
               const normalizeProduct = product.toLowerCase();
               acc[normalizeProduct] =
                  (acc[normalizeProduct] || 0) + quantity * price;
               return acc;
            },
            {} as Record<string, number>
         );

         return Object.entries(products)
            .map(([product, totalSales]) => ({ product, totalSales }))
            .sort((a, b) => b.totalSales - a.totalSales);
      }

      const result = normalizeTransaction(transactions);

      expect(result).toEqual([
         { product: "laptop", totalSales: 45000000 },
         { product: "keyboard", totalSales: 1500000 },
         { product: "mouse", totalSales: 900000 },
      ]);
   });

   test("latihan 5: advanced grouping dan aggregation dengan nested data", () => {
      const transactions: TransactionWithCategory[] = [
         {
            id: "a1",
            product: { name: "Laptop", category: "Electronics" },
            quantity: 2,
            price: 15000000,
            status: "completed",
         },
         {
            id: "a2",
            product: { name: "Mouse", category: "Accessories" },
            quantity: 1,
            price: 300000,
            status: "pending",
         },
         {
            id: "a3",
            product: { name: "Laptop", category: "Electronics" },
            quantity: 1,
            price: 15000000,
            status: "completed",
         },
         {
            id: "a4",
            product: { name: "Mouse", category: "Accessories" },
            quantity: 2,
            price: 300000,
            status: "completed",
         },
         {
            id: "a5",
            product: { name: "Keyboard", category: "Accessories" },
            quantity: 3,
            price: 500000,
            status: "completed",
         },
         {
            id: "a6",
            product: { name: "Smartphone", category: "Electronics" },
            quantity: 2,
            price: 8000000,
            status: "completed",
         },
      ];

      function groupTransactionByCategory(
         transactions: TransactionWithCategory[]
      ): { category: string; totalSales: number }[] {
         const products = transactions
            .filter(({ status }) => status === "completed")
            .reduce((acc, { product, price, quantity }) => {
               acc[product.category] =
                  (acc[product.category] || 0) + quantity * price;
               return acc;
            }, {} as Record<string, number>);

         return Object.entries(products)
            .map(([category, totalSales]) => ({ category, totalSales }))
            .sort((a, b) => b.totalSales - a.totalSales);
      }

      const result = groupTransactionByCategory(transactions);

      expect(result).toEqual([
         { category: "Electronics", totalSales: 61000000 },
         { category: "Accessories", totalSales: 2100000 },
      ]);
   });

   test("latihan 6: menghitung jumlah produk unik yang terjual dalam setiap kategori", () => {
      const transactions: TransactionWithCategory[] = [
         {
            id: "a1",
            product: { name: "Laptop", category: "Electronics" },
            quantity: 2,
            price: 15000000,
            status: "completed",
         },
         {
            id: "a2",
            product: { name: "Mouse", category: "Accessories" },
            quantity: 1,
            price: 300000,
            status: "completed",
         },
         {
            id: "a3",
            product: { name: "Laptop", category: "Electronics" },
            quantity: 1,
            price: 15000000,
            status: "completed",
         },
         {
            id: "a4",
            product: { name: "Mouse", category: "Accessories" },
            quantity: 2,
            price: 300000,
            status: "completed",
         },
         {
            id: "a5",
            product: { name: "Keyboard", category: "Accessories" },
            quantity: 3,
            price: 500000,
            status: "completed",
         },
         {
            id: "a6",
            product: { name: "Monitor", category: "Electronics" },
            quantity: 1,
            price: 2000000,
            status: "completed",
         },
         {
            id: "a7",
            product: { name: "Headphones", category: "Accessories" },
            quantity: 2,
            price: 750000,
            status: "completed",
         },
      ];

      function countUniqueProduct(transactions: TransactionWithCategory[]): {
         category: string;
         totalSales: number;
         uniqueProducts: number;
      }[] {
         const products = transactions
            .filter(({ status }) => status === "completed")
            .reduce((acc, { product, price, quantity }) => {
               if (!acc[product.category]) {
                  acc[product.category] = {
                     totalSales: 0,
                     uniqueProducts: new Set(),
                  };
               }

               acc[product.category]!.totalSales += quantity * price;
               acc[product.category]!.uniqueProducts.add(product.name);
               return acc;
            }, {} as Record<string, { totalSales: number; uniqueProducts: Set<string> }>);

         const totalSalesAll = Object.values(products).reduce(
            (acc, { totalSales }) => acc + totalSales,
            0
         );

         return Object.entries(products)
            .map(([category, { totalSales, uniqueProducts }]) => ({
               category,
               totalSales,
               uniqueProducts: uniqueProducts.size,
               percentage:
                  ((totalSales / totalSalesAll) * 100).toFixed(2) + "%",
            }))
            .sort((a, b) => b.totalSales - a.totalSales);
      }
      const result = countUniqueProduct(transactions);
      expect(result).toEqual([
         {
            category: "Electronics",
            totalSales: 47000000,
            uniqueProducts: 2,
            percentage: "92.34%",
         },
         {
            category: "Accessories",
            totalSales: 3900000,
            uniqueProducts: 3,
            percentage: "7.66%",
         },
      ]);
   });

   test("latihan 7: filter dan sort dari API", async () => {
      async function fetchData() {
         const data: { title: string; price: number }[] = await fetcher(
            "https://fakestoreapi.com/products",
            { timeout: 5000 }
         );

         const start = (1 - 1) * 5;
         const end = start + 5;

         return data
            .filter(({ price }) => price > 50)
            .sort((a, b) => a.price - b.price)
            .slice(start, end);
      }

      console.info(await fetchData());
   });
});
