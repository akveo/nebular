import rxjs from "eslint-plugin-rxjs-x";
import globals from "globals";
import angular from "angular-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [{
    ignores: [
        "src/framework/**/*",
    ],
}, ...angular.configs.tsRecommended.map(config => ({
    ...config,
    files: ["**/*.ts"],
})), {
    files: ["**/*.ts"],
    processor: angular.processInlineTemplates,
}, eslintConfigPrettier, {
    files: ["**/*.ts"],

    plugins: {
        rxjs,
        "@typescript-eslint": tseslint,
        "@angular-eslint": angular.tsPlugin,
        "@angular-eslint/template": angular.templatePlugin,
    },

    languageOptions: {
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: ["tsconfig.json", "e2e/tsconfig.json"],
            createDefaultProgram: true,
        },
    },

    rules: {
        quotes: "off",
        "dot-notation": "off",
        "no-restricted-globals": ["error", "fit", "fdescribe"],
        "@typescript-eslint/dot-notation": "error",
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "no-underscore-dangle": "off",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@angular-eslint/prefer-standalone": "off",
        "@angular-eslint/prefer-inject": "off",

        "rxjs/no-unsafe-takeuntil": ["error", {
            allow: [
                "count",
                "defaultIfEmpty",
                "endWith",
                "every",
                "finalize",
                "finally",
                "isEmpty",
                "last",
                "max",
                "min",
                "publish",
                "publishBehavior",
                "publishLast",
                "publishReplay",
                "reduce",
                "share",
                "shareReplay",
                "skipLast",
                "takeLast",
                "throwIfEmpty",
                "toArray",
            ],
        }],
    },
}, ...angular.configs.templateRecommended.map(config => ({
    ...config,
    files: ["**/*.html"],
})), {
    files: ["**/*.html"],
    rules: {},
}, {
    files: ["./*.js"],

    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: 11,
        sourceType: "commonjs",
    },
}];
