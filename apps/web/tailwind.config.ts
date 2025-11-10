import type { Config } from 'tailwindcss'
import preset from '../../packages/config/tailwind/tailwind.preset'
import animateCss from 'tw-animate-css'

const config: Config = {
  presets: [preset],
  content: ['./src/**/*.{js,ts,jsx,tsx}', '../../packages/ui/src/**/*.{js,ts,jsx,tsx}', '../../packages/shared/src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial',
      },
      colors: {
        brand: {
          50: '#f6f7fb',
          100: '#eceef6',
          200: '#cfd6e8',
          300: '#a9b6d6',
          400: '#7a8ec0',
          500: '#556eae',
          600: '#3e5594',
          700: '#324578',
          800: '#293962',
          900: '#1f2a46',
          950: '#12192b',
        },
      },
    },
  },
  plugins: [animateCss],
}

export default config
