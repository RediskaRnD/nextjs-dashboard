// const styleguide = require('@vercel/style-guide/prettier');

module.exports = {
  plugins: [
    'prettier-plugin-packagejson',

    'prettier-plugin-style-order',
    'prettier-plugin-import-sort',
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss' // MUST come last
  ],
  tailwindFunctions: ['clsx']
};
