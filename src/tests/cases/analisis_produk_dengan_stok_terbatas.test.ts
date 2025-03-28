import fetcher from "./fetcher";

interface Data {
   title: string;
   price: number;
}

interface Product extends Data {
   stock: number;
   stockCategory: string;
}

describe("studi kasus analisis produk dengan stok terbatas", () => {
   async function fetchAndAnalyzeStock(): Promise<
      { title: string; price: number; stock: number; stockCategory: string }[]
   > {
      try {
         const data: Data[] = await fetcher(
            "https://fakestoreapi.com/products",
            {
               timeout: 5000,
            }
         );

         const products: Product[] = data.map(({ title, price }) => {
            const stock = Math.floor(Math.random() * 100) + 1;
            let stockCategory = "";

            if (stock <= 10) {
               stockCategory = "Low Stock";
            } else if (stock <= 50) {
               stockCategory = "Medium Stock";
            } else {
               stockCategory = "High Stock";
            }

            return { title, price, stock, stockCategory };
         });
         return products;
      } catch (err) {
         throw new Error(err);
      }
   }

   it("should return product", async () => {
      const result = await fetchAndAnalyzeStock();
      expect(Array.isArray(result)).toBeTruthy();
      if (result.length > 0) {
         expect(result[0]).toHaveProperty("title");
         expect(result[0]).toHaveProperty("price");
         expect(result[0]).toHaveProperty("stock");
         stockCategory: expect.stringMatching(
            /(Low Stock|Medium Stock|High Stock)/
         );
      }
   });
});
