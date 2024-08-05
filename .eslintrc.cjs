const { default: ts } = require("typescript");

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/strict",
    "prettier",
  ],
  ignorePatterns: [
    "dist",
    "coverage",
    ".eslintrc.cjs",
    "**/*.config.js",
    "**/*.config.ts",
    "**/*.setup.ts",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    project: true,
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/return-await": "error",
    "no-console": "warn",
    "react/prefer-read-only-props": "warn",
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    semi: ["error", "always"],
  },
  overrides: [
    {
      files: ["src/**/*.{ts,tsx}", "tests/**/*.ts"],
      rules: {
        // Add any file-specific rules here if needed
      },
    },
  ],
};
