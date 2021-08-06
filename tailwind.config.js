module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'seas-lg': "url('/assets/assistencia-social-lg.jpg')",
        'seas-sm': "url('/assets/assistencia-social-sm.jpg')",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled']
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
