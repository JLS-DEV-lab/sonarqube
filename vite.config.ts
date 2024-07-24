import react from "@vitejs/plugin-react";
import { defineConfig, mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig as defineTestConfig } from "vitest/config";

const baseConfig = defineConfig({
  plugins: [react(), tsconfigPaths()]
});

const testConfig = defineTestConfig({
  test: {
    coverage: {
      reportsDirectory: "coverage",
      reporter: ["lcov", "html", "text"],
      all: true,
      include: ["src"],
      exclude: ["**/*.{test,spec}.?(c|m)[jt]s?(x)", "**/*.d.ts", "src/main.ts?(x)"],
    },
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});

export default mergeConfig(baseConfig, testConfig);
