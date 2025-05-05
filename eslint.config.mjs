export default {
  extends: ["airbnb-base", "prettier"],
  plugins: ["import"],
  env: {
    node: true,
    es2021: true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    "no-console": ["warn"]
  }
};