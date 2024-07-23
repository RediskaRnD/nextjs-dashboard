module.exports = {
  "extends": "next/core-web-vitals",
  "rules": {
    // Add any additional rules or overrides here
  },
  "overrideConfig": {
    "linterOptions": {
      "reportUnusedDisableDirectives": true
    }
  },
  "plugins": [
    // Add any plugins here
  ],
  "ignorePatterns": ["node_modules", ".next"]
};
