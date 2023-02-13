const {src, dest} = require('gulp')

const path = require('../config/path')
const app = require('../config/app')

//Plagins
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const size = require('gulp-size')
const autoprefixer = require('gulp-autoprefixer')
const shorthand = require('gulp-shorthand')
const groupCssMediaQueries = require('gulp-group-css-media-queries')
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const webpcss = require('gulp-webp-css')
const gulpIf = require('gulp-if')

//Compile SCCS
const scss = () => {
	return src(path.scss.src, {sourcemaps: app.isDev})
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: 'SCSS',
				message: error.message
			}))
		}))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(webpcss())
		.pipe(autoprefixer())
		.pipe(shorthand())
		.pipe(groupCssMediaQueries())
		.pipe(size({
			title: 'Before compression: '
		}))
		.pipe(gulpIf(app.isDev, dest(path.scss.dest, {sourcemaps: true})))
		.pipe(csso())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(size({
			title: 'After compression: '
		}))
		.pipe(dest(path.scss.dest, {sourcemaps: app.isDev}))
}

module.exports = scss