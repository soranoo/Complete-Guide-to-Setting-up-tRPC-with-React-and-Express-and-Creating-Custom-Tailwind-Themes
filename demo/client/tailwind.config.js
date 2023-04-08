function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity("--text-color-base"),
          muted: withOpacity("--text-color-muted"),
          inverted: withOpacity("--text-color-inverted"),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--bg-color-fill"),
          "button-accent": withOpacity("--bg-color-button-accent"),
          "button-accent-hover": withOpacity("--bg-color-button-accent-hover"),
          "button-muted": withOpacity("--bg-color-button-muted"),
        },
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity("--gradient-color-stops-hue"),
        },
      },
    },
  },
  plugins: [],
}

