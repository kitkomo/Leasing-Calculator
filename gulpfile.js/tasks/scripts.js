const {src, dest} = require('gulp')

const path = require('../config/path')
const app = require('../config/app')

//Plagins
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const size = require('gulp-size')
const babel = require('gulp-babel')
const webpack = require('webpack-stream')

//Compile JavaScript
const scripts = () => {
	return src(path.js.src, {sourcemaps: app.isDev})
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: 'Scripts',
				message: error.message
			}))
		}))
		.pipe(babel())
		.pipe(size({
			title: 'Before compression: '
		}))
		.pipe(webpack({
			mode: app.isProd ? 'production' : 'development'
		}))
		.pipe(size({
			title: 'After compression: '
		}))
		.pipe(dest(path.js.dest, {sourcemaps: app.isDev}))
}

module.exports = scripts