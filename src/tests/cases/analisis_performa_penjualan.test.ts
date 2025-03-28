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
      growthPercentage: string;
   }[];
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
   ): SalesPerformance {
      const newTotalTransactions = transactions
         .filter(({ status }) => status === "completed")
         .reduce((acc, { product, price, quantity }) => {
            if (!acc[product.category]) {
               acc[product.category] = {
                  totalSales: 0,
                  uniqueProducts: new Set<string>(),
               };
            }
            acc[product.category]!.totalSales += quantity * price;
            acc[product.category]!.uniqueProducts.add(product.name);
            return acc;
         }, {} as Record<string, { totalSales: number; uniqueProducts: Set<string> }>);

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

      let highestGrowthCategory = "";
      let maxGrowth = -Infinity;
      let totalSales = 0;

      const categoryPerformance = Array.from(allCategories).map((category) => {
         const newSales = newTotalTransactions[category]?.totalSales || 0;
         const prevSales = prevTotalTransactions[category] || 0;
         const uniqueProducts =
            newTotalTransactions[category]?.uniqueProducts.size || 0;

         const growthPercentage = prevSales
            ? ((newSales - prevSales) / prevSales) * 100
            : newSales > 0
            ? 100
            : 0;

         if (growthPercentage > maxGrowth) {
            maxGrowth = growthPercentage;
            highestGrowthCategory = category;
         }

         totalSales += newSales;

         return {
            category,
            totalSales: newSales,
            uniqueProducts,
            growthPercentage: growthPercentage.toFixed(2) + '%',
         };
      });

      return {
         totalSales,
         categoryPerformance,
         highestGrowtCategory: highestGrowthCategory,
      };
   }

   it("should work", () => {
      const result = analyzeSalesPerformance(
         transactions,
         previousTransactions
      );

      expect(result).toMatchObject({
         totalSales: 48900000,
         categoryPerformance: [
            {
               category: "Electronics",
               totalSales: 47000000,
               uniqueProducts: 2,
               growthPercentage: '213.33%',
            },
            {
               category: "Accessories",
               totalSales: 1900000,
               uniqueProducts: 2,
               growthPercentage: '533.33%',
            },
         ],
         highestGrowtCategory: "Accessories",
      });
   });
});
