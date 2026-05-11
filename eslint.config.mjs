import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Firebase Hosting upload cache — contains a copy of .next/ build output.
    ".firebase/**",
    // Operational scripts (CommonJS / Node-level) — not app code, intentionally use require().
    "deploy-functions.js",
    "deploy-hosting.js",
    "scripts/**",
    // Server-side codebase has its own tsconfig and is bundled separately.
    "functions/**",
  ]),
]);

export default eslintConfig;
