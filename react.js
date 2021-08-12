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
  rules: {
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "react/jsx-curly-newline": 0,
    "react/jsx-fragments": 0,
    "react/jsx-props-no-spreading": 1,
    "react/react-in-jsx-scope": 0,
  },
};
