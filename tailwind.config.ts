import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        Fm: "376px",
      },
      fontFamily: {
        sans: ["var(--font-space)"],
      },
      colors: {
        "Fm-Strong-cyan": "hsl(172, 67%, 45%)",
        "Fm-Very-dark-cyan": "hsl(183, 100%, 15%)",
        "Fm-Dark-grayish-cyan": "hsl(186, 14%, 43%)",
        "Fm-Grayish-cyan": "hsl(184, 14%, 56%)",
        "Fm-Light-grayish-cyan": "hsl(185, 41%, 84%)",
        "Fm-Very-light-grayish-cyan": "hsl(189, 41%, 97%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
