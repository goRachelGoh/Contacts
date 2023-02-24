/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontSize: {
      xs: ["10px", "12px"],
      sm: ["12px", "18px"],
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"],
      "2xl": ["32px", "40px"],
      "3xl": ["40px", "48px"],
    },
  },
  variants: {
    extend: {
      borderWidth: ["responsive", "hover", "focus", "invalid"],
      borderColor: ["responsive", "hover", "focus", "invalid"],
    },
  },
  plugins: [],
};
