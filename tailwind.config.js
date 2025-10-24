/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{components,context,hooks,services,utils}/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      colors: {
        primary: '#94c11f',
        'primary-dark': '#7fa10a',
        dark: {
          100: '#1a1a1a',
          200: '#2c2c2c',
          300: '#404040',
        },
        light: {
            100: '#ffffff',
            200: '#f5f5f5',
            300: '#e0e0e0',
        }
      },
    },
  },
  plugins: [],
}