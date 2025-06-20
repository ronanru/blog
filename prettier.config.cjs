/** @type {import("prettier").Config} */
module.exports = {
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  plugins: [
    require.resolve("prettier-plugin-astro"),
    require.resolve("prettier-plugin-organize-imports", {}),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  organizeImportsSkipDestructiveCodeActions: true,
};
