const { src, dest } = require("gulp");
//конфигурация
const path = require("../config/path.js")

//плагины
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")
const concat = require("gulp-concat")
const cssimport = require("gulp-cssimport")
const sourcemaps = require("gulp-sourcemaps")
const autoprefixer = require("gulp-autoprefixer")
const csso = require("gulp-csso")
const rename = require("gulp-rename");
const size = require("gulp-size") 
const groupCssMedia = require("gulp-group-css-media-queries")
const imgWebPCss = require("gulp-webp-css")
const gulpIf = require("gulp-if")


const css = ()=> {
   return src(path.css.src) 
   .pipe(sourcemaps.init())
   .pipe(plumber({
      errorHandler: notify.onError(error => (
         {
            title: 'CSS',
            message: error.message
            }
         ))
   })) // добавляем в самом начале потока, будет перехватывать все ошибки
   .pipe(concat("main.css"))
      .pipe(cssimport())
      .pipe(imgWebPCss())
      .pipe(autoprefixer())
      .pipe(groupCssMedia())
      .pipe(size ({ title: "До сжатия css" }))
      .pipe(dest(path.css.dest))
     .pipe(rename({ suffix: ".min"}))
      .pipe(csso())
      .pipe(size ({ title: "после сжатия css" }))
   .pipe(sourcemaps.write())
   .pipe(dest(path.css.dest)) // конечная папка. В самом конце
  
}

module.exports = css;