interface Output {
   category: string;
   totalSales: number;
   bestSellingProduct: { name: string; totalSold: number };
}

interface TransactionEval {
   product: {
      name: string;
      category: string;
   };
   price: number;
   quantity: number;
   status: "completed" | "pending" | "canceled";
}

const clientTransactions: TransactionEval[] = [
   {
      product: { name: "Laptop", category: "Electronics" },
      price: 15000000,
      quantity: 2,
      status: "completed",
   },
   {
      product: { name: "Mouse", category: "Accessories" },
      price: 300000,
      quantity: 5,
      status: "completed",
   },
   {
      product: { name: "Keyboard", category: "Accessories" },
      price: 500000,
      quantity: 3,
      status: "completed",
   },
   {
      product: { name: "Smartphone", category: "Electronics" },
      price: 17000000,
      quantity: 1,
      status: "completed",
   },
   {
      product: { name: "Monitor", category: "Electronics" },
      price: 5000000,
      quantity: 4,
      status: "completed",
   },
   {
      product: { name: "Mousepad", category: "Accessories" },
      price: 100000,
      quantity: 10,
      status: "completed",
   },
   {
      product: { name: "Headset", category: "Accessories" },
      price: 1000000,
      quantity: 2,
      status: "completed",
   },
];

describe("studi kasus evaluasi performa penjualan berdasarkan produk populer", () => {
   function productEvaluation(transactions: TransactionEval[]): any {
      const sales = transactions
         .filter(({ status }) => status === "completed")
         .reduce((acc, { product, price, quantity }) => {
            if (!acc[product.category]) {
               acc[product.category] = {
                  totalSales: 0,
                  productSales: {} as Record<string, number>,
               };
            }
            acc[product.category]!.totalSales += quantity * price;
            acc[product.category]!.productSales[product.name]! = (acc[product.category]!.productSales[product.name] || 0) + quantity;

            return acc;
         }, {} as Record<string, { totalSales: number; productSales: Record<string, number>}>);

      const salesAnalysis = Object.entries(sales).map(([category, data]) => {
         const bestSellingProduct = Object.entries(data.productSales)
            .map(([name, totalSold]) => ({ name, totalSold}))
            .sort((a, b) => b.totalSold - a.totalSold)[0];

         return { category, totalSales: data.totalSales, bestSellingProduct };
      });

      return salesAnalysis;
   }
   it("should work", () => {
      const result = productEvaluation(clientTransactions);

      expect(result).toEqual([
         {
            category: "Electronics",
            totalSales: 67000000,
            bestSellingProduct: { name: "Monitor", totalSold: 4 },
         },
         {
            category: "Accessories",
            totalSales: 6000000,
            bestSellingProduct: { name: "Mousepad", totalSold: 10 },
         },
      ]);
   });
});
