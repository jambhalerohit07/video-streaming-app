import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import eslintPluginImportX from "eslint-plugin-import-x";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignore dist folders globally
  globalIgnores(["dist", "build", ".vite"]),

  {
    files: ["**/*.{js,jsx}"],

    // Extend base + plugins
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },

    plugins: {
      prettier,
      import: eslintPluginImportX,
    },

    rules: {
      // ===========================
      // Development-grade rules
      // ===========================

      // Prettier formatting as ESLint errors
      "prettier/prettier": "error",

      // General JS quality
      "no-unused-vars": ["warn"],
      "no-console": "warn",
      "no-debugger": "warn",
      "no-duplicate-imports": "error",
      "prefer-const": "error",

      // Import rules (production grade)
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],
      "import/no-unresolved": "error",

      // React rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
]);
