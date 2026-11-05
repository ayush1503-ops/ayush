/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // built on the reference palette, extended with more hues so no two
        // sections read the same
        tang: { 100: '#ffd9c2', 200: '#fca571', 300: '#f3670e', 400: '#d2550a', 500: '#a53f05' },
        grape: { 100: '#dcd9ff', 200: '#a5b5ff', 300: '#4b6aff', 400: '#2438d6', 500: '#1526a1' },
        sun: { 100: '#fff6cc', 200: '#ffe375', 300: '#ffd31e', 400: '#e0b000', 500: '#8a6a00' },
        mint: { 100: '#c9f7dd', 200: '#84ebb4', 300: '#1fc16b', 400: '#138a4b', 500: '#0b5c31' },
        chilli: { 100: '#ffd6d9', 200: '#fb7c85', 300: '#fb3748', 400: '#c31f2c', 500: '#8a1119' },
        cream: { 100: '#fffdf6', 200: '#f8f3e6', 300: '#efe7d4', 400: '#ded2b8' },
        ink: '#0a0a0a',
        'ink-2': '#585858',
      },
      fontFamily: {
        sans: ['Jost', 'system-ui', 'sans-serif'],
        display: ['Jost', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      screens: { desk: { min: '1025px' }, tab: { max: '1024px' }, phone: { max: '640px' } },
      boxShadow: {
        hard2: '2px 2px 0 #0a0a0a',
        hard3: '3px 3px 0 #0a0a0a',
        hard4: '4px 4px 0 #0a0a0a',
        hard5: '5px 5px 0 #0a0a0a',
        hard6: '6px 6px 0 #0a0a0a',
        hard8: '8px 8px 0 #0a0a0a',
        white4: '4px 4px 0 #fffdf6',
        white6: '6px 6px 0 #fffdf6',
      },
      transitionTimingFunction: { pop: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    },
  },
  plugins: [],
}
