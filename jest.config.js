/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  testMatch: ["**/src/tests/**/*.test.ts"],
  transformIgnorePatterns: ["/node_modules/", "/dist/"]
};