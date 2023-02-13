const {src, dest} = require('gulp')

const path = require('../config/path')
const app = require('../config/app')

//Plagins
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const fileInclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const size = require('gulp-size')
const webphtml = require('gulp-webp-html')

//Compile HTML
const html = () => {
	return src(path.html.src)
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: 'HTML',
				message: error.message
			}))
		}))
		.pipe(fileInclude())
		.pipe(webphtml())
		.pipe(size({
			title: 'Before compression: '
		}))
		.pipe(htmlmin(app.htmlmin))
		.pipe(size({
			title: 'After compression: '
		}))
		.pipe(dest(path.html.dest))
}

module.exports = html