/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
	darkMode: "class",
	content: ["./src/**/*.js", "./public/**/*.js", "./views/**/*.ejs"],
	theme: {
		screens: {
			xs: "380px",
			sm: "500px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		extend: {
			strokeWidth: {
				1.5: "1.5px",
			},
			transitionProperty: {
				height: "height",
				width: "width",
				spacing: "margin, padding",
			},
			fontFamily: {
				sans: ["Nunito"],
			},
			fontSize: {
				xxs: ["10px", "9px"],
			},
			boxShadow: {
				"3xl": "20px 20px 30px -15px #000000",
			},
			keyframes: {
				fly: {
					"0%, 100%": { transform: "translate(-8px, -16px)" },
					"50%": { transform: "translate(-12px, -16px)" },
				},

				"fly-reverse": {
					"0%, 100%": { transform: "translate(24px, 8px)" },
					"50%": { transform: "translate(28px, 8px)" },
				},

				"wiggle-3": {
					"0%, 100%": { transform: "rotate(-2deg)" },
					"50%": { transform: "rotate(2deg)" },
				},

				"wiggle-6": {
					"0%, 100%": { transform: "rotate(-6deg)" },
					"50%": { transform: "rotate(6deg)" },
				},
			},
			animation: {
				fly: "fly 3s running infinite",
				"fly-reverse": "fly-reverse 3s reverse infinite",
				"spin-slow": "spin 3s running infinite",
				"wiggle-3": "wiggle-3 1s ease-in-out infinite",
				"wiggle-6": "wiggle-6 1s ease-in-out infinite",
			},
			zIndex: {
				60: "60",
				70: "70",
				80: "80",
				90: "90",
				100: "100",
			},
		},
		colors: {
			cosmic: {
				300: "#D7F4FE",
				400: "#ACD8E7",
				500: "#6892B9",
				600: "#3377FF",
				800: "#132846",
				900: "#131E32",
			},
			gray: {
				100: "#F3F4F7",
				200: "#D4D4DE",
				300: "#90929E",
				400: "#6A9CFF",
			},
			slate: colors.slate,
			"slate-100": "#f1f5f9",
			cyan: "#3FD5FE",
			blue: "#3377FF",
			yellow: "#FEB800",
			orange: "#F5804E",
			violet: "#D580FF",
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			red: colors.red,
			"primary-backdrop": "#14181F",
			"primary-light": "#3377FF",
			"primary-dark": "#FEB800",
			"primary-red": "#F46A47",
		},
	},
	plugins: [],
};
