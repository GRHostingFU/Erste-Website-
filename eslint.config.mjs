import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

/**
 * ESLint Flat Config.
 *
 * Basis: die offiziellen Next.js-Presets (inkl. Core Web Vitals und den
 * jsx-a11y-Regeln). Darüber liegt eine kleine, bewusst gewählte Schärfung –
 * jede Regel adressiert einen Fehler, der in Reviews real vorkommt.
 */
const config = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Typ-Importe explizit halten – erforderlich für `verbatimModuleSyntax`.
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      // Ungenutzte Variablen sind ein Fehler; `_`-Präfix bleibt erlaubt.
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "smart"],
      "prefer-const": ["error", { destructuring: "all" }],
    },
  },
];

export default config;
