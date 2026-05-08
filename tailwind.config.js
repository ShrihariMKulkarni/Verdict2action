/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1B3A5C', light: '#EEF2F8', dark: '#0F2035' },
        saffron: { DEFAULT: '#C9410A', light: '#FEECE5' },
        paper: { DEFAULT: '#F7F6F2' },
        warm: { border: '#DDD9D0', panel: '#EAE8E2' },
        verified: { DEFAULT: '#166534', bg: '#DCFCE7' },
        warning: { DEFAULT: '#92400E', bg: '#FEF3C7' },
        danger: { DEFAULT: '#991B1B', bg: '#FEE2E2' },
        info: { DEFAULT: '#1E40AF', bg: '#DBEAFE' },
        muted: { DEFAULT: '#6B6860' },
        nearBlack: { DEFAULT: '#1A1A1A' }
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
