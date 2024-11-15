import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        full: "4px 6px black",
        "half-full": "2px 4px black",
      },

      colors: {
        lightBlue: "#DFE5F2",
        softBlue: "#88AAEE",
        deepBlue: "#4D80E6",
        red: "#FF5050",
      },
      fontSize: {
        xl: "64px",
        lg: "40px",
        md: "24px",
        sm: "20px",
        base: "16px",
        xs: "14px",
        "2xl": "12px",
      },
    },
  },
  plugins: [],
} satisfies Config
