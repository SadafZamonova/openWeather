/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'searchbg' : '#f2f2f2',
        '#ececed' : '#ececed'
      },
      width: {
        '900' : '900px',
      }
    },
  },
  plugins: [],
}
