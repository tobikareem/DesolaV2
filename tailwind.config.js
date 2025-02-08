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
      },
      colors: {
        'primary': '#FF6363',
        'secondary': {
          100: '#E2E2D5',
          200: '#888883',
        },
        'neutral':'#FAFAFA',
        'neutral-text':{
          100: '#FFFFFF',
          300: '#E3E3E3',
          500: '#666666',
          700: '#333333',
          900: '#121212',
        },
        'success': '#28A745',
        'error': '#DC3545',
        'notification': '#17A2B8',
        'warning': '#FFC107',
      },
    },
  },
  plugins: [],
}

