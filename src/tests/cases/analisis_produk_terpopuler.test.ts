import fetcher from "./fetcher";

interface Cart {
   productId: number;
   quantity: number;
}
interface DataCart {
   products: Cart[];
}

describe("studi kasus analisis produk terpopuler", () => {
   async function fetchPopulerProduct() {
    try {
        const dataCarts: DataCart[] = await fetcher(
           "https://fakestoreapi.com/carts",
           { timeout: 5000 }
        );
        const carts: Record<string, number> = dataCarts
           .flatMap((item) => item.products)
           .reduce((acc, { productId, quantity }) => {
              acc[productId] = (acc[productId] || 0) + quantity;
              return acc;
           }, {} as Record<string, number>);
  
        const populerProducts: { product: string; quantity: number }[] =
           await Promise.all(
              Object.entries(carts).map(async ([productId, quantity]) => {
                 const product: { title: string } = await fetcher(
                    `https://fakestoreapi.com/products/${productId}`,
                    { timeout: 10000 }
                 );
                 return {
                    product: product.title,
                    quantity,
                 };
              })
           );
  
        return populerProducts.sort((a, b) => b.quantity - a.quantity);
    } catch (err) {
        throw new Error(err)
    }
   }

   it("should return populer product", async () => {
      const result = await fetchPopulerProduct();
      expect(Array.isArray(result)).toBeTruthy();
      if (result.length > 0) {
         expect(result[0]).toHaveProperty("product");
         expect(result[0]).toHaveProperty("quantity");
      }
   });
});
