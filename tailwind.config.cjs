/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/**/*.html",
    "./js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'retro-teal': '#00FFD1',
        'retro-indigo': '#6366F1',
        'retro-emerald': '#10B981',
        'retro-cyan': '#06B6D4',
        'retro-purple': '#8B5CF6',
        'retro-pink': '#EC4899',
        'dark-bg': '#0A0A0F',
        'dark-surface': '#12121A',
        'dark-card': '#1A1A24',
      },
      fontFamily: {
        'pixel': ['Press Start 2P', 'Courier New', 'monospace'],
        'display': ['Press Start 2P', 'Courier New', 'monospace'],
        'sans': ['Press Start 2P', 'Courier New', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 10s linear infinite',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
      },
      keyframes: {
        glow: {
          '0%': { 'box-shadow': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor' },
          '100%': { 'box-shadow': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'cursor-blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0, 255, 209, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 209, 0.1) 1px, transparent 1px)',
        'halftone': 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

