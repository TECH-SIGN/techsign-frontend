module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  // we will disable preflight for MUI integration (see next step)
  corePlugins: {
    preflight: false,
  },
  important: '#root', // helps avoid specificity issues (see notes below)
  theme: {
    extend: {},
  },
  plugins: [],
}
