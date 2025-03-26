interface Transaction {
   product: {
      name: string;
      category: string;
   };
   price: number;
   quantity: number;
   status: "completed" | "pending" | "canceled";
}

interface SalesPerformance {
   totalSales: number;
   categoryPerformance: {
      category: string;
      totalSales: number;
      uniqueProducts: number;
      growthPercentage: number;
   };
   highestGrowtCategory: string;
}

const transactions: Transaction[] = [
   {
      product: { name: "Laptop", category: "Electronics" },
      price: 15000000,
      quantity: 2,
      status: "completed",
   },
   {
      product: { name: "Mouse", category: "Accessories" },
      price: 300000,
      quantity: 3,
      status: "completed",
   },
   {
      product: { name: "Keyboard", category: "Accessories" },
      price: 500000,
      quantity: 2,
      status: "completed",
   },
   {
      product: { name: "Smartphone", category: "Electronics" },
      price: 17000000,
      quantity: 1,
      status: "completed",
   },
];

const previousTransactions: Transaction[] = [
   {
      product: { name: "Laptop", category: "Electronics" },
      price: 15000000,
      quantity: 1,
      status: "completed",
   },
   {
      product: { name: "Mouse", category: "Accessories" },
      price: 300000,
      quantity: 1,
      status: "completed",
   },
];

describe("studi kasus analisis performa penjualan", () => {
   function analyzeSalesPerformance(
      transactions: Transaction[],
      prevTransactions: Transaction[]
   ): any {
      const newTotalTransactions = transactions
         .filter(({ status }) => status === "completed")
         .reduce((acc, { product, price, quantity }) => {
            acc[product.category] =
               (acc[product.category] || 0) + quantity * price;
            return acc;
         }, {} as Record<string, number>);

      const prevTotalTransactions = prevTransactions
         .filter(({ status }) => status === "completed")
         .reduce((acc, { product, price, quantity }) => {
            acc[product.category] =
               (acc[product.category] || 0) + quantity * price;
            return acc;
         }, {} as Record<string, number>);

      const allCategories = new Set([
         ...Object.keys(newTotalTransactions),
         ...Object.keys(prevTotalTransactions),
      ]);

      const analysis = Array.from(allCategories).map((category) => {
         const newSales = newTotalTransactions[category] || 0;
         const prevSales = prevTotalTransactions[category] || 0;
         const percentage = prevSales
            ? ((prevSales - newSales) / prevSales) * 100
            : newSales > 0
            ? 100
            : 0;
      });

      console.info(analysis);
   }
   it("should work", () => {
      analyzeSalesPerformance(transactions, previousTransactions);
   });
});
