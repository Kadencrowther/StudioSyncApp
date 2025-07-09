// // eslint configuration file for Firebase Functions with TypeScript
// module.exports = {
//   root: true,
//   env: {
//     es6: true,
//     node: true,
//   },
//   extends: [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:import/errors",
//     "plugin:import/warnings",
//     "plugin:import/typescript",
//     "google",
//   ],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     ecmaVersion: 2020,
//     sourceType: "module",
//     project: ["tsconfig.json", "tsconfig.dev.json"],
//   },
//   ignorePatterns: [
//     "/lib/**/*", // ignore built files
//     "/generated/**/*", // ignore generated files
//   ],
//   plugins: ["@typescript-eslint", "import"],
//   rules: {
//     quotes: ["error", "double"],
//     indent: ["error", 2],
//     "import/no-unresolved": 0,
//     "@typescript-eslint/no-unused-expressions": [
//       "error",
//       {
//         allowShortCircuit: true,
//         allowTernary: true,
//         allowTaggedTemplates: true,
//       },
//     ],
//   },
// };

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
