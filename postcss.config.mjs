/**
 * PostCSS-Pipeline.
 *
 * Tailwind CSS v4 bringt Nesting, Autoprefixing und Import-Auflösung selbst mit
 * – `postcss-import`, `postcss-nesting` und `autoprefixer` sind dadurch
 * überflüssig. Weniger Abhängigkeiten, schnellere Builds.
 *
 * @type {import("postcss-load-config").Config}
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
