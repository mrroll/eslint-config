`eslintrc.js`

```js
// Load eslint plugins from this package.
require("@mrroll/eslint-config/patch");

module.exports = {
  extends: [
    "@mrroll/eslint-config/base",
    "@mrroll/eslint-config/esm",
    "@mrroll/eslint-config/react",
    "@mrroll/eslint-config/react-native",
    "@mrroll/eslint-config",
  ],
};
```
