const { src, dest } = require("gulp");
//конфигурация
const path = require("../config/path.js")
const app = require("../config/app.js")

//плагины
const concat = require('gulp-concat');

const js = () => {
	 src('./src/js/libs/*.js')
		.pipe(concat('libs.js'))
		.pipe(dest('./public/js/'))
  return src(
    './src/js/modules/**.js')
    .pipe(concat('main.js'))
    .pipe(dest('./public/js/'))
    
}

module.exports = js;