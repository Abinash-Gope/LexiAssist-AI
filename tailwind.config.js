/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F172A",
          hover: "#1E293B",
          foreground: "#F8FAFC",
        },
        brand: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          subtle: "#EFF6FF",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
          hover: "#E2E8F0",
          foreground: "#0F172A",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#111827",
          dim: "#F8FAFC",
        },
        border: {
          light: "#E2E8F0",
          dark: "#1E293B",
        },
        risk: {
          high: {
            DEFAULT: "#DC2626",
            bg: "#FEF2F2",
            border: "#FCA5A5",
            text: "#991B1B",
          },
          medium: {
            DEFAULT: "#D97706",
            bg: "#FFFBEB",
            border: "#FCD34D",
            text: "#92400E",
          },
          low: {
            DEFAULT: "#059669",
            bg: "#ECFDF5",
            border: "#6EE7B7",
            text: "#065F46",
          },
        },
        guardrail: {
          DEFAULT: "#4F46E5",
          bg: "#EEF2FF",
          border: "#C7D2FE",
          text: "#3730A3",
        },
      },
      fontFamily: {
        headline: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        legal: ["Source Serif 4", "Georgia", "serif"],
        mono: ["JetBrains Mono", "SF Mono", "monospace"],
      },
      boxShadow: {
        'level-1': '0 1px 3px 0 rgba(15, 23, 42, 0.05)',
        'level-2': '0 4px 12px -2px rgba(15, 23, 42, 0.08)',
        'level-3': '0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};
