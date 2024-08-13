const reactPlugin = require("eslint-plugin-react");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const simpleImportSortPlugin = require("eslint-plugin-simple-import-sort");
const prettierPlugin = require("eslint-plugin-prettier");
const importPlugin = require("eslint-plugin-import");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    ignores: ["dist","src/__mocks__/styleMock.js"],
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: "./",
      },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": typescriptPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      prettier: prettierPlugin,
      import: importPlugin, 
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-redux",
              importNames: ["useSelector", "useStore", "useDispatch"],
              message:
                "Please use pre-typed versions from `src/app/hooks.ts` instead.",
            },
          ],
        },
      ],
      "no-console": "warn",
      curly: ["error", "all"],
      "import/prefer-default-export": "off",
      "import/no-default-export": "error",
      "react/jsx-no-useless-fragment": "error",
      "no-unused-expressions": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^node:"],
            ["^react", "^@?\\w"],
            ["^(@|components|utils|config|vendored-lib)(/.*|$)"],
            ["^\\.\\.(?!/?$)", "^\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["*.{c,m,}{t,j}s", "*.{t,j}sx"],
    rules: {
      "import/no-default-export": "off",
    },
  },
  {
    files: ["*{test,spec}.{t,j}s?(x)"],
    languageOptions: {
      globals: {
        jest: true,
      },
    },
  },
  {
    files: ["src/app/hooks.ts"],
    rules: {
      "@typescript-eslint/no-restricted-imports": "off",
    },
  },
];