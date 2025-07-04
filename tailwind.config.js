// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './app/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('tailwind-scrollbar-hide'), // 👈 Plugin to hide scrollbar
//   ],
//   darkMode: 'class', // 👈 If you're using class-based dark mode
// };


// import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './app/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('tailwind-scrollbar-hide') // No `require()`
//   ],
//   darkMode: 'class',
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  darkMode: 'class',
}