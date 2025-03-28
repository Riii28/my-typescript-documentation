import fetcher from "./fetcher";

interface ProductCart {
   productId: number;
   quantity: number;
}

interface CartData {
   products: ProductCart[];
}

describe("studi kasus analisis kategori produk paling populer", () => {
   async function analyzePopulerProduct(): Promise<
      { category: string; quantity: number }[]
   > {
      try {
         const cartsData: CartData[] = await fetcher(
            "https://fakestoreapi.com/carts",
            {
               timeout: 5000,
            }
         );

         const countProductCategory: Record<number, number> = cartsData
            .flatMap(({ products }) => products)
            .reduce((acc, { productId, quantity }) => {
               acc[productId] = (acc[productId] || 0) + quantity;
               return acc;
            }, {} as Record<number, number>);

         const products = await Promise.all(
            Object.entries(countProductCategory).map(
               async ([productId, quantity]) => {
                  try {
                     const product: { category: string; title: string } =
                        await fetcher(
                           `https://fakestoreapi.com/products/${productId}`,
                           { timeout: 10000 }
                        );

                     return {
                        category: product.category,
                        quantity,
                     };
                  } catch (err) {
                     throw new Error(`${err}`);
                  }
               }
            )
         );

         const countQuantityCategory: Record<string, number> = products.reduce(
            (acc, { category, quantity }) => {
               acc[category] = (acc[category] || 0) + quantity;
               return acc;
            },
            {} as Record<string, number>
         );

         const populerProducts: { category: string; quantity: number }[] =
            Object.entries(countQuantityCategory)
               .map(([category, quantity]) => ({ category, quantity }))
               .sort((a, b) => b.quantity - a.quantity);

         return populerProducts;
      } catch (err) {
         throw new Error(`${err}`);
      }
   }

   it("should return products", async () => {
      const result = await analyzePopulerProduct();
      expect(result).toEqual([
         { category: "men's clothing", quantity: 31 },
         { category: "electronics", quantity: 6 },
         { category: "jewelery", quantity: 4 },
         { category: "women's clothing", quantity: 1 },
      ]);
   });
});
