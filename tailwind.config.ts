import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                display: ["var(--font-display)", "serif"],
                sans: ["var(--font-sans)", "sans-serif"],
            },
            colors: {
                ink: "#20201d",
                paper: "#f7f5f0",
                canvas: "#eeece6",
                coral: "#d96e4f",
                sage: "#788777",
                line: "#ddd9d0",
            },
            boxShadow: {
                soft: "0 18px 50px rgba(32, 32, 29, 0.08)",
            },
        },
    },
    plugins: [],
};

export default config;
