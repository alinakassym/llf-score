// eslint.config.js
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactNative from "eslint-plugin-react-native";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      "android",
      "ios",
      ".expo",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        // Expo + RN:
        __DEV__: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-native": reactNative,
      "@typescript-eslint": tseslint,
    },
    // Порядок важен: base → react/rn → ts → prettier
    extends: [
      js.configs.recommended,
      react.configs.recommended,
      reactHooks.configs.recommended,
      "plugin:react-native/all",
      // TS без type-aware, чтобы не требовать проектный tsconfig в ESLint
      "plugin:@typescript-eslint/recommended",
      prettier,
    ],
    rules: {
      // Общие
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-undef": "off",

      // React
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React Native
      "react-native/no-inline-styles": "off", // в RN иногда оправдано
      "react-native/no-raw-text": "off", // отключаем для простоты i18n в начале

      // Прочее
      quotes: ["error", "double", { avoidEscape: true }],
    },
    settings: {
      react: { version: "detect" },
    },
  },
]);
