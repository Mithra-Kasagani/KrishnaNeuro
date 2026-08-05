import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Public marketing surfaces intentionally use native anchors so the home
    // route remains hydration-free; form-heavy routes still use Next Link.
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  globalIgnores([".next/**", "node_modules/**", "public/**"]),
]);
