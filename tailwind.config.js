/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#efeef1',
        'background': '#110e15',
        'primary': '#bba8d0',
        'secondary': '#4f3170',
        'accent': '#8014fe',
       },
    },
  },
  plugins: [],
}

