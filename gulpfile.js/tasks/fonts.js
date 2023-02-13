const {src, dest} = require('gulp')

const path = require('../config/path')
const app = require('../config/app')

const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const newer = require('gulp-newer')
const fonter = require('gulp-fonter')
const ttf2woff2 = require('gulp-ttf2woff2')

const fonts = () => {
	return src(path.fonts.src)
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: 'Fonts compression',
				message: error.message
			}))
		}))
		.pipe(newer(path.fonts.dest))
		.pipe(fonter({
			formats: ['ttf', 'woff', 'eot', 'svg']
		}))
		.pipe(dest(path.fonts.dest))
		.pipe(ttf2woff2())
		.pipe(dest(path.fonts.dest))
}

module.exports = fonts