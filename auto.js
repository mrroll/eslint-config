const path = require("path");

const cwd = process.cwd();

const package = require(path.resolve(cwd, "package.json"));

const isEsm = !!package.dependencies.esm;
const isTypescript = !!package.devDependencies.typescript;
const isNext = !!package.dependencies.next;
const isReact = !!package.dependencies.react;
const isReactDom = !!package.dependencies["react-dom"];

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

  //   Only override the parser if we need to.
  ...((isTypescript || isNext) && {
    parser: isTypescript ? "@typescript-eslint/parser" : "@babel/eslint-parser",
  }),

  parserOptions: {
    sourceType: isModule ? "module" : "script",
    ecmaVersion: 2020,
    requireConfigFile: false,
    ...(isTypescript && { project: "tsconfig.json" }),
  },

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
          "src", // replace with your app-module-path directory or just use paths.
        ],
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
    }),

    ...(isTypescript && {
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-unused-vars": 1,
      "@typescript-eslint/no-unused-expressions": 1,
      "@typescript-eslint/no-shadow": 1,
      "@typescript-eslint/naming-convention": 1,
    }),

    ...(isTypescript &&
      isReact && {
        "react/require-default-props": 1,
      }),
  },
};

// Output current config for debugging.
// require("fs").writeFileSync("config.json", JSON.stringify(config));

module.exports = config;
