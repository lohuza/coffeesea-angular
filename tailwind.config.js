/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'container': '1400px'
      },
      boxShadow: {
        'pricing': '0px 40px 40px -40px rgba(54, 38, 36, 0.3)',
      },
      colors: {
        'coffee': {
          50: '#f7f1ed',  // rgb(247, 241, 237)
          100: '#d3c9c2', // rgb(211, 201, 194)
          200: '#998983', // rgb(153, 137, 131)
          300: '#685a56', // rgb(104, 90, 84)
          400: '#644f48', // rgb(100, 79, 72)
          500: '#493128', // rgb(73, 49, 40)
          600: '#422d24', // rgb(66, 45, 36)
          700: '#34231c', // rgb(52, 35, 28)
          800: '#281b16', // rgb(40, 27, 22)
          900: '#1f1511', // rgb(31, 21, 17)
        },
        brown: {
          50: '#faf6f3',
          100: '#f2ebe4',
          200: '#e5d5c5',
          300: '#d7bea6',
          400: '#c49c7f',
          500: '#b17b5e',
          600: '#a66754',
          700: '#8b5447',
          800: '#71453d',
          900: '#5c3a34',
        },
      },
      fontFamily: {
        'noto': ['Noto Sans Georgian', 'sans-serif'],
        georgian: ['Noto Sans Georgian', 'sans-serif'],
      },
      fontSize: {
        // Display
        'display': ['60px', { lineHeight: '1.2', fontWeight: '800' }],

        // Headings
        'h1': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'h4': ['20px', { lineHeight: '1.2', fontWeight: '700' }],
        'h5': ['16px', { lineHeight: '1.2', fontWeight: '700' }],
        'h6': ['14px', { lineHeight: '1.2', fontWeight: '700' }],

        // Paragraphs - Bold
        'p-large-bold': ['24px', { lineHeight: '1.5', fontWeight: '700' }],
        'p-medium-bold': ['16px', { lineHeight: '1.5', fontWeight: '700' }],
        'p-small-bold': ['14px', { lineHeight: '1.5', fontWeight: '700' }],
        'p-xsmall-bold': ['12px', { lineHeight: '1.5', fontWeight: '700' }],

        // Paragraphs - Regular
        'p-20': ['20px', { lineHeight: '1.5', fontWeight: '400' }],
        'p-large': ['24px', { lineHeight: '1.5', fontWeight: '400' }],
        'p-medium': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'p-small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'p-xsmall': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      backgroundImage: {
        'coffee-gradient': 'linear-gradient(135deg, #FAF6F3 0%, #E5D5C5 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
