/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: "#00fffc",
        darkblue: "#51538f",
      },
      boxShadow: {
        "all-sides": "0px 0px 105px #64f3d5",
        "all-sides-form": "-15px -15px 105px #374151",
      },
    },
  },
  plugins: [],
};
