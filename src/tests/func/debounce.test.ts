test("Debounce", async () => {
   function debounce<T extends (...args: any[]) => Promise<any>>(
      fn: T,
      delay: number
   ): (...args: Parameters<T>) => Promise<void> {
      let timer: NodeJS.Timeout;
      return (...args: Parameters<T>) => {
         clearTimeout(timer);
         return new Promise((resolve) => {
            timer = setTimeout(async () => {
               resolve(await fn(...args));
            }, delay);
         });
      };
   }

   const fetchUserPost = debounce(async (postIds: number[]) => {
      try {
         let loop = true;
         let receivedText = "";
         const decoder = new TextDecoder();

         const responses: Response[] = await Promise.all(
            postIds.map((id) =>
               fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            )
         );

         const readers = responses.map((res) => res.body?.getReader());

         if (readers.some((reader) => reader === undefined)) {
            throw new Error("tidak bisa");
         }

         while (loop) {
            for (const reader of readers) {
               if (!reader) continue;

               const { value, done } = await reader.read();

               if (done) {
                  loop = false;
                  break;
               }

               receivedText += decoder.decode(value, { stream: true });
               console.info(receivedText);
            }
         }
      } catch (err) {
         console.error(err);
      }
   }, 50);

   await fetchUserPost([1, 2, 3,4,5,6,7,8,1,2,3,4,5]);
});
