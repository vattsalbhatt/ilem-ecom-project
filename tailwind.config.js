/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontWeight: {
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900,
      },
      fontSize: {
        f12: '12px',
        f13: '13px',
        f14: '14px',
        f16: '16px',
        f18: '18px',
        f20: '20px',
        f22: '22px',
        f24: '24px',
        f26: '26px',
        f28: '28px',
        f30: '30px',
        f32: '32px',
        f34: '34px',
        f36: '36px',
        f38: '38px',
        f48: '48px',
      },
      fontFamily: {
        figtree: ['Urbanist', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
