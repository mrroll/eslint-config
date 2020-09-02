module.exports = {
  // For dynamic imports.
  // Requires babel-eslint.
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  settings: {
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react/jsx-curly-newline": "off",
    "react/jsx-fragments": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    // NextJS
    "react/react-in-jsx-scope": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/no-unresolved": ["error", { commonjs: true, ignore: [".+\\?.+$"] }],
    // Style
    "no-console": "warn",
    quotes: [1, "double"],
  },
  rules: {},
};
