const del = require('del')

const path = require('../config/path')

//Delete public dir
const clear = () => {
	return del(path.root)
}

module.exports = clear