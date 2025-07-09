module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.dev.json"],
    sourceType: "module",
    ecmaVersion: 2020,
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
  rules: {
    quotes: ["error", "double"],
    indent: ["error", 2],
    "import/no-unresolved": "off",
    "@typescript-eslint/no-unused-expressions": "off",
  },
  ignorePatterns: ["lib/**/*", "generated/**/*"],
};
