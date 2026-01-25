import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        'dm-sans': ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      colors: {
        // Randomizer Brasil Brand Colors (using CSS variables)
        brand: {
          cyan: "var(--color-brand-cyan)",
          "cyan-light": "var(--color-brand-cyan-light)",
          "cyan-dark": "var(--color-brand-cyan-dark)",
          navy: "var(--color-brand-navy)",
        },
        // Semantic colors (using CSS variables)
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        // shadcn/ui color system (using CSS variables)
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        chart: {
          "1": "var(--color-chart-1)",
          "2": "var(--color-chart-2)",
          "3": "var(--color-chart-3)",
          "4": "var(--color-chart-4)",
          "5": "var(--color-chart-5)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        "4xl": "var(--radius-4xl)",
      },
      keyframes: {
        "pulse-cyan": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "glow-cyan": {
          "0%, 100%": {
            boxShadow:
              "0 0 5px #00D9FF, 0 0 10px #00D9FF, 0 0 15px #00D9FF, 0 0 20px #00D9FF",
          },
          "50%": {
            boxShadow:
              "0 0 10px #00D9FF, 0 0 20px #00D9FF, 0 0 30px #00D9FF, 0 0 40px #00D9FF",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "pulse-cyan": "pulse-cyan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-cyan": "glow-cyan 2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
