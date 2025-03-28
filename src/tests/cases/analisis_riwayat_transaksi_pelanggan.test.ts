import fetcher from "./fetcher";

interface AnalysisResult {
   topCustomer: {
      customerId: string;
      totalSpent: number;
   };
   mostPurchasedProduct: {
      customerId: string;
      product: string;
      quantity: number;
   };
   busiestMonth: {
      month: string;
      totalTransactions: number;
   };
   topCategoryRevenue: {
      category: string;
      totalRevenue: number;
   };
}

describe("Studi Kasus Analisis Transaksi Pelanggan", () => {
   async function analyzeTransactions(): Promise<AnalysisResult> {
      try {
         const cartData = await fetcher<{ userId: number; date: string; products: { productId: number; quantity: number }[] }[]>("https://fakestoreapi.com/carts", { timeout: 5000 });

         const productData = await fetcher<{ id: number; title: string; price: number; category: string }[]>("https://fakestoreapi.com/products", { timeout: 5000 });

         const customerSpending: Record<number, number> = {};
         const productQuantity: Record<number, { customerId: number; quantity: number }> = {};
         const categoryRevenue: Record<string, number> = {};
         const monthTransactions: Record<string, number> = {};

         cartData.forEach(({ userId, date, products }) => {
            const month = date.slice(0, 7);
            monthTransactions[month] = (monthTransactions[month] || 0) + 1;

            products.forEach(({ productId, quantity }) => {
               const product = productData.find((p) => p.id === productId);
               if (!product) return;

               customerSpending[userId] = (customerSpending[userId] || 0) + product.price * quantity;

               if (!productQuantity[productId] || productQuantity[productId].quantity < quantity) {
                  productQuantity[productId] = { customerId: userId, quantity };
               }

               categoryRevenue[product.category] = (categoryRevenue[product.category] || 0) + product.price * quantity;
            });
         });

         const [topCustomerId, totalSpent] = Object.entries(customerSpending).sort((a, b) => b[1] - a[1])[0] || ["0", 0];

         const sortedProducts = Object.entries(productQuantity)
            .map(([id, data]) => ({
               productId: Number(id),
               customerId: data.customerId,
               quantity: data.quantity,
            }))
            .sort((a, b) => b.quantity - a.quantity);

         const topProduct = sortedProducts[0] || { productId: 0, customerId: 0, quantity: 0 };
         const topProductData = productData.find((p) => p.id === topProduct.productId);
         const topProductName = topProductData ? topProductData.title : "Unknown";

         const [busiestMonth, totalTransactions] = Object.entries(monthTransactions).sort((a, b) => b[1] - a[1])[0] || ["0000-00", 0];
         const [topCategory, totalRevenue] = Object.entries(categoryRevenue).sort((a, b) => b[1] - a[1])[0] || ["Unknown", 0];

         return {
            topCustomer: { customerId: topCustomerId.toString(), totalSpent },
            mostPurchasedProduct: { customerId: topProduct.customerId.toString(), product: topProductName, quantity: topProduct.quantity },
            busiestMonth: { month: busiestMonth, totalTransactions },
            topCategoryRevenue: { category: topCategory, totalRevenue },
         };
      } catch (err) {
         throw new Error(`Error fetching data: ${err}`);
      }
   }

   it("should return valid transaction analysis", async () => {
      const result = await analyzeTransactions();

      console.info(result)

      expect(result).toHaveProperty("topCustomer");
      expect(result).toHaveProperty("mostPurchasedProduct");
      expect(result).toHaveProperty("busiestMonth");
      expect(result).toHaveProperty("topCategoryRevenue");

      expect(result.topCustomer).toHaveProperty("customerId");
      expect(result.topCustomer).toHaveProperty("totalSpent");

      expect(result.mostPurchasedProduct).toHaveProperty("customerId");
      expect(result.mostPurchasedProduct).toHaveProperty("product");
      expect(result.mostPurchasedProduct).toHaveProperty("quantity");

      expect(result.busiestMonth).toHaveProperty("month");
      expect(result.busiestMonth).toHaveProperty("totalTransactions");

      expect(result.topCategoryRevenue).toHaveProperty("category");
      expect(result.topCategoryRevenue).toHaveProperty("totalRevenue");
   });
});