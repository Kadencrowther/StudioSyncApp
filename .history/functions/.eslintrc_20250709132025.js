import typescriptPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.dev.json"],
        sourceType: "module",
        ecmaVersion: 2020,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      import: "eslint-plugin-import",
    },
    rules: {
      quotes: ["error", "double"],
      "import/no-unresolved": "off",
      indent: ["error", 2],
      // add other rules here...
    },
    extends: [
      "eslint:recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "google",
      "plugin:@typescript-eslint/recommended",
    ],
  },
];
