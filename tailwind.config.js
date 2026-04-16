/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Override gray colors for better contrast (WCAG AAA compliance)
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#52525b', // Darker for better contrast (was #9ca3af)
          500: '#3f3f46', // Darker for better contrast (was #6b7280)
          600: '#27272a', // Darker for better contrast (was #4b5563)
          700: '#18181b',
          800: '#09090b',
          900: '#030712',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['var(--font-host-grotesk)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}