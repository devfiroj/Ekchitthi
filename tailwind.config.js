/** @type {import('tailwindcss').Config} **/
module.exports = {
  content: ['./views/**/*.{html,ejs}'],
  theme: {
    extend: {
      fontFamily: {
        'font1': ['"Dancing Script"','sans-serif'],
        'font2': ['"Great Vibes"', 'mono']
      },
      colors: {}
    },
  },
  plugins: [],
}

