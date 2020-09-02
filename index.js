module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  settings: {
    // https://github.com/airbnb/javascript/issues/859#issuecomment-265862709
    "import/resolver": {
      node: {
        moduleDirectory: [
          "node_modules",
          "src", // replace with your app-module-path directory
        ],
      },
    },
    "consistent-return": "off",
  },
  rules: {},
};
