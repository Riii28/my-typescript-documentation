import { readFile } from "fs/promises";
import { resolve } from "node:path";

test("test file system", async () => {
    async function logFile() {
        try {
            const filePath = resolve(
                "C:/Users/HP/OneDrive/language/program-typescript/learn-ts-2/src/tests/promises/promise.test.ts"
            );
            const contents = await readFile(filePath, { encoding: "utf8" });
            const reader = contents;

            console.info(contents);
        } catch (err) {
            console.error(err);
        }
    }

    console.info(await logFile());
});
