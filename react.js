module.exports = {
  // For dynamic imports.
  // Requires babel-eslint.
  parser: "babel-eslint",
  // Newer but requires config.
  // parser: "@babel/eslint-parser",
  env: {
    browser: true,
  },
  extends: ["airbnb", "airbnb/hooks"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },
  plugins: ["react"],
};
