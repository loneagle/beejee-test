module.exports = {
    extends: [
      "airbnb",
      "plugin:react/recommended",
      "prettier",
      "prettier/react",
    ],
    "env": {
        "browser": true
    },
    "parser": "babel-eslint",
    "plugins": [
      "prettier",
      "react"
    ],
    "rules": {
      "jsx-a11y/anchor-is-valid": [ "error", {
        "aspects": [ "noHref", "invalidHref" ]
      }],
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/label-has-for": "off",
      "jsx-a11y/no-autofocus": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "no-param-reassign": "off",
      "no-prototype-builtins": "off",
      "no-restricted-syntax": "off",
      "no-underscore-dangle": "off",
      "prettier/prettier": ["error", { "singleQuote": true, printWidth: 100 }],
      "react/jsx-filename-extension": [1, {"extensions": [".js"]}],
      "react/prop-types": "off",
      "strict": 0
    }
};