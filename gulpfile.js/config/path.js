const pathSrc = './src'
const pathDest = './public'

module.exports = {
	root: pathDest,
	html: {
		src: pathSrc + '/html/*.html',
		watch: pathSrc + '/html/**/*.html',
		dest: pathDest
	},
	scss: {
		src: pathSrc + '/scss/*.{scss, sass}',
		watch: pathSrc + '/scss/**/*.{scss, sass}',
		dest: pathDest
	},
	js: {
		src: pathSrc + '/js/*.js',
		watch: pathSrc + '/js/**/*.js',
		dest: pathDest
	},
	img: {
		src: pathSrc + '/img/**/*.{png,jpg,jpeg,gif,svg}',
		watch: pathSrc + '/img/**/*.{png,jpg,jpeg,gif,svg}',
		dest: pathDest + '/img'
	},
	fonts: {
		src: pathSrc + '/fonts/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
		watch: pathSrc + '/fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
		dest: pathDest + '/fonts'
	},
}