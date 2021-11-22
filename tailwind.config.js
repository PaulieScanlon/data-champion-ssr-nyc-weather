module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        ['auto-auto']: 'auto auto'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
