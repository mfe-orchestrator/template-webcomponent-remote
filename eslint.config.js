import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

export default [
    {
        ignores: ["dist/**"]
    },
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: "module",
                ecmaFeatures: { jsx: true }
            }
        },
        plugins: {
            "@typescript-eslint": tsPlugin
        },
        rules: tsPlugin.configs.recommended.rules
    }
]
