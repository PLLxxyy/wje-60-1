/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        bg: {
          dark: '#0f0f1a',
          darker: '#0a0a12',
          card: '#1a1a2e',
          hover: '#252542',
        },
        neon: {
          blue: '#00d9ff',
          pink: '#ff006e',
          yellow: '#ffbe0b',
          green: '#39ff14',
          purple: '#7a00ff',
        },
        platform: {
          nes: '#c41e3a',
          snes: '#5c4033',
          n64: '#4a2c7a',
          gamecube: '#7a00ff',
          wii: '#ffffff',
          playstation: '#003087',
          genesis: '#000000',
          dreamcast: '#ff6600',
          gameboy: '#c0c0c0',
          arcade: '#ff006e',
          pc: '#00d9ff',
        },
        status: {
          playing: '#00d9ff',
          completed: '#39ff14',
          wishlist: '#ffbe0b',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        retro: ['VT323', 'monospace'],
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00d9ff, 0 0 10px #00d9ff, 0 0 20px rgba(0, 217, 255, 0.5)',
        'neon-pink': '0 0 5px #ff006e, 0 0 10px #ff006e, 0 0 20px rgba(255, 0, 110, 0.5)',
        'neon-yellow': '0 0 5px #ffbe0b, 0 0 10px #ffbe0b, 0 0 20px rgba(255, 190, 11, 0.5)',
        'neon-green': '0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px rgba(57, 255, 20, 0.5)',
        'cartridge': '0 4px 6px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'cartridge-hover': '0 8px 12px rgba(0, 0, 0, 0.6), 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 217, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scanline': 'scanline 6s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '50%': { boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
        'scanline': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
