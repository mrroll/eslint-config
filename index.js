const path = require("path");
const semver = require("semver");
const cwd = process.cwd();
// eslint-disable-next-line import/no-dynamic-require
const package = require(path.resolve(cwd, "package.json"));

const isDependency = (dependency) =>
  dependency in package.dependencies || dependency in package.devDependencies;

const isAnyOneADependency = (dependencies) =>
  dependencies.some((dependency) => isDependency(dependency));

const version = (dependency) => {
  if (isDependency(dependency) === false) {
    throw new Error(`${dependency} is not a dependency in this project.`);
  }

  return package.dependencies[dependency] ?? package.devDependencies[dependency];
};

const sourceType = () => {
  const isModule = isAnyOneADependency(["esm", "typescript", "next", "react-dom"]);

  if (isModule) {
    return "module";
  }

  return "script";
};

const ecmaVersion = 2020;

const rules = {
  "prettier/prettier": 1,
  // https://github.com/prettier/eslint-plugin-prettier#arrow-body-style-and-prefer-arrow-callback-issue
  "arrow-body-style": 0,
  "prefer-arrow-callback": 0,

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
      groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
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

  ...(isDependency("next") &&
    semver.satisfies(version("next"), "< 12.1.6") && {
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"],
        },
      ],
    }),

  ...(isDependency("next") && {
    // For next-optimized-images when it has a query string at the end.
    "import/no-unresolved": [2, { commonjs: true, ignore: [".+\\?.+$"] }],
    "@next/next/no-img-element": 0,
  }),

  ...(isDependency("react") && {
    "jsx-a11y/click-events-have-key-events": 1,
    "jsx-a11y/no-noninteractive-element-interactions": 1,
    "jsx-a11y/label-has-associated-control": 0,
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

  ...(isDependency("react-native") && {
    // React Native usually defines styles at the bottom of the stylesheet.
    "no-use-before-define": 0,
  }),
};

const config = {
  env: {
    commonjs: true,
    node: true,
    es6: true,
    es2017: true,
    es2020: true,
    browser: isDependency("next") || isDependency("react-dom"),
  },

  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },

  overrides: [
    {
      files: ["*.js", "*.jsx"],

      extends: [
        "eslint:recommended",
        !isDependency("react") && "airbnb-base",

        // This also loads the react plugin through eslint-config-airbnb >> react-a11y so we no longer need to include it.
        isDependency("react") && "airbnb",
        isDependency("react") && "airbnb/hooks",

        isDependency("next") && "plugin:@next/next/recommended",

        "prettier",
      ].filter(Boolean),

      plugins: ["prettier"],

      parser: "@babel/eslint-parser",

      parserOptions: {
        sourceType: sourceType(),
        ecmaVersion,
        requireConfigFile: false,

        // Fixes @babel/eslint-parser error:
        // "This experimental syntax requires enabling one of the following parser plugin(s)."
        ...(isDependency("next") && {
          babelOptions: {
            presets: ["next/babel"],
          },
        }),
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
        },
      },

      rules: {
        ...rules,
      },
    },
    {
      files: ["*.ts", "*.tsx"],

      extends: [
        "eslint:recommended",
        !isDependency("react") && "airbnb-base",

        // This also loads the react plugin through eslint-config-airbnb >> react-a11y so we no longer need to include it.
        isDependency("react") && "airbnb",
        isDependency("react") && "airbnb/hooks",

        "plugin:@typescript-eslint/recommended",
        !isDependency("react") && "airbnb-typescript/base",

        isDependency("react") && "airbnb-typescript",

        isDependency("next") && "plugin:@next/next/recommended",

        "prettier",
      ].filter(Boolean),

      plugins: ["@typescript-eslint", "prettier"],

      parser: "@typescript-eslint/parser",

      parserOptions: {
        sourceType: "module",
        ecmaVersion,
        project: "tsconfig.json",
      },

      settings: {
        "import/resolver": {
          typescript: {},
        },

        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"],
        },
      },

      rules: {
        ...rules,

        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-unused-vars": 1,
        "@typescript-eslint/no-unused-expressions": 1,
        "@typescript-eslint/no-shadow": 1,
        "@typescript-eslint/naming-convention": 1,
        "@typescript-eslint/no-throw-literal": 1,

        ...(isDependency("react") && {
          "react/require-default-props": 0,
        }),

        ...(isDependency("react-native") && {
          "@typescript-eslint/no-use-before-define": 0,
        }),
      },
    },
  ],
};

// console.log("+++ Start of Generated ESLint Config");
// console.log(JSON.stringify(config, null, 2));
// console.log("+++ End of Generated ESLint Config");
// console.count("+++ Loaded ESLint Config");

module.exports = config;
