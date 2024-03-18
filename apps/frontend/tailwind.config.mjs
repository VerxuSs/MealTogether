module.exports = {
  content: [
    './app/**/*.{ts,tsx,jsx}',
    './node_modules/@fastack/**/*.{ts,tsx,mjs,cjs}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {},
  plugins: [require('flowbite/plugin')],
}
