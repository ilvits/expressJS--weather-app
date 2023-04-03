module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{png,css,ico,woff2,svg,html,js,webmanifest}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};