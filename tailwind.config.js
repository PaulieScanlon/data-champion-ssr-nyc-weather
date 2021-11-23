module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          default: '#663399',
          primary: '#7026B9'
        }
      },
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
