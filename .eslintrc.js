module.exports = {
  extends: [
    'plugin:shopify/react',
    'plugin:shopify/polaris',
    'plugin:shopify/jest',
    'plugin:shopify/webpack',
    'react-app',
    'react-app/jest'
  ],
  rules: {
    "max-len": [
      "error",
      {
        "code": 100
      }
    ],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "semi": [
      2,
      "always"
    ],
    "import/no-named-as-default": 0,
    "import/no-anonymous-default-export": [
      "error",
      {
        "allowArray": false,
        "allowArrowFunction": false,
        "allowAnonymousClass": false,
        "allowAnonymousFunction": false,
        "allowCallExpression": true,
        "allowLiteral": false,
        "allowObject": true
      }
    ]
  }
  },
  overrides: [
    {
      files: ['*.test.*'],
      rules: {
        'shopify/jsx-no-hardcoded-content': 'off'
      }
    }
  ]
};
