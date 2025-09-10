import type { Config } from 'tailwindcss'
import animateCss from 'tw-animate-css'

const config: Config = {
  // disable preflight for MUI integration
  corePlugins: {
    preflight: false,
  },
  important: '#root',
  theme: {
    extend: {},
  },
  plugins: [animateCss],
}

export default config
