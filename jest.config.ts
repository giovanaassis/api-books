import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["<rootDir>/src/tests/**/*.test.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  setupFilesAfterEnv: ["dotenv/config"],
};

export default config;
