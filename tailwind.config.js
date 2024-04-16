/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        primary: "#EB455F",
        secondary: "#FCFFE7",
        ternary: "#BAD7E9",
        quaternary: "#2B3467",
      },
      boxShadow: {
        "3xl":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "4xl":
          "0 10px 25px -10px rgba(0, 0, 0, 0.8), 0 10px 25px -5px rgba(0, 0, 0, 0.05)",
        // Add more as needed
      },
    },
  },
  plugins: [],
};
