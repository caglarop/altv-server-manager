import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#28C67B",
          50: "#B5F0D4",
          100: "#A4EDCA",
          200: "#83E6B7",
          300: "#61DFA3",
          400: "#3FD88F",
          500: "#28C67B",
          600: "#1F975E",
          700: "#156941",
          800: "#0C3A24",
          900: "#020B07",
          950: "#000000",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
