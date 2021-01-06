// Load this config last to ensure all rules overridden.

module.exports = {
  env: {
    es6: true,
  },
  extends: ["plugin:prettier/recommended"],
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
  },
  rules: {
    /**
     * Style
     */
    quotes: [1, "double"],

    /**
     * Common
     */
    // https://github.com/airbnb/javascript/blob/64b965efe0355c8290996ff5a675cd8fb30bf843/packages/eslint-config-airbnb-base/rules/style.js#L334-L352
    // "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
    "no-await-in-loop": "off",
    "wrap-iife": "off",
    "global-require": "off",
    "func-names": "off",
    "import/newline-after-import": "off",
    "prefer-arrow-callback": "off",
    "no-console": "warn",

    "import/order": [
      "warn",
      {
        /**
         * Allow the use of external for matching for classnames/bind which we
         * want at the end of the component's imports together with the
         */
        pathGroupsExcludedImportTypes: ["builtin"],
        pathGroups: [
          {
            pattern: "classnames/bind",
            group: "sibling",
          },
        ],
      },
    ],

    /**
     * React
     */
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react/jsx-curly-newline": "off",
    "react/jsx-fragments": "off",
    "consistent-return": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",

    /**
     * NextJS
     */
    "react/react-in-jsx-scope": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    // next-optimized-images
    "import/no-unresolved": ["error", { commonjs: true, ignore: [".+\\?.+$"] }],
  },
};
