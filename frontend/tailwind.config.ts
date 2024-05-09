import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      backdropFilter: { 'none': 'none', 'blur': 'blur(20px)' },
      borderColor: { 
        // This setting enables border color utilities to support hover and focus states
        DEFAULT: 'currentColor',
        'hover': 'var(--tw-border-color-hover)', // Define this variable in your CSS
        'focus': 'var(--tw-border-color-focus)', // Define this variable in your CSS
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at top right, var(--tw-gradient-stops))',
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      translate: {
        '1/2': '50%',
      },
    },
    
  },

  plugins: [
    require('flowbite/plugin')
  ],
};
export default config;
