interface Product {
   id: string;
   name: string;
   category: string;
}

interface RecomendationInput {
   products: Product[];
   purchaseHistory: string[];
}

function getRecommendations({
   products,
   purchaseHistory,
}: RecomendationInput): any {
   function getProducts(id: string): any[] {
      return products.filter((product) => parseInt(product.id) === parseInt(id))
   }
   const produk = purchaseHistory.map((id) => getProducts(id));
   console.info('product: ',produk)
}

describe("studi kasus: sistem rekomendasi produck", () => {
   // Deskripsi:
   // 1. Ada daftar produk yang tersedia, masing-masing memiliki kategori.
   // 2. Ada daftar riwayat pembelian pengguna (produk yang sudah dibeli).
   // 3. Sistem harus merekomendasikan 3 produk dari kategori yang paling sering dibeli pengguna.
   // 4. Jika kurang dari 3 produk tersedia di kategori itu, ambil dari kategori paling sering berikutnya.
   // 5. Jika masih kurang, ambil produk secara random dari kategori lain yang belum dipilih.
   // 6. Produk yang sudah dibeli tidak boleh direkomendasikan kembali.

   const products: Product[] = [
      { id: "1", name: "Laptop", category: "Electronics" },
      { id: "2", name: "Mouse", category: "Electronics" },
      { id: "3", name: "Keyboard", category: "Electronics" },
      { id: "4", name: "Chair", category: "Furniture" },
      { id: "5", name: "Desk", category: "Furniture" },
      { id: "6", name: "Monitor", category: "Electronics" },
      { id: "7", name: "Headphones", category: "Accessories" },
      { id: "8", name: "Mousepad", category: "Accessories" },
   ];

   test("Merekomendasikan produk dari kategori paling sering dibeli", () => {
      const purchaseHistory = ["1", "2", "6"]; // Semua dari Electronics
      const recommendations = getRecommendations({ products, purchaseHistory });
      expect(recommendations).toHaveLength(3);
      expect(
         recommendations.every((p: Product) => p.category === "Electronics")
      ).toBeTruthy();
   });

   test("Mengisi rekomendasi dari kategori lain jika kurang", () => {
      const purchaseHistory = ["1", "2", "3", "6", "7", "8"];
      const recommendations = getRecommendations({ products, purchaseHistory });
      expect(recommendations).toHaveLength(3);
      expect(
         recommendations.some((p: Product) => p.category !== "Electronics")
      ).toBeTruthy();
   });

   test("Tidak merekomendasikan produk yang sudah dibeli", () => {
      const purchaseHistory = products.map((p) => p.id); // Semua sudah dibeli
      const recommendations = getRecommendations({ products, purchaseHistory });
      expect(recommendations).toHaveLength(0);
   });
});
