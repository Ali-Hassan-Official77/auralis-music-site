import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#060A13",
        panel: "#0C1322",
        "panel-2": "#121B30",
        "panel-3": "#1A2540",
        mint: "#5CF2C0",
        cyan: "#4CC9F0",
        violet: "#8B7BFF",
        snow: "#E9EFFC",
        dim: "#8794B1",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        aurora: "linear-gradient(120deg,#5CF2C0 0%,#4CC9F0 50%,#8B7BFF 100%)",
      },
      keyframes: {
        drift: { "0%,100%": { transform: "translate3d(0,0,0) scale(1)" }, "50%": { transform: "translate3d(2%,-3%,0) scale(1.08)" } },
        orbit: { to: { transform: "rotate(360deg)" } },
        rise: { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { drift: "drift 14s ease-in-out infinite", orbit: "orbit 40s linear infinite", rise: "rise .6s ease both" },
    },
  },
  plugins: [],
};
export default config;
