import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import solid from "eslint-plugin-solid/configs/typescript.js";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type { import("eslint").Linter.FlatConfig } */
const baseConfig = {
  files: ["**/*.{js,jsx,ts,tsx}"],
  plugins: {
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};

const tsConfigs = [
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

/** @type { import("eslint").Linter.FlatConfig } */
const srcConfig = {
  files: ["src/**/*.{ts,tsx}"],
  languageOptions: {
    globals: { ...globals.browser, ...globals.es2021 },
  },
  ...solid,
  rules: {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "off",
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
const configConfig = {
  files: ["*.config.*"],
  languageOptions: {
    globals: { ...globals.node },
  },
  ...tseslint.configs.disableTypeChecked,
};

/** @type { import("eslint").Linter.FlatConfig } */
const scriptConfig = {
  files: ["scripts/**/*"],
  languageOptions: {
    globals: { ...globals.node },
  },
  ...tseslint.configs.disableTypeChecked,
};

const e2eConfig = {
  files: ["e2e/**/*"],
  ...tseslint.configs.disableTypeChecked,
};

/** @type { import("eslint").Linter.FlatConfig[] } */
export default tseslint.config(
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
  },
  {
    ignores: [".output/*", ".wxt/*", "playwright-report/*"],
  },
  js.configs.recommended,
  ...tsConfigs,
  baseConfig,
  srcConfig,
  configConfig,
  scriptConfig,
  e2eConfig,
  prettier,
);
