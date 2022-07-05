/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html"],
  theme: {
    colors:{
      'primarylight':'#F0EBE3',
      'primarydark':'#E4DCCF',
      'secondarylight':'#7D9D9C',
      'secondarydark':'#576F72',
      'red':'#e11d48'
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
