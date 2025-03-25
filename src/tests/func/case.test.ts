describe("studi kasus", () => {
   it("kasus 1: analisis data pemesanan produk", () => {
      interface Item {
         name: string;
         quantity: number;
      }

      interface Order {
         id: number;
         customer: string;
         items: Item[];
         totalAmount: number;
         date: string;
      }

      const orders: Order[] = [
         {
            id: 1,
            customer: "Alice",
            items: [
               { name: "Laptop", quantity: 1 },
               { name: "Mouse", quantity: 2 },
            ],
            totalAmount: 1200,
            date: "2025-03-20",
         },
         {
            id: 2,
            customer: "Bob",
            items: [
               { name: "Keyboard", quantity: 1 },
               { name: "Mouse", quantity: 1 },
            ],
            totalAmount: 150,
            date: "2025-03-19",
         },
         {
            id: 3,
            customer: "Alice",
            items: [{ name: "Monitor", quantity: 1 }],
            totalAmount: 300,
            date: "2025-03-18",
         },
         {
            id: 4,
            customer: "Charlie",
            items: [{ name: "Laptop", quantity: 2 }],
            totalAmount: 2400,
            date: "2025-03-18",
         },
         {
            id: 5,
            customer: "Alice",
            items: [{ name: "Mouse", quantity: 3 }],
            totalAmount: 75,
            date: "2025-03-17",
         },
      ];

      function totalRevenue(orders: Order[]): number {
         return orders.reduce((acc, { totalAmount }) => acc + totalAmount, 0);
      }

      function customerSpending(orders: Order[]): Record<string, number> {
         return orders.reduce((acc, { customer, totalAmount }) => {
            acc[customer] = (acc[customer] || 0) + totalAmount;
            return acc;
         }, {} as Record<string, number>);
      }

      function biggestSpender(spender: Record<string, number>): {
         customer: string;
         amount: number;
      } {
         return Object.entries(spender).reduce(
            (acc, [customer, amount]) =>
               amount > acc.amount ? { customer, amount } : acc,
            { customer: "", amount: 0 }
         );
      }

      const customers = customerSpending(orders)

      console.info(biggestSpender(customers))

      //   const mostOrdered = orders
      //      .map((order) => order.items)
      //      .flatMap((flat) => flat)
      //      .reduce((acc, curr) => (curr.quantity > acc.quantity ? curr : acc));

      expect(totalRevenue(orders)).toBe(4125);
      //   expect(biggestSpender).toEqual({
      //      id: 4,
      //      customer: "Charlie",
      //      items: [{ name: "Laptop", quantity: 2 }],
      //      totalAmount: 2400,
      //      date: "2025-03-18",
      //   });
      //   expect(mostOrdered).toEqual({ name: "Mouse", quantity: 3 });
   });
});
