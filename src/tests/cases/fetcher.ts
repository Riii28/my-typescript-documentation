type FetchOptions = RequestInit & { timeout?: number };

export default async function fetcher<T>(
   url: string,
   options?: FetchOptions
): Promise<T> {
   const controller = new AbortController();
   const timeout = options?.timeout || 5000;

   const timeoutId = setTimeout(() => controller.abort(), timeout);

   try {
      const response = await fetch(url, {
         ...options,
         signal: controller.signal,
      });

      if (!response.ok) {
         throw new Error(`HTTP Error! ${response.status}`);
      }

      return (await response.json()) as T;
   } catch (err) {
      if (err instanceof DOMException && err.name === "AbortController") {
         throw new Error("request timed out!");
      }
      throw err;
   } finally {
      clearTimeout(timeoutId);
   }
}
