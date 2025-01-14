const { default: daisyui } = require("daisyui");
// const daisyPlugin = require("daisyui/plugin");

module.exports = {
  content: ["./views/**/*.{html,js,ejs}", "./public/**/*.{html,js,ejs}"], // Include EJS files
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      {
        pink: {
          name: "pink", // Theme name
          default: true, // Makes it the default theme
          prefersdark: true, // Indicates preference for dark mode
          "color-scheme": "dark", // Indicates it's a dark theme

          // Base colors
          "base-100": "oklch(97% 0.017 320.058)",
          "base-200": "oklch(95% 0.037 318.852)",
          "base-300": "oklch(90% 0.076 319.62)",
          "base-content": "oklch(40% 0.17 325.612)",

          // Primary colors
          primary: "oklch(83% 0.145 321.434)",
          "primary-content": "oklch(29% 0.136 325.661)",

          // Secondary colors
          secondary: "oklch(86% 0.127 207.078)",
          "secondary-content": "oklch(30% 0.056 229.695)",

          // Accent colors
          accent: "oklch(0% 0 0)",
          "accent-content": "oklch(100% 0 0)",

          // Neutral colors
          neutral: "oklch(45% 0.211 324.591)",
          "neutral-content": "oklch(97% 0.017 320.058)",

          // Feedback colors
          info: "oklch(58% 0.158 241.966)",
          "info-content": "oklch(97% 0.013 236.62)",
          success: "oklch(62% 0.194 149.214)",
          "success-content": "oklch(98% 0.018 155.826)",
          warning: "oklch(64% 0.222 41.116)",
          "warning-content": "oklch(98% 0.016 73.684)",
          error: "oklch(58% 0.253 17.585)",
          "error-content": "oklch(96% 0.015 12.422)",

          // Custom CSS variables
          "--radius-selector": "0.5rem",
          "--radius-field": "1rem",
          "--radius-box": "1rem",
          "--size-selector": "0.25rem",
          "--size-field": "0.25rem",
          "--border": "1px",
          "--depth": "0",
          "--noise": "1",
        },
      },
    ],
  },
  plugins: [require("daisyui")], // Add DaisyUI plugin
};
