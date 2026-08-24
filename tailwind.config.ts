import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cereal: ['AirbnbCereal', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: '#FF385C',
        'brand-hover': '#E31C5F',
        secondary: '#717171',
        border: '#DDDDDD',
        base: '#222222'
      },
    },
  },
  plugins: [],
};
export default config;
