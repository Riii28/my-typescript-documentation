describe("functional programming", () => {
   it("latihan 1: konsep pure function", () => {
      const arr1: number[] = [5, 10, 15, 20];

      function addTenToArray(numbers: number[]): number[] {
         return numbers.map((num) => num + 10);
      }

      const arr2: number[] = addTenToArray(arr1);

      expect(arr1).toEqual([5, 10, 15, 20]);
      expect(arr2).toEqual([15, 20, 25, 30]);
   });

   it("latihan 2: higher-order function", () => {
      const arr: number[] = [1, 2, 3, 4, 5];

      function square(num: number): number {
         return num * num;
      }

      function applyOperation(
         numbers: number[],
         operation: (num: number) => number
      ): number[] {
         return numbers.map((num) => operation(num));
      }

      const squaredNumbers = applyOperation(arr, square);

      expect(squaredNumbers).toEqual([1, 4, 9, 16, 25]);
      expect(arr).toEqual([1, 2, 3, 4, 5]);
   });

   it("latihan 3: konsep function composition", () => {
      function double(num: number): number {
         return num * 2;
      }

      function addFive(num: number): number {
         return num + 1;
      }

      function compose<T>(f: (arg: T) => T, g: (arg: T) => T): (arg: T) => T {
         return (x: T) => f(g(x));
      }

      const doubleThenAddFive = compose(addFive, double);

      expect(doubleThenAddFive(3)).toBe(7);
      expect(doubleThenAddFive(5)).toBe(11);
   });

   it("latihan 4: rekursi dalam functional programming", () => {
      function sumRecursive(numbers: number[]): number {
         if (numbers.length === 0) return 0;

         return numbers[0]! + sumRecursive(numbers.slice(1));
      }

      expect(sumRecursive([1, 2, 3, 4, 5])).toBe(15);
   });

   it('latihan 5: konsep currying function', () => {
      function multiply(a: number): (b: number) => number {
         return (b) => {
            return a * b
         }
      }

      const double = multiply(2)
      const triple = multiply(3)

      expect(double(4)).toBe(8)
      expect(triple(5)).toBe(15)
   })

   it('latihan 6: currying lebih dalam', () => {
      function calculate(a: number): (b: number) => (c: number) => number {
         return (b) => (c) => a + b * c
      }
   
      const addThenMultiply = calculate(2)
      
      expect(addThenMultiply(3)(4)).toBe(2 + 3 * 4) // 14
      expect(addThenMultiply(1)(5)).toBe(2 + 1 * 5) // 7
   })
});
