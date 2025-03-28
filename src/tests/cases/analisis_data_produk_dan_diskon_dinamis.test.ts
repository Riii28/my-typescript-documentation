import fetcher from "./fetcher";

type Product = {
   title: string;
   price: number;
   category: string;
};

describe("studi kasus analisis data produk dan diskon dinamis", () => {
   async function fetchAndProcessProducts(): Promise<
      {
         title: string;
         originalPrice: number;
         discountedProduct: number;
         discount: string;
      }[]
   > {
      try {
         const data: Product[] = await fetcher(
            "https://fakestoreapi.com/products",
            { timeout: 5000 }
         );

         return data
            .filter(({ category }) => category === "electronics")
            .map(({ price, title }) => {
               const discount = price >= 500 ? 15 : 5;
               return {
                  title,
                  originalPrice: price,
                  discountedProduct: price - (price * discount) / 100,
                  discount: `${discount}%`,
               };
            })
            .sort((a, b) => a.discountedProduct - b.discountedProduct);
      } catch (error) {
         console.error("Error fetching data:", error);
         return [];
      }
   }

   it("should return discounted product", async () => {
      const result = await fetchAndProcessProducts();

      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
         expect(result[0]).toHaveProperty("title");
         expect(result[0]).toHaveProperty("originalPrice");
         expect(result[0]).toHaveProperty("discountedProduct");
         expect(result[0]).toHaveProperty("discount");
      }
   });
});
