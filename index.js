// Load this config last to ensure all rules overridden.

module.exports = {
  env: {
    // Webpack
    commonjs: true,
    // Node
    node: true,
    // Older ECMA Script
    es6: true,
    es2017: true,
    // New Stuff like optional chaining.
    es2020: true,
  },

  // Use the latest environment.
  parserOptions: {
    ecmaVersion: 2020,
  },

  /**
   * - Add prettier in both plugins and extends instead of just
   *   "plugin:prettier/recommended" in the extends array.
   * - https://github.com/prettier/eslint-plugin-prettier/issues/103#issuecomment-425670176
   */
  // Make eslint error out when prettier sees errors.
  plugins: ["prettier"],

  // Stop eslint rules that may conflict with prettier.
  extends: ["prettier"],

  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
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
  },

  rules: {
    /**
     * Style
     */
    "prettier/prettier": 1,
    // https://github.com/prettier/eslint-plugin-prettier#arrow-body-style-and-prefer-arrow-callback-issue
    "arrow-body-style": 0,
    "prefer-arrow-callback": 0,

    /**
     * Common
     */
    // https://github.com/airbnb/javascript/blob/64b965efe0355c8290996ff5a675cd8fb30bf843/packages/eslint-config-airbnb-base/rules/style.js#L334-L352
    "no-restricted-syntax": [2, "LabeledStatement", "WithStatement"],
    "no-await-in-loop": 0,
    "wrap-iife": 0,
    "global-require": 0,
    "func-names": 0,
    "import/newline-after-import": 0,
    "no-console": 1,

    "import/order": [
      1,
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        /**
         * Allow the use of external for matching for classnames/bind which we
         * want near the end of the component's imports together with the
         * ./Component.module.scss file.
         */
        pathGroupsExcludedImportTypes: ["builtin"],
        pathGroups: [
          {
            pattern: "classnames/bind",
            group: "sibling",
          },
          {
            pattern: "**twind/css",
            group: "sibling",
          },
        ],
      },
    ],

    /**
     * React
     */
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "react/jsx-curly-newline": 0,
    "react/jsx-fragments": 0,
    "consistent-return": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,

    /**
     * NextJS
     */
    "react/react-in-jsx-scope": 0,
    "import/no-extraneous-dependencies": [2, { devDependencies: true }],
    // next-optimized-images
    "import/no-unresolved": [2, { commonjs: true, ignore: [".+\\?.+$"] }],

    /**
     * Mixture of TS and Js
     */
    "@typescript-eslint/no-var-requires": 0,
  },
};
