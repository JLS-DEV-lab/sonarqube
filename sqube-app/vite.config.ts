/// <reference types="vitest" />

import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  cacheDir: ".vite",
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: ["**/.eslintrc.cjs"],
    }
  },
  resolve: {
    alias: {
      '@/*': '/src/*',
      '@elements': '/src/components/elements',
      '@hooks': '/src/components/hooks',
      '@modules': '/src/components/modules',
      '@pages': '/src/components/pages',
      '@types': '/src/types',
      '@utils/*': '/src/utils/*',
    },
  }
});
