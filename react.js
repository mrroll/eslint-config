module.exports = {
  env: {
    // Browser Globals
    browser: true,
  },
  extends: ["airbnb", "airbnb/hooks"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    // Enable JSX
    ecmaFeatures: {
      jsx: true,
    },
    // If we're doing JSX, we're doing ESM, not AMD/Script.
    sourceType: "module",
    // @babel/eslint-parser requires a babel config by default.
    requireConfigFile: false,
  },
  plugins: ["react"],
};
