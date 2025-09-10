import type { Config } from 'tailwindcss'
import animateCss from 'tw-animate-css'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    extend: {},
  },
  plugins: [animateCss],
}

export default config
