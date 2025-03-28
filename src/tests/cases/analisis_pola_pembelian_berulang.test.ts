import fetcher from "./fetcher";

interface CartData {
   userId: number;
   products: { productId: number; quantity: number }[];
}

describe("studi kasus analisis pola pembelian berulang", () => {
   async function analysisPurchasePattern() {
      const cartData: CartData[] = await fetcher(
         "https://fakestoreapi.com/carts"
      );

      const customerRecord = cartData.reduce((acc, { userId, products }) => {
         if (!acc[userId]) {
            acc[userId] = {};
         }

         products.forEach(({ productId, quantity }) => {
            acc[userId]![productId] = (acc[userId]![productId] || 0) + quantity;
         });

         return acc;
      }, {} as Record<number, Record<number, number>>);


      let mostReapeatedCustomer = { userid: 0, reapeatCount: 0 };


      Object.entries(customerRecord).forEach(([userId, purchases]) => {
         const reapeatCount = Object.values(purchases).filter(
            (qty) => qty > 1
         ).length;
         if (reapeatCount > mostReapeatedCustomer.reapeatCount) {
            mostReapeatedCustomer = { userid: Number(userId), reapeatCount };
         }
      });

      const productRepeatCount: Record<number, number> = {};

      Object.values(customerRecord).forEach((purchases) => {
         Object.entries(purchases).forEach(([productId, quantity]) => {
            if (quantity > 1) {
               productRepeatCount[Number(productId)] =
                  (productRepeatCount[Number(productId)] || 0) + 1;
            }
         });
      });

      const mostRepeatedProduct = Object.entries(productRepeatCount).reduce(
         (acc, [productId, repeatCount]) => {
            return repeatCount > acc.repeatCount
               ? { productId: Number(productId), repeatCount }
               : acc;
         },
         { productId: 0, repeatCount: 0 }
      );

      console.info("ini customer record:", customerRecord);
      console.info("ini most repeated customer", mostReapeatedCustomer);
      console.info("ini product repeat count", productRepeatCount);
      console.info("ini most repeated product", mostRepeatedProduct);

      return { mostReapeatedCustomer, mostRepeatedProduct };
   }

   it("should return", async () => {
      const result = await analysisPurchasePattern();

      expect(result).toMatchObject({
         mostReapeatedCustomer: { userid: 1, reapeatCount: 4 },
         mostRepeatedProduct: { productId: 1, repeatCount: 3 },
      });
   });
});
