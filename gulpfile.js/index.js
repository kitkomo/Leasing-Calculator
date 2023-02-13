const {watch, series, parallel} = require('gulp')
const browserSync = require('browser-sync').create()

const path = require('./config/path')
const app = require('./config/app')

//Export tasks
const clear = require('./tasks/clear')
const html = require('./tasks/html')
const scss = require('./tasks/scss')
const scripts = require('./tasks/scripts')
const img = require('./tasks/img')
const fonts = require('./tasks/fonts')


//Server
const server = () => {
	browserSync.init({
		server: {
			baseDir: path.root
		}
	})
}

//Watching
const watcher = () => {
	watch(path.html.watch, html).on('all', browserSync.reload)
	watch(path.scss.watch, scss).on('all', browserSync.reload)
	watch(path.js.watch, scripts).on('all', browserSync.reload)
	watch(path.img.watch, img).on('all', browserSync.reload)
	watch(path.fonts.watch, fonts).on('all', browserSync.reload)
}

//Tasks
exports.clear = clear
exports.html = html
exports.scss = scss
exports.scripts = scripts
exports.img = img
exports.fonts = fonts


//Automated

const dev = series(
	clear,
	parallel(html, scss, scripts, img, fonts),
	parallel(watcher, server)
)

const build = series(
	clear,
	parallel(html, scss, scripts, img, fonts)
)

exports.default = app.isProd
	? build
	: dev