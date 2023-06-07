/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./{pages,components}/**/*.{html,js,jsx,tsx,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],

	daisyui: {
		themes: ['winter']
	}
};
