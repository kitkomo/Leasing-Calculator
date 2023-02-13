const isProd = process.argv.includes('--prod')
const isDev = !isProd

module.exports = {
	isProd: isProd,
	isDev: isDev,
	htmlmin: {
		collapseWhitespace: isProd
	},
	pug: {
		pretty: isDev
	},
}