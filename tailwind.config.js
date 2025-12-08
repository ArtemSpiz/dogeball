/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        crisis: ["Climate Crisis", "sans-serif"],
        grotesk: ["Clash Grotesk", "sans-serif"],
        BPdotsUnicase: ["BPdotsUnicase", "sans-serif"],
      },
      keyframes: {
        rotateClockwise: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rotateClockwise: "rotateClockwise 12s linear infinite",
      },
    },
  },
  plugins: [],
};
