module.exports = {
  // For dynamic imports.
  // Requires babel-eslint.
  parser: "babel-eslint",
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
