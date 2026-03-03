import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    /*
       NIVELES:
       - "off" o 0: Deshabilitada
       - "warn" o 1: Advertencia (no bloquea)
       - "error" o 2: Error (bloquea build)
       -----------------------------------------------------------
       -  newlines-between: "always" = línea vacía entre grupos
    */
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/self-closing-comp": "warn",
      "react/jsx-boolean-value": ["warn", "never"],
      "import/order": [
        "warn",
        {
          groups: [
            "builtin", // Node.js: fs, path, http
            "external", // npm: react, axios, lodash
            "internal", // @/... aliases
            "parent", // ../
            "sibling", // ./
            "index", // ./index
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc", // Orden ascendente (A-Z)
            caseInsensitive: true, // Ignora mayúsculas
          },
        },
      ],
      "import/no-duplicates": "warn",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-debugger": "warn",
      "prefer-const": "warn",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      curly: ["warn", "multi-line"],
      "@next/next/no-html-link-for-pages": "warn",
      "@next/next/no-img-element": "warn",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "public/**",
      "*.config.js",
      "*.config.ts",
      "*.config.mjs",
      "next-env.d.ts",
      ".turbo/**",
      "coverage/**",
      ".eslintcache",
    ],
  },
  {
    files: ["*.config.{js,ts,mjs}"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default eslintConfig;
