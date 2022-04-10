const path = require("path");
const cwd = process.cwd();
// eslint-disable-next-line import/no-dynamic-require
const package = require(path.resolve(cwd, "package.json"));

const isEsm = !!package.dependencies.esm;
const isTypescript = !!package.devDependencies.typescript;
const isNext = !!package.dependencies.next;
const isReact = !!package.dependencies.react;
const isReactDom = !!package.dependencies["react-dom"];
const isReactNative = !!package.dependencies["react-native"];

// React can be imported in CLI so we exclude it.
const isModule = isEsm || isTypescript || isNext || isReactDom;

const config = {
  env: {
    commonjs: true,
    node: true,
    es6: true,
    es2017: true,
    es2020: true,
    browser: isNext || isReactDom,
  },

  extends: [
    "eslint:recommended",
    !isReact && "airbnb-base",

    // This also loads the react plugin through eslint-config-airbnb >> react-a11y so we no longer need to include it.
    isReact && "airbnb",
    isReact && "airbnb/hooks",

    isTypescript && "plugin:@typescript-eslint/recommended",
    isTypescript && !isReact && "airbnb-typescript/base",

    isTypescript && isReact && "airbnb-typescript",

    isNext && "plugin:@next/next/recommended",

    "prettier",
  ].filter((i) => i),

  plugins: [isTypescript && "@typescript-eslint", "prettier"].filter((i) => i),

  // TS needs typescript-eslint. non-TS NextJS and React need JSX so use eslint-parser.
  ...((isTypescript || isNext) && {
    parser: isTypescript ? "@typescript-eslint/parser" : "@babel/eslint-parser",
  }),

  parserOptions: {
    sourceType: isModule ? "module" : "script",
    ecmaVersion: 2020,
    requireConfigFile: false,
    ...(isTypescript && { project: "tsconfig.json" }),
    // Fixes @babel/eslint-parser error:
    // "This experimental syntax requires enabling one of the following parser plugin(s)."
    ...(!isTypescript &&
      isNext && {
        babelOptions: {
          presets: ["next/babel"],
        },
      }),
  },

  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },

  settings: {
    /**
     *
     * 1. https://github.com/airbnb/javascript/issues/859#issuecomment-265862709
     * 2. https://github.com/import-js/eslint-plugin-import/tree/main/resolvers/node
     *
     * "paths" is used instead of "moduleDirectory" since "moduleDirectory"
     * triggers an "import/no-self-import" error when importing a file from
     * baseUrl which has the same name as an installed package. e.g.
     *
     * import knex from 'knex;
     *
     * Where knex exists in src/knex/index.ts
     *
     */
    "import/resolver": {
      node: {
        paths: ["src"],
      },
      ...(isTypescript && {
        typescript: {},
      }),
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
    "no-unused-vars": 1,
    "consistent-return": 0,
    "no-unreachable": 1,
    "import/no-extraneous-dependencies": [2, { devDependencies: true }],
    "no-restricted-exports": 0,
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

    ...(isNext && {
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
      // For next-optimized-images when it has a query string at the end.
      "import/no-unresolved": [2, { commonjs: true, ignore: [".+\\?.+$"] }],
      "@next/next/no-img-element": 0,
    }),

    ...(isReact && {
      "jsx-a11y/click-events-have-key-events": 1,
      "jsx-a11y/no-noninteractive-element-interactions": 1,
      "react/jsx-props-no-spreading": 1,
      "react/jsx-filename-extension": 0,
      "react/prop-types": 0,
      "react/jsx-curly-newline": 0,
      "react/jsx-fragments": 0,
      "react/react-in-jsx-scope": 0,
      "react/destructuring-assignment": 1,
      "react-hooks/exhaustive-deps": 1,
      "react/function-component-definition": [
        1,
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],
    }),

    ...(isReactNative && {
      // React Native usually defines styles at the bottom of the stylesheet.
      "no-use-before-define": "off",
    }),

    ...(isTypescript && {
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-unused-vars": 1,
      "@typescript-eslint/no-unused-expressions": 1,
      "@typescript-eslint/no-shadow": 1,
      "@typescript-eslint/naming-convention": 1,
      "@typescript-eslint/no-throw-literal": 1,
    }),

    ...(isTypescript &&
      isReact && {
        "react/require-default-props": 1,
      }),
  },
};

console.log("+++ Start of Generated ESLint Config");
console.log(JSON.stringify(config, null, 2));
console.log("+++ End of Generated ESLint Config");

module.exports = config;
