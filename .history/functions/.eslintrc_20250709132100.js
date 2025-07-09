module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: ["./tsconfig.json"], // Make sure tsconfig.json includes "src" and this file (see tsconfig below)
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
  ],
  ignorePatterns: [
    "/lib/**/*", // Ignore compiled output
    "/generated/**/*", // Ignore generated files
    ".eslintrc.js", // Ignore the ESLint config itself if you want
  ],
  rules: {
    quotes: ["error", "double"],
    indent: ["error", 2],
    "import/no-unresolved": "off",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
  },
};
