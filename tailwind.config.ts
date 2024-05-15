import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        pink: '#ec4899'
      },
      fontFamily: {
        poppins: 'var(--font-poppins)',
        seurat: 'var(--font-seurat)',
        bokutoh: 'var(--font-bokutoh)',
      },
    },
  },
  plugins: [],
};
export default config;
