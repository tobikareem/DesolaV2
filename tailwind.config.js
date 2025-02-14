/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens:{
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl':'1536px',
      
    },
    extend: {
      fontFamily:{
        'grotesk':["Space Grotesk", "serif"],
        'work': ["Work Sans", "serif"],
        'poppins':['Poppins', 'serif'],
        'inter': ["Inter", "serif"],
        'vietnam-pro': ["Be Vietnam Pro","serif"],
      },
      spacing:{
        '4.5':'18px',
        '5.5':'22px',
        '13': '52px',
        '15': '60px',
        '17': '68px',
        '18': '72px',
        '19': '76px',
        '21': '84px',
        '22': '88px',
        '23': '92px',
        '25': '100px',
        '27': '108px',
        '28': '112px',
        '30': '120px',
        '32': '128px',
        '34': '136px',
        '36': '144px',
        '38': '152px',
        '41': '164px',
        '44': '176px',
        '46': '184px',        
      },
      colors: {
        'primary': {
          100: '#D5E5FB',
          300: '#5C88DA',
          500: '#004AAD',
          600: '#003B85',
          700: '#002F6C',
        },
        'secondary': {
          100: '#FFE6CC',
          200: '#FFA366',
          500: '#FF6B00',
          600: '#CC5500',
          700: '#993F00',
        },
        'neutral':'#FAFAFA',
        'neutral':{
          100: '#FFFFFF',
          300: '#E3E3E3',
          500: '#666666',
          700: '#333333',
          800: '#181818',
          900: '#121212',
        },
        'success': '#28A745',
        'error': '#DC3545',
        'notification': '#17A2B8',
        'warning': '#FFC107',
      },
      gradientColorStops: {
        'linear': ['#FF9040','#FF6B00'],
      }
    },
  },
  plugins: [],
}

