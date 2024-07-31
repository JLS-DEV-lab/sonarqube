import react from "@vitejs/plugin-react";
import { defineConfig, mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig as defineTestConfig } from "vitest/config";

const baseConfig = defineConfig({
  plugins: [react(), tsconfigPaths()],
});

const testConfig = defineTestConfig({
  test: {
    globals: true,
    coverage: {
      reportsDirectory: "coverage",
      reporter: ["lcov", "html", "text"],
      all: true,
      include: ["src"],
      exclude: [
        ".github",
        ".vscode",
        "coverage",
        "node_modules",
        "tests",
        ".eslintrc.cjs",
        ".gitignore",
        "package.lock.json",
        "package.json",
        "README.md",
        "sonar-project.properties",
        "sonarlint.json",
        "tsconfig.app.json",
        "tsconfig.json",
        "tsconfig.node.json",
        "vite.config.ts",
        "vitest.setup.ts",
      ],
    },
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
});

export default mergeConfig(baseConfig, testConfig);
