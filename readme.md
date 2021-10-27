[Known Issue](https://github.com/facebook/react/issues/22545) #1 Workaround for `yarn` and eslint ^8.

`package.json`

```json
"resolutions": {
    "eslint-plugin-react-hooks": "^4.2.1-alpha-4298ddbc5-20211023"
  }
```

---

Automatic Configuration

`eslintrc.js`

```js
// Load eslint plugins from this package.
require("@mrroll/eslint-config/patch");

module.exports = {
  extends: ["@mrroll/eslint-config/auto"],
};
```
