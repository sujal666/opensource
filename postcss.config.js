// const config = {
//    plugins: [
//     require('tailwindcss'),
//     require('autoprefixer'),
//     require('tailwind-scrollbar-hide'),
//   ],
// };
// import tailwindcss from 'tailwindcss';
// import autoprefixer from 'autoprefixer';
// import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

// const config = {
//   plugins: [
//     'tailwindcss',
//     'autoprefixer',
//     'tailwind-scrollbar-hide', 
//   ],
// };

// export default config;


module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      tailwindConfig: './tailwind.config.js'
    },
    autoprefixer: {},
  }
}