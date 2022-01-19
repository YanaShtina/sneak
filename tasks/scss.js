const { src, dest } = require("gulp");
//конфигурация
const path = require("../config/path.js")
const app = require("../config/app.js")

//плагины
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")
const sourcemaps = require("gulp-sourcemaps")
const autoprefixer = require("gulp-autoprefixer")
const csso = require("gulp-csso")
const rename = require("gulp-rename");
const size = require("gulp-size") 
const groupCssMedia = require("gulp-group-css-media-queries")
const sass = require("gulp-sass")(require("sass"))
const sassGlob = require("gulp-sass-glob") 
// const imgWebPCss = require("gulp-webp-css")
const gulpIf = require("gulp-if")
const cssimport = require("gulp-cssimport")


//
const scss = ()=> {
   return src(path.scss.src) 
   .pipe(sourcemaps.init()) //
      .pipe(plumber(
         // {errorHandler: notify.onError(error => ({
         //    title: 'CSS',
         //    message: error.message
         //    }
         // ))
         // }
      ))
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(sourcemaps.write() )
      .pipe(cssimport())
      .pipe(dest(path.css.dest))
      .pipe(sourcemaps.write() )
      .pipe(dest(path.css.dest)) 
}
module.exports = scss;