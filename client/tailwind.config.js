/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        120: "41rem",
        115:"32rem",
        102:"33rem",
        106:"31rem"
      },
      minHeight:{
        103:"22rem",
      },
      width:{
        100:"100%"
      },
      maxWidth:{
        screen: "100vw"
      },
      screens: {
        wq: "450px",
        we: "350px",
        wr: "600px",
        wt: "550px"
      },
      padding:{
        102:"28rem"
      }
    },
  },
  plugins: [],
};
 