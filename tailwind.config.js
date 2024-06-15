/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    screens:{
      'sm-mobile': {'max': '375px'},
      'mobile': {'max': '480px'},
      'lg': {'min': '1024'}
    }
    
  },
  plugins: [],
}

