import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { config, configs } from "typescript-eslint";

const reactHooksRecommended =
  reactHooks.configs.flat?.recommended.rules ??
  reactHooks.configs.recommended.rules;

export default config(
  {
    ignores: ["node_modules/**", "build/**", ".cache/**", ".react-router/**"],
  },
  js.configs.recommended,
  ...configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  jsxA11y.flatConfigs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/internal-regex": "^~/",
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,
      ...reactHooksRecommended,
      "react/prop-types": "off",
    },
  },
  {
    files: [
      "*.config.{js,ts}",
      "vite.config.ts",
      "react-router.config.ts",
      "scripts/**/*.{js,mjs}",
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
);
