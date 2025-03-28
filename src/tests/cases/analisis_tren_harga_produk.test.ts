import fetcher from "./fetcher";

interface AnalyzeProduct {
   title: string;
   previousPrice: number;
   currentPrice: number;
   trend: "Naik" | "Turun" | "Stabil";
}

describe("studi kasus analisis tren harga product", () => {
   async function analysisProductPrice(): Promise<AnalyzeProduct[]> {
      try {
         const data: { title: string; price: number }[] = await fetcher(
            "https://fakestoreapi.com/products",
            { timeout: 5000 }
         );

         const currentProducts: { title: string; price: number }[] = data.map(
            ({ title, price }) => ({ title, price })
         );

         const previousProducts: { title: string; price: number }[] = data.map(
            ({ title, price }) => {
               const randomFactor = Math.random() * 0.2 - 0.1;
               return { title, price: Math.round(price * (1 + randomFactor)) };
            }
         );

         const products: AnalyzeProduct[] = currentProducts
            .map((product, i) => {
               const previousPrice = previousProducts[i]!.price;
               const currentPrice = product.price;

               let trend: "Naik" | "Turun" | "Stabil";

               if (currentPrice > previousPrice) {
                  trend = "Naik";
               } else if (currentPrice < previousPrice) {
                  trend = "Turun";
               } else {
                  trend = "Stabil";
               }

               return {
                  title: product.title,
                  previousPrice,
                  currentPrice,
                  trend,
               };
            })
            .sort((a, b) => b.currentPrice - a.currentPrice)

         return products;
      } catch (err) {
         throw new Error(`error: ${err}`);
      }
   }

   it("should return", async () => {
      const result = await analysisProductPrice();

      console.info(result)
      expect(Array.isArray(result)).toBeTruthy();
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('title')
        expect(result[0]).toHaveProperty('previousPrice')
        expect(result[0]).toHaveProperty('currentPrice')
        expect(result[0]).toHaveProperty('trend')
      }
   });
});
